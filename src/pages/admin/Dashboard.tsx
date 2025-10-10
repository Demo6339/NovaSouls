import AdminSidebar from "@/components/admin/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react";

const stats = [];

const recentOrders = [];

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
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

        {/* Charts & Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Revenue Chart Placeholder */}
          <Card className="animate-fade-up" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <CardTitle>Doanh thu 7 ngày</CardTitle>
              <CardDescription>Biểu đồ doanh thu theo ngày</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 lg:h-64 flex items-center justify-center bg-secondary/20 rounded-lg">
                <p className="text-muted-foreground text-sm lg:text-base">Biểu đồ doanh thu</p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card className="animate-fade-up" style={{ animationDelay: "300ms" }}>
            <CardHeader>
              <CardTitle>Đơn hàng gần đây</CardTitle>
              <CardDescription>Cập nhật realtime</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 lg:space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-2">
                    <div className="flex-1">
                      <p className="font-medium text-sm lg:text-base">#{order.id}</p>
                      <p className="text-xs lg:text-sm text-muted-foreground">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.time}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-bold text-primary text-sm lg:text-base">{order.total.toLocaleString('vi-VN')}đ</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status === 'completed' ? 'Hoàn thành' : 'Đang làm'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-4 lg:mt-6">
          <Card className="animate-fade-up" style={{ animationDelay: "400ms" }}>
            <CardHeader>
              <CardTitle>Top sản phẩm</CardTitle>
              <CardDescription>Bán chạy nhất tuần này</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center text-muted-foreground text-sm">
                  Chưa có dữ liệu
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-up" style={{ animationDelay: "450ms" }}>
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

          <Card className="animate-fade-up" style={{ animationDelay: "500ms" }}>
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
