import AdminSidebar from "@/components/admin/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Accounts = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-4xl font-bold mb-2">Quản lý tài khoản</h1>
          <p className="text-muted-foreground">Quản lý người dùng và phân quyền</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">Danh sách tài khoản</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 lg:py-12 text-muted-foreground">
              <p className="text-sm lg:text-base">Quản lý users và roles</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Accounts;
