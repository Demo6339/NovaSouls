import AdminSidebar from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

const AdminEvents = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold">Quản lý sự kiện</h1>
            <p className="text-muted-foreground">Tạo và quản lý sự kiện, mã giảm giá</p>
          </div>
          <Button className="bg-gradient-hero w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Tạo sự kiện
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">Danh sách sự kiện</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 lg:py-12 text-muted-foreground">
              <p className="text-sm lg:text-base">Quản lý sự kiện và khuyến mãi</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminEvents;
