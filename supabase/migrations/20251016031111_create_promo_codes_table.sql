-- Create promo_codes table
CREATE TABLE IF NOT EXISTS promo_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  type VARCHAR(20) NOT NULL CHECK (type IN ('percentage', 'fixed', 'gift')),
  value DECIMAL(10,2) NOT NULL CHECK (value >= 0),
  gift_item VARCHAR(200),
  gift_quantity INTEGER DEFAULT 0 CHECK (gift_quantity >= 0),
  min_order_amount DECIMAL(10,2) DEFAULT 0 CHECK (min_order_amount >= 0),
  max_discount_amount DECIMAL(10,2) CHECK (max_discount_amount >= 0),
  usage_limit INTEGER CHECK (usage_limit > 0),
  used_count INTEGER DEFAULT 0 CHECK (used_count >= 0),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
  applicable_items UUID[] DEFAULT '{}', -- Array of product IDs
  event_id UUID, -- Will reference events table later
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON promo_codes(code);
CREATE INDEX IF NOT EXISTS idx_promo_codes_status ON promo_codes(status);
CREATE INDEX IF NOT EXISTS idx_promo_codes_type ON promo_codes(type);
CREATE INDEX IF NOT EXISTS idx_promo_codes_dates ON promo_codes(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_promo_codes_event_id ON promo_codes(event_id);

-- Add comment
COMMENT ON TABLE promo_codes IS 'Promotional codes and discount management';
