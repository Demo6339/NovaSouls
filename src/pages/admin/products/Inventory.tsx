import AdminSidebar from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import { useInventory } from "@/contexts/InventoryContext";

const AdminInventory = () => {
  const { inventory } = useInventory();

  // Calculate statistics
  const totalItems = inventory.length;
  const lowStockItems = inventory.filter(item => item.stock <= item.minStock).length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.stock * 1000), 0); // Assuming 1000đ per unit

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">Kho hàng</h1>
          <p className="text-muted-foreground">Quản lý kho nguyên liệu và tồn kho</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 lg:mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tổng nguyên liệu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalItems}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Sắp hết hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{lowStockItems}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Giá trị kho
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">Kho nguyên liệu</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nguyên liệu</TableHead>
                    <TableHead>Đơn vị</TableHead>
                    <TableHead>Tồn kho</TableHead>
                    <TableHead>Tối thiểu</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{item.stock}</TableCell>
                      <TableCell>{item.minStock}</TableCell>
                      <TableCell>
                        <Badge className={item.stock > item.minStock ? 'bg-green-500' : 'bg-destructive'}>
                          {item.stock > item.minStock ? 'Đủ hàng' : 'Sắp hết'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Package className="mr-2 h-4 w-4" />
                          Nhập hàng
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card Layout */}
            <div className="lg:hidden space-y-4">
              {inventory.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">{item.unit}</p>
                    </div>
                    <Badge className={item.stock > item.minStock ? 'bg-green-500' : 'bg-destructive'}>
                      {item.stock > item.minStock ? 'Đủ hàng' : 'Sắp hết'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Tồn kho:</span>
                      <p className="font-medium">{item.stock}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Tối thiểu:</span>
                      <p className="font-medium">{item.minStock}</p>
                    </div>
                  </div>
                  <div className="flex justify-end pt-2 border-t">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <Package className="mr-2 h-4 w-4" />
                      Nhập hàng
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminInventory;
