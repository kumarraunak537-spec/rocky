-- Create site_content table for dynamic homepage data
CREATE TABLE IF NOT EXISTS site_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE, -- e.g., 'hero', 'seasonal', 'story'
  content JSONB NOT NULL, -- Flexible JSON structure for storing titles, subtitles, images
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed Hero Section
INSERT INTO site_content (section_key, content)
VALUES (
  'hero', 
  '{
    "title": "MOLVBRIV",
    "subtitle": "Where Legacy Meets Luxury",
    "description": "Timeless pieces crafted with passion, designed for those who appreciate the art of true elegance.",
    "image": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    "buttonText": "Explore Collections",
    "buttonLink": "/collections"
  }'
)
ON CONFLICT (section_key) DO UPDATE 
SET content = EXCLUDED.content;

-- Seed Featured Collections (Array of items)
INSERT INTO site_content (section_key, content)
VALUES (
  'featured_collections', 
  '[
    {
      "id": 1,
      "title": "Men''s Collection",
      "image": "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=2148&auto=format&fit=crop",
      "link": "/collections/Men"
    },
    {
      "id": 2,
      "title": "Women''s Collection",
      "image": "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
      "link": "/collections/Women"
    },
    {
      "id": 3,
      "title": "Jewelry",
      "image": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2000&auto=format&fit=crop",
      "link": "/collections/Jewelry"
    }
  ]'
)
ON CONFLICT (section_key) DO UPDATE 
SET content = EXCLUDED.content;

-- Seed Story Teaser
INSERT INTO site_content (section_key, content)
VALUES (
  'story_teaser', 
  '{
    "title": "A Legacy Born from Passion",
    "description": "It began in a small atelier in Paris, 1987. A singular vision to craft objects of timeless elegance.",
    "image": "https://images.unsplash.com/photo-1581375074612-d1fd0e661aeb?q=80&w=2070&auto=format&fit=crop",
    "linkText": "Read Our Story",
    "link": "/our-story"
  }'
)
ON CONFLICT (section_key) DO UPDATE 
SET content = EXCLUDED.content;

-- Seed Seasonal Highlight
INSERT INTO site_content (section_key, content)
VALUES (
  'seasonal_highlight', 
  '{
    "title": "Autumn in Provence",
    "description": "Warm ochres and heritage textures inspired by the French countryside.",
    "image": "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?q=80&w=2070&auto=format&fit=crop",
    "buttonText": "View Lookbook",
    "buttonLink": "/journal/season"
  }'
)
ON CONFLICT (section_key) DO UPDATE 
SET content = EXCLUDED.content;
