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
  const [events, setEvents] = useState<Event[]>([]);

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
