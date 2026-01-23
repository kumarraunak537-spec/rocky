-- Create Articles table for the Journal / Content Manager
CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT DEFAULT 'Uncategorized',
    excerpt TEXT,
    content TEXT, -- HTML content
    image TEXT, -- Cover image URL
    author TEXT,
    status TEXT DEFAULT 'draft', -- draft, published
    published_at DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read published articles" 
ON articles FOR SELECT 
USING (status = 'published');

CREATE POLICY "Allow auth full access articles" 
ON articles FOR ALL 
USING (auth.role() = 'authenticated');

-- Trigger for updated_at
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
