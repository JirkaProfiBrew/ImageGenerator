-- Add new fields to projects table for editable header
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS style TEXT DEFAULT 'realistic',
ADD COLUMN IF NOT EXISTS background TEXT DEFAULT 'white';
