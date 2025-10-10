import AdminSidebar from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, ChefHat } from "lucide-react";

const AdminRecipes = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">Công thức</h1>
            <p className="text-muted-foreground">Quản lý công thức chế biến cho từng món</p>
          </div>
          <Button className="bg-gradient-hero w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Thêm công thức
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">Công thức chế biến</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <ChefHat className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">Chưa có công thức nào</p>
              <p className="text-sm">Bắt đầu tạo công thức chế biến cho các món ăn của bạn</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminRecipes;
