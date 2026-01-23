-- Fix duplicate theme_settings rows
-- Keep only the most recently updated row
DELETE FROM theme_settings
WHERE id NOT IN (
    SELECT id
    FROM (
        SELECT id, ROW_NUMBER() OVER (ORDER BY updated_at DESC) as r_num
        FROM theme_settings
    ) t
    WHERE t.r_num = 1
);

-- Ensure at least one row exists
INSERT INTO theme_settings (preset)
SELECT 'luxury'
WHERE NOT EXISTS (SELECT 1 FROM theme_settings);
