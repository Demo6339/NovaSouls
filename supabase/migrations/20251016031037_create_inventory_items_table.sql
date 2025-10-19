-- Create inventory_items table
CREATE TABLE IF NOT EXISTS inventory_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  units TEXT[] DEFAULT '{}', -- Array of available units
  primary_unit VARCHAR(20) NOT NULL,
  stock DECIMAL(10,3) DEFAULT 0 CHECK (stock >= 0), -- Stock in base unit
  category VARCHAR(50) DEFAULT 'Thực phẩm' CHECK (category IN ('Thực phẩm', 'Gia vị')),
  origin VARCHAR(200),
  production_date DATE,
  expiry_date DATE,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_inventory_items_status ON inventory_items(status);
CREATE INDEX IF NOT EXISTS idx_inventory_items_category ON inventory_items(category);
CREATE INDEX IF NOT EXISTS idx_inventory_items_stock ON inventory_items(stock);
CREATE INDEX IF NOT EXISTS idx_inventory_items_expiry_date ON inventory_items(expiry_date);

-- Add comment
COMMENT ON TABLE inventory_items IS 'Inventory management for ingredients and supplies';
