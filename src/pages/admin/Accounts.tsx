import AdminSidebar from "@/components/admin/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Accounts = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-2">Quản lý tài khoản</h1>
        <p className="text-muted-foreground mb-8">Quản lý người dùng và phân quyền</p>
        <Card>
          <CardHeader>
            <CardTitle>Danh sách tài khoản</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              Quản lý users và roles
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Accounts;
