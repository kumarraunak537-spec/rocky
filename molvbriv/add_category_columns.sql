-- Add new columns for enhanced categorization
alter table products add column if not exists subcategory text;
alter table products add column if not exists gender text;

-- Optional: Update existing rows if needed (e.g. set default gender?)
-- update products set gender = 'Unisex' where gender is null;
