import React, { createContext, useContext, useState, ReactNode } from 'react';

// Inventory item interface
export interface InventoryItem {
  id: number;
  name: string;
  unit: string;
  stock: number;
  minStock: number;
  status: 'active' | 'inactive';
  category: string;
}

// Context interface
interface InventoryContextType {
  inventory: InventoryItem[];
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateInventoryItem: (id: number, updates: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: number) => void;
  getInventoryItemById: (id: number) => InventoryItem | undefined;
  getActiveInventoryItems: () => InventoryItem[];
  getAvailableInventoryItems: () => InventoryItem[]; // Items with stock > 0 and active
}

// Create context
const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// Provider component
export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with sample data
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 1, name: "Cà phê đen", unit: "g", stock: 1000, minStock: 100, status: "active", category: "Nguyên liệu chính" },
    { id: 2, name: "Sữa tươi", unit: "ml", stock: 2000, minStock: 200, status: "active", category: "Nguyên liệu phụ" },
    { id: 3, name: "Đường", unit: "g", stock: 500, minStock: 50, status: "active", category: "Nguyên liệu phụ" },
    { id: 4, name: "Đá viên", unit: "viên", stock: 100, minStock: 20, status: "active", category: "Nguyên liệu phụ" },
    { id: 5, name: "Kem tươi", unit: "ml", stock: 800, minStock: 80, status: "active", category: "Nguyên liệu phụ" },
    { id: 6, name: "Vanilla", unit: "ml", stock: 200, minStock: 20, status: "active", category: "Nguyên liệu phụ" },
    { id: 7, name: "Chocolate", unit: "g", stock: 300, minStock: 30, status: "active", category: "Nguyên liệu phụ" },
    { id: 8, name: "Trà xanh", unit: "g", stock: 0, minStock: 50, status: "inactive", category: "Nguyên liệu chính" },
    { id: 9, name: "Mật ong", unit: "ml", stock: 150, minStock: 15, status: "active", category: "Nguyên liệu phụ" },
    { id: 10, name: "Lá bạc hà", unit: "lá", stock: 50, minStock: 10, status: "active", category: "Nguyên liệu phụ" }
  ]);

  // Add new inventory item
  const addInventoryItem = (item: Omit<InventoryItem, 'id'>) => {
    const newId = Math.max(...inventory.map(i => i.id), 0) + 1;
    const newItem: InventoryItem = {
      ...item,
      id: newId
    };
    setInventory([...inventory, newItem]);
  };

  // Update existing inventory item
  const updateInventoryItem = (id: number, updates: Partial<InventoryItem>) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  // Delete inventory item
  const deleteInventoryItem = (id: number) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  // Get inventory item by ID
  const getInventoryItemById = (id: number) => {
    return inventory.find(item => item.id === id);
  };

  // Get active inventory items only
  const getActiveInventoryItems = () => {
    return inventory.filter(item => item.status === 'active');
  };

  // Get available inventory items (active and with stock > 0)
  const getAvailableInventoryItems = () => {
    return inventory.filter(item => item.status === 'active' && item.stock > 0);
  };

  const value: InventoryContextType = {
    inventory,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    getInventoryItemById,
    getActiveInventoryItems,
    getAvailableInventoryItems
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

// Custom hook to use inventory context
export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
