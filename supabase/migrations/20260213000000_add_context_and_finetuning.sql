-- Phase 7.7.1: Add context_config to projects and create project_service_configs table

-- Add context_config to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS context_config JSONB DEFAULT '{}'::jsonb;

COMMENT ON COLUMN projects.context_config IS 'Stores reference images and text documents for project context';

-- Example structure:
-- {
--   "reference_images": [
--     { "id": "uuid", "url": "https://...", "filename": "ref1.jpg", "uploaded_at": "2026-02-13T10:00:00Z" }
--   ],
--   "text_documents": [
--     { "id": "uuid", "url": "https://...", "filename": "guidelines.pdf", "uploaded_at": "2026-02-13T10:00:00Z" }
--   ]
-- }

-- Create project_service_configs table for fine-tuning
CREATE TABLE IF NOT EXISTS project_service_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  ai_service TEXT NOT NULL CHECK (ai_service IN ('openai_dalle3', 'replicate_flux', 'google_nano_banana')),

  -- Parameter source
  use_basic_params BOOLEAN DEFAULT true,
  -- true = use project's quality_level/creativity_level (mapped to service params)
  -- false = use custom_params below

  -- Service-specific advanced parameters
  custom_params JSONB,
  -- Flux: { guidance, num_inference_steps, interval, prompt_upsampling, safety_tolerance }
  -- Nano Banana: { temperature, topP, topK, enable_search }
  -- DALL-E: { quality, style }

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- One config per service per project
  UNIQUE(project_id, ai_service)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_project_service_configs_project ON project_service_configs(project_id);

-- RLS Policies
ALTER TABLE project_service_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view configs of own projects"
  ON project_service_configs FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = project_service_configs.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert configs to own projects"
  ON project_service_configs FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = project_service_configs.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can update configs of own projects"
  ON project_service_configs FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = project_service_configs.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete configs of own projects"
  ON project_service_configs FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = project_service_configs.project_id
    AND projects.user_id = auth.uid()
  ));

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_project_service_configs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_project_service_configs_updated_at
  BEFORE UPDATE ON project_service_configs
  FOR EACH ROW
  EXECUTE FUNCTION update_project_service_configs_updated_at();
