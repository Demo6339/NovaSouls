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
  orderNumber: string;
  customerInfo: {
    name: string;
    phone: string;
    email?: string;
    address?: {
      street: string;
      ward: string;
      district: string;
      city: string;
      fullAddress: string;
    };
  };
  orderDetails: {
    orderTime: string;
    startTime?: string;
    completedTime?: string;
    orderType: 'delivery' | 'pickup' | 'dine-in';
    paymentMethod: 'cash' | 'card' | 'momo' | 'zalo';
    paymentStatus: 'pending' | 'paid' | 'failed';
    deliveryFee: number;
    serviceFee: number;
    discount: number;
    subtotal: number;
    totalAmount: number;
    estimatedTime?: number;
    estimatedDeliveryTime?: number;
  };
  items: OrderItem[];
  orderNotes?: string;
  status: 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  currentState?: string; // waiting, preparing, cooking, ready, delivering, payment_received
  progress?: number;
  cancelTime?: string;
  cancelReason?: string;
  cancelledBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderStats {
  totalOrders: number;
  confirmedOrders: number;
  inProgressOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  todayRevenue: number;
  averageOrderValue: number;
}

// Context interface
interface OrderContextType {
  orders: Order[];
  stats: OrderStats;
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt' | 'status'>) => string;
  updateOrderStatus: (id: string, status: Order['status'], reason?: string, cancelledBy?: string) => void;
  updateOrderState: (id: string, currentState: string, progress?: number) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  getOrderById: (id: string) => Order | undefined;
  getOrdersByStatus: (status: Order['status']) => Order[];
  restoreOrder: (id: string) => void;
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
    orderNumber: 'NS-2024-001',
    customerInfo: {
      name: 'Nguyễn Văn A',
      phone: '0123456789',
      email: 'nguyenvana@email.com',
      address: {
        street: '123 Đường ABC',
        ward: 'Phường Bến Nghé',
        district: 'Quận 1',
        city: 'TP.HCM',
        fullAddress: '123 Đường ABC, Phường Bến Nghé, Quận 1, TP.HCM'
      }
    },
    orderDetails: {
      orderTime: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      orderType: 'delivery',
      paymentMethod: 'cash',
      paymentStatus: 'pending',
      deliveryFee: 15000,
      serviceFee: 5000,
      discount: 0,
      subtotal: 130000,
      totalAmount: 150000,
      estimatedTime: 20
    },
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
    orderNotes: 'Giao hàng nhanh',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
  },
  {
    id: 'ORD-002',
    orderNumber: 'NS-2024-002',
    customerInfo: {
      name: 'Trần Thị B',
      phone: '0987654321',
      email: 'tranthib@email.com',
      address: {
        street: '456 Đường XYZ',
        ward: 'Phường 2',
        district: 'Quận 3',
        city: 'TP.HCM',
        fullAddress: '456 Đường XYZ, Phường 2, Quận 3, TP.HCM'
      }
    },
    orderDetails: {
      orderTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      startTime: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      orderType: 'pickup',
      paymentMethod: 'momo',
      paymentStatus: 'paid',
      deliveryFee: 0,
      serviceFee: 2000,
      discount: 10000,
      subtotal: 64000,
      totalAmount: 56000,
      estimatedTime: 15
    },
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
    orderNotes: 'Trân châu ít đường',
    status: 'in-progress',
    currentState: 'preparing',
    progress: 25,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  },
  {
    id: 'ORD-003',
    orderNumber: 'NS-2024-003',
    customerInfo: {
      name: 'Lê Văn C',
      phone: '0369258147',
      email: 'levanc@email.com',
      address: {
        street: '789 Đường DEF',
        ward: 'Phường 5',
        district: 'Quận 5',
        city: 'TP.HCM',
        fullAddress: '789 Đường DEF, Phường 5, Quận 5, TP.HCM'
      }
    },
    orderDetails: {
      orderTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      completedTime: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
      orderType: 'delivery',
      paymentMethod: 'cash',
      paymentStatus: 'paid',
      deliveryFee: 15000,
      serviceFee: 5000,
      discount: 0,
      subtotal: 100000,
      totalAmount: 120000,
      estimatedTime: 25,
      estimatedDeliveryTime: 15
    },
    items: [
      {
        id: 2,
        name: 'Soju Yuja',
        price: 30000,
        quantity: 3,
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      }
    ],
    orderNotes: 'Giao hàng nhanh',
    status: 'completed',
    currentState: 'payment_received',
    progress: 100,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'ORD-004',
    orderNumber: 'NS-2024-004',
    customerInfo: {
      name: 'Phạm Thị D',
      phone: '0912345678',
      email: 'phamthid@email.com',
      address: {
        street: '321 Đường GHI',
        ward: 'Phường Thủ Thiêm',
        district: 'Quận 2',
        city: 'TP.HCM',
        fullAddress: '321 Đường GHI, Phường Thủ Thiêm, Quận 2, TP.HCM'
      }
    },
    orderDetails: {
      orderTime: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      orderType: 'delivery',
      paymentMethod: 'cash',
      paymentStatus: 'pending',
      deliveryFee: 15000,
      serviceFee: 5000,
      discount: 0,
      subtotal: 32000,
      totalAmount: 52000
    },
    items: [
      {
        id: 13,
        name: 'Coca Cola',
        price: 16000,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1581636625402-29b2a7041f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      }
    ],
    orderNotes: 'Giao hàng nhanh',
    status: 'cancelled',
    cancelTime: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    cancelReason: 'Khách hàng yêu cầu hủy đơn',
    cancelledBy: 'Khách hàng',
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 40 * 60 * 1000).toISOString()
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
    const confirmedOrders = orders.filter(order => order.status === 'confirmed').length;
    const inProgressOrders = orders.filter(order => order.status === 'in-progress').length;
    const completedOrders = orders.filter(order => order.status === 'completed').length;
    const cancelledOrders = orders.filter(order => order.status === 'cancelled').length;
    
    const totalRevenue = orders
      .filter(order => order.status === 'completed' && order.currentState === 'payment_received')
      .reduce((sum, order) => sum + order.orderDetails.totalAmount, 0);
    
    const todayRevenue = orders
      .filter(order => order.status === 'completed' && order.currentState === 'payment_received' && 
        order.orderDetails.completedTime && new Date(order.orderDetails.completedTime) >= todayStart)
      .reduce((sum, order) => sum + order.orderDetails.totalAmount, 0);
    
    const averageOrderValue = completedOrders > 0 ? totalRevenue / completedOrders : 0;

    return {
      totalOrders,
      confirmedOrders,
      inProgressOrders,
      completedOrders,
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
  const addOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt' | 'status'>): string => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      orderNumber: `NS-2024-${String(orders.length + 1).padStart(3, '0')}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setOrders(prev => [newOrder, ...prev]);
    return newOrder.id;
  };

  // Update order status
  const updateOrderStatus = (id: string, status: Order['status'], reason?: string, cancelledBy?: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === id) {
        const updatedOrder = {
          ...order,
          status,
          updatedAt: new Date().toISOString()
        };
        
        // Set timestamps and additional data based on status
        if (status === 'in-progress') {
          updatedOrder.currentState = 'waiting';
          updatedOrder.progress = 0;
          updatedOrder.orderDetails.startTime = new Date().toISOString();
        } else if (status === 'completed') {
          updatedOrder.currentState = 'ready';
          updatedOrder.progress = 100;
          updatedOrder.orderDetails.completedTime = new Date().toISOString();
        } else if (status === 'cancelled') {
          updatedOrder.cancelTime = new Date().toISOString();
          if (reason) {
            updatedOrder.cancelReason = reason;
          }
          if (cancelledBy) {
            updatedOrder.cancelledBy = cancelledBy;
          }
        }
        
        return updatedOrder;
      }
      return order;
    }));
  };

  // Update order state (for in-progress and completed orders)
  const updateOrderState = (id: string, currentState: string, progress?: number) => {
    setOrders(prev => prev.map(order => {
      if (order.id === id) {
        const updatedOrder = {
          ...order,
          currentState,
          updatedAt: new Date().toISOString()
        };
        
        if (progress !== undefined) {
          updatedOrder.progress = progress;
        }
        
        // Auto-transition between statuses based on state
        if (currentState === 'ready' && order.status === 'in-progress') {
          updatedOrder.status = 'completed';
          updatedOrder.orderDetails.completedTime = new Date().toISOString();
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
        ? { ...order, ...updates, updatedAt: new Date().toISOString() }
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

  // Restore order (move from cancelled back to confirmed)
  const restoreOrder = (id: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === id) {
        return {
          ...order,
          status: 'confirmed',
          currentState: undefined,
          progress: undefined,
          cancelTime: undefined,
          cancelReason: undefined,
          cancelledBy: undefined,
          updatedAt: new Date().toISOString()
        };
      }
      return order;
    }));
  };

  // Get recent orders
  const getRecentOrders = (limit: number = 10): Order[] => {
    return orders
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  };

  // Get orders by date range
  const getOrdersByDateRange = (startDate: Date, endDate: Date): Order[] => {
    return orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startDate && orderDate <= endDate;
    });
  };

  const value: OrderContextType = {
    orders,
    stats,
    addOrder,
    updateOrderStatus,
    updateOrderState,
    updateOrder,
    getOrderById,
    getOrdersByStatus,
    restoreOrder,
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
