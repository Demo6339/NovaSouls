-- Create function to authenticate admin user
CREATE OR REPLACE FUNCTION authenticate_admin(email_input TEXT, password_input TEXT)
RETURNS JSON AS $$
DECLARE
    admin_record RECORD;
    result JSON;
BEGIN
    -- Get admin user by email
    SELECT id, email, password_hash, name, role, is_active, login_attempts, locked_until
    INTO admin_record
    FROM admin_users
    WHERE email = email_input AND is_active = TRUE;
    
    -- Check if user exists
    IF NOT FOUND THEN
        RETURN json_build_object(
            'success', false,
            'message', 'Invalid credentials',
            'user', null
        );
    END IF;
    
    -- Check if account is locked
    IF admin_record.locked_until IS NOT NULL AND admin_record.locked_until > NOW() THEN
        RETURN json_build_object(
            'success', false,
            'message', 'Account is temporarily locked',
            'user', null
        );
    END IF;
    
    -- Check password (using bcrypt)
    IF NOT crypt(password_input, admin_record.password_hash) = admin_record.password_hash THEN
        -- Increment login attempts
        UPDATE admin_users 
        SET login_attempts = login_attempts + 1,
            locked_until = CASE 
                WHEN login_attempts >= 4 THEN NOW() + INTERVAL '15 minutes'
                ELSE locked_until
            END
        WHERE id = admin_record.id;
        
        RETURN json_build_object(
            'success', false,
            'message', 'Invalid credentials',
            'user', null
        );
    END IF;
    
    -- Reset login attempts on successful login
    UPDATE admin_users 
    SET login_attempts = 0,
        locked_until = NULL,
        last_login = NOW()
    WHERE id = admin_record.id;
    
    -- Return success with user data
    RETURN json_build_object(
        'success', true,
        'message', 'Login successful',
        'user', json_build_object(
            'id', admin_record.id,
            'email', admin_record.email,
            'name', admin_record.name,
            'role', admin_record.role
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get admin user by email
CREATE OR REPLACE FUNCTION get_admin_by_email(email_input TEXT)
RETURNS JSON AS $$
DECLARE
    admin_record RECORD;
BEGIN
    SELECT id, email, name, role, is_active, last_login, created_at
    INTO admin_record
    FROM admin_users
    WHERE email = email_input AND is_active = TRUE;
    
    IF NOT FOUND THEN
        RETURN NULL;
    END IF;
    
    RETURN json_build_object(
        'id', admin_record.id,
        'email', admin_record.email,
        'name', admin_record.name,
        'role', admin_record.role,
        'is_active', admin_record.is_active,
        'last_login', admin_record.last_login,
        'created_at', admin_record.created_at
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to update admin password
CREATE OR REPLACE FUNCTION update_admin_password(admin_id UUID, new_password TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE admin_users 
    SET password_hash = crypt(new_password, gen_salt('bf')),
        updated_at = NOW()
    WHERE id = admin_id AND is_active = TRUE;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to log admin activity
CREATE OR REPLACE FUNCTION log_admin_activity(action_name TEXT, details JSONB DEFAULT NULL)
RETURNS VOID AS $$
BEGIN
    INSERT INTO activity_logs (action, user_id, details, ip_address)
    VALUES (action_name, auth.uid(), details, inet_client_addr());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION authenticate_admin(TEXT, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_admin_by_email(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION update_admin_password(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION log_admin_activity(TEXT, JSONB) TO authenticated;

-- Add comments
COMMENT ON FUNCTION authenticate_admin(TEXT, TEXT) IS 'Authenticate admin user with email and password';
COMMENT ON FUNCTION get_admin_by_email(TEXT) IS 'Get admin user information by email';
COMMENT ON FUNCTION update_admin_password(UUID, TEXT) IS 'Update admin user password';
COMMENT ON FUNCTION log_admin_activity(TEXT, JSONB) IS 'Log admin user activity';
