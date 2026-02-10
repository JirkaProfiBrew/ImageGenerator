-- ============================================================================
-- ImageGen AI - Seed Data
-- ============================================================================

-- Credit packages (from PRD Section 9.1)
INSERT INTO credit_packages (name, credits, price_cents, discount_percent, is_popular, sort_order) VALUES
    ('Starter',  100,   1000,  0,  false, 1),
    ('Popular',  500,   4000,  20, true,  2),
    ('Pro',      2000,  12000, 40, false, 3),
    ('Business', 10000, 45000, 55, false, 4);
