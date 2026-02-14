-- Update Nano Banana costs (correct Google pricing, Feb 2026)
-- 1K/2K: 1,120 tokens × $120/1M = $0.134 per image
-- 4K:    2,000 tokens × $120/1M = $0.24 per image

UPDATE service_costs
SET
  cost_usd = 0.134,
  coefficient = 4.0,
  notes = '1K resolution: $0.134 per image (1,120 tokens x $120/1M). Google official Feb 2026.',
  source = 'manual'
WHERE service_id = 'nano_1k' AND valid_to IS NULL;

UPDATE service_costs
SET
  cost_usd = 0.134,
  coefficient = 4.0,
  notes = '2K resolution: $0.134 per image (same as 1K). Google official Feb 2026.',
  source = 'manual'
WHERE service_id = 'nano_2k' AND valid_to IS NULL;

UPDATE service_costs
SET
  cost_usd = 0.24,
  coefficient = 4.0,
  notes = '4K resolution: $0.24 per image (2,000 tokens x $120/1M). Google official Feb 2026.',
  source = 'manual'
WHERE service_id = 'nano_4k' AND valid_to IS NULL;

-- Ensure all services have coefficient 4.0
UPDATE service_costs
SET coefficient = 4.0
WHERE valid_to IS NULL AND (coefficient IS NULL OR coefficient != 4.0);

-- Refresh materialized view
REFRESH MATERIALIZED VIEW current_service_pricing;

-- Verify: expected nano_1k=54, nano_2k=54, nano_4k=96
SELECT service_id, cost_usd, coefficient, credits_required
FROM current_service_pricing
WHERE ai_service_id = 'google_nano_banana'
ORDER BY service_id;
