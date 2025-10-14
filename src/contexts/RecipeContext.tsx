import React, { createContext, useContext, useState, ReactNode } from 'react';

// Recipe ingredient interface
export interface RecipeIngredient {
  id: string;
  ingredientId: string;
  ingredientName: string;
  amount: number;
  unit: string;
}

// Recipe interface
export interface Recipe {
  id: number;
  name: string;
  category: string;
  status: 'active' | 'inactive';
  ingredients: RecipeIngredient[];
}

// Context interface
interface RecipeContextType {
  recipes: Recipe[];
  addRecipe: (recipe: Omit<Recipe, 'id'>) => void;
  updateRecipe: (id: number, updates: Partial<Recipe>) => void;
  deleteRecipe: (id: number) => void;
  getRecipeById: (id: number) => Recipe | undefined;
  getActiveRecipes: () => Recipe[];
}

// Create context
const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

// Provider component
export const RecipeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Add new recipe
  const addRecipe = (recipe: Omit<Recipe, 'id'>) => {
    const newId = Math.max(...recipes.map(r => r.id), 0) + 1;
    const newRecipe: Recipe = {
      ...recipe,
      id: newId
    };
    setRecipes([...recipes, newRecipe]);
  };

  // Update existing recipe
  const updateRecipe = (id: number, updates: Partial<Recipe>) => {
    setRecipes(prev => prev.map(recipe => 
      recipe.id === id ? { ...recipe, ...updates } : recipe
    ));
  };

  // Delete recipe
  const deleteRecipe = (id: number) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== id));
  };

  // Get recipe by ID
  const getRecipeById = (id: number) => {
    return recipes.find(recipe => recipe.id === id);
  };

  // Get active recipes only
  const getActiveRecipes = () => {
    return recipes.filter(recipe => recipe.status === 'active');
  };

  const value: RecipeContextType = {
    recipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipeById,
    getActiveRecipes
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};

// Custom hook to use recipe context
export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};
