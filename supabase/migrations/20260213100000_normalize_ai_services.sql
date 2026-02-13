-- Phase 7.8: Normalize AI Services as First-Class Entities
-- BREAKING CHANGE: renames ai_service -> ai_service_id across multiple tables

-- ========================================
-- 1. CREATE AI SERVICES MASTER TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS ai_services (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'beta', 'deprecated', 'disabled')),
  is_available BOOLEAN DEFAULT true,
  base_cost_credits INTEGER NOT NULL,
  supports_reference_images BOOLEAN DEFAULT false,
  max_reference_images INTEGER DEFAULT 0,
  supports_text_context BOOLEAN DEFAULT true,
  supports_seed BOOLEAN DEFAULT false,
  supports_custom_params BOOLEAN DEFAULT true,
  available_params JSONB,
  default_params JSONB,
  sort_order INTEGER DEFAULT 0,
  display_name TEXT,
  description TEXT,
  icon_emoji TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE ai_services IS 'Master table of all available AI image generation services';

CREATE OR REPLACE FUNCTION update_ai_services_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_ai_services_updated_at
  BEFORE UPDATE ON ai_services
  FOR EACH ROW
  EXECUTE FUNCTION update_ai_services_updated_at();

-- ========================================
-- 2. SEED AI SERVICES DATA
-- ========================================

INSERT INTO ai_services (
  id, name, provider, base_cost_credits,
  supports_reference_images, max_reference_images, supports_seed,
  sort_order, display_name, icon_emoji, description,
  available_params, default_params
) VALUES
(
  'openai_dalle3', 'DALL-E 3', 'OpenAI', 15,
  false, 0, false,
  1, 'DALL-E 3', '🎨',
  'OpenAI''s flagship image generation model with excellent prompt adherence',
  '{"quality": ["standard", "hd"], "style": ["natural", "vivid"]}'::jsonb,
  '{"quality": "standard", "style": "natural"}'::jsonb
),
(
  'replicate_flux', 'Flux Pro 1.1', 'Replicate', 10,
  false, 0, true,
  2, 'Flux Pro', '⚡',
  'High-quality open-source model with fast generation and consistency seeds',
  '{"guidance": [2.0, 5.0], "num_inference_steps": [1, 50], "interval": [1.0, 4.0], "prompt_upsampling": "boolean", "safety_tolerance": [1, 6]}'::jsonb,
  '{"guidance": 3.5, "num_inference_steps": 25, "interval": 2.0, "prompt_upsampling": false, "safety_tolerance": 2}'::jsonb
),
(
  'google_nano_banana', 'Nano Banana Pro', 'Google', 6,
  true, 14, false,
  3, 'Nano Banana', '🍌',
  'Google''s Gemini-powered generator with reference image support and search grounding',
  '{"temperature": [0.0, 2.0], "topP": [0.0, 1.0], "topK": "integer", "enable_search": "boolean", "imageSize": ["1K", "2K", "4K"], "thinkingLevel": ["minimal", "low", "medium", "high"]}'::jsonb,
  '{"temperature": 1.0, "topP": 0.95, "topK": 40, "enable_search": false, "imageSize": "1K", "thinkingLevel": "medium"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- ========================================
-- 3. MIGRATE PROJECTS TABLE
-- ========================================

ALTER TABLE projects RENAME COLUMN ai_service TO ai_service_id;
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_ai_service_check;
ALTER TABLE projects
  ADD CONSTRAINT fk_projects_ai_service
  FOREIGN KEY (ai_service_id) REFERENCES ai_services(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_projects_ai_service ON projects(ai_service_id);

-- ========================================
-- 4. MIGRATE PROJECT_SERVICE_CONFIGS TABLE
-- ========================================

ALTER TABLE project_service_configs RENAME COLUMN ai_service TO ai_service_id;
ALTER TABLE project_service_configs
  DROP CONSTRAINT IF EXISTS project_service_configs_ai_service_check;

-- Drop and recreate the unique constraint with new column name
ALTER TABLE project_service_configs
  DROP CONSTRAINT IF EXISTS project_service_configs_project_id_ai_service_key;
ALTER TABLE project_service_configs
  ADD CONSTRAINT project_service_configs_project_id_ai_service_id_key
  UNIQUE(project_id, ai_service_id);

ALTER TABLE project_service_configs
  ADD CONSTRAINT fk_project_service_configs_ai_service
  FOREIGN KEY (ai_service_id) REFERENCES ai_services(id) ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_project_service_configs_ai_service
  ON project_service_configs(ai_service_id);

-- ========================================
-- 5. MIGRATE GENERATED_IMAGES TABLE
-- ========================================

ALTER TABLE generated_images RENAME COLUMN ai_service TO ai_service_id;
ALTER TABLE generated_images
  ADD CONSTRAINT fk_generated_images_ai_service
  FOREIGN KEY (ai_service_id) REFERENCES ai_services(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_generated_images_ai_service
  ON generated_images(ai_service_id);

-- ========================================
-- 6. MIGRATE SAMPLES TABLE
-- ========================================

ALTER TABLE samples RENAME COLUMN selected_service TO locked_ai_service_id;
ALTER TABLE samples
  ADD CONSTRAINT fk_samples_ai_service
  FOREIGN KEY (locked_ai_service_id) REFERENCES ai_services(id) ON DELETE SET NULL;

-- ========================================
-- 7. CREATE USER SERVICE PREFERENCES
-- ========================================

CREATE TABLE IF NOT EXISTS user_service_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  ai_service_id TEXT NOT NULL REFERENCES ai_services(id) ON DELETE CASCADE,
  is_enabled BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, ai_service_id)
);

COMMENT ON TABLE user_service_preferences IS 'User-specific AI service preferences and ordering';

CREATE INDEX IF NOT EXISTS idx_user_service_preferences_user
  ON user_service_preferences(user_id);

ALTER TABLE user_service_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own service preferences"
  ON user_service_preferences
  FOR ALL
  USING (user_id = auth.uid());

-- Seed preferences for existing users
INSERT INTO user_service_preferences (user_id, ai_service_id, is_enabled, sort_order)
SELECT u.id, s.id, true, s.sort_order
FROM users u
CROSS JOIN ai_services s
WHERE s.status = 'active' AND s.is_available = true
ON CONFLICT (user_id, ai_service_id) DO NOTHING;
