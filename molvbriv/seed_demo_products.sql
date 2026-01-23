-- Clear existing demo data (optional)
-- DELETE FROM products; 

-- MEN'S COLLECTION
-- Jeans
INSERT INTO products (name, price, category, gender, subcategory, image, gallery, description) VALUES
('Classic Selvedge Denim', 120.00, 'Clothes', 'Men', 'Jeans', 
 'https://images.unsplash.com/photo-1542272617-08f08630329e?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1542272617-08f08630329e?q=80&w=800&auto=format&fit=crop'],
 'Premium Japanese selvedge denim with a modern tapered fit.'),
('Midnight Black Slim Fit', 95.00, 'Clothes', 'Men', 'Jeans', 
 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop'],
 'Deep black denim that retains its color wash after wash.'),
('Vintage Wash Straight Leg', 110.00, 'Clothes', 'Men', 'Jeans', 
 'https://images.unsplash.com/photo-1604176354204-9268737828c4?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1604176354204-9268737828c4?q=80&w=800&auto=format&fit=crop'],
 'Authentic vintage wash with distressed details for a lived-in look.');

-- Shirts
INSERT INTO products (name, price, category, gender, subcategory, image, gallery, description) VALUES
('Oxford Cotton Button Down', 85.00, 'Clothes', 'Men', 'Shirts', 
 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop'],
 'Crisp white oxford shirt, a wardrobe staple.'),
('Linen Summer Breeze', 90.00, 'Clothes', 'Men', 'Shirts', 
 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop'],
 'Breathable linen shirt in a soft sage green.'),
('Midnight Navbar Shirt', 105.00, 'Clothes', 'Men', 'Shirts', 
 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop'],
 'Elegant navy shirt suitable for evening wear.');

-- T-Shirts
INSERT INTO products (name, price, category, gender, subcategory, image, gallery, description) VALUES
('Essential Supima Tee', 45.00, 'Clothes', 'Men', 'T-Shirts', 
 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop'],
 'Ultra-soft Supima cotton t-shirt in classic white.'),
('Charcoal Crew Neck', 45.00, 'Clothes', 'Men', 'T-Shirts', 
 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop'],
 'Versatile charcoal grey t-shirt with a relaxed fit.');

-- Formal Pants
INSERT INTO products (name, price, category, gender, subcategory, image, gallery, description) VALUES
('Tailored Wool Trousers', 150.00, 'Clothes', 'Men', 'Formal Pants', 
 'https://images.unsplash.com/photo-1624378439575-d8aa138f48ce?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1624378439575-d8aa138f48ce?q=80&w=800&auto=format&fit=crop'],
 'Italian wool trousers tailored for a sharp silhouette.'),
('Beige Chino Trousers', 110.00, 'Clothes', 'Men', 'Formal Pants', 
 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop'],
 'Smart-casual chino trousers in a neutral beige.');

-- Jackets
INSERT INTO products (name, price, category, gender, subcategory, image, gallery, description) VALUES
('Suede Bomber Jacket', 250.00, 'Clothes', 'Men', 'Jackets', 
 'https://images.unsplash.com/photo-1551028919-ac66c5f8013a?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1551028919-ac66c5f8013a?q=80&w=800&auto=format&fit=crop'],
 'Luxurious suede bomber jacket in rich cognac.'),
('Modern Trench Coat', 295.00, 'Clothes', 'Men', 'Jackets', 
 'https://images.unsplash.com/photo-1544923746-879080204780?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1544923746-879080204780?q=80&w=800&auto=format&fit=crop'],
 'Contemporary take on the classic trench coat.');

-- Hoodies (NEW)
INSERT INTO products (name, price, category, gender, subcategory, image, gallery, description) VALUES
('Heavyweight Cotton Hoodie', 85.00, 'Clothes', 'Men', 'Hoodies', 
 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop'],
 'Premium heavyweight cotton hoodie in heather grey.'),
('Streetwear Oversized Hoodie', 95.00, 'Clothes', 'Men', 'Hoodies', 
 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?q=80&w=800&auto=format&fit=crop'],
 'Trendy oversized black hoodie.');

-- Shoes (Men)
INSERT INTO products (name, price, category, gender, subcategory, image, gallery, description) VALUES
('Leather Chelsea Boots', 180.00, 'Clothes', 'Men', 'Shoes', 
 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=800&auto=format&fit=crop'],
 'Handcrafted leather Chelsea boots.'),
('Minimalist White Sneakers', 130.00, 'Clothes', 'Men', 'Shoes', 
 'https://images.unsplash.com/photo-1560769622-5a56361405df?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1560769622-5a56361405df?q=80&w=800&auto=format&fit=crop'],
 'Clean white leather sneakers for everyday luxury.');


-- WOMEN'S COLLECTION
-- Saree
INSERT INTO products (name, price, category, gender, subcategory, image, gallery, description) VALUES
('Silk Kanjivaram Saree', 350.00, 'Clothes', 'Women', 'Saree', 
 'https://images.unsplash.com/photo-1610198092770-e6119bd7080f?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1610198092770-e6119bd7080f?q=80&w=800&auto=format&fit=crop'],
 'Exquisite Kanjivaram silk saree with gold zari work.'),
('Chiffon Floral Drape', 120.00, 'Clothes', 'Women', 'Saree', 
 'https://images.unsplash.com/photo-1583391726247-16d790757267?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1583391726247-16d790757267?q=80&w=800&auto=format&fit=crop'],
 'Lightweight chiffon saree with subtle floral prints.');

-- Kurti
INSERT INTO products (name, price, category, gender, subcategory, image, gallery, description) VALUES
('Embroidered Anarkali', 95.00, 'Clothes', 'Women', 'Kurti', 
 'https://images.unsplash.com/photo-1584286595398-a590219ec743?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1584286595398-a590219ec743?q=80&w=800&auto=format&fit=crop'],
 'Floor-length Anarkali kurti with intricate embroidery.'),
('Cotton Block Print Kurta', 65.00, 'Clothes', 'Women', 'Kurti', 
 'https://images.unsplash.com/photo-1585854460623-a55e2d1d0c48?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1585854460623-a55e2d1d0c48?q=80&w=800&auto=format&fit=crop'],
 'Comfortable cotton kurti ideal for summer.');

-- Lehenga
INSERT INTO products (name, price, category, gender, subcategory, image, gallery, description) VALUES
('Bridal Red Lehenga', 800.00, 'Clothes', 'Women', 'Lehenga', 
 'https://images.unsplash.com/photo-1594595288924-d2e96740660c?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1594595288924-d2e96740660c?q=80&w=800&auto=format&fit=crop'],
 'Magnificent red lehenga for the modern bride.'),
('Pastel Pink Lehenga', 450.00, 'Clothes', 'Women', 'Lehenga', 
 'https://images.unsplash.com/photo-1616685817458-944d67329582?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1616685817458-944d67329582?q=80&w=800&auto=format&fit=crop'],
 'Soft pastel pink lehenga with mirror work.');

-- One Piece Dress
INSERT INTO products (name, price, category, gender, subcategory, image, gallery, description) VALUES
('Evening Satin Gown', 180.00, 'Clothes', 'Women', 'One Piece Dress', 
 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop'],
 'Sleek satin gown in emerald green.'),
('Summer Floral Maxi', 110.00, 'Clothes', 'Women', 'One Piece Dress', 
 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop'],
 'Flowy floral maxi dress perfect for vacations.');

-- Suit
INSERT INTO products (name, price, category, gender, subcategory, image, gallery, description) VALUES
('Tailored Power Suit', 220.00, 'Clothes', 'Women', 'Suit', 
 'https://images.unsplash.com/photo-1552399672-152e8006bf23?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1552399672-152e8006bf23?q=80&w=800&auto=format&fit=crop'],
 'Sharp tailored suit in dove grey.'),
('Velvet Festive Suit', 160.00, 'Clothes', 'Women', 'Suit', 
 'https://images.unsplash.com/photo-1550614000-4b9519e09eb6?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1550614000-4b9519e09eb6?q=80&w=800&auto=format&fit=crop'],
 'Rich velvet suit set for festive occasions.');

-- Tops
INSERT INTO products (name, price, category, gender, subcategory, image, gallery, description) VALUES
('Silk Camisole', 55.00, 'Clothes', 'Women', 'Tops', 
 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?q=80&w=800&auto=format&fit=crop'],
 '100% silk camisole in ivory.'),
('Ruffled Blouse', 75.00, 'Clothes', 'Women', 'Tops', 
 'https://images.unsplash.com/photo-1551163943-3f6a2540c497?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1551163943-3f6a2540c497?q=80&w=800&auto=format&fit=crop'],
 'V-neck blouse with delicate ruffle details.');

-- Shoes (Women)
INSERT INTO products (name, price, category, gender, subcategory, image, gallery, description) VALUES
('Stiletto Heels', 140.00, 'Clothes', 'Women', 'Shoes', 
 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop'],
 'Classic black stilettos with a comfortable fit.'),
('Strappy Sandals', 95.00, 'Clothes', 'Women', 'Shoes', 
 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1562273138-f46be4ebdf33?q=80&w=800&auto=format&fit=crop'],
 'Gold strappy sandals for evening wear.');

-- Slippers (NEW)
INSERT INTO products (name, price, category, gender, subcategory, image, gallery, description) VALUES
('Comfy Home Slippers', 40.00, 'Clothes', 'Women', 'Slippers', 
 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=800&auto=format&fit=crop'],
 'Plush indoor slippers in rose dust color.');

-- Jutti (NEW)
INSERT INTO products (name, price, category, gender, subcategory, image, gallery, description) VALUES
('Embroidered Punjabi Jutti', 65.00, 'Clothes', 'Women', 'Jutti', 
 'https://images.unsplash.com/photo-1603565268308-3aa5035f8fc3?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1603565268308-3aa5035f8fc3?q=80&w=800&auto=format&fit=crop'],
 'Traditional handcrafted Punjabi jutti with beadwork.');


-- ACCESSORIES & JEWELRY
INSERT INTO products (name, price, category, image, gallery, description) VALUES
('Gold Pendant Necklace', 180.00, 'Jewelry', 
 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=800&auto=format&fit=crop'],
 'Minimalist gold pendant on a fine chain.'),
('Diamond Stud Earrings', 350.00, 'Jewelry', 
 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop'],
 'Classic diamond studs set in 18k white gold.'),
('Pearl Choker Necklace', 120.00, 'Jewelry', 
 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop'],
 'Elegant freshwater pearl choker suitable for evening gowns.'),
('Gold Bangle Set', 210.00, 'Jewelry', 
 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop', -- Placeholder: using clear jewelry shot
 ARRAY['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop'],
 'Set of 4 minimal gold bangles.'),
('Kundan Bridal Set', 450.00, 'Jewelry', 
 'https://images.unsplash.com/photo-1601121141461-9d660d541dd4?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1601121141461-9d660d541dd4?q=80&w=800&auto=format&fit=crop'],
 'Heavy Kundan neckpiece with matching earrings, perfect for weddings.'),
('Solitaire Engagement Ring', 500.00, 'Jewelry', 
 'https://images.unsplash.com/photo-1605100804763-ebea2403a91e?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1605100804763-ebea2403a91e?q=80&w=800&auto=format&fit=crop'],
 '1 carat solitaire diamond ring in a classic six-prong setting.'),
('Silver Oxidized Jhumka', 45.00, 'Jewelry', 
 'https://images.unsplash.com/photo-1596908181039-9f33ae977b3b?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1596908181039-9f33ae977b3b?q=80&w=800&auto=format&fit=crop'],
 'Traditional oxidized silver jhumkas with intricate detailing.'),
('Tennis Bracelet', 275.00, 'Jewelry', 
 'https://images.unsplash.com/photo-1515562141207-7a88fb0537bf?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1515562141207-7a88fb0537bf?q=80&w=800&auto=format&fit=crop'],
 'Sparkling cubic zirconia tennis bracelet in sterling silver.'),

('Leather Crossbody Bag', 210.00, 'Accessories', 
 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop'],
 'Compact leather crossbody bag in tan.'),
('Silk Scarf', 85.00, 'Accessories', 
 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa33?q=80&w=800&auto=format&fit=crop', 
 ARRAY['https://images.unsplash.com/photo-1584030373081-f37b7bb4fa33?q=80&w=800&auto=format&fit=crop'],
 'Hand-painted silk scarf with botanical print.');
