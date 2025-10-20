import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  Calendar,
  DollarSign,
  CreditCard,
  Truck,
  X,
  AlertTriangle
} from "lucide-react";
import { Order } from "@/contexts/OrderContext";
import { useState } from "react";
import { useOrderStateManager, OrderState } from "@/hooks/useOrderStateManager";

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
  onUpdateState?: (orderId: string, newState: OrderState) => void;
  onCancelOrder?: (orderId: string, reason: string) => void;
}

export const OrderDetailsModal = ({
  order,
  onClose,
  onUpdateState,
  onCancelOrder
}: OrderDetailsModalProps) => {
  const { getStateInfo, getNextState, canCancelOrder, getRequiredActions } = useOrderStateManager();
  const [cancelReason, setCancelReason] = useState("");
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  if (!order) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCancel = () => {
    if (onCancelOrder && cancelReason.trim()) {
      onCancelOrder(order.id, cancelReason);
      onClose();
    }
  };

  return (
    <Dialog open={!!order} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Chi tiết đơn hàng #{order.orderNumber}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Thông tin khách hàng
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">{order.customerInfo.name}</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {order.customerInfo.phone}
                </div>
                {order.customerInfo.address && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {order.customerInfo.address.fullAddress}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(order.orderDetails.orderTime)}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Truck className="h-3 w-3" />
                  {order.orderDetails.orderType === 'delivery' ? 'Giao hàng' : 
                   order.orderDetails.orderType === 'pickup' ? 'Mang về' : 'Tại quán'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Trạng thái đơn hàng
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Hiện tại:</span>
                <Badge className={getStateInfo(order.currentState as OrderState).color}>
                  <span className="mr-1">{getStateInfo(order.currentState as OrderState).icon}</span>
                  {getStateInfo(order.currentState as OrderState).label}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Tiến trình:</div>
                <div className="flex items-center space-x-2">
                  {["waiting", "preparing", "cooking", "ready", "delivering", "payment_received"].map((state, index) => {
                    const stateInfo = getStateInfo(state as OrderState);
                    const isActive = state === order.currentState;
                    const isCompleted = ["waiting", "preparing", "cooking", "ready", "delivering", "payment_received"]
                      .indexOf(order.currentState as string) > index;
                    
                    return (
                      <div key={state} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                          isCompleted ? 'bg-green-500 text-white' : 
                          isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                        }`}>
                          {isCompleted ? '✓' : index + 1}
                        </div>
                        <span className={`ml-2 text-sm ${
                          isActive ? 'font-bold text-blue-600' : 
                          isCompleted ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {stateInfo.label}
                        </span>
                        {index < 5 && (
                          <div className={`w-8 h-0.5 mx-2 ${
                            isCompleted ? 'bg-green-500' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Required Actions */}
              {getRequiredActions(order.currentState as OrderState).length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium">Cần thực hiện:</div>
                  <div className="space-y-1">
                    {getRequiredActions(order.currentState as OrderState).map((action, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        {action.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Chi tiết đơn hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Items List */}
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <span className="font-medium">{item.quantity}x</span> {item.name}
                        {item.notes && (
                          <div className="text-xs text-muted-foreground ml-6">
                            Ghi chú: {item.notes}
                          </div>
                        )}
                      </div>
                      <span>{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tổng tiền hàng</span>
                    <span>{formatCurrency(order.orderDetails.subtotal)}</span>
                  </div>
                  {order.orderDetails.deliveryFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Phí giao hàng</span>
                      <span>{formatCurrency(order.orderDetails.deliveryFee)}</span>
                    </div>
                  )}
                  {order.orderDetails.serviceFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Phí dịch vụ</span>
                      <span>{formatCurrency(order.orderDetails.serviceFee)}</span>
                    </div>
                  )}
                  {order.orderDetails.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Giảm giá</span>
                      <span>-{formatCurrency(order.orderDetails.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold pt-2 border-t">
                    <span>Tổng cộng</span>
                    <span>{formatCurrency(order.orderDetails.totalAmount)}</span>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {order.orderDetails.paymentMethod === 'cash' ? 'Tiền mặt' : 'Chuyển khoản'}
                      </span>
                    </div>
                    <Badge variant={order.orderDetails.paymentStatus === 'paid' ? 'success' : 'warning'}>
                      {order.orderDetails.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    </Badge>
                  </div>
                </div>

                {/* Order Notes */}
                {order.orderNotes && (
                  <div className="pt-4 border-t">
                    <div className="bg-amber-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <span className="text-sm font-medium text-amber-800">Ghi chú đơn hàng</span>
                      </div>
                      <p className="text-sm text-amber-800">{order.orderNotes}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          {!showCancelConfirm && (
            <>
              {onUpdateState && order.currentState && getNextState(order.currentState as OrderState) && (
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    const nextState = getNextState(order.currentState as OrderState);
                    if (nextState) onUpdateState(order.id, nextState);
                    onClose();
                  }}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  {getStateInfo(getNextState(order.currentState as OrderState)!).label}
                </Button>
              )}
              {onCancelOrder && canCancelOrder(order.currentState as OrderState) && (
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => setShowCancelConfirm(true)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Hủy đơn
                </Button>
              )}
              <Button
                variant="outline"
                className="flex-1"
                onClick={onClose}
              >
                Đóng
              </Button>
            </>
          )}

          {/* Cancel Confirmation */}
          {showCancelConfirm && (
            <>
              <div className="flex-1 space-y-4">
                <div className="bg-amber-50 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-800">
                      Xác nhận hủy đơn hàng
                    </span>
                  </div>
                </div>
                <Textarea
                  placeholder="Nhập lý do hủy đơn..."
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="min-h-[80px]"
                />
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    className="flex-1"
                    disabled={!cancelReason.trim()}
                    onClick={handleCancel}
                  >
                    Xác nhận hủy
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowCancelConfirm(false);
                      setCancelReason("");
                    }}
                  >
                    Quay lại
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};