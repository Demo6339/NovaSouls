import AdminSidebar from "@/components/admin/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import OrderCard from "@/components/admin/OrderCard";
import { useOrders } from "@/contexts/OrderContext";
import { 
  XCircle, 
  Search, 
  Filter, 
  User, 
  Phone, 
  MapPin, 
  Calendar,
  Eye,
  RefreshCw,
  MoreHorizontal,
  DollarSign,
  Package,
  AlertTriangle,
  Clock
} from "lucide-react";
import { useState } from "react";

const CancelledOrders = () => {
  const { getOrdersByStatus, restoreOrder } = useOrders();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterReason, setFilterReason] = useState("all");
  
  const orders = getOrdersByStatus('cancelled');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerInfo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerInfo.phone.includes(searchQuery);
    
    const matchesReason = filterReason === "all" || 
      order.cancelReason?.toLowerCase().includes(filterReason.toLowerCase());
    
    return matchesSearch && matchesReason;
  });

  const handleRestoreOrder = (orderId) => {
    restoreOrder(orderId);
    console.log(`Restoring order ${orderId}`);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getCancelReasonColor = (reason) => {
    if (reason.includes("Khách hàng")) return "text-red-600";
    if (reason.includes("Hết nguyên liệu")) return "text-orange-600";
    if (reason.includes("Không liên lạc")) return "text-yellow-600";
    return "text-gray-600";
  };

  const getCancelledByColor = (cancelledBy) => {
    if (cancelledBy === "Khách hàng") return "bg-red-100 text-red-800";
    if (cancelledBy === "Quản lý") return "bg-orange-100 text-orange-800";
    if (cancelledBy === "Hệ thống") return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="h-8 w-8 text-red-600" />
            <h1 className="text-2xl lg:text-4xl font-bold text-foreground">Đơn hàng bị hủy</h1>
          </div>
          <p className="text-muted-foreground">Xem lại và quản lý các đơn hàng đã bị hủy</p>
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
            <div className="flex gap-2">
              <select
                value={filterReason}
                onChange={(e) => setFilterReason(e.target.value)}
                className="px-3 py-2 border border-input rounded-md text-sm"
              >
                <option value="all">Tất cả lý do</option>
                <option value="khách hàng">Khách hàng hủy</option>
                <option value="hết nguyên liệu">Hết nguyên liệu</option>
                <option value="không liên lạc">Không liên lạc được</option>
              </select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Bộ lọc
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng hủy</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{orders.length}</div>
              <p className="text-xs text-muted-foreground">đơn hàng</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng giá trị</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(orders.reduce((sum, order) => sum + order.orderDetails.totalAmount, 0))}
              </div>
              <p className="text-xs text-muted-foreground">tổng giá trị bị hủy</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tỷ lệ hủy</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.5%</div>
              <p className="text-xs text-muted-foreground">so với tổng đơn hàng</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Thời gian TB</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15 phút</div>
              <p className="text-xs text-muted-foreground">trước khi hủy</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              variant="cancelled"
              onViewDetails={setSelectedOrder}
              onRestoreOrder={handleRestoreOrder}
            />
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <XCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              {searchQuery || filterReason !== "all" ? "Không tìm thấy đơn hàng" : "Chưa có đơn hàng bị hủy"}
            </h3>
            <p className="text-muted-foreground">
              {searchQuery || filterReason !== "all" ? "Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc" : "Các đơn hàng bị hủy sẽ xuất hiện ở đây"}
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
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {/* Cancel Info */}
                  <Card className="border-red-200">
                    <CardHeader>
                      <CardTitle className="text-lg text-red-600">Thông tin hủy đơn</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Hủy lúc: {selectedOrder.cancelTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>Hủy bởi: {selectedOrder.cancelledBy}</span>
                      </div>
                      <div>
                        <span className="font-medium">Lý do: </span>
                        <span className={getCancelReasonColor(selectedOrder.cancelReason)}>
                          {selectedOrder.cancelReason}
                        </span>
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
                      <CardTitle className="text-lg">Món đã hủy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedOrder.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b">
                            <div>
                              <span className="font-medium">{item.name}</span>
                              <span className="text-muted-foreground ml-2">x{item.quantity}</span>
                            </div>
                            <span className="font-medium">{formatCurrency(item.totalPrice)}</span>
                          </div>
                        ))}
                        <div className="flex justify-between items-center py-2 font-bold text-lg">
                          <span>Tổng cộng:</span>
                          <span className="text-red-600">{formatCurrency(selectedOrder.orderDetails.totalAmount)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notes */}
                  {selectedOrder.orderNotes && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Ghi chú</CardTitle>
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
                      handleRestoreOrder(selectedOrder.id);
                      setSelectedOrder(null);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Khôi phục đơn hàng
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
      </main>
    </div>
  );
};

export default CancelledOrders;
