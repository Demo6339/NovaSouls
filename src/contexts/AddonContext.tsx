import React, { createContext, useContext, useState, ReactNode } from 'react';

// Addon interface
export interface Addon {
  id: number;
  name: string;
  price: number;
  temperature: 'nóng' | 'lạnh' | 'bình thường';
  status: 'active' | 'inactive';
  recipe: string;
}

// Context interface
interface AddonContextType {
  addons: Addon[];
  addAddon: (addon: Omit<Addon, 'id'>) => void;
  updateAddon: (id: number, updates: Partial<Addon>) => void;
  deleteAddon: (id: number) => void;
  getAddonById: (id: number) => Addon | undefined;
  getActiveAddons: () => Addon[];
}

// Create context
const AddonContext = createContext<AddonContextType | undefined>(undefined);

// Provider component
export const AddonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [addons, setAddons] = useState<Addon[]>([]);

  // Add new addon
  const addAddon = (addon: Omit<Addon, 'id'>) => {
    const newId = Math.max(...addons.map(a => a.id), 0) + 1;
    const newAddon: Addon = {
      ...addon,
      id: newId
    };
    setAddons([...addons, newAddon]);
  };

  // Update existing addon
  const updateAddon = (id: number, updates: Partial<Addon>) => {
    setAddons(prev => prev.map(addon => 
      addon.id === id ? { ...addon, ...updates } : addon
    ));
  };

  // Delete addon
  const deleteAddon = (id: number) => {
    setAddons(prev => prev.filter(addon => addon.id !== id));
  };

  // Get addon by ID
  const getAddonById = (id: number) => {
    return addons.find(addon => addon.id === id);
  };

  // Get active addons only
  const getActiveAddons = () => {
    return addons.filter(addon => addon.status === 'active');
  };

  const value: AddonContextType = {
    addons,
    addAddon,
    updateAddon,
    deleteAddon,
    getAddonById,
    getActiveAddons
  };

  return (
    <AddonContext.Provider value={value}>
      {children}
    </AddonContext.Provider>
  );
};

// Custom hook to use addon context
export const useAddons = () => {
  const context = useContext(AddonContext);
  if (context === undefined) {
    throw new Error('useAddons must be used within an AddonProvider');
  }
  return context;
};
