import AdminSidebar from "@/components/admin/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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

// Mock data for in-progress orders
const inProgressOrders = [
  {
    id: "ORD-004",
    customerName: "Phạm Thị D",
    customerPhone: "0123456789",
    customerAddress: "321 Đường GHI, Quận 2, TP.HCM",
    orderTime: "2024-01-15 16:30",
    startTime: "2024-01-15 16:35",
    estimatedTime: 20,
    totalAmount: 180000,
    items: [
      { name: "Cà phê đen", quantity: 2, price: 25000 },
      { name: "Bánh mì thịt", quantity: 1, price: 30000 },
      { name: "Nước cam", quantity: 1, price: 20000 },
      { name: "Bánh ngọt", quantity: 2, price: 27000 }
    ],
    notes: "Cà phê ít đường",
    status: "in-progress",
    progress: 60
  },
  {
    id: "ORD-005", 
    customerName: "Hoàng Văn E",
    customerPhone: "0987654321",
    customerAddress: "654 Đường JKL, Quận 7, TP.HCM",
    orderTime: "2024-01-15 17:00",
    startTime: "2024-01-15 17:05",
    estimatedTime: 15,
    totalAmount: 95000,
    items: [
      { name: "Trà sữa trân châu", quantity: 1, price: 35000 },
      { name: "Bánh flan", quantity: 1, price: 30000 },
      { name: "Sinh tố dâu", quantity: 1, price: 30000 }
    ],
    notes: "Trân châu nhiều",
    status: "in-progress",
    progress: 30
  }
];

const InProgressOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = inProgressOrders.filter(order =>
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerPhone.includes(searchQuery)
  );

  const handleCompleteOrder = (orderId) => {
    // Logic to complete order
    console.log(`Completing order ${orderId}`);
  };

  const handleCancelOrder = (orderId) => {
    // Logic to cancel order
    console.log(`Cancelling order ${orderId}`);
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
              <div className="text-2xl font-bold">{inProgressOrders.length}</div>
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
                {formatCurrency(inProgressOrders.reduce((sum, order) => sum + order.totalAmount, 0))}
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
                {Math.round(inProgressOrders.reduce((sum, order) => sum + order.estimatedTime, 0) / inProgressOrders.length)} phút
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
                {Math.round(inProgressOrders.reduce((sum, order) => sum + order.progress, 0) / inProgressOrders.length)}%
              </div>
              <p className="text-xs text-muted-foreground">hoàn thành</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const timeRemaining = getTimeRemaining(order.startTime, order.estimatedTime);
            return (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        <Clock className="h-3 w-3 mr-1" />
                        Đang làm
                      </Badge>
                      <CardTitle className="text-lg">#{order.id}</CardTitle>
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
                        size="sm"
                        onClick={() => handleCompleteOrder(order.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Hoàn thành
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancelOrder(order.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Hủy
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
                      <div className="text-lg font-bold text-blue-600">
                        {formatCurrency(order.totalAmount)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {order.items.length} món
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Tiến độ</span>
                        <span className="text-sm text-muted-foreground">{order.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(order.progress)}`}
                          style={{ width: `${order.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Còn lại: {timeRemaining} phút
                      </div>
                    </div>

                    {/* Items Preview */}
                    <div className="space-y-1">
                      <span className="text-sm font-medium">Món đang làm:</span>
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
            );
          })}
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
                      <CardTitle className="text-lg">Tiến độ làm món</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Hoàn thành</span>
                          <span className="text-lg font-bold">{selectedOrder.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(selectedOrder.progress)}`}
                            style={{ width: `${selectedOrder.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Bắt đầu: {selectedOrder.startTime}</span>
                          <span>Còn lại: {getTimeRemaining(selectedOrder.startTime, selectedOrder.estimatedTime)} phút</span>
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
                      <CardTitle className="text-lg">Món đang làm</CardTitle>
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
                          <span className="text-blue-600">{formatCurrency(selectedOrder.totalAmount)}</span>
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
                      handleCompleteOrder(selectedOrder.id);
                      setSelectedOrder(null);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Hoàn thành đơn hàng
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

export default InProgressOrders;
