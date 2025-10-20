import { useCallback, useEffect, useState } from 'react';
import { useOrders } from '@/contexts/OrderContext';

interface DashboardStats {
  revenue: {
    total: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
    previousMonth: number;
    growth: {
      daily: number;
      weekly: number;
      monthly: number;
    };
  };
  orders: {
    total: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
    previousMonth: number;
    successRate: number;
    growth: {
      daily: number;
      weekly: number;
      monthly: number;
    };
  };
  customers: {
    total: number;
    new: number;
    returning: number;
    returningRate: number;
  };
}

export const useDashboardStats = () => {
  const { orders } = useOrders();
  const [stats, setStats] = useState<DashboardStats>({
    revenue: {
      total: 0,
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
      previousMonth: 0,
      growth: {
        daily: 0,
        weekly: 0,
        monthly: 0
      }
    },
    orders: {
      total: 0,
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
      previousMonth: 0,
      successRate: 0,
      growth: {
        daily: 0,
        weekly: 0,
        monthly: 0
      }
    },
    customers: {
      total: 0,
      new: 0,
      returning: 0,
      returningRate: 0
    }
  });

  const calculateStats = useCallback(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(today.getDate() - today.getDay());
    const lastWeekStart = new Date(thisWeekStart);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);
    
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    // Revenue calculations
    const totalRevenue = orders.reduce((sum, order) => 
      order.status === 'completed' ? sum + order.orderDetails.totalAmount : sum, 0);
    
    const todayRevenue = orders.reduce((sum, order) => {
      const orderDate = new Date(order.orderDetails.orderTime);
      return order.status === 'completed' && orderDate >= today ? sum + order.orderDetails.totalAmount : sum;
    }, 0);

    const yesterdayRevenue = orders.reduce((sum, order) => {
      const orderDate = new Date(order.orderDetails.orderTime);
      return order.status === 'completed' && 
        orderDate >= yesterday && orderDate < today ? sum + order.orderDetails.totalAmount : sum;
    }, 0);

    const thisWeekRevenue = orders.reduce((sum, order) => {
      const orderDate = new Date(order.orderDetails.orderTime);
      return order.status === 'completed' && 
        orderDate >= thisWeekStart ? sum + order.orderDetails.totalAmount : sum;
    }, 0);

    const lastWeekRevenue = orders.reduce((sum, order) => {
      const orderDate = new Date(order.orderDetails.orderTime);
      return order.status === 'completed' && 
        orderDate >= lastWeekStart && orderDate < thisWeekStart ? sum + order.orderDetails.totalAmount : sum;
    }, 0);

    const thisMonthRevenue = orders.reduce((sum, order) => {
      const orderDate = new Date(order.orderDetails.orderTime);
      return order.status === 'completed' && 
        orderDate >= thisMonthStart ? sum + order.orderDetails.totalAmount : sum;
    }, 0);

    const lastMonthRevenue = orders.reduce((sum, order) => {
      const orderDate = new Date(order.orderDetails.orderTime);
      return order.status === 'completed' && 
        orderDate >= lastMonthStart && orderDate < thisMonthStart ? sum + order.orderDetails.totalAmount : sum;
    }, 0);

    // Order calculations
    const totalOrders = orders.length;
    const completedOrders = orders.filter(order => order.status === 'completed').length;
    
    const todayOrders = orders.filter(order => {
      const orderDate = new Date(order.orderDetails.orderTime);
      return orderDate >= today;
    }).length;

    const yesterdayOrders = orders.filter(order => {
      const orderDate = new Date(order.orderDetails.orderTime);
      return orderDate >= yesterday && orderDate < today;
    }).length;

    const thisWeekOrders = orders.filter(order => {
      const orderDate = new Date(order.orderDetails.orderTime);
      return orderDate >= thisWeekStart;
    }).length;

    const lastWeekOrders = orders.filter(order => {
      const orderDate = new Date(order.orderDetails.orderTime);
      return orderDate >= lastWeekStart && orderDate < thisWeekStart;
    }).length;

    const thisMonthOrders = orders.filter(order => {
      const orderDate = new Date(order.orderDetails.orderTime);
      return orderDate >= thisMonthStart;
    }).length;

    const lastMonthOrders = orders.filter(order => {
      const orderDate = new Date(order.orderDetails.orderTime);
      return orderDate >= lastMonthStart && orderDate < thisMonthStart;
    }).length;

    // Customer calculations
    const customerMap = new Map();
    const newCustomers = new Set();
    const returningCustomers = new Set();

    orders.forEach(order => {
      const phone = order.customerInfo.phone;
      const orderDate = new Date(order.orderDetails.orderTime);
      
      if (!customerMap.has(phone)) {
        customerMap.set(phone, orderDate);
        if (orderDate >= thisMonthStart) {
          newCustomers.add(phone);
        }
      } else {
        returningCustomers.add(phone);
      }
    });

    // Calculate growth rates
    const calculateGrowthRate = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    setStats({
      revenue: {
        total: totalRevenue,
        today: todayRevenue,
        thisWeek: thisWeekRevenue,
        thisMonth: thisMonthRevenue,
        previousMonth: lastMonthRevenue,
        growth: {
          daily: calculateGrowthRate(todayRevenue, yesterdayRevenue),
          weekly: calculateGrowthRate(thisWeekRevenue, lastWeekRevenue),
          monthly: calculateGrowthRate(thisMonthRevenue, lastMonthRevenue)
        }
      },
      orders: {
        total: totalOrders,
        today: todayOrders,
        thisWeek: thisWeekOrders,
        thisMonth: thisMonthOrders,
        previousMonth: lastMonthOrders,
        successRate: (completedOrders / totalOrders) * 100,
        growth: {
          daily: calculateGrowthRate(todayOrders, yesterdayOrders),
          weekly: calculateGrowthRate(thisWeekOrders, lastWeekOrders),
          monthly: calculateGrowthRate(thisMonthOrders, lastMonthOrders)
        }
      },
      customers: {
        total: customerMap.size,
        new: newCustomers.size,
        returning: returningCustomers.size,
        returningRate: (returningCustomers.size / customerMap.size) * 100
      }
    });
  }, [orders]);

  useEffect(() => {
    calculateStats();
  }, [calculateStats]);

  return stats;
};