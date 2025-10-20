import { Order } from "@/contexts/OrderContext";
import { supabase } from "@/integrations/supabase/client";

type OrderState = 'waiting' | 'preparing' | 'cooking' | 'ready' | 'delivering' | 'payment_received';

interface OrderStateInfo {
  label: string;
  description: string;
  color: string;
  icon: string;
  nextState?: OrderState;
  canCancel: boolean;
  requiredActions?: {
    label: string;
    action: string;
  }[];
}

const ORDER_STATES: Record<OrderState, OrderStateInfo> = {
  waiting: {
    label: "Chờ bắt đầu",
    description: "Đơn hàng mới, chưa bắt đầu xử lý",
    color: "bg-gray-100 text-gray-800",
    icon: "⏳",
    nextState: "preparing",
    canCancel: true,
    requiredActions: [
      {
        label: "Kiểm tra nguyên liệu",
        action: "check_inventory"
      },
      {
        label: "Xác nhận với khách",
        action: "confirm_customer"
      }
    ]
  },
  preparing: {
    label: "Chuẩn bị",
    description: "Đang chuẩn bị nguyên liệu",
    color: "bg-blue-100 text-blue-800",
    icon: "▶️",
    nextState: "cooking",
    canCancel: true,
    requiredActions: [
      {
        label: "Chuẩn bị nguyên liệu",
        action: "prepare_ingredients"
      }
    ]
  },
  cooking: {
    label: "Đang làm",
    description: "Đang chế biến món ăn",
    color: "bg-yellow-100 text-yellow-800",
    icon: "👨‍🍳",
    nextState: "ready",
    canCancel: false
  },
  ready: {
    label: "Đã xong",
    description: "Món ăn đã sẵn sàng",
    color: "bg-green-100 text-green-800",
    icon: "✅",
    nextState: "delivering",
    canCancel: false
  },
  delivering: {
    label: "Đang giao",
    description: "Đang giao hàng cho khách",
    color: "bg-purple-100 text-purple-800",
    icon: "🚚",
    nextState: "payment_received",
    canCancel: false
  },
  payment_received: {
    label: "Đã thanh toán",
    description: "Đơn hàng đã hoàn tất",
    color: "bg-green-100 text-green-800",
    icon: "💰",
    canCancel: false
  }
};

export const useOrderStateManager = () => {
  const getStateInfo = (state: OrderState): OrderStateInfo => {
    return ORDER_STATES[state];
  };

  const getNextState = (currentState: OrderState): OrderState | undefined => {
    return ORDER_STATES[currentState]?.nextState;
  };

  const canCancelOrder = (state: OrderState): boolean => {
    return ORDER_STATES[state]?.canCancel || false;
  };

  const calculateProgress = (state: OrderState): number => {
    const states: OrderState[] = ['waiting', 'preparing', 'cooking', 'ready', 'delivering', 'payment_received'];
    const index = states.indexOf(state);
    return Math.round((index / (states.length - 1)) * 100);
  };

  const getRequiredActions = (state: OrderState) => {
    return ORDER_STATES[state]?.requiredActions || [];
  };

  // Cập nhật trạng thái đơn hàng
  const updateOrderState = async (
    orderId: string, 
    newState: OrderState,
    additionalData?: {
      notes?: string;
      cancelReason?: string;
      cancelledBy?: string;
    }
  ) => {
    try {
      const progress = calculateProgress(newState);
      const timestamp = new Date().toISOString();

      const updateData: any = {
        currentState: newState,
        progress,
        updatedAt: timestamp
      };

      // Nếu chuyển sang trạng thái hủy
      if (additionalData?.cancelReason) {
        updateData.status = 'cancelled';
        updateData.cancelTime = timestamp;
        updateData.cancelReason = additionalData.cancelReason;
        updateData.cancelledBy = additionalData.cancelledBy;
      }
      
      // Nếu chuyển sang trạng thái hoàn thành
      if (newState === 'payment_received') {
        updateData.status = 'completed';
        updateData.completedTime = timestamp;
      }

      // Cập nhật trong database
      const { data, error } = await supabase
        .from('orders')
        .update(updateData)
        .match({ id: orderId });

      if (error) throw error;

      // Gửi thông báo hoặc email cho khách hàng nếu cần
      if (newState === 'ready' || newState === 'delivering') {
        await sendOrderNotification(orderId, newState);
      }

      return { success: true, data };
    } catch (error) {
      console.error('Error updating order state:', error);
      return { success: false, error };
    }
  };

  // Gửi thông báo cho khách hàng
  const sendOrderNotification = async (orderId: string, state: OrderState) => {
    try {
      const { data: order } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (!order) return;

      // TODO: Implement actual notification sending
      console.log(`Sending notification for order ${orderId} - State: ${state}`);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return {
    getStateInfo,
    getNextState,
    canCancelOrder,
    calculateProgress,
    getRequiredActions,
    updateOrderState
  };
};

export type { OrderState, OrderStateInfo };