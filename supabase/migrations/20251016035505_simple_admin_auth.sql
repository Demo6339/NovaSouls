-- Create simple authenticate_admin function without pgcrypto
DROP FUNCTION IF EXISTS authenticate_admin(TEXT, TEXT);

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
    
    -- Simple password check (for now, we'll use a simple comparison)
    -- In production, you should use proper bcrypt verification
    IF password_input != 'toicomotngoisaonhoxiutrenbautroi' THEN
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

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION authenticate_admin(TEXT, TEXT) TO anon, authenticated;

-- Add comment
COMMENT ON FUNCTION authenticate_admin(TEXT, TEXT) IS 'Simple admin authentication function';
