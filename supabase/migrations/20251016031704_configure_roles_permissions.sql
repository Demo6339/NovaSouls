-- Create custom roles for different user types
DO $$
BEGIN
    -- Create admin role if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'admin_role') THEN
        CREATE ROLE admin_role;
    END IF;
    
    -- Create staff role if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'staff_role') THEN
        CREATE ROLE staff_role;
    END IF;
    
    -- Create customer role if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'customer_role') THEN
        CREATE ROLE customer_role;
    END IF;
END
$$;

-- Grant permissions to admin_role (full access)
GRANT ALL ON ALL TABLES IN SCHEMA public TO admin_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO admin_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO admin_role;

-- Grant permissions to staff_role (limited access)
GRANT SELECT, INSERT, UPDATE ON categories, products, addons, recipes, recipe_ingredients, inventory_items, customers, orders, order_items, promo_codes, events, site_settings TO staff_role;
GRANT SELECT ON activity_logs TO staff_role;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO staff_role;

-- Grant permissions to customer_role (read-only for public data, insert for orders)
GRANT SELECT ON categories, products, addons, recipes, promo_codes, events, site_settings TO customer_role;
GRANT INSERT ON customers, orders, order_items TO customer_role;
GRANT SELECT ON orders, order_items TO customer_role;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'role' = 'admin_role';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user is staff
CREATE OR REPLACE FUNCTION is_staff()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN auth.jwt() ->> 'role' = 'staff' OR auth.jwt() ->> 'role' = 'staff_role' OR is_admin();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user is customer
CREATE OR REPLACE FUNCTION is_customer()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN auth.jwt() ->> 'role' = 'customer' OR auth.jwt() ->> 'role' = 'customer_role' OR is_staff();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update policies to use role-based access
DROP POLICY IF EXISTS "Categories are insertable by authenticated users" ON categories;
DROP POLICY IF EXISTS "Categories are updatable by authenticated users" ON categories;
DROP POLICY IF EXISTS "Categories are deletable by authenticated users" ON categories;

CREATE POLICY "Categories are insertable by staff" ON categories
    FOR INSERT WITH CHECK (is_staff());

CREATE POLICY "Categories are updatable by staff" ON categories
    FOR UPDATE USING (is_staff());

CREATE POLICY "Categories are deletable by staff" ON categories
    FOR DELETE USING (is_staff());

-- Update products policies
DROP POLICY IF EXISTS "Products are insertable by authenticated users" ON products;
DROP POLICY IF EXISTS "Products are updatable by authenticated users" ON products;
DROP POLICY IF EXISTS "Products are deletable by authenticated users" ON products;

CREATE POLICY "Products are insertable by staff" ON products
    FOR INSERT WITH CHECK (is_staff());

CREATE POLICY "Products are updatable by staff" ON products
    FOR UPDATE USING (is_staff());

CREATE POLICY "Products are deletable by staff" ON products
    FOR DELETE USING (is_staff());

-- Update orders policies for customer access
DROP POLICY IF EXISTS "Orders are viewable by authenticated users" ON orders;
DROP POLICY IF EXISTS "Orders are insertable by everyone" ON orders;
DROP POLICY IF EXISTS "Orders are updatable by authenticated users" ON orders;

CREATE POLICY "Orders are viewable by staff and customers" ON orders
    FOR SELECT USING (is_customer());

CREATE POLICY "Orders are insertable by customers" ON orders
    FOR INSERT WITH CHECK (is_customer());

CREATE POLICY "Orders are updatable by staff" ON orders
    FOR UPDATE USING (is_staff());

-- Update order_items policies
DROP POLICY IF EXISTS "Order items are viewable by authenticated users" ON order_items;
DROP POLICY IF EXISTS "Order items are insertable by everyone" ON order_items;
DROP POLICY IF EXISTS "Order items are updatable by authenticated users" ON order_items;

CREATE POLICY "Order items are viewable by staff and customers" ON order_items
    FOR SELECT USING (is_customer());

CREATE POLICY "Order items are insertable by customers" ON order_items
    FOR INSERT WITH CHECK (is_customer());

CREATE POLICY "Order items are updatable by staff" ON order_items
    FOR UPDATE USING (is_staff());

-- Update customers policies
DROP POLICY IF EXISTS "Customers are viewable by authenticated users" ON customers;
DROP POLICY IF EXISTS "Customers are insertable by everyone" ON customers;
DROP POLICY IF EXISTS "Customers are updatable by authenticated users" ON customers;

CREATE POLICY "Customers are viewable by staff and customers" ON customers
    FOR SELECT USING (is_customer());

CREATE POLICY "Customers are insertable by customers" ON customers
    FOR INSERT WITH CHECK (is_customer());

CREATE POLICY "Customers are updatable by staff" ON customers
    FOR UPDATE USING (is_staff());

-- Update inventory_items policies (staff only)
DROP POLICY IF EXISTS "Inventory items are viewable by authenticated users" ON inventory_items;
DROP POLICY IF EXISTS "Inventory items are insertable by authenticated users" ON inventory_items;
DROP POLICY IF EXISTS "Inventory items are updatable by authenticated users" ON inventory_items;
DROP POLICY IF EXISTS "Inventory items are deletable by authenticated users" ON inventory_items;

CREATE POLICY "Inventory items are viewable by staff" ON inventory_items
    FOR SELECT USING (is_staff());

CREATE POLICY "Inventory items are insertable by staff" ON inventory_items
    FOR INSERT WITH CHECK (is_staff());

CREATE POLICY "Inventory items are updatable by staff" ON inventory_items
    FOR UPDATE USING (is_staff());

CREATE POLICY "Inventory items are deletable by staff" ON inventory_items
    FOR DELETE USING (is_staff());

-- Update activity_logs policies (admin only)
DROP POLICY IF EXISTS "Activity logs are viewable by authenticated users" ON activity_logs;
DROP POLICY IF EXISTS "Activity logs are insertable by authenticated users" ON activity_logs;

CREATE POLICY "Activity logs are viewable by staff" ON activity_logs
    FOR SELECT USING (is_staff());

CREATE POLICY "Activity logs are insertable by staff" ON activity_logs
    FOR INSERT WITH CHECK (is_staff());

-- Add comments
COMMENT ON FUNCTION is_admin() IS 'Check if current user has admin role';
COMMENT ON FUNCTION is_staff() IS 'Check if current user has staff role or higher';
COMMENT ON FUNCTION is_customer() IS 'Check if current user has customer role or higher';
