import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, ShoppingBag, Settings, LogOut, Clock, CheckCircle2, XCircle } from "lucide-react";

const Profile = () => {
  const [user] = useState({
    name: "Nguyễn Văn A",
    email: "user@example.com",
    phone: "0123456789",
    avatar: "",
  });

  const currentOrders = [
    {
      id: "ORD001",
      date: "2025-10-09 14:30",
      total: 165000,
      status: "preparing",
      items: ["Signature Latte x2", "Croissant Bơ x1"],
    },
  ];

  const orderHistory = [
    {
      id: "ORD002",
      date: "2025-10-08 10:15",
      total: 95000,
      status: "completed",
      items: ["Cappuccino x1", "Tiramisu x1"],
    },
    {
      id: "ORD003",
      date: "2025-10-07 16:45",
      total: 50000,
      status: "cancelled",
      items: ["Americano x1"],
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      preparing: { label: "Đang chuẩn bị", className: "bg-accent" },
      completed: { label: "Hoàn thành", className: "bg-green-500" },
      cancelled: { label: "Đã hủy", className: "bg-destructive" },
    };
    const variant = variants[status as keyof typeof variants];
    return (
      <Badge className={variant.className}>
        {variant.label}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      preparing: <Clock className="h-5 w-5 text-accent" />,
      completed: <CheckCircle2 className="h-5 w-5 text-green-500" />,
      cancelled: <XCircle className="h-5 w-5 text-destructive" />,
    };
    return icons[status as keyof typeof icons];
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-to-b from-background to-secondary/20">
        <div className="container px-4 max-w-5xl">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-2">Tài khoản của tôi</h1>
            <p className="text-muted-foreground">Quản lý thông tin và đơn hàng của bạn</p>
          </div>

          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="account">
                <User className="h-4 w-4 mr-2" />
                Tài khoản
              </TabsTrigger>
              <TabsTrigger value="orders">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Đơn hàng
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                Cài đặt
              </TabsTrigger>
            </TabsList>

            {/* Account Tab */}
            <TabsContent value="account" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cá nhân</CardTitle>
                  <CardDescription>Cập nhật thông tin tài khoản của bạn</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-2xl bg-gradient-hero text-primary-foreground">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline">Đổi ảnh đại diện</Button>
                      <p className="text-sm text-muted-foreground mt-2">
                        JPG, PNG. Tối đa 2MB
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Họ và tên</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input id="phone" type="tel" defaultValue={user.phone} />
                    </div>
                  </div>

                  <Button className="bg-gradient-hero">Lưu thay đổi</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6 animate-fade-in">
              {/* Current Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Đơn hàng hiện tại</CardTitle>
                  <CardDescription>Theo dõi trạng thái đơn hàng realtime</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {getStatusIcon(order.status)}
                            <span className="font-semibold">#{order.id}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <p key={idx} className="text-sm">{item}</p>
                        ))}
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-primary">
                          {order.total.toLocaleString('vi-VN')}đ
                        </span>
                        <Button variant="outline" size="sm">Chi tiết</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Order History */}
              <Card>
                <CardHeader>
                  <CardTitle>Lịch sử đơn hàng</CardTitle>
                  <CardDescription>Các đơn hàng đã hoàn thành hoặc hủy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {getStatusIcon(order.status)}
                            <span className="font-semibold">#{order.id}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <p key={idx} className="text-sm">{item}</p>
                        ))}
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="font-bold">
                          {order.total.toLocaleString('vi-VN')}đ
                        </span>
                        <Button variant="outline" size="sm">Đặt lại</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Cài đặt tài khoản</CardTitle>
                  <CardDescription>Quản lý bảo mật và quyền riêng tư</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Đổi mật khẩu</h3>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-password">Mật khẩu mới</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    <Button className="bg-gradient-hero">Cập nhật mật khẩu</Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold">Quyền riêng tư</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Nhận email khuyến mãi</p>
                          <p className="text-sm text-muted-foreground">
                            Nhận thông tin về ưu đãi và sự kiện mới
                          </p>
                        </div>
                        <Button variant="outline">Bật</Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <Button variant="destructive" className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    Đăng xuất
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
