import AdminSidebar from "@/components/admin/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import OrderCard from "@/components/admin/OrderCard";
import { useOrders } from "@/contexts/OrderContext";
import { 
  Clock, 
  Search, 
  Filter, 
  User, 
  Phone, 
  MapPin, 
  Calendar,
  Eye,
  CheckCircle,
  X,
  MoreHorizontal,
  DollarSign,
  Package,
  Timer,
  ChefHat
} from "lucide-react";
import { useState } from "react";

const InProgressOrders = () => {
  const { getOrdersByStatus, updateOrderState, updateOrderStatus } = useOrders();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const orders = getOrdersByStatus('in-progress');

  const filteredOrders = orders.filter(order =>
    order.customerInfo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerInfo.phone.includes(searchQuery)
  );

  const handleUpdateOrderState = (orderId, newState) => {
    const progressMap = {
      "waiting": 0,
      "preparing": 25,
      "cooking": 50,
      "ready": 100
    };
    
    updateOrderState(orderId, newState, progressMap[newState]);
    console.log(`Order ${orderId} updated to state: ${newState}`);
  };

  const getNextState = (currentState) => {
    const stateOrder = ["waiting", "preparing", "cooking", "ready"];
    const currentIndex = stateOrder.indexOf(currentState);
    return currentIndex < stateOrder.length - 1 ? stateOrder[currentIndex + 1] : null;
  };

  const getStateInfo = (state) => {
    const stateMap = {
      waiting: { label: "Chờ bắt đầu", color: "bg-gray-100 text-gray-800", icon: "⏳" },
      preparing: { label: "Bắt đầu", color: "bg-blue-100 text-blue-800", icon: "▶️" },
      cooking: { label: "Đang làm", color: "bg-yellow-100 text-yellow-800", icon: "👨‍🍳" },
      ready: { label: "Đã xong", color: "bg-green-100 text-green-800", icon: "✅" }
    };
    return stateMap[state] || stateMap.waiting;
  };

  const canCancelOrder = (currentState) => {
    // Can only cancel if waiting to start (only in "waiting" state)
    return currentState === "waiting";
  };

  const handleCancelOrder = (orderId) => {
    updateOrderStatus(orderId, 'cancelled', 'Hủy đơn trong quá trình xử lý', 'Quản lý');
    console.log(`Order ${orderId} cancelled`);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getProgressColor = (progress) => {
    if (progress < 30) return "bg-red-500";
    if (progress < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getTimeRemaining = (startTime, estimatedTime) => {
    const start = new Date(startTime);
    const now = new Date();
    const elapsed = Math.floor((now - start) / 1000 / 60); // minutes
    const remaining = Math.max(0, estimatedTime - elapsed);
    return remaining;
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl lg:text-4xl font-bold text-foreground">Đơn hàng đang làm</h1>
          </div>
          <p className="text-muted-foreground">Theo dõi tiến độ và quản lý các đơn hàng đang được xử lý</p>
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
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đang làm</CardTitle>
              <ChefHat className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-muted-foreground">đơn hàng</p>
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
              <p className="text-xs text-muted-foreground">tổng giá trị</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Thời gian TB</CardTitle>
              <Timer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.length > 0 ? Math.round(orders.reduce((sum, order) => sum + order.orderDetails.estimatedTime, 0) / orders.length) : 0} phút
              </div>
              <p className="text-xs text-muted-foreground">thời gian ước tính</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tiến độ TB</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.length > 0 ? Math.round(orders.reduce((sum, order) => sum + order.progress, 0) / orders.length) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">hoàn thành</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              variant="in-progress"
              onViewDetails={setSelectedOrder}
              onUpdateState={handleUpdateOrderState}
              onCancelOrder={(orderId) => handleUpdateOrderState(orderId, "cancelled")}
            />
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Clock className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              {searchQuery ? "Không tìm thấy đơn hàng" : "Không có đơn hàng đang làm"}
            </h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Thử thay đổi từ khóa tìm kiếm" : "Các đơn hàng đang được xử lý sẽ xuất hiện ở đây"}
            </p>
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Chi tiết đơn hàng #{selectedOrder.id}</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedOrder(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {/* Progress Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Trạng thái đơn hàng</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Trạng thái hiện tại</span>
                          <Badge className={getStateInfo(selectedOrder.currentState).color}>
                            <span className="mr-1">{getStateInfo(selectedOrder.currentState).icon}</span>
                            {getStateInfo(selectedOrder.currentState).label}
                          </Badge>
                        </div>
                        
                        {/* Progress Steps */}
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Tiến trình:</div>
                          <div className="flex items-center space-x-2">
                            {["waiting", "preparing", "cooking", "ready"].map((state, index) => {
                              const stateInfo = getStateInfo(state);
                              const isActive = state === selectedOrder.currentState;
                              const isCompleted = ["waiting", "preparing", "cooking", "ready"].indexOf(selectedOrder.currentState) > index;
                              
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
                                  {index < 3 && (
                                    <div className={`w-8 h-0.5 mx-2 ${
                                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                                    }`} />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Bắt đầu: {new Date(selectedOrder.orderDetails.startTime).toLocaleString('vi-VN')}</span>
                          <span>Còn lại: {getTimeRemaining(selectedOrder.orderDetails.startTime, selectedOrder.orderDetails.estimatedTime)} phút</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

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
                      <CardTitle className="text-lg">Món đang làm</CardTitle>
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
                            <span className="text-blue-600">{formatCurrency(selectedOrder.orderDetails.totalAmount)}</span>
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
                  {(() => {
                    const nextState = getNextState(selectedOrder.currentState);
                    const canCancel = canCancelOrder(selectedOrder.currentState);
                    
                    return (
                      <>
                        {nextState && (
                          <Button
                            onClick={() => {
                              handleUpdateOrderState(selectedOrder.id, nextState);
                              setSelectedOrder(null);
                            }}
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                          >
                            <Clock className="h-4 w-4 mr-2" />
                            {getStateInfo(nextState).label}
                          </Button>
                        )}
                        {canCancel && (
                          <Button
                            onClick={() => {
                              handleUpdateOrderState(selectedOrder.id, "cancelled");
                              setSelectedOrder(null);
                            }}
                            className="flex-1 bg-red-600 hover:bg-red-700"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Hủy đơn
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          onClick={() => setSelectedOrder(null)}
                          className="flex-1"
                        >
                          Đóng
                        </Button>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default InProgressOrders;
