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
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([
    {
      id: 1,
      code: "WELCOME10",
      name: "Chào mừng khách hàng mới",
      description: "Giảm giá 10% cho đơn hàng đầu tiên",
      type: "percentage",
      value: 10,
      minOrderAmount: 50000,
      maxDiscountAmount: 50000,
      usageLimit: 100,
      usedCount: 15,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active",
      applicableItems: [],
      eventId: 1
    },
    {
      id: 2,
      code: "SAVE20K",
      name: "Tiết kiệm 20k",
      description: "Giảm giá 20,000 VNĐ cho đơn hàng từ 100k",
      type: "fixed",
      value: 20000,
      minOrderAmount: 100000,
      usageLimit: 50,
      usedCount: 8,
      startDate: "2024-02-01",
      endDate: "2024-02-29",
      status: "active",
      applicableItems: [],
      eventId: 2
    },
    {
      id: 3,
      code: "GIFTCOKE",
      name: "Tặng kèm Coca Cola",
      description: "Tặng kèm 1 chai Coca Cola 330ml",
      type: "gift",
      value: 0,
      giftItem: "Coca Cola 330ml",
      giftQuantity: 1,
      minOrderAmount: 150000,
      usageLimit: 30,
      usedCount: 5,
      startDate: "2024-03-01",
      endDate: "2024-03-31",
      status: "active",
      applicableItems: [],
      eventId: 3
    }
  ]);

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
