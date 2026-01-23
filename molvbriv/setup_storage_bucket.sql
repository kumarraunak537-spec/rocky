-- ============================================
-- MOLVBRIV: Supabase Storage Bucket Setup
-- Run this in Supabase SQL Editor
-- ============================================

-- Create the storage bucket for product images
-- Note: You may need to create the bucket manually in Supabase Dashboard
-- Go to: Storage → New Bucket → Name: "product-images" → Public: Yes

-- If the bucket already exists via Dashboard, just run the policies below:

-- Allow public read access to product images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');

-- ============================================
-- MANUAL STEP REQUIRED:
-- 1. Go to Supabase Dashboard → Storage
-- 2. Click "New Bucket"
-- 3. Name: product-images
-- 4. Make it PUBLIC (toggle on)
-- 5. Click "Create Bucket"
-- 6. Then run this SQL for policies
-- ============================================
