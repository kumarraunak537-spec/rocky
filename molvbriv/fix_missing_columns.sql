-- Add ALL potentially missing columns to site_settings
-- We are using IF NOT EXISTS to be safe, so you can run this multiple times

-- Core Identity
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS site_name TEXT DEFAULT 'MOLVBRIV';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS site_tagline TEXT DEFAULT 'Where Legacy Meets Luxury';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS favicon_url TEXT;

-- Maintenance Mode
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS maintenance_mode BOOLEAN DEFAULT FALSE;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS maintenance_message TEXT DEFAULT 'We are currently undergoing maintenance. Please check back soon.';

-- Contact Info
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS contact_email TEXT;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS contact_phone TEXT;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS address TEXT;

-- Currency
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'INR';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS currency_symbol TEXT DEFAULT '₹';

-- Custom Scripts
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS custom_head_scripts TEXT;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS custom_body_scripts TEXT;

-- Verify the columns exist by selecting them (optional check, but the ALTERs are safe)
