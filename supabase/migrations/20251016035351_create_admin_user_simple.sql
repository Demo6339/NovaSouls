-- Delete existing admin user if exists
DELETE FROM admin_users WHERE email = 'admin@h2cobar.com';

-- Insert admin user with pre-hashed password
-- Password: toicomotngoisaonhoxiutrenbautroi
-- Hash: $2b$10$UzhF4.JVvfeJpqzoVRcDAevgeSjfL.mGiY3m84OmcrXr.w5CxGR9S
INSERT INTO admin_users (email, password_hash, name, role, is_active) VALUES
('admin@h2cobar.com', '$2b$10$UzhF4.JVvfeJpqzoVRcDAevgeSjfL.mGiY3m84OmcrXr.w5CxGR9S', 'H2CO Bar Admin', 'super_admin', TRUE);

-- Add comment
COMMENT ON TABLE admin_users IS 'Admin user created with pre-hashed password';
