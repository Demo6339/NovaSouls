import AdminSidebar from "@/components/admin/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const History = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-4xl font-bold mb-2">Lịch sử hoạt động</h1>
          <p className="text-muted-foreground">Theo dõi logs và lịch sử hệ thống</p>
        </div>
        <Tabs defaultValue="orders" className="space-y-4 lg:space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders" className="text-xs lg:text-sm">Đơn hàng</TabsTrigger>
            <TabsTrigger value="accounts" className="text-xs lg:text-sm">Tài khoản</TabsTrigger>
            <TabsTrigger value="system" className="text-xs lg:text-sm">Hệ thống</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl">Lịch sử đơn hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 lg:py-12 text-muted-foreground">
                  <p className="text-sm lg:text-base">Danh sách tất cả đơn hàng</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default History;
