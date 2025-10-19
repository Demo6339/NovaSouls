-- Create addons table
CREATE TABLE IF NOT EXISTS addons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  temperature VARCHAR(10) DEFAULT 'normal' CHECK (temperature IN ('hot', 'cold', 'normal')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  recipe TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_addons_status ON addons(status);
CREATE INDEX IF NOT EXISTS idx_addons_temperature ON addons(temperature);
CREATE INDEX IF NOT EXISTS idx_addons_price ON addons(price);

-- Add comment
COMMENT ON TABLE addons IS 'Add-on items for products';
