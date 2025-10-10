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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
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
  AlertCircle,
  Menu
} from "lucide-react";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("account");
  const [showPassword, setShowPassword] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const [user] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
    address: "",
    joinDate: "",
    totalOrders: 0,
    totalSpent: 0,
    loyaltyPoints: 0
  });

  const currentOrders = [];

  const orderHistory = [];

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
    <div className="space-y-4 md:space-y-6">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="h-24 md:h-32 bg-gradient-to-r from-purple-500 to-pink-500 relative">
          <div className="absolute -bottom-8 md:-bottom-12 left-4 md:left-6">
            <Avatar className="h-16 w-16 md:h-24 md:w-24 border-4 border-white shadow-lg">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-lg md:text-2xl bg-white text-purple-600 font-bold">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <CardContent className="pt-10 md:pt-16 pb-4 md:pb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm md:text-base text-gray-600">{user.email}</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-xs md:text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="truncate">{user.address}</span>
                </span>
                <span className="hidden sm:inline">•</span>
                <span>Thành viên từ {user.joinDate ? new Date(user.joinDate).toLocaleDateString('vi-VN') : 'Chưa có thông tin'}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2 self-start">
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Đổi ảnh</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <Card>
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-gray-600">Tổng đơn hàng</p>
                <p className="text-lg md:text-2xl font-bold text-purple-600">{user.totalOrders}</p>
              </div>
              <Package className="h-6 w-6 md:h-8 md:w-8 text-purple-400 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-gray-600">Tổng chi tiêu</p>
                <p className="text-lg md:text-2xl font-bold text-green-600 truncate">{user.totalSpent.toLocaleString('vi-VN')}đ</p>
              </div>
              <CreditCard className="h-6 w-6 md:h-8 md:w-8 text-green-400 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
        <Card className="sm:col-span-2 lg:col-span-1">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-gray-600">Điểm tích lũy</p>
                <p className="text-lg md:text-2xl font-bold text-amber-600">{user.loyaltyPoints}</p>
              </div>
              <Star className="h-6 w-6 md:h-8 md:w-8 text-amber-400 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personal Information Form */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg md:text-xl">Thông tin cá nhân</CardTitle>
          <CardDescription className="text-sm">Cập nhật thông tin tài khoản của bạn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm">Họ và tên</Label>
              <Input id="name" defaultValue={user.name} className="h-10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="email" type="email" defaultValue={user.email} className="pl-10 h-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm">Số điện thoại</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="phone" type="tel" defaultValue={user.phone} className="pl-10 h-10" />
              </div>
            </div>
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="address" className="text-sm">Địa chỉ</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="address" defaultValue={user.address} className="pl-10 h-10" />
              </div>
            </div>
          </div>
          <Button className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            Lưu thay đổi
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderOrdersSection = () => (
    <div className="space-y-4 md:space-y-6">
      {/* Current Orders */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Package className="h-5 w-5" />
            Đơn hàng hiện tại
          </CardTitle>
          <CardDescription className="text-sm">Theo dõi trạng thái đơn hàng realtime</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentOrders.map((order) => (
            <div key={order.id} className="border rounded-xl p-4 md:p-6 space-y-3 md:space-y-4 bg-gradient-to-r from-white to-gray-50">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">#{order.id}</h3>
                    <p className="text-xs md:text-sm text-gray-600">{order.date}</p>
                  </div>
                </div>
                <div className="self-start sm:self-auto">
                  {getStatusBadge(order.status)}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs md:text-sm">
                  <span>Tiến độ</span>
                  <span>{order.progress}%</span>
                </div>
                <Progress value={order.progress} className="h-2" />
                <p className="text-xs md:text-sm text-gray-600">Dự kiến: {order.estimatedTime}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm md:text-base">Sản phẩm:</h4>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs md:text-sm">
                    <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <span className="text-lg md:text-2xl font-bold text-purple-600">
                    {order.total.toLocaleString('vi-VN')}đ
                  </span>
                  <p className="text-xs md:text-sm text-gray-600">Mã theo dõi: {order.trackingNumber}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Chi tiết</Button>
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Hủy đơn</Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Order History */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <ShoppingBag className="h-5 w-5" />
            Lịch sử đơn hàng
          </CardTitle>
          <CardDescription className="text-sm">Các đơn hàng đã hoàn thành hoặc hủy</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm đơn hàng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("all")}
                className="whitespace-nowrap"
              >
                Tất cả
              </Button>
              <Button
                variant={filterStatus === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("completed")}
                className="whitespace-nowrap"
              >
                Hoàn thành
              </Button>
              <Button
                variant={filterStatus === "cancelled" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("cancelled")}
                className="whitespace-nowrap"
              >
                Đã hủy
              </Button>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="border rounded-xl p-3 md:p-4 space-y-3 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="font-semibold text-sm md:text-base">#{order.id}</h3>
                      <p className="text-xs md:text-sm text-gray-600">{order.date}</p>
                    </div>
                  </div>
                  <div className="self-start sm:self-auto">
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                <div className="space-y-1">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-xs md:text-sm truncate">{item}</p>
                  ))}
                </div>

                {order.rating && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 md:h-4 md:w-4 ${
                            i < order.rating! ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs md:text-sm text-gray-600">{order.review}</span>
                  </div>
                )}

                <Separator />

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <span className="text-lg md:text-xl font-bold text-gray-900">
                    {order.total.toLocaleString('vi-VN')}đ
                  </span>
                  <div className="flex gap-2">
                    {order.status === "completed" && (
                      <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Đặt lại</Button>
                    )}
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Chi tiết</Button>
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
    <div className="space-y-4 md:space-y-6">
      {/* Security Settings */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Shield className="h-5 w-5" />
            Bảo mật
          </CardTitle>
          <CardDescription className="text-sm">Quản lý mật khẩu và bảo mật tài khoản</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-sm md:text-base">Đổi mật khẩu</h3>
            <div className="grid gap-3 md:gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-sm">Mật khẩu hiện tại</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showPassword ? "text" : "password"}
                    className="pr-10 h-10"
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
                <Label htmlFor="new-password" className="text-sm">Mật khẩu mới</Label>
                <Input id="new-password" type="password" className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-sm">Xác nhận mật khẩu</Label>
                <Input id="confirm-password" type="password" className="h-10" />
              </div>
            </div>
            <Button className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Cập nhật mật khẩu
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Eye className="h-5 w-5" />
            Quyền riêng tư
          </CardTitle>
          <CardDescription className="text-sm">Kiểm soát thông tin cá nhân và thông báo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm md:text-base">Nhận email khuyến mãi</p>
                <p className="text-xs md:text-sm text-gray-600">
                  Nhận thông tin về ưu đãi và sự kiện mới
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm md:text-base">Nhận thông báo đơn hàng</p>
                <p className="text-xs md:text-sm text-gray-600">
                  Cập nhật trạng thái đơn hàng qua email
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm md:text-base">Hiển thị thông tin công khai</p>
                <p className="text-xs md:text-sm text-gray-600">
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
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Bell className="h-5 w-5" />
            Thông báo
          </CardTitle>
          <CardDescription className="text-sm">Tùy chỉnh cách bạn nhận thông báo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm md:text-base">Thông báo push</p>
              <p className="text-xs md:text-sm text-gray-600">Nhận thông báo trên thiết bị</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm md:text-base">Thông báo SMS</p>
              <p className="text-xs md:text-sm text-gray-600">Nhận tin nhắn văn bản</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-red-600 text-lg md:text-xl">
            <AlertCircle className="h-5 w-5" />
            Vùng nguy hiểm
          </CardTitle>
          <CardDescription className="text-sm">Các hành động không thể hoàn tác</CardDescription>
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
      <main className="flex-1 py-4 md:py-8">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">Tài khoản của tôi</h1>
            <p className="text-sm md:text-base text-gray-600">Quản lý thông tin và đơn hàng của bạn</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
            {/* Mobile Navigation */}
            {isMobile && (
              <div className="lg:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Menu className="h-4 w-4" />
                      {sidebarItems.find(item => item.id === activeSection)?.label || "Menu"}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[280px] sm:w-[320px]">
                    <div className="flex flex-col gap-4 mt-6">
                      <h2 className="text-lg font-semibold text-gray-900">Tài khoản của tôi</h2>
                      <nav className="space-y-2">
                        {sidebarItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                setActiveSection(item.id);
                                setIsMobileMenuOpen(false);
                              }}
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
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            )}

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:w-64 flex-shrink-0">
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
