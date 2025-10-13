import AdminSidebar from "@/components/admin/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import OrderCard from "@/components/admin/OrderCard";
import RealtimeIndicator from "@/components/RealtimeIndicator";
import { useOrders } from "@/contexts/OrderContext";
import { useRealtimeOrders } from "@/hooks/useRealtimeOrders";
import { 
  CheckCircle, 
  Search, 
  Filter, 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  Calendar,
  Eye,
  Play,
  X,
  MoreHorizontal,
  DollarSign,
  Package,
  XCircle,
  AlertTriangle
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ConfirmedOrders = () => {
  const { getOrdersByStatus, updateOrderStatus, orders: allOrders } = useOrders();
  useRealtimeOrders(); // Enable realtime updates
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [orderToCancel, setOrderToCancel] = useState(null);
  
  const orders = getOrdersByStatus('confirmed');

  const filteredOrders = orders.filter(order =>
    order.customerInfo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerInfo.phone.includes(searchQuery)
  );

  const handleAcceptOrder = (orderId) => {
    updateOrderStatus(orderId, 'in-progress');
    console.log(`Order ${orderId} accepted and moved to in-progress`);
  };

  const handleCancelOrder = (orderId) => {
    setOrderToCancel(orderId);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    if (cancelReason.trim()) {
      updateOrderStatus(orderToCancel, 'cancelled', cancelReason, 'Quản lý');
      console.log(`Order ${orderToCancel} cancelled with reason: ${cancelReason}`);
      setShowCancelModal(false);
      setCancelReason("");
      setOrderToCancel(null);
    }
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
    setCancelReason("");
    setOrderToCancel(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Calculate average processing time for confirmed orders
  const calculateAverageProcessingTime = () => {
    if (orders.length === 0) return "0";
    
    // Get all completed orders to calculate average processing time
    const completedOrders = allOrders.filter(order => 
      order.status === 'completed' && order.orderDetails.startTime
    );
    
    if (completedOrders.length === 0) return "0";
    
    const totalMinutes = completedOrders.reduce((sum, order) => {
      const orderTime = new Date(order.orderDetails.orderTime);
      const startTime = new Date(order.orderDetails.startTime);
      const diffMinutes = Math.floor((startTime.getTime() - orderTime.getTime()) / (1000 * 60));
      return sum + diffMinutes;
    }, 0);
    
    return Math.round(totalMinutes / completedOrders.length).toString();
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl lg:text-4xl font-bold text-foreground">Đơn hàng xác nhận</h1>
            </div>
            <RealtimeIndicator />
          </div>
          <p className="text-muted-foreground">Quản lý các đơn hàng đã được xác nhận và chờ xử lý</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên khách hàng, mã đơn hàng, số điện thoại..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Bộ lọc
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng đơn hàng</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-muted-foreground">đơn hàng chờ xử lý</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng giá trị</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(orders.reduce((sum, order) => sum + order.orderDetails.totalAmount, 0))}
              </div>
              <p className="text-xs text-muted-foreground">tổng giá trị đơn hàng</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Thời gian TB</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculateAverageProcessingTime()} phút</div>
              <p className="text-xs text-muted-foreground">thời gian xử lý trung bình</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              variant="confirmed"
              onViewDetails={setSelectedOrder}
              onAcceptOrder={handleAcceptOrder}
              onCancelOrder={handleCancelOrder}
            />
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              {searchQuery ? "Không tìm thấy đơn hàng" : "Chưa có đơn hàng xác nhận"}
            </h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Thử thay đổi từ khóa tìm kiếm" : "Các đơn hàng mới sẽ xuất hiện ở đây"}
            </p>
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Chi tiết đơn hàng #{selectedOrder.orderNumber}</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedOrder(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {/* Customer Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Thông tin khách hàng</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedOrder.customerInfo.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedOrder.customerInfo.phone}</span>
                      </div>
                      {selectedOrder.customerInfo.email && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Email:</span>
                          <span className="text-sm">{selectedOrder.customerInfo.email}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Order Items */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Món đã đặt</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedOrder.items.map((item, index) => (
                          <div key={index} className="py-2 border-b">
                            <div className="flex justify-between items-start gap-3">
                              <div className="flex gap-3 flex-1">
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{item.name}</span>
                                    <span className="text-muted-foreground">x{item.quantity}</span>
                                    <Badge variant="outline" className="text-xs">
                                      {item.temperature === 'nóng' ? '🔥' : '❄️'} {item.temperature}
                                    </Badge>
                                  </div>
                                  <div className="text-sm text-gray-500 mt-1">
                                    {item.category === 'soju' ? 'Soju' : 
                                     item.category === 'cocktail' ? 'Cocktail' :
                                     item.category === 'coffee' ? 'Cà phê' :
                                     item.category === 'juice' ? 'Nước ép' : 'Đồ uống'}
                                  </div>
                                  {item.notes && (
                                    <div className="text-sm text-gray-600 mt-1">
                                      Ghi chú: {item.notes}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <span className="font-medium">{formatCurrency(item.totalPrice)}</span>
                            </div>
                          </div>
                        ))}
                        
                        {/* Order Summary */}
                        <div className="space-y-1 pt-2">
                          <div className="flex justify-between items-center">
                            <span>Loại đơn hàng:</span>
                            <Badge variant="outline">
                              {selectedOrder.orderDetails.orderType === 'delivery' ? 'Giao hàng' : 
                               selectedOrder.orderDetails.orderType === 'pickup' ? 'Mang về' : 'Tại quán'}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Phương thức thanh toán:</span>
                            <span>{selectedOrder.orderDetails.paymentMethod === 'cash' ? 'Tiền mặt' : 
                                   selectedOrder.orderDetails.paymentMethod === 'card' ? 'Thẻ' :
                                   selectedOrder.orderDetails.paymentMethod === 'momo' ? 'MoMo' : 'ZaloPay'}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Tạm tính:</span>
                            <span>{formatCurrency(selectedOrder.orderDetails.subtotal)}</span>
                          </div>
                          {selectedOrder.orderDetails.deliveryFee > 0 && (
                            <div className="flex justify-between items-center">
                              <span>Phí giao hàng:</span>
                              <span>{formatCurrency(selectedOrder.orderDetails.deliveryFee)}</span>
                            </div>
                          )}
                          {selectedOrder.orderDetails.discount > 0 && (
                            <div className="flex justify-between items-center text-green-600">
                              <span>Giảm giá:</span>
                              <span>-{formatCurrency(selectedOrder.orderDetails.discount)}</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center py-2 font-bold text-lg border-t">
                            <span>Tổng cộng:</span>
                            <span className="text-green-600">{formatCurrency(selectedOrder.orderDetails.totalAmount)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notes */}
                  {selectedOrder.orderNotes && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Ghi chú đơn hàng</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{selectedOrder.orderNotes}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <div className="flex gap-2 mt-6">
                  <Button
                    onClick={() => {
                      handleAcceptOrder(selectedOrder.id);
                      setSelectedOrder(null);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Nhận đơn
                  </Button>
                  <Button
                    onClick={() => {
                      handleCancelOrder(selectedOrder.id);
                      setSelectedOrder(null);
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Hủy đơn
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedOrder(null)}
                    className="flex-1"
                  >
                    Đóng
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cancel Order Modal */}
        <Dialog open={showCancelModal} onOpenChange={setShowCancelModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Hủy đơn hàng
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Bạn có chắc chắn muốn hủy đơn hàng này? Vui lòng nhập lý do hủy đơn.
              </p>
              <div className="space-y-2">
                <Label htmlFor="cancel-reason">Lý do hủy đơn *</Label>
                <Textarea
                  id="cancel-reason"
                  placeholder="Nhập lý do hủy đơn hàng..."
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseCancelModal}>
                Hủy
              </Button>
              <Button 
                onClick={handleConfirmCancel}
                disabled={!cancelReason.trim()}
                className="bg-red-600 hover:bg-red-700"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Xác nhận hủy
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default ConfirmedOrders;
