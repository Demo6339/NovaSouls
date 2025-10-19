import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface PromoCode {
  id: number;
  code: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed' | 'gift'; // Phần trăm, số tiền cố định, hoặc tặng quà
  value: number; // Giá trị giảm giá
  giftItem?: string; // Món quà tặng kèm
  giftQuantity?: number; // Số lượng quà tặng
  minOrderAmount?: number; // Đơn hàng tối thiểu
  maxDiscountAmount?: number; // Giảm giá tối đa
  usageLimit?: number; // Giới hạn sử dụng
  usedCount: number; // Số lần đã sử dụng
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'expired';
  applicableItems: string[]; // Danh sách món áp dụng (menu item IDs)
  eventId?: number; // Liên kết với hoạt động
}

interface PromoContextType {
  promoCodes: PromoCode[];
  addPromoCode: (promo: Omit<PromoCode, 'id' | 'usedCount'>) => void;
  updatePromoCode: (id: number, updates: Partial<PromoCode>) => void;
  deletePromoCode: (id: number) => void;
  getPromoCodeById: (id: number) => PromoCode | undefined;
  getActivePromoCodes: () => PromoCode[];
  getPromoCodesByEvent: (eventId: number) => PromoCode[];
}

const PromoContext = createContext<PromoContextType | undefined>(undefined);

export const PromoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);

  const addPromoCode = (promo: Omit<PromoCode, 'id' | 'usedCount'>) => {
    const newId = Math.max(...promoCodes.map(p => p.id), 0) + 1;
    const newPromo: PromoCode = {
      ...promo,
      id: newId,
      usedCount: 0
    };
    setPromoCodes(prev => [...prev, newPromo]);
  };

  const updatePromoCode = (id: number, updates: Partial<PromoCode>) => {
    setPromoCodes(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deletePromoCode = (id: number) => {
    setPromoCodes(prev => prev.filter(p => p.id !== id));
  };

  const getPromoCodeById = (id: number) => {
    return promoCodes.find(p => p.id === id);
  };

  const getActivePromoCodes = () => {
    return promoCodes.filter(p => p.status === 'active');
  };

  const getPromoCodesByEvent = (eventId: number) => {
    return promoCodes.filter(p => p.eventId === eventId);
  };

  const value: PromoContextType = {
    promoCodes,
    addPromoCode,
    updatePromoCode,
    deletePromoCode,
    getPromoCodeById,
    getActivePromoCodes,
    getPromoCodesByEvent
  };

  return (
    <PromoContext.Provider value={value}>
      {children}
    </PromoContext.Provider>
  );
};

export const usePromoCodes = () => {
  const context = useContext(PromoContext);
  if (context === undefined) {
    throw new Error('usePromoCodes must be used within a PromoProvider');
  }
  return context;
};
