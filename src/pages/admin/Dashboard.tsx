import AdminSidebar from "@/components/admin/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import RevenueChart from "@/components/RevenueChart";
import { useOrders } from "@/contexts/OrderContext";
import { useMemo } from "react";


const AdminDashboard = () => {
  const { stats, orders } = useOrders();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Calculate today's orders
  const todayOrders = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      orderDate.setHours(0, 0, 0, 0);
      return orderDate.getTime() === today.getTime();
    }).length;
  }, [orders]);

  // Calculate unique customers
  const uniqueCustomers = useMemo(() => {
    const customerPhones = new Set(orders.map(order => order.customerInfo.phone));
    return customerPhones.size;
  }, [orders]);

  // Calculate today's revenue
  const todayRevenue = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return orders
      .filter(order => {
        const orderDate = new Date(order.createdAt);
        orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === today.getTime() && 
               order.status === 'completed' && 
               order.currentState === 'payment_received';
      })
      .reduce((sum, order) => sum + order.orderDetails.totalAmount, 0);
  }, [orders]);

  const dashboardStats = [
    {
      title: "Tổng doanh thu",
      value: formatCurrency(stats.totalRevenue),
      change: "0%",
      trend: "up" as const,
      icon: DollarSign
    },
    {
      title: "Đơn hàng hôm nay",
      value: todayOrders.toString(),
      change: "0%",
      trend: "up" as const,
      icon: ShoppingCart
    },
    {
      title: "Khách hàng",
      value: uniqueCustomers.toString(),
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
          {dashboardStats.map((stat, index) => {
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
                  <span className="font-medium">{formatCurrency(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Nhân sự</span>
                  <span className="font-medium">{formatCurrency(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Khác</span>
                  <span className="font-medium">{formatCurrency(0)}</span>
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
                  <span className="font-bold text-green-600">{formatCurrency(stats.totalRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tổng chi phí</span>
                  <span className="font-bold text-red-600">{formatCurrency(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Lợi nhuận</span>
                  <span className="font-bold text-primary">{formatCurrency(stats.totalRevenue)}</span>
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