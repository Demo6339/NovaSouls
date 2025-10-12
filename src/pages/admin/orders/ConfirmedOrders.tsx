import AdminSidebar from "@/components/admin/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import OrderCard from "@/components/admin/OrderCard";
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

// Mock data for confirmed orders - matching real order system data
const confirmedOrders = [
  {
    id: "ORD-001",
    orderNumber: "NS-2024-001",
    customerInfo: {
      name: "Nguyễn Văn A",
      phone: "0123456789",
      email: "nguyenvana@email.com",
      address: {
        street: "123 Đường ABC",
        ward: "Phường Bến Nghé",
        district: "Quận 1",
        city: "TP.HCM",
        fullAddress: "123 Đường ABC, Phường Bến Nghé, Quận 1, TP.HCM"
      }
    },
    orderDetails: {
      orderTime: "2024-01-15T14:30:00Z",
      orderType: "delivery", // delivery, pickup, dine-in
      paymentMethod: "cash", // cash, card, momo, zalo
      paymentStatus: "pending", // pending, paid, failed
      deliveryFee: 15000,
      serviceFee: 5000,
      discount: 0,
      subtotal: 130000,
      totalAmount: 150000
    },
    items: [
      { 
        id: 1,
        name: "Soju Chamisul", 
        quantity: 2, 
        unitPrice: 25000,
        totalPrice: 50000,
        category: "soju",
        temperature: "lạnh",
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        customizations: [],
        notes: "Soju truyền thống Hàn Quốc"
      },
      { 
        id: 4,
        name: "Mojito", 
        quantity: 1, 
        unitPrice: 45000,
        totalPrice: 45000,
        category: "cocktail",
        temperature: "lạnh",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        customizations: [],
        notes: "Cocktail tươi mát"
      },
      { 
        id: 6,
        name: "Espresso", 
        quantity: 1, 
        unitPrice: 20000,
        totalPrice: 20000,
        category: "coffee",
        temperature: "nóng",
        image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        customizations: [],
        notes: "Cà phê đậm đặc"
      }
    ],
    orderNotes: "Giao hàng trước 15:30, gọi điện trước khi giao",
    status: "confirmed",
    createdAt: "2024-01-15T14:30:00Z",
    updatedAt: "2024-01-15T14:30:00Z"
  },
  {
    id: "ORD-002", 
    orderNumber: "NS-2024-002",
    customerInfo: {
      name: "Trần Thị B",
      phone: "0987654321",
      email: "tranthib@email.com",
      address: {
        street: "456 Đường XYZ",
        ward: "Phường 2",
        district: "Quận 3",
        city: "TP.HCM",
        fullAddress: "456 Đường XYZ, Phường 2, Quận 3, TP.HCM"
      }
    },
    orderDetails: {
      orderTime: "2024-01-15T15:15:00Z",
      orderType: "pickup",
      paymentMethod: "momo",
      paymentStatus: "paid",
      deliveryFee: 0,
      serviceFee: 2000,
      discount: 10000,
      subtotal: 64000,
      totalAmount: 56000
    },
    items: [
      { 
        id: 5,
        name: "Cosmopolitan", 
        quantity: 1, 
        unitPrice: 50000,
        totalPrice: 50000,
        category: "cocktail",
        temperature: "lạnh",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        customizations: [],
        notes: "Cocktail sang trọng và quyến rũ"
      },
      { 
        id: 2,
        name: "Soju Yuja", 
        quantity: 2, 
        unitPrice: 30000,
        totalPrice: 60000,
        category: "soju",
        temperature: "lạnh",
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        customizations: [],
        notes: "Soju hương chanh yuja"
      }
    ],
    orderNotes: "Trân châu ít đường",
    status: "confirmed",
    createdAt: "2024-01-15T15:15:00Z",
    updatedAt: "2024-01-15T15:15:00Z"
  },
  {
    id: "ORD-003",
    orderNumber: "NS-2024-003",
    customerInfo: {
      name: "Lê Văn C", 
      phone: "0369852147",
      email: "levanc@email.com",
      address: {
        street: "789 Đường DEF",
        ward: "Phường 5",
        district: "Quận 5",
        city: "TP.HCM",
        fullAddress: "789 Đường DEF, Phường 5, Quận 5, TP.HCM"
      }
    },
    orderDetails: {
      orderTime: "2024-01-15T16:00:00Z",
      orderType: "delivery",
      paymentMethod: "card",
      paymentStatus: "paid",
      deliveryFee: 15000,
      serviceFee: 5000,
      discount: 0,
      subtotal: 100000,
      totalAmount: 120000
    },
    items: [
      { 
        id: 7,
        name: "Cappuccino", 
        quantity: 1, 
        unitPrice: 25000,
        totalPrice: 25000,
        category: "coffee",
        temperature: "nóng",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        customizations: [],
        notes: "Cà phê sữa Ý"
      },
      { 
        id: 3,
        name: "Soju Peach", 
        quantity: 1, 
        unitPrice: 35000,
        totalPrice: 35000,
        category: "soju",
        temperature: "lạnh",
        image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        customizations: [],
        notes: "Soju hương đào"
      },
      { 
        id: 8,
        name: "Orange Juice", 
        quantity: 1, 
        unitPrice: 40000,
        totalPrice: 40000,
        category: "juice",
        temperature: "lạnh",
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        customizations: [],
        notes: "Nước cam tươi"
      },
      { 
        id: "ITEM-009",
        name: "Bánh flan", 
        quantity: 1, 
        unitPrice: 30000,
        totalPrice: 30000,
        category: "dessert",
        customizations: [],
        notes: ""
      }
    ],
    orderNotes: "Giao hàng nhanh, gọi điện trước khi giao",
    status: "confirmed",
    createdAt: "2024-01-15T16:00:00Z",
    updatedAt: "2024-01-15T16:00:00Z"
  }
];

const ConfirmedOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [orders, setOrders] = useState(confirmedOrders);

  const filteredOrders = orders.filter(order =>
    order.customerInfo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerInfo.phone.includes(searchQuery)
  );

  const handleAcceptOrder = (orderId) => {
    // Remove order from confirmed orders (it will move to in-progress)
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    console.log(`Order ${orderId} accepted and moved to in-progress`);
  };

  const handleCancelOrder = (orderId) => {
    setOrderToCancel(orderId);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    if (cancelReason.trim()) {
      // Remove order from confirmed orders (it will move to cancelled)
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderToCancel));
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
              <div className="text-2xl font-bold">15 phút</div>
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
