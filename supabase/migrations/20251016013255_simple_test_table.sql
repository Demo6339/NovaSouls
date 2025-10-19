-- Simple test table to verify database connection
CREATE TABLE IF NOT EXISTS simple_test (
  id SERIAL PRIMARY KEY,
  message TEXT NOT NULL DEFAULT 'Hello from CLI',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert test data
INSERT INTO simple_test (message) VALUES ('Migration test successful!');
