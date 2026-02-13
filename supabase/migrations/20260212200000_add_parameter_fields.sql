-- ============================================================================
-- Add AI parameter control fields to projects
-- ============================================================================

ALTER TABLE projects
ADD COLUMN IF NOT EXISTS quality_level TEXT DEFAULT 'standard' CHECK (quality_level IN ('standard', 'high', 'ultra')),
ADD COLUMN IF NOT EXISTS creativity_level TEXT DEFAULT 'medium' CHECK (creativity_level IN ('low', 'medium', 'high')),
ADD COLUMN IF NOT EXISTS consistency_seed INTEGER;

-- Index for seed lookups on locked projects
CREATE INDEX IF NOT EXISTS idx_projects_consistency_seed ON projects(consistency_seed) WHERE consistency_seed IS NOT NULL;
