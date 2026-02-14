-- ========================================
-- Phase 7.10D: Per-Service Coefficient & Actual Cost Tracking
-- ========================================

-- ========================================
-- 1. Add coefficient column to service_costs
-- ========================================
ALTER TABLE service_costs
ADD COLUMN coefficient DECIMAL(6,2) NOT NULL DEFAULT 4.0;

COMMENT ON COLUMN service_costs.coefficient IS
  'Per-service markup coefficient. Credits = CEIL(cost_usd * coefficient * 100)';

-- ========================================
-- 2. Update existing records to coefficient 4.0
-- ========================================
UPDATE service_costs SET coefficient = 4.0 WHERE coefficient = 4.0;

-- ========================================
-- 3. Expire old Flux Pro tiers and insert updated ones
-- ========================================
UPDATE service_costs
SET valid_to = CURRENT_DATE
WHERE ai_service_id = 'replicate_flux' AND valid_to IS NULL;

INSERT INTO service_costs (service_id, ai_service_id, cost_usd, coefficient, source, notes) VALUES
  ('flux_standard', 'replicate_flux', 0.005, 4.0, 'manual', 'Steps 0-30: ~25 steps, estimated $0.005'),
  ('flux_high', 'replicate_flux', 0.0075, 4.0, 'manual', 'Steps 31-40: ~38 steps, estimated $0.0075'),
  ('flux_ultra', 'replicate_flux', 0.010, 4.0, 'manual', 'Steps 41-50: ~50 steps, estimated $0.010');

-- ========================================
-- 4. Update materialized view to use per-service coefficient
-- ========================================
DROP MATERIALIZED VIEW IF EXISTS current_service_pricing;

CREATE MATERIALIZED VIEW current_service_pricing AS
SELECT
  sc.service_id,
  sc.ai_service_id,
  sc.cost_usd,
  sc.coefficient,
  sc.cost_usd * sc.coefficient AS user_price_usd,
  CEIL(sc.cost_usd * sc.coefficient * 100)::INTEGER AS credits_required,
  sc.valid_from AS cost_valid_from,
  sc.source,
  sc.notes
FROM service_costs sc
WHERE sc.valid_to IS NULL;

CREATE UNIQUE INDEX idx_current_service_pricing_service
  ON current_service_pricing(service_id);

REFRESH MATERIALIZED VIEW current_service_pricing;

-- ========================================
-- 5. Update helper function for per-service coefficient
-- ========================================
CREATE OR REPLACE FUNCTION get_credits_required(
  p_service_id TEXT,
  p_effective_date DATE DEFAULT CURRENT_DATE
) RETURNS INTEGER AS $$
DECLARE
  v_cost_usd DECIMAL(10, 6);
  v_coefficient DECIMAL(6, 2);
  v_credits INTEGER;
BEGIN
  -- Get cost and coefficient for service
  SELECT cost_usd, coefficient INTO v_cost_usd, v_coefficient
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

  -- Calculate credits: CEIL(cost_usd * coefficient * 100)
  v_credits := CEIL(v_cost_usd * v_coefficient * 100)::INTEGER;

  -- Minimum 1 credit
  IF v_credits < 1 THEN
    v_credits := 1;
  END IF;

  RETURN v_credits;
END;
$$ LANGUAGE plpgsql STABLE;

-- ========================================
-- 6. Update trigger to use new materialized view definition
-- ========================================
CREATE OR REPLACE FUNCTION trigger_refresh_pricing()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM refresh_pricing_cache();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- 7. Extend samples table for actual cost tracking
-- ========================================
ALTER TABLE samples ADD COLUMN IF NOT EXISTS
  actual_cost_dalle DECIMAL(10,6);
ALTER TABLE samples ADD COLUMN IF NOT EXISTS
  actual_cost_flux DECIMAL(10,6);
ALTER TABLE samples ADD COLUMN IF NOT EXISTS
  actual_cost_nano DECIMAL(10,6);
ALTER TABLE samples ADD COLUMN IF NOT EXISTS
  actual_credits_dalle INTEGER;
ALTER TABLE samples ADD COLUMN IF NOT EXISTS
  actual_credits_flux INTEGER;
ALTER TABLE samples ADD COLUMN IF NOT EXISTS
  actual_credits_nano INTEGER;

COMMENT ON COLUMN samples.actual_cost_dalle IS
  'Real cost from OpenAI API (logged for tracking)';
COMMENT ON COLUMN samples.actual_cost_flux IS
  'Real cost from Replicate API (prediction.metrics.predict_time based)';
COMMENT ON COLUMN samples.actual_cost_nano IS
  'Real cost from Google API (logged for tracking)';
