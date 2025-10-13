import { useEffect, useCallback } from 'react';
import { useOrders } from '@/contexts/OrderContext';

// Custom hook for realtime order updates
export const useRealtimeOrders = () => {
  const { orders, updateOrderStatus, updateOrderState } = useOrders();

  // Simulate realtime updates (in a real app, this would be WebSocket or Server-Sent Events)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate automatic state transitions
      orders.forEach(order => {
        if (order.status === 'confirmed') {
          // Auto-accept orders after 30 seconds (for demo purposes)
          const orderTime = new Date(order.orderDetails.orderTime);
          const now = new Date();
          const timeDiff = (now.getTime() - orderTime.getTime()) / 1000; // seconds
          
          if (timeDiff > 30) {
            updateOrderStatus(order.id, 'in-progress');
          }
        } else if (order.status === 'in-progress' && order.currentState === 'waiting') {
          // Auto-start preparation after 10 seconds
          const orderTime = new Date(order.orderDetails.orderTime);
          const now = new Date();
          const timeDiff = (now.getTime() - orderTime.getTime()) / 1000;
          
          if (timeDiff > 40) {
            updateOrderState(order.id, 'preparing', 25);
          }
        } else if (order.status === 'in-progress' && order.currentState === 'preparing') {
          // Auto-start cooking after 5 seconds
          const orderTime = new Date(order.orderDetails.orderTime);
          const now = new Date();
          const timeDiff = (now.getTime() - orderTime.getTime()) / 1000;
          
          if (timeDiff > 45) {
            updateOrderState(order.id, 'cooking', 50);
          }
        } else if (order.status === 'in-progress' && order.currentState === 'cooking') {
          // Auto-complete cooking after 10 seconds
          const orderTime = new Date(order.orderDetails.orderTime);
          const now = new Date();
          const timeDiff = (now.getTime() - orderTime.getTime()) / 1000;
          
          if (timeDiff > 55) {
            updateOrderState(order.id, 'ready', 100);
          }
        } else if (order.status === 'in-progress' && order.currentState === 'ready') {
          // Auto-move to completed after 2 seconds
          const orderTime = new Date(order.orderDetails.orderTime);
          const now = new Date();
          const timeDiff = (now.getTime() - orderTime.getTime()) / 1000;
          
          if (timeDiff > 57) {
            updateOrderStatus(order.id, 'completed');
          }
        }
      });
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [orders, updateOrderStatus, updateOrderState]);

  // Function to manually trigger updates (for testing)
  const triggerUpdate = useCallback(() => {
    // Force re-render by updating a dummy state
    console.log('Realtime update triggered');
  }, []);

  return {
    triggerUpdate
  };
};
