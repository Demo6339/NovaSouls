-- Insert initial categories
INSERT INTO categories (name, icon, display_order, status) VALUES
('Cà phê', 'Coffee', 1, 'active'),
('Trà', 'Tea', 2, 'active'),
('Đồ ăn', 'Food', 3, 'active'),
('Tráng miệng', 'Dessert', 4, 'active'),
('Khác', 'Other', 5, 'active')
ON CONFLICT DO NOTHING;

-- Insert initial site settings
INSERT INTO site_settings (setting_key, setting_value) VALUES
('site_name', '"NovaSouls Coffee"'),
('site_description', '"Quán cà phê chất lượng cao với không gian ấm cúng"'),
('delivery_fee', '15000'),
('service_fee', '5000'),
('min_order_amount', '50000'),
('business_hours', '{"open": "07:00", "close": "22:00", "days": ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]}'),
('contact_info', '{"phone": "0123456789", "email": "info@novasouls.com", "address": "123 Đường ABC, Quận 1, TP.HCM"}'),
('payment_methods', '["cash", "card", "momo", "zalo"]'),
('order_types', '["delivery", "pickup", "dine-in"]')
ON CONFLICT (setting_key) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, description, price, category_id, temperature, status, stock_quantity) 
SELECT 
    p.name,
    p.description,
    p.price,
    c.id,
    p.temperature,
    p.status,
    p.stock_quantity
FROM (VALUES
    ('Cà phê đen', 'Cà phê đen truyền thống, đậm đà và thơm ngon', 25000, 'Cà phê', 'hot', 'active', 100),
    ('Cà phê sữa', 'Cà phê sữa đặc biệt, ngọt ngào và béo ngậy', 30000, 'Cà phê', 'hot', 'active', 100),
    ('Cappuccino', 'Cappuccino Ý chính thống với lớp foam dày', 45000, 'Cà phê', 'hot', 'active', 50),
    ('Latte', 'Latte mềm mại với hương vị nhẹ nhàng', 40000, 'Cà phê', 'hot', 'active', 50),
    ('Trà đào', 'Trà đào tươi mát, ngọt ngào', 35000, 'Trà', 'cold', 'active', 80),
    ('Trà sữa', 'Trà sữa thơm ngon, béo ngậy', 30000, 'Trà', 'cold', 'active', 80),
    ('Bánh mì pate', 'Bánh mì pate truyền thống, thơm ngon', 20000, 'Đồ ăn', 'normal', 'active', 30),
    ('Bánh ngọt', 'Bánh ngọt tươi, nhiều loại', 15000, 'Tráng miệng', 'normal', 'active', 20)
) AS p(name, description, price, category_name, temperature, status, stock_quantity)
JOIN categories c ON c.name = p.category_name
ON CONFLICT DO NOTHING;

-- Insert sample addons
INSERT INTO addons (name, price, temperature, status, recipe) VALUES
('Thêm sữa', 5000, 'normal', 'active', 'Thêm 1 shot sữa tươi'),
('Thêm đường', 2000, 'normal', 'active', 'Thêm 1 thìa đường'),
('Thêm đá', 3000, 'cold', 'active', 'Thêm đá viên'),
('Thêm kem', 8000, 'normal', 'active', 'Thêm 1 scoop kem tươi'),
('Thêm chocolate', 10000, 'normal', 'active', 'Thêm chocolate chip')
ON CONFLICT DO NOTHING;

-- Insert sample recipes
INSERT INTO recipes (name, category, status) VALUES
('Cà phê đen cơ bản', 'Cà phê', 'active'),
('Cà phê sữa đặc biệt', 'Cà phê', 'active'),
('Trà đào tươi', 'Trà', 'active'),
('Bánh mì pate truyền thống', 'Đồ ăn', 'active')
ON CONFLICT DO NOTHING;

-- Insert sample inventory items
INSERT INTO inventory_items (name, price, units, primary_unit, stock, category, origin, production_date, expiry_date, status) VALUES
('Cà phê hạt', 200000, '{"kg", "g"}', 'kg', 10.5, 'Thực phẩm', 'Việt Nam', '2024-01-01', '2025-01-01', 'active'),
('Sữa tươi', 50000, '{"l", "ml"}', 'l', 20.0, 'Thực phẩm', 'Việt Nam', '2024-01-15', '2024-02-15', 'active'),
('Đường trắng', 30000, '{"kg", "g"}', 'kg', 15.0, 'Gia vị', 'Việt Nam', '2024-01-01', '2025-01-01', 'active'),
('Bánh mì', 10000, '{"cái"}', 'cái', 50, 'Thực phẩm', 'Việt Nam', '2024-01-16', '2024-01-17', 'active'),
('Pate', 80000, '{"kg", "g"}', 'kg', 5.0, 'Thực phẩm', 'Việt Nam', '2024-01-10', '2024-02-10', 'active')
ON CONFLICT DO NOTHING;

-- Insert sample promo codes
INSERT INTO promo_codes (code, name, description, type, value, min_order_amount, usage_limit, start_date, end_date, status) VALUES
('WELCOME10', 'Chào mừng khách hàng mới', 'Giảm giá 10% cho đơn hàng đầu tiên', 'percentage', 10, 50000, 100, '2024-01-01', '2024-12-31', 'active'),
('SAVE20K', 'Tiết kiệm 20k', 'Giảm giá 20,000 VNĐ cho đơn hàng từ 100k', 'fixed', 20000, 100000, 50, '2024-01-01', '2024-12-31', 'active'),
('FREESHIP', 'Miễn phí ship', 'Miễn phí giao hàng cho đơn hàng từ 150k', 'fixed', 15000, 150000, 30, '2024-01-01', '2024-12-31', 'active')
ON CONFLICT (code) DO NOTHING;

-- Insert sample events
INSERT INTO events (name, description, type, start_date, end_date, status, target_audience, conditions, benefits, priority, is_featured) VALUES
('Khuyến mãi chào mừng năm mới', 'Chương trình khuyến mãi đặc biệt chào đón năm mới', 'seasonal', '2024-01-01', '2024-01-31', 'active', 'all', 'Áp dụng cho tất cả khách hàng', 'Giảm giá 10% cho đơn hàng đầu tiên', 8, true),
('Tháng lễ tình nhân', 'Chương trình đặc biệt dành cho các cặp đôi', 'special', '2024-02-01', '2024-02-29', 'active', 'all', 'Áp dụng cho đơn hàng từ 2 món trở lên', 'Giảm giá 20,000 VNĐ', 9, true),
('Khách hàng VIP', 'Chương trình dành riêng cho khách hàng VIP', 'promotion', '2024-03-01', '2024-03-31', 'upcoming', 'vip_customers', 'Chỉ áp dụng cho khách hàng VIP', 'Giảm giá 15% và ưu tiên giao hàng', 10, false)
ON CONFLICT DO NOTHING;

-- Add comments
COMMENT ON TABLE categories IS 'Product categories with initial data seeded';
COMMENT ON TABLE site_settings IS 'Application settings with default configuration';
COMMENT ON TABLE products IS 'Menu items with sample products';
COMMENT ON TABLE addons IS 'Add-on items with sample options';
COMMENT ON TABLE recipes IS 'Recipe definitions with sample recipes';
COMMENT ON TABLE inventory_items IS 'Inventory items with sample stock';
COMMENT ON TABLE promo_codes IS 'Promotional codes with sample offers';
COMMENT ON TABLE events IS 'Marketing events with sample campaigns';
