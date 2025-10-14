import { useState } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Eye, Calendar, Clock, User, CreditCard, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const OrderHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Dữ liệu mẫu cho lịch sử đơn hàng
  const orderHistory = [
    {
      id: "ORD001",
      customerName: "Nguyễn Văn A",
      phone: "0123456789",
      email: "nguyenvana@gmail.com",
      items: [
        { name: "Phở Bò", quantity: 2, price: 50000 },
        { name: "Coca Cola", quantity: 1, price: 15000 },
        { name: "Bánh mì", quantity: 1, price: 25000 }
      ],
      total: 115000,
      status: "completed",
      paymentMethod: "cash",
      orderDate: "2024-01-15T10:30:00",
      completedDate: "2024-01-15T11:00:00",
      notes: "Không hành, ít rau"
    },
    {
      id: "ORD002",
      customerName: "Trần Thị B",
      phone: "0987654321",
      email: "",
      items: [
        { name: "Bún Chả", quantity: 1, price: 45000 },
        { name: "Nước mía", quantity: 1, price: 20000 }
      ],
      total: 65000,
      status: "cancelled",
      paymentMethod: "transfer",
      orderDate: "2024-01-15T12:15:00",
      cancelledDate: "2024-01-15T12:30:00",
      notes: "Khách hủy do thay đổi ý định"
    },
    {
      id: "ORD003",
      customerName: "Lê Văn C",
      phone: "0369258147",
      email: "levanc@yahoo.com",
      items: [
        { name: "Cơm Tấm", quantity: 1, price: 40000 },
        { name: "Trà đá", quantity: 1, price: 10000 },
        { name: "Chả cá", quantity: 1, price: 30000 },
        { name: "Bún riêu", quantity: 1, price: 35000 }
      ],
      total: 115000,
      status: "in_progress",
      paymentMethod: "cash",
      orderDate: "2024-01-14T18:45:00",
      completedDate: "",
      notes: ""
    },
    {
      id: "ORD004",
      customerName: "Phạm Thị D",
      phone: "0912345678",
      email: "",
      items: [
        { name: "Bánh xèo", quantity: 2, price: 60000 }
      ],
      total: 60000,
      status: "confirmed",
      paymentMethod: "transfer",
      orderDate: "2024-01-14T16:20:00",
      completedDate: "",
      notes: ""
    },
    {
      id: "ORD005",
      customerName: "Hoàng Văn E",
      phone: "0987654321",
      email: "hoangvane@outlook.com",
      items: [
        { name: "Phở Gà", quantity: 1, price: 45000 },
        { name: "Nước cam", quantity: 1, price: 20000 },
        { name: "Bánh mì pate", quantity: 1, price: 25000 },
        { name: "Chè đậu đỏ", quantity: 1, price: 15000 },
        { name: "Bún bò Huế", quantity: 1, price: 55000 }
      ],
      total: 160000,
      status: "pending",
      paymentMethod: "cash",
      orderDate: "2024-01-14T14:30:00",
      completedDate: "",
      notes: ""
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Đã đặt', className: 'bg-blue-500' },
      confirmed: { label: 'Xác nhận', className: 'bg-yellow-500' },
      in_progress: { label: 'Đang làm', className: 'bg-orange-500' },
      completed: { label: 'Hoàn thành', className: 'bg-green-500' },
      cancelled: { label: 'Bị hủy', className: 'bg-red-500' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getPaymentMethodIcon = (method: string) => {
    return method === 'cash' ? <CreditCard className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />;
  };

  const getPaymentMethodLabel = (method: string) => {
    return method === 'cash' ? 'Tiền mặt' : 'Chuyển khoản';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };


  const handleViewDetail = (order: any) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const filteredOrders = orderHistory.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.phone.includes(searchQuery);
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">Lịch sử đơn hàng</h1>
          <p className="text-muted-foreground">Xem lịch sử tất cả đơn hàng đã xử lý</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Tìm kiếm theo tên khách, mã đơn hàng, SĐT..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="pending">Đã đặt</SelectItem>
                <SelectItem value="confirmed">Xác nhận</SelectItem>
                <SelectItem value="in_progress">Đang làm</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="cancelled">Bị hủy</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-gradient-hero">
              <Download className="mr-2 h-4 w-4" />
              Xuất Excel
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách đơn hàng ({filteredOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã đơn</TableHead>
                    <TableHead>Khách hàng</TableHead>
                    <TableHead>Tổng tiền</TableHead>
                    <TableHead>Thanh toán</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        <code className="bg-muted px-2 py-1 rounded text-sm">{order.id}</code>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-sm text-muted-foreground">{order.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(order.total)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          {getPaymentMethodIcon(order.paymentMethod)}
                          {getPaymentMethodLabel(order.paymentMethod)}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {formatDateTime(order.orderDate).split(',')[0]}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {formatDateTime(order.orderDate).split(',')[1]}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" title="Xem chi tiết" onClick={() => handleViewDetail(order)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card Layout */}
            <div className="lg:hidden space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{order.id}</code>
                        {getStatusBadge(order.status)}
                      </div>
                      <h3 className="font-medium text-sm">{order.customerName}</h3>
                      <p className="text-xs text-muted-foreground">{order.phone}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Tổng tiền:</span>
                        <p className="font-medium">{formatCurrency(order.total)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Thanh toán:</span>
                        <div className="flex items-center gap-1 mt-1">
                          {getPaymentMethodIcon(order.paymentMethod)}
                          <span className="text-sm">{getPaymentMethodLabel(order.paymentMethod)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-xs text-muted-foreground">Thời gian:</span>
                      <p className="text-sm">{formatDateTime(order.orderDate)}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2 border-t">
                    <Button variant="outline" size="sm" title="Xem chi tiết" onClick={() => handleViewDetail(order)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detail Modal */}
        <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chi tiết đơn hàng</DialogTitle>
              <DialogDescription>
                Thông tin chi tiết về đơn hàng
              </DialogDescription>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Mã đơn hàng</h3>
                    <p className="text-lg font-medium">{selectedOrder.id}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Trạng thái</h3>
                    <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Thông tin khách hàng</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm font-medium">Tên: </span>
                      <span className="text-sm">{selectedOrder.customerName}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Số điện thoại: </span>
                      <span className="text-sm">{selectedOrder.phone}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Email: </span>
                      <span className="text-sm">{selectedOrder.email || "Không có"}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Chi tiết món ăn</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {selectedOrder.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div className="flex-1">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-sm text-muted-foreground ml-2">x{item.quantity}</span>
                        </div>
                        <span className="font-medium text-right">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg font-medium text-lg">
                      <span>Tổng cộng:</span>
                      <span>{formatCurrency(selectedOrder.total)}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Phương thức thanh toán</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {getPaymentMethodIcon(selectedOrder.paymentMethod)}
                      <span className="text-sm">{getPaymentMethodLabel(selectedOrder.paymentMethod)}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Thời gian đặt hàng</h3>
                    <p className="text-sm mt-1">{formatDateTime(selectedOrder.orderDate)}</p>
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Ghi chú</h3>
                    <p className="text-sm mt-1 p-2 bg-muted rounded">{selectedOrder.notes}</p>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                    Đóng
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default OrderHistory;
