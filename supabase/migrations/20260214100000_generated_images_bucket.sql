-- Create storage bucket for persisted generated images
-- Images are downloaded from temporary AI service URLs and stored permanently here

INSERT INTO storage.buckets (id, name, public)
VALUES ('generated-images', 'generated-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow uploads to generated-images (no auth yet - using service role)
CREATE POLICY "Allow public uploads to generated-images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'generated-images');

CREATE POLICY "Allow public read from generated-images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'generated-images');

CREATE POLICY "Allow public delete from generated-images"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'generated-images');
