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

// Initialize with empty array - no mock data

// Provider component
export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

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
