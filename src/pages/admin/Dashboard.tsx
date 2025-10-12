import AdminSidebar from "@/components/admin/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, Calendar, History } from "lucide-react";
import RevenueChart from "@/components/RevenueChart";

const stats = [
  {
    title: "Tổng doanh thu",
    value: "0đ",
    change: "0%",
    trend: "up" as const,
    icon: DollarSign
  },
  {
    title: "Đơn hàng hôm nay",
    value: "0",
    change: "0%",
    trend: "up" as const,
    icon: ShoppingCart
  },
  {
    title: "Khách hàng mới",
    value: "0",
    change: "0%",
    trend: "up" as const,
    icon: Users
  },
  {
    title: "Sản phẩm",
    value: "0",
    change: "0%",
    trend: "up" as const,
    icon: Package
  }
];


const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">Tổng quan</h1>
          <p className="text-muted-foreground">Theo dõi hoạt động kinh doanh</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
            return (
              <Card key={index} className="animate-fade-up" style={{ animationDelay: `${index * 50}ms` }}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl lg:text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-1 text-xs lg:text-sm mt-1">
                    <TrendIcon className={`h-3 w-3 lg:h-4 lg:w-4 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`} />
                    <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                      {stat.change}
                    </span>
                    <span className="text-muted-foreground hidden sm:inline">so với hôm qua</span>
                    <span className="text-muted-foreground sm:hidden">vs hôm qua</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Revenue Chart - Full Width */}
        <div className="mb-6 lg:mb-8">
          <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
            <RevenueChart />
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="animate-fade-up mb-6 lg:mb-8" style={{ animationDelay: "250ms" }}>
          <CardHeader>
            <CardTitle>Thao tác nhanh</CardTitle>
            <CardDescription>Các chức năng thường dùng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3">
                  <Package className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Quản lý sản phẩm</h3>
                    <p className="text-sm text-muted-foreground">Thêm, sửa sản phẩm</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold">Sự kiện</h3>
                    <p className="text-sm text-muted-foreground">Tạo sự kiện, mã giảm giá</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="font-semibold">Khách hàng</h3>
                    <p className="text-sm text-muted-foreground">Xem thông tin khách hàng</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3">
                  <History className="h-8 w-8 text-orange-600" />
                  <div>
                    <h3 className="font-semibold">Lịch sử</h3>
                    <p className="text-sm text-muted-foreground">Xem lịch sử hoạt động</p>
                  </div>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>


        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <Card className="animate-fade-up" style={{ animationDelay: "400ms" }}>
            <CardHeader>
              <CardTitle>Chi phí</CardTitle>
              <CardDescription>Chi phí hôm nay</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Nguyên liệu</span>
                  <span className="font-medium">0đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Nhân sự</span>
                  <span className="font-medium">0đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Khác</span>
                  <span className="font-medium">0đ</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-up" style={{ animationDelay: "450ms" }}>
            <CardHeader>
              <CardTitle>Thống kê</CardTitle>
              <CardDescription>Tổng quan tháng này</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tổng doanh thu</span>
                  <span className="font-bold text-green-600">0đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tổng chi phí</span>
                  <span className="font-bold text-red-600">0đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Lợi nhuận</span>
                  <span className="font-bold text-primary">0đ</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;