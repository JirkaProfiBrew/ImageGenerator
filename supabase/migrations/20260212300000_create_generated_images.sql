-- Table for storing saved/favorited generated images (samples + bulk)
CREATE TABLE generated_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  sample_id UUID REFERENCES samples(id) ON DELETE SET NULL,
  job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,

  -- Image metadata
  image_url TEXT NOT NULL,
  ai_service TEXT NOT NULL,
  prompt_used TEXT NOT NULL DEFAULT '',
  scene_description TEXT,

  -- Generation details
  generation_time INTEGER,
  credit_cost INTEGER NOT NULL DEFAULT 0,
  parameters JSONB DEFAULT '{}',

  -- Classification
  image_type TEXT NOT NULL DEFAULT 'sample' CHECK (image_type IN ('sample', 'bulk')),
  is_favorite BOOLEAN NOT NULL DEFAULT false,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_generated_images_project ON generated_images(project_id);
CREATE INDEX idx_generated_images_sample ON generated_images(sample_id);
CREATE INDEX idx_generated_images_type ON generated_images(image_type);

-- RLS Policies
ALTER TABLE generated_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view images of own projects"
  ON generated_images FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = generated_images.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert images to own projects"
  ON generated_images FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = generated_images.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can update own project images"
  ON generated_images FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = generated_images.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete own project images"
  ON generated_images FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = generated_images.project_id
    AND projects.user_id = auth.uid()
  ));
