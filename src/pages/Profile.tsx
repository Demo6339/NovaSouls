import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Camera,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Search,
  Filter,
  Download,
  Star,
  Heart,
  MessageCircle,
  Truck,
  Package,
  AlertCircle
} from "lucide-react";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("account");
  const [showPassword, setShowPassword] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [user] = useState({
    name: "Nguyễn Văn A",
    email: "user@example.com",
    phone: "0123456789",
    avatar: "",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    joinDate: "2024-01-15",
    totalOrders: 24,
    totalSpent: 2450000,
    loyaltyPoints: 1250
  });

  const currentOrders = [
    {
      id: "ORD001",
      date: "2025-01-09 14:30",
      total: 165000,
      status: "preparing",
      progress: 60,
      items: ["Signature Latte x2", "Croissant Bơ x1"],
      estimatedTime: "15 phút",
      trackingNumber: "TRK123456789"
    },
    {
      id: "ORD002", 
      date: "2025-01-09 16:45",
      total: 89000,
      status: "shipping",
      progress: 80,
      items: ["Cappuccino x1", "Tiramisu x1"],
      estimatedTime: "5 phút",
      trackingNumber: "TRK987654321"
    }
  ];

  const orderHistory = [
    {
      id: "ORD003",
      date: "2025-01-08 10:15",
      total: 95000,
      status: "completed",
      items: ["Cappuccino x1", "Tiramisu x1"],
      rating: 5,
      review: "Rất ngon và phục vụ nhanh!"
    },
    {
      id: "ORD004",
      date: "2025-01-07 16:45",
      total: 50000,
      status: "cancelled",
      items: ["Americano x1"],
      reason: "Thay đổi ý định"
    },
    {
      id: "ORD005",
      date: "2025-01-06 09:30",
      total: 120000,
      status: "completed",
      items: ["Signature Latte x1", "Croissant x2"],
      rating: 4,
      review: "Tốt nhưng hơi chậm"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      preparing: { label: "Đang chuẩn bị", className: "bg-amber-100 text-amber-800 border-amber-200" },
      shipping: { label: "Đang giao", className: "bg-blue-100 text-blue-800 border-blue-200" },
      completed: { label: "Hoàn thành", className: "bg-green-100 text-green-800 border-green-200" },
      cancelled: { label: "Đã hủy", className: "bg-red-100 text-red-800 border-red-200" },
    };
    const variant = variants[status as keyof typeof variants];
    return (
      <Badge className={`${variant.className} border`}>
        {variant.label}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      preparing: <Clock className="h-4 w-4 text-amber-600" />,
      shipping: <Truck className="h-4 w-4 text-blue-600" />,
      completed: <CheckCircle2 className="h-4 w-4 text-green-600" />,
      cancelled: <XCircle className="h-4 w-4 text-red-600" />,
    };
    return icons[status as keyof typeof icons];
  };

  const filteredOrders = orderHistory.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sidebarItems = [
    { id: "account", label: "Thông tin tài khoản", icon: User },
    { id: "orders", label: "Đơn hàng", icon: ShoppingBag },
    { id: "settings", label: "Cài đặt", icon: Settings },
  ];

  const renderAccountSection = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-500 relative">
          <div className="absolute -bottom-12 left-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-2xl bg-white text-purple-600 font-bold">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <CardContent className="pt-16 pb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {user.address}
                </span>
                <span>Thành viên từ {new Date(user.joinDate).toLocaleDateString('vi-VN')}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Đổi ảnh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng đơn hàng</p>
                <p className="text-2xl font-bold text-purple-600">{user.totalOrders}</p>
              </div>
              <Package className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng chi tiêu</p>
                <p className="text-2xl font-bold text-green-600">{user.totalSpent.toLocaleString('vi-VN')}đ</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Điểm tích lũy</p>
                <p className="text-2xl font-bold text-amber-600">{user.loyaltyPoints}</p>
              </div>
              <Star className="h-8 w-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personal Information Form */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin cá nhân</CardTitle>
          <CardDescription>Cập nhật thông tin tài khoản của bạn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên</Label>
              <Input id="name" defaultValue={user.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="email" type="email" defaultValue={user.email} className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="phone" type="tel" defaultValue={user.phone} className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Địa chỉ</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="address" defaultValue={user.address} className="pl-10" />
              </div>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            Lưu thay đổi
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderOrdersSection = () => (
    <div className="space-y-6">
      {/* Current Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Đơn hàng hiện tại
          </CardTitle>
          <CardDescription>Theo dõi trạng thái đơn hàng realtime</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentOrders.map((order) => (
            <div key={order.id} className="border rounded-xl p-6 space-y-4 bg-gradient-to-r from-white to-gray-50">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <h3 className="font-semibold text-lg">#{order.id}</h3>
                    <p className="text-sm text-gray-600">{order.date}</p>
                  </div>
                </div>
                {getStatusBadge(order.status)}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tiến độ</span>
                  <span>{order.progress}%</span>
                </div>
                <Progress value={order.progress} className="h-2" />
                <p className="text-sm text-gray-600">Dự kiến: {order.estimatedTime}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Sản phẩm:</h4>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold text-purple-600">
                    {order.total.toLocaleString('vi-VN')}đ
                  </span>
                  <p className="text-sm text-gray-600">Mã theo dõi: {order.trackingNumber}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Chi tiết</Button>
                  <Button variant="outline" size="sm">Hủy đơn</Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Order History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Lịch sử đơn hàng
          </CardTitle>
          <CardDescription>Các đơn hàng đã hoàn thành hoặc hủy</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm đơn hàng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("all")}
              >
                Tất cả
              </Button>
              <Button
                variant={filterStatus === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("completed")}
              >
                Hoàn thành
              </Button>
              <Button
                variant={filterStatus === "cancelled" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("cancelled")}
              >
                Đã hủy
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="border rounded-xl p-4 space-y-3 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="font-semibold">#{order.id}</h3>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                  </div>
                  {getStatusBadge(order.status)}
                </div>

                <div className="space-y-1">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-sm">{item}</p>
                  ))}
                </div>

                {order.rating && (
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < order.rating! ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{order.review}</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">
                    {order.total.toLocaleString('vi-VN')}đ
                  </span>
                  <div className="flex gap-2">
                    {order.status === "completed" && (
                      <Button variant="outline" size="sm">Đặt lại</Button>
                    )}
                    <Button variant="outline" size="sm">Chi tiết</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettingsSection = () => (
    <div className="space-y-6">
      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Bảo mật
          </CardTitle>
          <CardDescription>Quản lý mật khẩu và bảo mật tài khoản</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Đổi mật khẩu</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showPassword ? "text" : "password"}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Mật khẩu mới</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Cập nhật mật khẩu
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Quyền riêng tư
          </CardTitle>
          <CardDescription>Kiểm soát thông tin cá nhân và thông báo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Nhận email khuyến mãi</p>
                <p className="text-sm text-gray-600">
                  Nhận thông tin về ưu đãi và sự kiện mới
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Nhận thông báo đơn hàng</p>
                <p className="text-sm text-gray-600">
                  Cập nhật trạng thái đơn hàng qua email
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Hiển thị thông tin công khai</p>
                <p className="text-sm text-gray-600">
                  Cho phép người khác xem thông tin cơ bản
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Thông báo
          </CardTitle>
          <CardDescription>Tùy chỉnh cách bạn nhận thông báo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Thông báo push</p>
              <p className="text-sm text-gray-600">Nhận thông báo trên thiết bị</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Thông báo SMS</p>
              <p className="text-sm text-gray-600">Nhận tin nhắn văn bản</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            Vùng nguy hiểm
          </CardTitle>
          <CardDescription>Các hành động không thể hoàn tác</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="destructive" className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Đăng xuất
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Tài khoản của tôi</h1>
            <p className="text-gray-600">Quản lý thông tin và đơn hàng của bạn</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <Card className="sticky top-8">
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    {sidebarItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveSection(item.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                            activeSection === item.id
                              ? "bg-purple-100 text-purple-700 border border-purple-200"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          {item.label}
                        </button>
                      );
                    })}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {activeSection === "account" && renderAccountSection()}
              {activeSection === "orders" && renderOrdersSection()}
              {activeSection === "settings" && renderSettingsSection()}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
