-- Ensure Pages table RLS is correct
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read pages" ON pages;
DROP POLICY IF EXISTS "Allow auth full access pages" ON pages;

-- Public can only read published pages
CREATE POLICY "Allow public read pages" 
ON pages FOR SELECT 
USING (status = 'published');

-- Admins (authenticated) can do everything
CREATE POLICY "Allow auth full access pages" 
ON pages FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Ensure Navigation table RLS is correct
ALTER TABLE navigation ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read navigation" ON navigation;
DROP POLICY IF EXISTS "Allow auth full access navigation" ON navigation;

-- Public can read visible items
CREATE POLICY "Allow public read navigation" 
ON navigation FOR SELECT 
USING (is_visible = true);

-- Admins can do everything
CREATE POLICY "Allow auth full access navigation" 
ON navigation FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');
