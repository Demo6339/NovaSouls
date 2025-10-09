import AdminSidebar from "@/components/admin/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Appearance = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-2">Tùy chỉnh giao diện</h1>
        <p className="text-muted-foreground mb-8">Thay đổi màu sắc, bố cục trang chủ</p>
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt giao diện</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              Tùy chỉnh theme, màu sắc, logo
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Appearance;
