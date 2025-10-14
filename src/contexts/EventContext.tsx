import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Event {
  id: number;
  name: string;
  description: string;
  type: 'promotion' | 'discount' | 'special' | 'seasonal'; // Loại hoạt động
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'upcoming' | 'ended';
  bannerImage?: string; // Hình ảnh banner
  targetAudience: 'all' | 'new_customers' | 'vip_customers' | 'returning_customers';
  conditions: string; // Điều kiện tham gia
  benefits: string; // Lợi ích cho khách hàng
  applicableItems: string[]; // Danh sách món áp dụng
  promoCodeIds: number[]; // Danh sách mã giảm giá liên kết
  priority: number; // Độ ưu tiên hiển thị (1-10)
  isFeatured: boolean; // Có nổi bật không
}

interface EventContextType {
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: number, updates: Partial<Event>) => void;
  deleteEvent: (id: number) => void;
  getEventById: (id: number) => Event | undefined;
  getActiveEvents: () => Event[];
  getUpcomingEvents: () => Event[];
  getEventsByType: (type: Event['type']) => Event[];
  getFeaturedEvents: () => Event[];
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      name: "Khuyến mãi chào mừng năm mới",
      description: "Chương trình khuyến mãi đặc biệt chào đón năm mới với nhiều ưu đãi hấp dẫn",
      type: "seasonal",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      status: "active",
      targetAudience: "all",
      conditions: "Áp dụng cho tất cả khách hàng",
      benefits: "Giảm giá 10% cho đơn hàng đầu tiên, tặng kèm đồ uống miễn phí",
      applicableItems: [],
      promoCodeIds: [1],
      priority: 8,
      isFeatured: true
    },
    {
      id: 2,
      name: "Tháng lễ tình nhân",
      description: "Chương trình đặc biệt dành cho các cặp đôi trong tháng 2",
      type: "special",
      startDate: "2024-02-01",
      endDate: "2024-02-29",
      status: "active",
      targetAudience: "all",
      conditions: "Áp dụng cho đơn hàng từ 2 món trở lên",
      benefits: "Giảm giá 20,000 VNĐ, tặng kèm chocolate",
      applicableItems: [],
      promoCodeIds: [2],
      priority: 9,
      isFeatured: true
    },
    {
      id: 3,
      name: "Khách hàng VIP",
      description: "Chương trình dành riêng cho khách hàng VIP",
      type: "promotion",
      startDate: "2024-03-01",
      endDate: "2024-03-31",
      status: "upcoming",
      targetAudience: "vip_customers",
      conditions: "Chỉ áp dụng cho khách hàng VIP",
      benefits: "Giảm giá 15% và ưu tiên giao hàng",
      applicableItems: [],
      promoCodeIds: [],
      priority: 10,
      isFeatured: false
    }
  ]);

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newId = Math.max(...events.map(e => e.id), 0) + 1;
    const newEvent: Event = { ...event, id: newId };
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (id: number, updates: Partial<Event>) => {
    setEvents(prev => prev.map(e => (e.id === id ? { ...e, ...updates } : e)));
  };

  const deleteEvent = (id: number) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const getEventById = (id: number) => {
    return events.find(e => e.id === id);
  };

  const getActiveEvents = () => {
    return events.filter(e => e.status === 'active');
  };

  const getUpcomingEvents = () => {
    return events.filter(e => e.status === 'upcoming');
  };

  const getEventsByType = (type: Event['type']) => {
    return events.filter(e => e.type === type);
  };

  const getFeaturedEvents = () => {
    return events.filter(e => e.isFeatured);
  };

  const value: EventContextType = {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    getActiveEvents,
    getUpcomingEvents,
    getEventsByType,
    getFeaturedEvents
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
