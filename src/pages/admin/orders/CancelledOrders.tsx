import AdminSidebar from "@/components/admin/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  Trash2,
  MoreHorizontal,
  DollarSign,
  Package,
  AlertTriangle,
  Clock
} from "lucide-react";
import { useState } from "react";

// Mock data for cancelled orders
const cancelledOrders = [
  {
    id: "ORD-006",
    customerName: "Võ Thị F",
    customerPhone: "0123456789",
    customerAddress: "987 Đường MNO, Quận 10, TP.HCM",
    orderTime: "2024-01-15 18:00",
    cancelTime: "2024-01-15 18:15",
    totalAmount: 120000,
    items: [
      { name: "Cà phê sữa", quantity: 2, price: 25000 },
      { name: "Bánh mì pate", quantity: 1, price: 25000 },
      { name: "Nước chanh", quantity: 1, price: 20000 }
    ],
    notes: "Giao hàng nhanh",
    status: "cancelled",
    cancelReason: "Khách hàng yêu cầu hủy",
    cancelledBy: "Khách hàng"
  },
  {
    id: "ORD-007", 
    customerName: "Đặng Văn G",
    customerPhone: "0987654321",
    customerAddress: "147 Đường PQR, Quận 11, TP.HCM",
    orderTime: "2024-01-15 18:30",
    cancelTime: "2024-01-15 18:45",
    totalAmount: 85000,
    items: [
      { name: "Trà sữa trân châu", quantity: 1, price: 35000 },
      { name: "Bánh flan", quantity: 1, price: 30000 },
      { name: "Sinh tố xoài", quantity: 1, price: 20000 }
    ],
    notes: "Trân châu nhiều",
    status: "cancelled",
    cancelReason: "Hết nguyên liệu",
    cancelledBy: "Quản lý"
  },
  {
    id: "ORD-008",
    customerName: "Bùi Thị H",
    customerPhone: "0369852147",
    customerAddress: "258 Đường STU, Quận 12, TP.HCM",
    orderTime: "2024-01-15 19:00",
    cancelTime: "2024-01-15 19:20",
    totalAmount: 150000,
    items: [
      { name: "Cà phê đen", quantity: 1, price: 25000 },
      { name: "Bánh mì thịt", quantity: 2, price: 30000 },
      { name: "Nước cam", quantity: 1, price: 20000 },
      { name: "Bánh ngọt", quantity: 1, price: 27000 },
      { name: "Sinh tố bơ", quantity: 1, price: 40000 }
    ],
    notes: "Không đường",
    status: "cancelled",
    cancelReason: "Không liên lạc được",
    cancelledBy: "Hệ thống"
  }
];

const CancelledOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterReason, setFilterReason] = useState("all");

  const filteredOrders = cancelledOrders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery);
    
    const matchesReason = filterReason === "all" || 
      order.cancelReason.toLowerCase().includes(filterReason.toLowerCase());
    
    return matchesSearch && matchesReason;
  });

  const handleRestoreOrder = (orderId) => {
    // Logic to restore order
    console.log(`Restoring order ${orderId}`);
  };

  const handleDeleteOrder = (orderId) => {
    // Logic to permanently delete order
    console.log(`Deleting order ${orderId}`);
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
              <div className="text-2xl font-bold text-red-600">{cancelledOrders.length}</div>
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
                {formatCurrency(cancelledOrders.reduce((sum, order) => sum + order.totalAmount, 0))}
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
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow border-l-4 border-red-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      <XCircle className="h-3 w-3 mr-1" />
                      Đã hủy
                    </Badge>
                    <CardTitle className="text-lg">#{order.id}</CardTitle>
                    <Badge variant="outline" className={getCancelledByColor(order.cancelledBy)}>
                      {order.cancelledBy}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Chi tiết
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRestoreOrder(order.id)}
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Khôi phục
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteOrder(order.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Xóa
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Customer Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{order.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{order.customerPhone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="text-sm text-muted-foreground">{order.customerAddress}</span>
                    </div>
                  </div>

                  {/* Order Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{order.orderTime}</span>
                    </div>
                    <div className="text-lg font-bold text-red-600">
                      {formatCurrency(order.totalAmount)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {order.items.length} món
                    </div>
                  </div>

                  {/* Cancel Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Hủy: {order.cancelTime}</span>
                    </div>
                    <div className="text-sm font-medium">
                      Lý do: <span className={getCancelReasonColor(order.cancelReason)}>{order.cancelReason}</span>
                    </div>
                  </div>

                  {/* Items Preview */}
                  <div className="space-y-1">
                    <span className="text-sm font-medium">Món đã hủy:</span>
                    <div className="space-y-1">
                      {order.items.slice(0, 2).map((item, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          {item.quantity}x {item.name}
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="text-sm text-muted-foreground">
                          +{order.items.length - 2} món khác
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {order.notes && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Ghi chú: </span>
                    <span className="text-sm text-muted-foreground">{order.notes}</span>
                  </div>
                )}
              </CardContent>
            </Card>
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
                        <span>{selectedOrder.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedOrder.customerPhone}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span>{selectedOrder.customerAddress}</span>
                      </div>
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
                            <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                          </div>
                        ))}
                        <div className="flex justify-between items-center py-2 font-bold text-lg">
                          <span>Tổng cộng:</span>
                          <span className="text-red-600">{formatCurrency(selectedOrder.totalAmount)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notes */}
                  {selectedOrder.notes && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Ghi chú</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{selectedOrder.notes}</p>
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
