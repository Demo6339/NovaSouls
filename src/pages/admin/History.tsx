import AdminSidebar from "@/components/admin/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const History = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-2">Lịch sử hoạt động</h1>
        <p className="text-muted-foreground mb-8">Theo dõi logs và lịch sử hệ thống</p>
        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
            <TabsTrigger value="accounts">Tài khoản</TabsTrigger>
            <TabsTrigger value="system">Hệ thống</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử đơn hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  Danh sách tất cả đơn hàng
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
