-- Test table creation to verify Supabase connection
CREATE TABLE IF NOT EXISTS test_connection (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert a test record
INSERT INTO test_connection (name, description) 
VALUES ('Test Record', 'This is a test record to verify database connection');

-- Create an index for better performance
CREATE INDEX IF NOT EXISTS idx_test_connection_name ON test_connection(name);

-- Add a comment to the table
COMMENT ON TABLE test_connection IS 'Test table to verify Supabase database connection';
