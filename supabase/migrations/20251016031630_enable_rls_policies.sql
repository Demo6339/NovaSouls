-- Enable Row Level Security (RLS) for all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for categories table
CREATE POLICY "Categories are viewable by everyone" ON categories
    FOR SELECT USING (true);

CREATE POLICY "Categories are insertable by authenticated users" ON categories
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Categories are updatable by authenticated users" ON categories
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Categories are deletable by authenticated users" ON categories
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for products table
CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT USING (true);

CREATE POLICY "Products are insertable by authenticated users" ON products
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Products are updatable by authenticated users" ON products
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Products are deletable by authenticated users" ON products
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for addons table
CREATE POLICY "Addons are viewable by everyone" ON addons
    FOR SELECT USING (true);

CREATE POLICY "Addons are insertable by authenticated users" ON addons
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Addons are updatable by authenticated users" ON addons
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Addons are deletable by authenticated users" ON addons
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for recipes table
CREATE POLICY "Recipes are viewable by everyone" ON recipes
    FOR SELECT USING (true);

CREATE POLICY "Recipes are insertable by authenticated users" ON recipes
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Recipes are updatable by authenticated users" ON recipes
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Recipes are deletable by authenticated users" ON recipes
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for recipe_ingredients table
CREATE POLICY "Recipe ingredients are viewable by everyone" ON recipe_ingredients
    FOR SELECT USING (true);

CREATE POLICY "Recipe ingredients are insertable by authenticated users" ON recipe_ingredients
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Recipe ingredients are updatable by authenticated users" ON recipe_ingredients
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Recipe ingredients are deletable by authenticated users" ON recipe_ingredients
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for inventory_items table
CREATE POLICY "Inventory items are viewable by authenticated users" ON inventory_items
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Inventory items are insertable by authenticated users" ON inventory_items
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Inventory items are updatable by authenticated users" ON inventory_items
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Inventory items are deletable by authenticated users" ON inventory_items
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for customers table
CREATE POLICY "Customers are viewable by authenticated users" ON customers
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Customers are insertable by everyone" ON customers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Customers are updatable by authenticated users" ON customers
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Customers are deletable by authenticated users" ON customers
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for orders table
CREATE POLICY "Orders are viewable by authenticated users" ON orders
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Orders are insertable by everyone" ON orders
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Orders are updatable by authenticated users" ON orders
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Orders are deletable by authenticated users" ON orders
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for order_items table
CREATE POLICY "Order items are viewable by authenticated users" ON order_items
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Order items are insertable by everyone" ON order_items
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Order items are updatable by authenticated users" ON order_items
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Order items are deletable by authenticated users" ON order_items
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for promo_codes table
CREATE POLICY "Promo codes are viewable by everyone" ON promo_codes
    FOR SELECT USING (true);

CREATE POLICY "Promo codes are insertable by authenticated users" ON promo_codes
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Promo codes are updatable by authenticated users" ON promo_codes
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Promo codes are deletable by authenticated users" ON promo_codes
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for events table
CREATE POLICY "Events are viewable by everyone" ON events
    FOR SELECT USING (true);

CREATE POLICY "Events are insertable by authenticated users" ON events
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Events are updatable by authenticated users" ON events
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Events are deletable by authenticated users" ON events
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for activity_logs table
CREATE POLICY "Activity logs are viewable by authenticated users" ON activity_logs
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Activity logs are insertable by authenticated users" ON activity_logs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Activity logs are not updatable" ON activity_logs
    FOR UPDATE USING (false);

CREATE POLICY "Activity logs are not deletable" ON activity_logs
    FOR DELETE USING (false);

-- Create policies for site_settings table
CREATE POLICY "Site settings are viewable by everyone" ON site_settings
    FOR SELECT USING (true);

CREATE POLICY "Site settings are insertable by authenticated users" ON site_settings
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Site settings are updatable by authenticated users" ON site_settings
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Site settings are deletable by authenticated users" ON site_settings
    FOR DELETE USING (auth.role() = 'authenticated');

-- Add comment
COMMENT ON POLICY "Categories are viewable by everyone" ON categories IS 'Allow public read access to categories';
COMMENT ON POLICY "Products are viewable by everyone" ON products IS 'Allow public read access to products';
COMMENT ON POLICY "Addons are viewable by everyone" ON addons IS 'Allow public read access to addons';
COMMENT ON POLICY "Recipes are viewable by everyone" ON recipes IS 'Allow public read access to recipes';
COMMENT ON POLICY "Recipe ingredients are viewable by everyone" ON recipe_ingredients IS 'Allow public read access to recipe ingredients';
COMMENT ON POLICY "Promo codes are viewable by everyone" ON promo_codes IS 'Allow public read access to promo codes';
COMMENT ON POLICY "Events are viewable by everyone" ON events IS 'Allow public read access to events';
COMMENT ON POLICY "Site settings are viewable by everyone" ON site_settings IS 'Allow public read access to site settings';
