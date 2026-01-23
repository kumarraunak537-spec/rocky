-- ============================================
-- MOLVBRIV: Products Table Schema & RLS Policies
-- Run this ENTIRE script in Supabase SQL Editor
-- ============================================

-- 1. ENSURE UUID EXTENSION EXISTS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CREATE/RECREATE PRODUCTS TABLE WITH ALL REQUIRED COLUMNS
-- Drop if exists to ensure clean slate (CAUTION: removes existing data)
-- Comment out the DROP line if you want to keep existing data
-- DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL DEFAULT 'Clothes',
  gender TEXT,
  subcategory TEXT,
  description TEXT,
  color TEXT,
  image TEXT,
  gallery TEXT[] DEFAULT '{}',
  details TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ADD COLUMNS IF THEY DON'T EXIST (for existing tables)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'gender') THEN
        ALTER TABLE products ADD COLUMN gender TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'subcategory') THEN
        ALTER TABLE products ADD COLUMN subcategory TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'gallery') THEN
        ALTER TABLE products ADD COLUMN gallery TEXT[] DEFAULT '{}';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'details') THEN
        ALTER TABLE products ADD COLUMN details TEXT[] DEFAULT '{}';
    END IF;
END $$;

-- 4. ENABLE ROW LEVEL SECURITY
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 5. DROP EXISTING POLICIES (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public read access" ON products;
DROP POLICY IF EXISTS "Allow authenticated insert" ON products;
DROP POLICY IF EXISTS "Allow authenticated update" ON products;
DROP POLICY IF EXISTS "Allow authenticated delete" ON products;
DROP POLICY IF EXISTS "Enable read access for all users" ON products;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON products;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON products;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON products;

-- 6. CREATE NEW RLS POLICIES

-- PUBLIC: Anyone can VIEW products (for the website)
CREATE POLICY "Enable read access for all users" 
ON products FOR SELECT 
USING (true);

-- AUTHENTICATED: Logged-in users can INSERT products
CREATE POLICY "Enable insert for authenticated users only" 
ON products FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- AUTHENTICATED: Logged-in users can UPDATE products
CREATE POLICY "Enable update for authenticated users only" 
ON products FOR UPDATE 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- AUTHENTICATED: Logged-in users can DELETE products
CREATE POLICY "Enable delete for authenticated users only" 
ON products FOR DELETE 
TO authenticated 
USING (true);

-- 7. GRANT NECESSARY PERMISSIONS
GRANT SELECT ON products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON products TO authenticated;

-- 8. VERIFY TABLE STRUCTURE
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'products'
ORDER BY ordinal_position;

-- 9. VERIFY RLS POLICIES
SELECT * FROM pg_policies WHERE tablename = 'products';

-- ============================================
-- DONE! Now test adding a product from Admin Panel
-- ============================================
 