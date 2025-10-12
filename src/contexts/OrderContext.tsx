import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Order interfaces
export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  notes?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  paymentMethod: 'cash' | 'card';
  notes?: string;
  discountCode?: string;
  cancelReason?: string;
  createdAt: Date;
  updatedAt: Date;
  confirmedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  estimatedTime?: number; // in minutes
}

export interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  preparingOrders: number;
  readyOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  todayRevenue: number;
  averageOrderValue: number;
}

// Context interface
interface OrderContextType {
  orders: Order[];
  stats: OrderStats;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => string;
  updateOrderStatus: (id: string, status: Order['status'], reason?: string) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  getOrderById: (id: string) => Order | undefined;
  getOrdersByStatus: (status: Order['status']) => Order[];
  deleteOrder: (id: string) => void;
  clearCompletedOrders: () => void;
  getRecentOrders: (limit?: number) => Order[];
  getOrdersByDateRange: (startDate: Date, endDate: Date) => Order[];
  calculateStats: () => OrderStats;
}

// Create context
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Nguyễn Văn A',
    customerPhone: '0123456789',
    items: [
      {
        id: 1,
        name: 'Espresso',
        price: 20000,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        notes: 'Ít đường'
      },
      {
        id: 4,
        name: 'Mojito',
        price: 45000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      }
    ],
    totalAmount: 85000,
    discountAmount: 0,
    finalAmount: 85000,
    status: 'preparing',
    paymentMethod: 'cash',
    notes: 'Giao hàng nhanh',
    createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    updatedAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    confirmedAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    estimatedTime: 20
  },
  {
    id: 'ORD-002',
    customerName: 'Trần Thị B',
    customerPhone: '0987654321',
    items: [
      {
        id: 7,
        name: 'Cappuccino',
        price: 25000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 10,
        name: 'Nước cam tươi',
        price: 18000,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      }
    ],
    totalAmount: 61000,
    discountAmount: 5000,
    finalAmount: 56000,
    status: 'ready',
    paymentMethod: 'cash',
    discountCode: 'WELCOME10',
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    updatedAt: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    confirmedAt: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
    estimatedTime: 15,
    completedAt: new Date(Date.now() - 2 * 60 * 1000)
  },
  {
    id: 'ORD-003',
    customerName: 'Lê Văn C',
    customerPhone: '0369258147',
    items: [
      {
        id: 2,
        name: 'Soju Yuja',
        price: 30000,
        quantity: 3,
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      }
    ],
    totalAmount: 90000,
    discountAmount: 0,
    finalAmount: 90000,
    status: 'delivered',
    paymentMethod: 'cash',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    updatedAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
    confirmedAt: new Date(Date.now() - 1.8 * 60 * 60 * 1000), // 1.8 hours ago
    estimatedTime: 25,
    completedAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000)
  },
  {
    id: 'ORD-004',
    customerName: 'Phạm Thị D',
    customerPhone: '0912345678',
    items: [
      {
        id: 13,
        name: 'Coca Cola',
        price: 16000,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1581636625402-29b2a7041f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      }
    ],
    totalAmount: 32000,
    discountAmount: 0,
    finalAmount: 32000,
    status: 'cancelled',
    paymentMethod: 'cash',
    cancelReason: 'Khách hàng yêu cầu hủy đơn',
    createdAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    updatedAt: new Date(Date.now() - 40 * 60 * 1000), // 40 minutes ago
    cancelledAt: new Date(Date.now() - 40 * 60 * 1000)
  }
];

// Provider component
export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  // Calculate statistics
  const calculateStats = (): OrderStats => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const confirmedOrders = orders.filter(order => order.status === 'confirmed').length;
    const preparingOrders = orders.filter(order => order.status === 'preparing').length;
    const readyOrders = orders.filter(order => order.status === 'ready').length;
    const deliveredOrders = orders.filter(order => order.status === 'delivered').length;
    const cancelledOrders = orders.filter(order => order.status === 'cancelled').length;
    
    const totalRevenue = orders
      .filter(order => order.status === 'delivered')
      .reduce((sum, order) => sum + order.finalAmount, 0);
    
    const todayRevenue = orders
      .filter(order => order.status === 'delivered' && order.completedAt && order.completedAt >= todayStart)
      .reduce((sum, order) => sum + order.finalAmount, 0);
    
    const averageOrderValue = deliveredOrders > 0 ? totalRevenue / deliveredOrders : 0;

    return {
      totalOrders,
      pendingOrders,
      confirmedOrders,
      preparingOrders,
      readyOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue,
      todayRevenue,
      averageOrderValue
    };
  };

  const [stats, setStats] = useState<OrderStats>(calculateStats());

  // Update stats when orders change
  useEffect(() => {
    setStats(calculateStats());
  }, [orders]);

  // Add new order
  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>): string => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      estimatedTime: 20 // Default estimated time
    };
    
    setOrders(prev => [newOrder, ...prev]);
    return newOrder.id;
  };

  // Update order status
  const updateOrderStatus = (id: string, status: Order['status'], reason?: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === id) {
        const updatedOrder = {
          ...order,
          status,
          updatedAt: new Date()
        };
        
        // Set timestamps based on status
        if (status === 'confirmed') {
          updatedOrder.confirmedAt = new Date();
        } else if (status === 'delivered') {
          updatedOrder.completedAt = new Date();
        } else if (status === 'cancelled') {
          updatedOrder.cancelledAt = new Date();
          if (reason) {
            updatedOrder.cancelReason = reason;
          }
        }
        
        return updatedOrder;
      }
      return order;
    }));
  };

  // Update order
  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(order => 
      order.id === id 
        ? { ...order, ...updates, updatedAt: new Date() }
        : order
    ));
  };

  // Get order by ID
  const getOrderById = (id: string): Order | undefined => {
    return orders.find(order => order.id === id);
  };

  // Get orders by status
  const getOrdersByStatus = (status: Order['status']): Order[] => {
    return orders.filter(order => order.status === status);
  };

  // Delete order
  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  // Clear completed orders
  const clearCompletedOrders = () => {
    setOrders(prev => prev.filter(order => order.status !== 'delivered'));
  };

  // Get recent orders
  const getRecentOrders = (limit: number = 10): Order[] => {
    return orders
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  };

  // Get orders by date range
  const getOrdersByDateRange = (startDate: Date, endDate: Date): Order[] => {
    return orders.filter(order => 
      order.createdAt >= startDate && order.createdAt <= endDate
    );
  };

  const value: OrderContextType = {
    orders,
    stats,
    addOrder,
    updateOrderStatus,
    updateOrder,
    getOrderById,
    getOrdersByStatus,
    deleteOrder,
    clearCompletedOrders,
    getRecentOrders,
    getOrdersByDateRange,
    calculateStats
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to use order context
export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
