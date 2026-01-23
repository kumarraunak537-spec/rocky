-- =============================================
-- MOLVBRIV CMS - Database Schema
-- Phase 1: Foundation Tables
-- =============================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- Table: site_settings
-- Purpose: Core website configuration
-- =============================================
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_name TEXT DEFAULT 'MOLVBRIV',
    site_tagline TEXT DEFAULT 'Where Legacy Meets Luxury',
    logo_url TEXT,
    favicon_url TEXT,
    maintenance_mode BOOLEAN DEFAULT FALSE,
    maintenance_message TEXT DEFAULT 'We are currently undergoing maintenance. Please check back soon.',
    custom_head_scripts TEXT,
    custom_body_scripts TEXT,
    contact_email TEXT DEFAULT 'support@molvbriv.com',
    contact_phone TEXT,
    address TEXT,
    currency TEXT DEFAULT 'INR',
    currency_symbol TEXT DEFAULT '₹',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default site settings row
INSERT INTO site_settings (site_name) VALUES ('MOLVBRIV') ON CONFLICT DO NOTHING;

-- =============================================
-- Table: theme_settings
-- Purpose: Visual customization (colors, fonts)
-- =============================================
CREATE TABLE IF NOT EXISTS theme_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    preset TEXT DEFAULT 'luxury', -- luxury, minimal, dark, light
    
    -- Colors
    primary_color TEXT DEFAULT '#08301e',
    secondary_color TEXT DEFAULT '#c9a050',
    background_color TEXT DEFAULT '#ebeae5',
    text_color TEXT DEFAULT '#1a1a1a',
    accent_color TEXT DEFAULT '#08301e',
    muted_color TEXT DEFAULT '#666666',
    border_color TEXT DEFAULT '#dcdcdc',
    
    -- Typography
    font_heading TEXT DEFAULT 'Cormorant Garamond',
    font_body TEXT DEFAULT 'Montserrat',
    font_size_base TEXT DEFAULT '16px',
    font_size_heading TEXT DEFAULT '2.5rem',
    line_height TEXT DEFAULT '1.6',
    
    -- Spacing & Borders
    border_radius TEXT DEFAULT '4px',
    spacing_unit TEXT DEFAULT '8px',
    
    -- Button Styles
    button_style TEXT DEFAULT 'outlined', -- filled, outlined, minimal
    button_border_radius TEXT DEFAULT '0px',
    
    -- Header
    header_style TEXT DEFAULT 'transparent', -- transparent, solid, glassmorphism
    header_height TEXT DEFAULT '80px',
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default theme settings row
INSERT INTO theme_settings (preset) VALUES ('luxury') ON CONFLICT DO NOTHING;

-- =============================================
-- Table: pages
-- Purpose: Dynamic pages for the website
-- =============================================
CREATE TABLE IF NOT EXISTS pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    seo_title TEXT,
    seo_description TEXT,
    og_image TEXT,
    status TEXT DEFAULT 'draft', -- draft, published
    is_homepage BOOLEAN DEFAULT FALSE,
    template TEXT DEFAULT 'default', -- default, landing, blog
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default pages
INSERT INTO pages (name, slug, status, is_homepage) VALUES 
    ('Home', 'home', 'published', TRUE),
    ('Our Story', 'our-story', 'published', FALSE),
    ('Contact', 'contact', 'published', FALSE),
    ('Collections', 'collections', 'published', FALSE)
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- Table: sections
-- Purpose: Page sections (content blocks)
-- =============================================
CREATE TABLE IF NOT EXISTS sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
    section_type TEXT NOT NULL, -- hero, banner, product_grid, text_block, gallery, testimonials, video, cta
    name TEXT, -- Optional friendly name
    content JSONB DEFAULT '{}',
    settings JSONB DEFAULT '{}', -- padding, background, visibility, animation
    order_index INTEGER DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Table: navigation
-- Purpose: Header, footer, and mega menu items
-- =============================================
CREATE TABLE IF NOT EXISTS navigation (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location TEXT NOT NULL, -- header, footer, mega_menu_men, mega_menu_women
    label TEXT NOT NULL,
    url TEXT NOT NULL,
    parent_id UUID REFERENCES navigation(id) ON DELETE CASCADE,
    order_index INTEGER DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    icon TEXT, -- Optional icon name
    open_in_new_tab BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default navigation
INSERT INTO navigation (location, label, url, order_index) VALUES 
    ('header', 'Home', '/', 0),
    ('header', 'Clothes', '/collections/clothes', 1),
    ('header', 'Collections', '/collections', 2),
    ('header', 'Our Story', '/our-story', 3),
    ('header', 'Journal', '/journal', 4),
    ('header', 'Contact', '/contact', 5),
    ('footer', 'Privacy Policy', '/privacy', 0),
    ('footer', 'Terms & Conditions', '/terms', 1)
ON CONFLICT DO NOTHING;

-- =============================================
-- Table: media
-- Purpose: Uploaded images and files
-- =============================================
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename TEXT NOT NULL,
    url TEXT NOT NULL,
    alt_text TEXT,
    file_type TEXT, -- image, video, document
    file_size INTEGER, -- in bytes
    width INTEGER,
    height INTEGER,
    folder TEXT DEFAULT 'general',
    uploaded_by UUID,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Enable Row Level Security
-- =============================================
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE theme_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS Policies: Public Read
-- =============================================
CREATE POLICY "Allow public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read theme_settings" ON theme_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read pages" ON pages FOR SELECT USING (status = 'published');
CREATE POLICY "Allow public read sections" ON sections FOR SELECT USING (is_visible = true);
CREATE POLICY "Allow public read navigation" ON navigation FOR SELECT USING (is_visible = true);
CREATE POLICY "Allow public read media" ON media FOR SELECT USING (true);

-- =============================================
-- RLS Policies: Authenticated Full Access
-- =============================================
CREATE POLICY "Allow auth full access site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth full access theme_settings" ON theme_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth full access pages" ON pages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth full access sections" ON sections FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth full access navigation" ON navigation FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth full access media" ON media FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- Updated_at Trigger Function
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_theme_settings_updated_at BEFORE UPDATE ON theme_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sections_updated_at BEFORE UPDATE ON sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- Done! Run this in Supabase SQL Editor
-- =============================================
