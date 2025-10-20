import React, { createContext, useContext, useState, ReactNode } from 'react';

// Menu item interface
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  temperature: 'nóng' | 'lạnh';
  status: 'active' | 'inactive';
  addons: string[]; // Danh sách món thêm
  recipes: string[]; // Danh sách công thức
}

// Category interface
export interface MenuCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  items: MenuItem[];
}

// Initialize with default categories
const initialMenuData: MenuCategory[] = [
  {
    id: "main-dishes",
    name: "Món chính",
    icon: () => null,
    items: []
  },
  {
    id: "soju",
    name: "Soju",
    icon: () => null,
    items: []
  },
  {
    id: "cocktail",
    name: "Cocktail",
    icon: () => null,
    items: []
  },
  {
    id: "coffee",
    name: "Coffee",
    icon: () => null,
    items: []
  },
  {
    id: "juice",
    name: "Nước hoa quả",
    icon: () => null,
    items: []
  },
  {
    id: "soft-drinks",
    name: "Nước ngọt",
    icon: () => null,
    items: []
  }
];

// Context interface
interface MenuContextType {
  categories: MenuCategory[];
  allItems: MenuItem[];
  addItem: (item: Omit<MenuItem, 'id'>) => void;
  updateItem: (id: number, updates: Partial<MenuItem>) => void;
  deleteItem: (id: number) => void;
  getItemById: (id: number) => MenuItem | undefined;
  getItemsByCategory: (categoryId: string) => MenuItem[];
}

// Create context
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Provider component
export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<MenuCategory[]>(initialMenuData);

  // Get all items from all categories
  const allItems = categories.flatMap(cat => cat.items);

  // Add new item
  const addItem = (item: Omit<MenuItem, 'id'>) => {
    const newId = Math.max(...allItems.map(i => i.id), 0) + 1;
    const newItem: MenuItem = {
      ...item,
      id: newId,
      addons: item.addons || [],
      recipes: item.recipes || []
    };

    setCategories(prev => prev.map(cat => 
      cat.id === item.category 
        ? { ...cat, items: [...cat.items, newItem] }
        : cat
    ));
  };

  // Update existing item
  const updateItem = (id: number, updates: Partial<MenuItem>) => {
    setCategories(prev => prev.map(cat => ({
      ...cat,
      items: cat.items.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    })));
  };

  // Delete item
  const deleteItem = (id: number) => {
    setCategories(prev => prev.map(cat => ({
      ...cat,
      items: cat.items.filter(item => item.id !== id)
    })));
  };

  // Get item by ID
  const getItemById = (id: number) => {
    return allItems.find(item => item.id === id);
  };

  // Get items by category
  const getItemsByCategory = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.items : [];
  };

  const value: MenuContextType = {
    categories,
    allItems,
    addItem,
    updateItem,
    deleteItem,
    getItemById,
    getItemsByCategory
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};

// Custom hook to use menu context
export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
