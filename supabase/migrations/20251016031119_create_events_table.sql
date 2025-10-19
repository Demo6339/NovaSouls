-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  type VARCHAR(20) NOT NULL CHECK (type IN ('promotion', 'discount', 'special', 'seasonal')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'upcoming', 'ended')),
  banner_image TEXT,
  target_audience VARCHAR(30) DEFAULT 'all' CHECK (target_audience IN ('all', 'new_customers', 'vip_customers', 'returning_customers')),
  conditions TEXT,
  benefits TEXT,
  applicable_items UUID[] DEFAULT '{}', -- Array of product IDs
  promo_code_ids UUID[] DEFAULT '{}', -- Array of promo code IDs
  priority INTEGER DEFAULT 1 CHECK (priority >= 1 AND priority <= 10),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
CREATE INDEX IF NOT EXISTS idx_events_dates ON events(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_events_priority ON events(priority);
CREATE INDEX IF NOT EXISTS idx_events_is_featured ON events(is_featured);
CREATE INDEX IF NOT EXISTS idx_events_target_audience ON events(target_audience);

-- Add comment
COMMENT ON TABLE events IS 'Marketing events and promotional campaigns';
