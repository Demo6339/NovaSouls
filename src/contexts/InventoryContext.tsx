import React, { createContext, useContext, useState, ReactNode } from 'react';

// Inventory item interface
export interface InventoryItem {
  id: number;
  name: string;
  price: number; // Giá tiền
  units: string[]; // Đơn vị (có thể chọn nhiều)
  primaryUnit: string; // Đơn vị chính (đơn vị lớn nhất)
  stock: number; // Số lượng (luôn lưu bằng đơn vị nhỏ nhất)
  category: 'Thực phẩm' | 'Gia vị'; // Danh mục
  origin: string; // Xuất xứ
  productionDate: string; // Ngày sản xuất
  expiryDate: string; // Hạn sử dụng
  status: 'active' | 'inactive';
}

// Unit conversion system
const UNIT_CONVERSIONS: { [key: string]: number } = {
  'g': 1,      // Gram (base unit)
  'kg': 1000,  // Kilogram = 1000g
  'ml': 1,     // Milliliter (base unit)
  'l': 1000    // Liter = 1000ml
};

// Context interface
interface InventoryContextType {
  inventory: InventoryItem[];
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateInventoryItem: (id: number, updates: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: number) => void;
  getInventoryItemById: (id: number) => InventoryItem | undefined;
  getActiveInventoryItems: () => InventoryItem[];
  getAvailableInventoryItems: () => InventoryItem[]; // Items with stock > 0 and active
  convertToBaseUnit: (amount: number, unit: string) => number;
  convertFromBaseUnit: (amount: number, unit: string) => number;
  getSmallestUnit: (units: string[]) => string;
  getLargestUnit: (units: string[]) => string;
}

// Create context
const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// Provider component
export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with empty array - no mock data
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

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

  // Convert amount to base unit (smallest unit)
  const convertToBaseUnit = (amount: number, unit: string) => {
    return amount * (UNIT_CONVERSIONS[unit] || 1);
  };

  // Convert amount from base unit to target unit
  const convertFromBaseUnit = (amount: number, unit: string) => {
    return amount / (UNIT_CONVERSIONS[unit] || 1);
  };

  // Get smallest unit from array of units
  const getSmallestUnit = (units: string[]) => {
    if (units.length === 0) return 'g';
    
    // Priority: g < kg, ml < l
    const unitPriority = { 'g': 1, 'ml': 1, 'kg': 2, 'l': 2 };
    return units.reduce((smallest, current) => 
      unitPriority[current] < unitPriority[smallest] ? current : smallest
    );
  };

  // Get largest unit from array of units
  const getLargestUnit = (units: string[]) => {
    if (units.length === 0) return 'kg';
    
    // Priority: kg > g, l > ml
    const unitPriority = { 'g': 1, 'ml': 1, 'kg': 2, 'l': 2 };
    return units.reduce((largest, current) => 
      unitPriority[current] > unitPriority[largest] ? current : largest
    );
  };

  const value: InventoryContextType = {
    inventory,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    getInventoryItemById,
    getActiveInventoryItems,
    getAvailableInventoryItems,
    convertToBaseUnit,
    convertFromBaseUnit,
    getSmallestUnit,
    getLargestUnit
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
