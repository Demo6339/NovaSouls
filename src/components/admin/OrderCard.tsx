import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Phone, 
  Calendar, 
  CheckCircle, 
  Clock, 
  XCircle,
  X,
  Package,
  Eye,
  RefreshCw,
  Trash2,
  Truck,
  CreditCard,
  CheckCircle2
} from "lucide-react";

import { Order } from '@/contexts/OrderContext';

interface OrderItem {
  id: string | number;
  name: string;
  quantity: number;
  price: number;
  image: string;
  notes?: string;
}

interface OrderCardProps {
  order: Order;
  onViewDetails: (order: Order) => void;
  onAcceptOrder?: (orderId: string) => void;
  onCancelOrder?: (orderId: string) => void;
  onUpdateState?: (orderId: string, newState: string) => void;
  onRestoreOrder?: (orderId: string) => void;
  variant: 'confirmed' | 'in-progress' | 'cancelled' | 'completed';
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onViewDetails,
  onAcceptOrder,
  onCancelOrder,
  onUpdateState,
  onRestoreOrder,
  variant
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'confirmed':
        return {
          bgColor: 'bg-white',
          iconBg: 'bg-emerald-100',
          iconColor: 'text-emerald-600',
          totalBg: 'bg-emerald-50',
          totalText: 'text-emerald-600'
        };
      case 'in-progress':
        return {
          bgColor: 'bg-white',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          totalBg: 'bg-blue-50',
          totalText: 'text-blue-600'
        };
      case 'completed':
        return {
          bgColor: 'bg-white',
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600',
          totalBg: 'bg-purple-50',
          totalText: 'text-purple-600'
        };
      case 'cancelled':
        return {
          bgColor: 'bg-white',
          iconBg: 'bg-rose-100',
          iconColor: 'text-rose-600',
          totalBg: 'bg-rose-50',
          totalText: 'text-rose-600'
        };
    }
  };

  const getStateInfo = (state: string) => {
    const stateMap: Record<string, { label: string }> = {
      waiting: { label: "Chờ bắt đầu" },
      preparing: { label: "Bắt đầu" },
      cooking: { label: "Đang làm" },
      ready: { label: "Đã xong" },
      delivering: { label: "Giao hàng" },
      payment_received: { label: "Đã thu tiền" }
    };
    return stateMap[state] || stateMap.waiting;
  };

  const getNextState = (currentState: string) => {
    if (variant === 'in-progress') {
      const stateOrder = ["waiting", "preparing", "cooking", "ready"];
      const currentIndex = stateOrder.indexOf(currentState);
      return currentIndex < stateOrder.length - 1 ? stateOrder[currentIndex + 1] : null;
    }
    
    if (variant === 'completed') {
      const stateOrder = ["ready", "delivering", "payment_received"];
      const currentIndex = stateOrder.indexOf(currentState);
      return currentIndex < stateOrder.length - 1 ? stateOrder[currentIndex + 1] : null;
    }
    
    return null;
  };

  const getProgressColor = (progress: number) => {
    if (progress < 30) return "bg-rose-500";
    if (progress < 70) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const styles = getVariantStyles();

  // CONFIRMED ORDER CARD
  if (variant === 'confirmed') {
    return (
      <Card className={`${styles.bgColor} border shadow-sm hover:shadow-md transition-all duration-200 h-[420px] flex flex-col`}>
        <CardHeader className="pb-3 space-y-2.5 flex-shrink-0">
          {/* Customer Info */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className={`${styles.iconBg} p-1.5 rounded-md flex-shrink-0`}>
                <User className={`h-3.5 w-3.5 ${styles.iconColor}`} />
              </div>
              <p className="font-semibold text-sm text-slate-900 truncate">{order.customerInfo.name}</p>
            </div>
            <div className="flex items-center gap-2 ml-7">
              <Phone className="h-3 w-3 text-slate-400 flex-shrink-0" />
              <p className="text-xs text-slate-600">{order.customerInfo.phone}</p>
            </div>
          </div>

          {/* Order Time & Type */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-md">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{formatDate(order.orderDetails.orderTime)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-md">
              <Truck className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">
                {order.orderDetails.orderType === 'delivery' ? 'Giao hàng' : 
                 order.orderDetails.orderType === 'pickup' ? 'Mang về' : 'Tại quán'}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col pt-0 pb-3 overflow-hidden">
          {/* Items - Scrollable area */}
          <div className="flex-1 overflow-y-auto space-y-1.5 mb-2.5">
            <h4 className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 sticky top-0 bg-white pb-1">
              <Package className="h-3 w-3" />
              Món đã đặt
            </h4>
            <div className="space-y-1.5">
              {order.items.slice(0, 2).map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-50 rounded-md p-2 text-xs">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-8 h-8 rounded object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center flex-shrink-0">
                        <Package className="h-4 w-4 text-slate-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{item.name}</p>
                      <p className="text-slate-500">x{item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-slate-700 ml-2 flex-shrink-0">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
              {order.items.length > 2 && (
                <div className="text-center py-1">
                  <span className="text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full">
                    +{order.items.length - 2} món khác
                  </span>
                </div>
              )}
            </div>

            {/* Notes */}
            {order.orderNotes && (
              <div className="bg-amber-50 rounded-md p-2 mt-2">
                <p className="text-xs text-amber-800 line-clamp-2">
                  <span className="font-semibold">Ghi chú:</span> {order.orderNotes}
                </p>
              </div>
            )}
          </div>

          {/* Fixed Total Amount */}
          <div className={`${styles.totalBg} rounded-md p-2.5 flex-shrink-0 mb-2`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-700">Tổng tiền</span>
              <span className={`text-base font-bold ${styles.totalText}`}>{formatCurrency(order.orderDetails.totalAmount)}</span>
            </div>
          </div>

          {/* Fixed Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              onClick={() => onViewDetails(order)}
              variant="outline"
              size="sm"
              className="h-9 w-9 p-0 border-slate-300 hover:bg-slate-50 flex-shrink-0"
            >
              <Eye className="h-4 w-4 text-slate-600" />
            </Button>
            {onAcceptOrder && (
              <Button
                onClick={() => onAcceptOrder(order.id)}
                size="sm"
                className="flex-1 h-9 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
              >
                <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                Nhận đơn
              </Button>
            )}
            {onCancelOrder && (
              <Button
                onClick={() => onCancelOrder(order.id)}
                variant="outline"
                size="sm"
                className="h-9 w-9 p-0 border-rose-300 text-rose-600 hover:bg-rose-50 flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // IN-PROGRESS ORDER CARD
  if (variant === 'in-progress') {
    return (
      <Card className={`${styles.bgColor} border shadow-sm hover:shadow-md transition-all duration-200 h-[400px] flex flex-col`}>
        <CardHeader className="pb-3 space-y-2.5 flex-shrink-0">
          {/* Order Number */}
          <div className="bg-slate-50 rounded-md p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600 font-medium">Mã đơn hàng</span>
              <span className="text-xs font-bold text-slate-900">{order.orderNumber}</span>
            </div>
          </div>

          {/* Customer Info */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className={`${styles.iconBg} p-1.5 rounded-md flex-shrink-0`}>
                <User className={`h-3.5 w-3.5 ${styles.iconColor}`} />
              </div>
              <p className="font-semibold text-sm text-slate-900 truncate">{order.customerInfo.name}</p>
            </div>
            <div className="flex items-center gap-2 ml-7">
              <Phone className="h-3 w-3 text-slate-400 flex-shrink-0" />
              <p className="text-xs text-slate-600">{order.customerInfo.phone}</p>
            </div>
          </div>

          {/* Order Type & Time */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-md">
              <Truck className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">
                {order.orderDetails.orderType === 'delivery' ? 'Giao hàng' : 
                 order.orderDetails.orderType === 'pickup' ? 'Mang về' : 'Tại quán'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-md">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{formatDate(order.orderDetails.orderTime)}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Tiến độ thực hiện</span>
              <span className="font-bold text-blue-600">{order.progress}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-1.5 rounded-full transition-all duration-500 ${getProgressColor(order.progress || 0)}`}
                style={{ width: `${order.progress}%` }}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col pt-0 pb-3 overflow-hidden">
          {/* Items - Scrollable area */}
          <div className="flex-1 overflow-y-auto space-y-1.5 mb-2.5">
            <h4 className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 sticky top-0 bg-white pb-1">
              <Package className="h-3 w-3" />
              Món đã đặt
            </h4>
            <div className="space-y-1.5">
              {order.items.slice(0, 2).map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-50 rounded-md p-2 text-xs">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-8 h-8 rounded object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center flex-shrink-0">
                        <Package className="h-4 w-4 text-slate-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{item.name}</p>
                      <p className="text-slate-500">x{item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
              {order.items.length > 2 && (
                <div className="text-center py-1">
                  <span className="text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full">
                    +{order.items.length - 2} món khác
                  </span>
                </div>
              )}
            </div>

            {/* Notes */}
            {order.orderNotes && (
              <div className="bg-amber-50 rounded-md p-2 mt-2">
                <p className="text-xs text-amber-800 line-clamp-2">
                  <span className="font-semibold">Ghi chú:</span> {order.orderNotes}
                </p>
              </div>
            )}
          </div>

          {/* Fixed Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              onClick={() => onViewDetails(order)}
              variant="outline"
              size="sm"
              className="h-9 w-9 p-0 border-slate-300 hover:bg-slate-50 flex-shrink-0"
            >
              <Eye className="h-4 w-4 text-slate-600" />
            </Button>
            {onUpdateState && order.currentState && getNextState(order.currentState) ? (
              <Button
                onClick={() => onUpdateState(order.id, getNextState(order.currentState)!)}
                size="sm"
                className="flex-1 h-9 text-xs bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                <Clock className="h-3.5 w-3.5 mr-1.5" />
                {getStateInfo(getNextState(order.currentState)!).label}
              </Button>
            ) : (
              <div className="flex-1" />
            )}
            {order.currentState === 'waiting' && onCancelOrder && (
              <Button
                onClick={() => onCancelOrder(order.id)}
                variant="outline"
                size="sm"
                className="h-9 w-9 p-0 border-rose-300 text-rose-600 hover:bg-rose-50 flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // COMPLETED ORDER CARD
  if (variant === 'completed') {
    return (
      <Card className={`${styles.bgColor} border shadow-sm hover:shadow-md transition-all duration-200 h-[420px] flex flex-col`}>
        <CardHeader className="pb-3 space-y-2.5 flex-shrink-0">
          {/* Customer Info */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className={`${styles.iconBg} p-1.5 rounded-md flex-shrink-0`}>
                <User className={`h-3.5 w-3.5 ${styles.iconColor}`} />
              </div>
              <p className="font-semibold text-sm text-slate-900 truncate">{order.customerInfo.name}</p>
            </div>
            <div className="flex items-center gap-2 ml-7">
              <Phone className="h-3 w-3 text-slate-400 flex-shrink-0" />
              <p className="text-xs text-slate-600">{order.customerInfo.phone}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col pt-0 pb-3 overflow-hidden">
          {/* Items - Scrollable area */}
          <div className="flex-1 overflow-y-auto space-y-1.5 mb-2.5">
            <h4 className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 sticky top-0 bg-white pb-1">
              <Package className="h-3 w-3" />
              Món đã đặt
            </h4>
            <div className="space-y-1.5">
              {order.items.slice(0, 2).map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-50 rounded-md p-2 text-xs">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-8 h-8 rounded object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center flex-shrink-0">
                        <Package className="h-4 w-4 text-slate-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{item.name}</p>
                      <p className="text-slate-500">x{item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-slate-700 ml-2 flex-shrink-0">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
              {order.items.length > 2 && (
                <div className="text-center py-1">
                  <span className="text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full">
                    +{order.items.length - 2} món khác
                  </span>
                </div>
              )}
            </div>

            {/* Notes */}
            {order.orderNotes && (
              <div className="bg-amber-50 rounded-md p-2 mt-2">
                <p className="text-xs text-amber-800 line-clamp-2">
                  <span className="font-semibold">Ghi chú:</span> {order.orderNotes}
                </p>
              </div>
            )}
          </div>

          {/* Fixed Total Amount */}
          <div className={`${styles.totalBg} rounded-md p-2.5 flex-shrink-0 mb-2`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-700">Tổng tiền</span>
              <span className={`text-base font-bold ${styles.totalText}`}>{formatCurrency(order.orderDetails.totalAmount)}</span>
            </div>
          </div>

          {/* Fixed Action Buttons */}
          {order.currentState === 'payment_received' ? (
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                onClick={() => onViewDetails(order)}
                variant="outline"
                size="sm"
                className="h-9 w-9 p-0 border-slate-300 hover:bg-slate-50 flex-shrink-0"
              >
                <Eye className="h-4 w-4 text-slate-600" />
              </Button>
              <div className="flex-1 flex items-center justify-center h-9 bg-emerald-50 text-emerald-700 rounded-md font-semibold text-xs border border-emerald-200">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                Đã thu tiền
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                onClick={() => onViewDetails(order)}
                variant="outline"
                size="sm"
                className="h-9 w-9 p-0 border-slate-300 hover:bg-slate-50 flex-shrink-0"
              >
                <Eye className="h-4 w-4 text-slate-600" />
              </Button>
              {onUpdateState && order.currentState && getNextState(order.currentState) && (
                <Button
                  onClick={() => onUpdateState(order.id, getNextState(order.currentState)!)}
                  size="sm"
                  className="flex-1 h-9 text-xs bg-purple-600 hover:bg-purple-700 text-white font-medium"
                >
                  {order.currentState === 'ready' ? (
                    <>
                      <Truck className="h-3.5 w-3.5 mr-1.5" />
                      Giao hàng
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-3.5 w-3.5 mr-1.5" />
                      Thu tiền
                    </>
                  )}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // CANCELLED ORDER CARD
  if (variant === 'cancelled') {
    return (
      <Card className={`${styles.bgColor} border shadow-sm hover:shadow-md transition-all duration-200 h-[480px] flex flex-col`}>
        <CardHeader className="pb-3 space-y-2.5 flex-shrink-0">
          {/* Customer Info */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className={`${styles.iconBg} p-1.5 rounded-md flex-shrink-0`}>
                <User className={`h-3.5 w-3.5 ${styles.iconColor}`} />
              </div>
              <p className="font-semibold text-sm text-slate-900 truncate">{order.customerInfo.name}</p>
            </div>
            <div className="flex items-center gap-2 ml-7">
              <Phone className="h-3 w-3 text-slate-400 flex-shrink-0" />
              <p className="text-xs text-slate-600">{order.customerInfo.phone}</p>
            </div>
          </div>

          {/* Order Time, Type and Order Number */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-md">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{formatDate(order.orderDetails.orderTime)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-md">
              <Truck className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">
                {order.orderDetails.orderType === 'delivery' ? 'Giao hàng' : 
                 order.orderDetails.orderType === 'pickup' ? 'Mang về' : 'Tại quán'}
              </span>
            </div>
            <div className="bg-slate-50 rounded-md px-2.5 py-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-medium">Mã đơn</span>
                <span className="text-xs font-bold text-slate-900">{order.orderNumber}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col pt-0 pb-3 overflow-hidden">
          {/* Items - Scrollable area */}
          <div className="flex-1 overflow-y-auto space-y-1.5 mb-2.5">
            <h4 className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 sticky top-0 bg-white pb-1">
              <Package className="h-3 w-3" />
              Món đã đặt
            </h4>
            <div className="space-y-1.5">
              {order.items.slice(0, 2).map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-50 rounded-md p-2 text-xs opacity-60">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-8 h-8 rounded object-cover flex-shrink-0 grayscale"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center flex-shrink-0">
                        <Package className="h-4 w-4 text-slate-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate line-through">{item.name}</p>
                      <p className="text-slate-500">x{item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
              {order.items.length > 2 && (
                <div className="text-center py-1">
                  <span className="text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full">
                    +{order.items.length - 2} món khác
                  </span>
                </div>
              )}
            </div>

            {/* Cancel Info */}
            <div className="space-y-1.5 mt-2">
              {order.cancelledBy && (
                <div className="bg-rose-50 rounded-md p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-rose-700">Người hủy</span>
                    <Badge className="bg-rose-100 text-rose-700 border-rose-200 text-xs h-5 px-2">
                      {order.cancelledBy}
                    </Badge>
                  </div>
                </div>
              )}
              {order.cancelReason && (
                <div className="bg-amber-50 rounded-md p-2">
                  <p className="text-xs text-amber-800 line-clamp-2">
                    <span className="font-semibold">Lý do:</span> {order.cancelReason}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Fixed Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              onClick={() => onViewDetails(order)}
              variant="outline"
              size="sm"
              className="h-9 w-9 p-0 border-slate-300 hover:bg-slate-50 flex-shrink-0"
            >
              <Eye className="h-4 w-4 text-slate-600" />
            </Button>
            {onRestoreOrder && (
              <Button
                onClick={() => onRestoreOrder(order.id)}
                size="sm"
                className="flex-1 h-9 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                Khôi phục
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default OrderCard;
