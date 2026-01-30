-- Add hero_image_url column to site_settings table
-- Run this in Supabase SQL Editor

ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS hero_image_url TEXT;

-- Set default value (optional - uses Unsplash image)
UPDATE site_settings 
SET hero_image_url = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop'
WHERE hero_image_url IS NULL;
