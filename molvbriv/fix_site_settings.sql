-- Fix duplicate site_settings rows
-- Keep only the most recently updated row
DELETE FROM site_settings
WHERE id NOT IN (
    SELECT id
    FROM (
        SELECT id, ROW_NUMBER() OVER (ORDER BY updated_at DESC) as r_num
        FROM site_settings
    ) t
    WHERE t.r_num = 1
);

-- Ensure at least one row exists
INSERT INTO site_settings (site_name)
SELECT 'MOLVBRIV'
WHERE NOT EXISTS (SELECT 1 FROM site_settings);
