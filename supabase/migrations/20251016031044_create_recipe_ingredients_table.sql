-- Create recipe_ingredients table
CREATE TABLE IF NOT EXISTS recipe_ingredients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES inventory_items(id) ON DELETE CASCADE,
  ingredient_name VARCHAR(200) NOT NULL, -- Denormalized for performance
  amount DECIMAL(10,3) NOT NULL CHECK (amount > 0),
  unit VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_recipe_id ON recipe_ingredients(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_ingredient_id ON recipe_ingredients(ingredient_id);

-- Add unique constraint to prevent duplicate ingredients in same recipe
CREATE UNIQUE INDEX IF NOT EXISTS idx_recipe_ingredients_unique ON recipe_ingredients(recipe_id, ingredient_id);

-- Add comment
COMMENT ON TABLE recipe_ingredients IS 'Ingredients required for each recipe';
