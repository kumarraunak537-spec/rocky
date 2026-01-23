-- Re-create RLS policies for site_settings to ensure update permissions
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow auth full access site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow public read site_settings" ON site_settings;

-- Allow public read (needed for the site to load)
CREATE POLICY "Allow public read site_settings" 
ON site_settings FOR SELECT 
USING (true);

-- Allow authenticated users (admin) to do EVERYTHING (select, insert, update, delete)
CREATE POLICY "Allow auth full access site_settings" 
ON site_settings FOR ALL 
USING (auth.role() = 'authenticated') 
WITH CHECK (auth.role() = 'authenticated');
