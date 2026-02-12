-- Phase 7.5: Projects & Samples for style consistency

-- Add new columns to existing projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS base_prompt TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS default_ratio TEXT NOT NULL DEFAULT '1:1';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS locked_sample_id UUID;

-- Create samples table
CREATE TABLE IF NOT EXISTS samples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  scene_description TEXT NOT NULL,
  generated_images JSONB NOT NULL DEFAULT '[]'::jsonb,
  selected_service TEXT,
  is_locked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_samples_project_id ON samples(project_id);
CREATE INDEX IF NOT EXISTS idx_samples_is_locked ON samples(is_locked);

-- Add foreign key for locked_sample_id
ALTER TABLE projects
  ADD CONSTRAINT fk_projects_locked_sample
  FOREIGN KEY (locked_sample_id) REFERENCES samples(id) ON DELETE SET NULL;
