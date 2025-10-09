import AdminSidebar from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

const AdminEvents = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Quản lý sự kiện</h1>
            <p className="text-muted-foreground">Tạo và quản lý sự kiện, mã giảm giá</p>
          </div>
          <Button className="bg-gradient-hero">
            <Plus className="mr-2 h-4 w-4" />
            Tạo sự kiện
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Danh sách sự kiện</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              Quản lý sự kiện và khuyến mãi
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminEvents;
