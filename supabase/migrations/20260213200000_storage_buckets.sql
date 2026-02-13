-- Phase 7.8.1: Create Storage Buckets for Project Context Files

-- Create buckets
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('reference-images', 'reference-images', true),
  ('text-documents', 'text-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Allow all uploads to reference-images (no auth yet - using service role)
CREATE POLICY "Allow public uploads to reference-images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'reference-images');

CREATE POLICY "Allow public read from reference-images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'reference-images');

CREATE POLICY "Allow public delete from reference-images"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'reference-images');

-- Allow all uploads to text-documents (no auth yet - using service role)
CREATE POLICY "Allow public uploads to text-documents"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'text-documents');

CREATE POLICY "Allow public read from text-documents"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'text-documents');

CREATE POLICY "Allow public delete from text-documents"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'text-documents');
