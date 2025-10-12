import AdminSidebar from "@/components/admin/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  Package
} from "lucide-react";
import { useState } from "react";

// Mock data for confirmed orders
const confirmedOrders = [
  {
    id: "ORD-001",
    customerName: "Nguyễn Văn A",
    customerPhone: "0123456789",
    customerAddress: "123 Đường ABC, Quận 1, TP.HCM",
    orderTime: "2024-01-15 14:30",
    totalAmount: 150000,
    items: [
      { name: "Cà phê đen", quantity: 2, price: 25000 },
      { name: "Bánh mì thịt", quantity: 1, price: 30000 },
      { name: "Nước cam", quantity: 1, price: 20000 }
    ],
    notes: "Không đường, ít đá",
    status: "confirmed"
  },
  {
    id: "ORD-002", 
    customerName: "Trần Thị B",
    customerPhone: "0987654321",
    customerAddress: "456 Đường XYZ, Quận 3, TP.HCM",
    orderTime: "2024-01-15 15:15",
    totalAmount: 89000,
    items: [
      { name: "Trà sữa trân châu", quantity: 1, price: 35000 },
      { name: "Bánh ngọt", quantity: 2, price: 27000 }
    ],
    notes: "Trân châu ít",
    status: "confirmed"
  },
  {
    id: "ORD-003",
    customerName: "Lê Văn C", 
    customerPhone: "0369852147",
    customerAddress: "789 Đường DEF, Quận 5, TP.HCM",
    orderTime: "2024-01-15 16:00",
    totalAmount: 120000,
    items: [
      { name: "Cà phê sữa", quantity: 1, price: 25000 },
      { name: "Bánh mì pate", quantity: 1, price: 25000 },
      { name: "Sinh tố bơ", quantity: 1, price: 40000 },
      { name: "Bánh flan", quantity: 1, price: 30000 }
    ],
    notes: "Giao hàng nhanh",
    status: "confirmed"
  }
];

const ConfirmedOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = confirmedOrders.filter(order =>
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerPhone.includes(searchQuery)
  );

  const handleStartOrder = (orderId) => {
    // Logic to move order to in-progress status
    console.log(`Starting order ${orderId}`);
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

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl lg:text-4xl font-bold text-foreground">Đơn hàng xác nhận</h1>
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
              <div className="text-2xl font-bold">{confirmedOrders.length}</div>
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
                {formatCurrency(confirmedOrders.reduce((sum, order) => sum + order.totalAmount, 0))}
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
              <div className="text-2xl font-bold">15 phút</div>
              <p className="text-xs text-muted-foreground">thời gian xử lý trung bình</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Đã xác nhận
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
                      onClick={() => handleStartOrder(order.id)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Bắt đầu
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <div className="text-lg font-bold text-green-600">
                      {formatCurrency(order.totalAmount)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {order.items.length} món
                    </div>
                  </div>

                  {/* Items Preview */}
                  <div className="space-y-1">
                    <span className="text-sm font-medium">Món đã đặt:</span>
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
                      <CardTitle className="text-lg">Món đã đặt</CardTitle>
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
                          <span className="text-green-600">{formatCurrency(selectedOrder.totalAmount)}</span>
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
                      handleStartOrder(selectedOrder.id);
                      setSelectedOrder(null);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Bắt đầu làm
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

export default ConfirmedOrders;
