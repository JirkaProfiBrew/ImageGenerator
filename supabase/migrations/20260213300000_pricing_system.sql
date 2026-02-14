-- ========================================
-- Phase 7.10A: Dynamic Pricing System
-- ========================================

-- ========================================
-- SERVICE COSTS (Historical cost data)
-- ========================================
CREATE TABLE service_costs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Service identification
  service_id TEXT NOT NULL,  -- e.g., 'dalle3_standard_square', 'flux_standard'
  ai_service_id TEXT REFERENCES ai_services(id) ON DELETE SET NULL,

  -- Cost
  cost_usd DECIMAL(10, 6) NOT NULL CHECK (cost_usd >= 0),

  -- Validity period
  valid_from DATE NOT NULL DEFAULT CURRENT_DATE,
  valid_to DATE,

  -- Metadata
  source TEXT NOT NULL DEFAULT 'manual'
    CHECK (source IN ('api_auto', 'manual', 'calculated')),
  notes TEXT,

  -- Audit
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  CHECK (valid_to IS NULL OR valid_to > valid_from)
);

-- Indexes
CREATE INDEX idx_service_costs_service ON service_costs(service_id);
CREATE INDEX idx_service_costs_current
  ON service_costs(service_id, valid_from DESC)
  WHERE valid_to IS NULL;

-- Only one active cost per service
CREATE UNIQUE INDEX idx_service_costs_active
  ON service_costs(service_id)
  WHERE valid_to IS NULL;

-- ========================================
-- PRICING COEFFICIENTS (Markup multiplier)
-- ========================================
CREATE TABLE pricing_coefficients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Coefficient value
  coefficient DECIMAL(6, 2) NOT NULL CHECK (coefficient > 0),

  -- Validity period
  valid_from DATE NOT NULL DEFAULT CURRENT_DATE,
  valid_to DATE,

  -- Description
  name TEXT NOT NULL,
  description TEXT,

  -- Audit
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CHECK (valid_to IS NULL OR valid_to > valid_from)
);

-- Only one active coefficient at a time
CREATE UNIQUE INDEX idx_pricing_coefficients_active
  ON pricing_coefficients(valid_from DESC)
  WHERE valid_to IS NULL;

-- ========================================
-- SEED DATA
-- ========================================

-- Initial coefficient (1.0 = no markup, direct cost pass-through)
INSERT INTO pricing_coefficients (coefficient, name, description) VALUES
  (1.0, 'Initial coefficient', 'Starting with 1:1 cost-to-price ratio for testing');

-- Initial service costs (current market rates as of Feb 2026)
INSERT INTO service_costs (service_id, ai_service_id, cost_usd, source, notes) VALUES
  -- DALL-E 3
  ('dalle3_standard_square', 'openai_dalle3', 0.040000, 'manual', '1024x1024 standard quality'),
  ('dalle3_standard_wide',   'openai_dalle3', 0.080000, 'manual', '1024x1792 or 1792x1024 standard'),
  ('dalle3_hd_square',       'openai_dalle3', 0.080000, 'manual', '1024x1024 HD quality'),
  ('dalle3_hd_wide',         'openai_dalle3', 0.120000, 'manual', '1024x1792 or 1792x1024 HD'),

  -- Flux Pro
  ('flux_standard', 'replicate_flux',    0.015000, 'manual', '25 steps standard generation'),
  ('flux_high',     'replicate_flux',    0.030000, 'manual', '50 steps high quality'),
  ('flux_ultra',    'replicate_flux',    0.036000, 'manual', 'Custom advanced parameters'),

  -- Nano Banana Pro
  ('nano_1k', 'google_nano_banana', 0.013400, 'manual', '1K resolution'),
  ('nano_2k', 'google_nano_banana', 0.013400, 'manual', '2K resolution'),
  ('nano_4k', 'google_nano_banana', 0.024000, 'manual', '4K resolution'),

  -- GPT-4o-mini (estimated average per context generation)
  ('gpt4o_mini_context', NULL, 0.000630, 'calculated', 'Average ~200 input + 1000 output tokens');

-- ========================================
-- MATERIALIZED VIEW (Fast lookup)
-- ========================================
CREATE MATERIALIZED VIEW current_service_pricing AS
SELECT
  sc.service_id,
  sc.ai_service_id,
  sc.cost_usd,
  pc.coefficient,
  sc.cost_usd * pc.coefficient AS user_price_usd,
  ROUND((sc.cost_usd * pc.coefficient) / 0.01, 0)::INTEGER AS credits_required,
  sc.valid_from AS cost_valid_from,
  pc.valid_from AS coefficient_valid_from,
  sc.source,
  sc.notes
FROM service_costs sc
CROSS JOIN pricing_coefficients pc
WHERE
  sc.valid_to IS NULL
  AND pc.valid_to IS NULL;

-- Index for instant lookups
CREATE UNIQUE INDEX idx_current_service_pricing_service
  ON current_service_pricing(service_id);

-- ========================================
-- HELPER FUNCTIONS
-- ========================================

-- Function: Get credits required for a service
CREATE OR REPLACE FUNCTION get_credits_required(
  p_service_id TEXT,
  p_effective_date DATE DEFAULT CURRENT_DATE
) RETURNS INTEGER AS $$
DECLARE
  v_cost_usd DECIMAL(10, 6);
  v_coefficient DECIMAL(6, 2);
  v_credits INTEGER;
BEGIN
  -- Get cost for date
  SELECT cost_usd INTO v_cost_usd
  FROM service_costs
  WHERE
    service_id = p_service_id
    AND valid_from <= p_effective_date
    AND (valid_to IS NULL OR valid_to > p_effective_date)
  ORDER BY valid_from DESC
  LIMIT 1;

  IF v_cost_usd IS NULL THEN
    RAISE EXCEPTION 'No cost found for service: % on date: %', p_service_id, p_effective_date;
  END IF;

  -- Get coefficient for date
  SELECT coefficient INTO v_coefficient
  FROM pricing_coefficients
  WHERE
    valid_from <= p_effective_date
    AND (valid_to IS NULL OR valid_to > p_effective_date)
  ORDER BY valid_from DESC
  LIMIT 1;

  IF v_coefficient IS NULL THEN
    RAISE EXCEPTION 'No coefficient found for date: %', p_effective_date;
  END IF;

  -- Calculate credits (1 credit = $0.01)
  v_credits := ROUND((v_cost_usd * v_coefficient) / 0.01, 0)::INTEGER;

  -- Minimum 1 credit
  IF v_credits < 1 THEN
    v_credits := 1;
  END IF;

  RETURN v_credits;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function: Refresh materialized view
CREATE OR REPLACE FUNCTION refresh_pricing_cache()
RETURNS VOID AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY current_service_pricing;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- TRIGGERS (auto-refresh materialized view)
-- ========================================
CREATE OR REPLACE FUNCTION trigger_refresh_pricing()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM refresh_pricing_cache();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_service_costs_refresh
  AFTER INSERT OR UPDATE OR DELETE ON service_costs
  FOR EACH STATEMENT
  EXECUTE FUNCTION trigger_refresh_pricing();

CREATE TRIGGER trigger_pricing_coefficients_refresh
  AFTER INSERT OR UPDATE OR DELETE ON pricing_coefficients
  FOR EACH STATEMENT
  EXECUTE FUNCTION trigger_refresh_pricing();

-- ========================================
-- RLS POLICIES
-- ========================================
ALTER TABLE service_costs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view service costs"
  ON service_costs FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage service costs"
  ON service_costs FOR ALL
  USING (true)
  WITH CHECK (true);

ALTER TABLE pricing_coefficients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view coefficients"
  ON pricing_coefficients FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage coefficients"
  ON pricing_coefficients FOR ALL
  USING (true)
  WITH CHECK (true);
