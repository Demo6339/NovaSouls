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
  stock: number;
  status: 'active' | 'inactive';
  purchaseCount: number; // Doanh số thật từ đơn hàng
  stockStatus: 'còn hàng' | 'gần hết' | 'đã hết'; // Trạng thái tồn kho
}

// Category interface
export interface MenuCategory {
  id: string;
  name: string;
  icon: any;
  items: MenuItem[];
}

// Initial menu data
const initialMenuData: MenuCategory[] = [
  {
    id: "soju",
    name: "Soju",
    icon: null, // Will be set by the component
    items: [
        {
          id: 1,
          name: "Soju Chamisul",
          description: "Soju truyền thống Hàn Quốc, mát lạnh, hương vị tinh tế và thanh khiết",
          price: 25000,
          image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "soju",
          temperature: "lạnh",
          stock: 50,
          status: 'active',
          purchaseCount: 0,
          stockStatus: 'còn hàng'
        },
      {
        id: 2,
        name: "Soju Yuja",
        description: "Soju với hương chanh yuja thơm ngon, vị chua ngọt hài hòa",
        price: 30000,
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "soju",
        temperature: "lạnh",
        stock: 30,
        status: 'active',
        purchaseCount: 0,
        stockStatus: 'còn hàng'
      },
      {
        id: 3,
        name: "Soju Peach",
        description: "Soju hương đào ngọt ngào, hương thơm quyến rũ",
        price: 35000,
        image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "soju",
        temperature: "lạnh",
        stock: 25,
        status: 'active',
        purchaseCount: 0,
        stockStatus: 'còn hàng'
      }
    ]
  },
  {
    id: "cocktail",
    name: "Cocktail",
    icon: null,
      items: [
        {
          id: 4,
          name: "Mojito",
          description: "Rum, bạc hà, chanh tươi, soda - cocktail tươi mát và sảng khoái",
          price: 45000,
          image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "cocktail",
          temperature: "lạnh",
          stock: 40,
          status: 'active',
          purchaseCount: 0,
          stockStatus: 'còn hàng'
        },
        {
          id: 5,
          name: "Cosmopolitan",
          description: "Vodka, Cointreau, cranberry juice, chanh - cocktail sang trọng và quyến rũ",
          price: 50000,
          image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "cocktail",
          temperature: "lạnh",
          stock: 35,
          status: 'active',
          purchaseCount: 0,
          stockStatus: 'còn hàng'
        },
        {
          id: 6,
          name: "Old Fashioned",
          description: "Whiskey, đường, bitters, cam - cocktail cổ điển và tinh tế",
          price: 48000,
          image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "cocktail",
          temperature: "lạnh",
          stock: 20,
          status: 'active',
          purchaseCount: 0,
          stockStatus: 'còn hàng'
        }
      ]
  },
  {
    id: "coffee",
    name: "Coffee",
    icon: null,
      items: [
        {
          id: 7,
          name: "Espresso",
          description: "Cà phê đậm đặc, nguyên chất, hương vị mạnh mẽ và tinh tế",
          price: 20000,
          image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "coffee",
          temperature: "nóng",
          stock: 100,
          status: 'active',
          purchaseCount: 0,
          stockStatus: 'còn hàng'
        },
        {
          id: 8,
          name: "Cappuccino",
          description: "Cà phê với sữa và bọt sữa, hương vị hài hòa và thơm ngon",
          price: 25000,
          image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "coffee",
          temperature: "nóng",
          stock: 80,
          status: 'active',
          purchaseCount: 0,
          stockStatus: 'còn hàng'
        },
        {
          id: 9,
          name: "Iced Coffee",
          description: "Cà phê đá mát lạnh, tươi mát và sảng khoái",
          price: 22000,
          image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "coffee",
          temperature: "lạnh",
          stock: 60,
          status: 'active',
          purchaseCount: 0,
          stockStatus: 'còn hàng'
        }
      ]
  },
  {
    id: "juice",
    name: "Nước hoa quả",
    icon: null,
      items: [
        {
          id: 10,
          name: "Nước cam tươi",
          description: "Cam tươi vắt, mát lạnh, giàu vitamin C và tươi ngon",
          price: 18000,
          image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "juice",
          temperature: "lạnh",
          stock: 70,
          status: 'active',
          purchaseCount: 0,
          stockStatus: 'còn hàng'
        },
        {
          id: 11,
          name: "Sinh tố bơ",
          description: "Bơ tươi xay với sữa, béo ngậy và thơm ngon",
          price: 22000,
          image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "juice",
          temperature: "lạnh",
          stock: 45,
          status: 'active',
          purchaseCount: 0,
          stockStatus: 'còn hàng'
        },
        {
          id: 12,
          name: "Nước dưa hấu",
          description: "Dưa hấu tươi, mát lạnh, ngọt thanh và giải nhiệt",
          price: 16000,
          image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "juice",
          temperature: "lạnh",
          stock: 55,
          status: 'active',
          purchaseCount: 0,
          stockStatus: 'còn hàng'
        }
      ]
  },
  {
    id: "soft-drinks",
    name: "Nước ngọt",
    icon: null,
      items: [
        {
          id: 13,
          name: "Coca Cola",
          description: "Nước ngọt có gas, mát lạnh, vị ngọt đậm đà và sảng khoái",
          price: 16000,
          image: "https://images.unsplash.com/photo-1581636625402-29b2a7041f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "soft-drinks",
          temperature: "lạnh",
          stock: 120,
          status: 'active',
          purchaseCount: 0,
          stockStatus: 'còn hàng'
        },
        {
          id: 14,
          name: "Pepsi",
          description: "Nước ngọt có gas, mát lạnh, vị ngọt đặc trưng và tươi mát",
          price: 16000,
          image: "https://images.unsplash.com/photo-1581636625402-29b2a7041f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "soft-drinks",
          temperature: "lạnh",
          stock: 90,
          status: 'active',
          purchaseCount: 0,
          stockStatus: 'còn hàng'
        },
        {
          id: 15,
          name: "Sprite",
          description: "Nước ngọt chanh, mát lạnh, vị chanh tươi mát và sảng khoái",
          price: 16000,
          image: "https://images.unsplash.com/photo-1581636625402-29b2a7041f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "soft-drinks",
          temperature: "lạnh",
          stock: 75,
          status: 'active',
          purchaseCount: 0,
          stockStatus: 'còn hàng'
        }
      ]
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
      purchaseCount: item.purchaseCount || 0,
      stockStatus: item.stockStatus || 'còn hàng'
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
