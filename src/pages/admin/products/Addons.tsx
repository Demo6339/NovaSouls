import { useState } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Plus, PlusCircle } from "lucide-react";
import { useRecipes } from "@/contexts/RecipeContext";
import { useAddons } from "@/contexts/AddonContext";

const AdminAddons = () => {
  const { getActiveRecipes } = useRecipes();
  const { addons, addAddon } = useAddons();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAddon, setNewAddon] = useState({
    name: "",
    price: 0,
    temperature: "bình thường" as "nóng" | "lạnh" | "bình thường",
    status: "active" as "active" | "inactive",
    recipe: ""
  });

  const activeRecipes = getActiveRecipes();

  const handleAddAddon = () => {
    if (newAddon.name && newAddon.price > 0) {
      addAddon(newAddon);
      setNewAddon({
        name: "",
        price: 0,
        temperature: "bình thường",
        status: "active",
        recipe: ""
      });
      setShowAddModal(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">Món thêm</h1>
            <p className="text-muted-foreground">Quản lý các món thêm và topping</p>
          </div>
          <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-hero w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Thêm món thêm
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Thêm món thêm mới</DialogTitle>
                <DialogDescription>
                  Điền thông tin để tạo món thêm mới cho sản phẩm
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Tên món *</Label>
                    <Input
                      id="name"
                      value={newAddon.name}
                      onChange={(e) => setNewAddon({...newAddon, name: e.target.value})}
                      placeholder="Nhập tên món thêm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Giá (đ) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newAddon.price}
                      onChange={(e) => setNewAddon({...newAddon, price: parseInt(e.target.value) || 0})}
                      placeholder="Nhập giá"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="temperature">Nhiệt độ</Label>
                    <Select value={newAddon.temperature} onValueChange={(value: "nóng" | "lạnh" | "bình thường") => setNewAddon({...newAddon, temperature: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn nhiệt độ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nóng">Nóng</SelectItem>
                        <SelectItem value="lạnh">Lạnh</SelectItem>
                        <SelectItem value="bình thường">Bình thường</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Trạng thái</Label>
                    <Select value={newAddon.status} onValueChange={(value: "active" | "inactive") => setNewAddon({...newAddon, status: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Hoạt động</SelectItem>
                        <SelectItem value="inactive">Tạm dừng</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="recipe">Công thức</Label>
                  <Select value={newAddon.recipe} onValueChange={(value) => setNewAddon({...newAddon, recipe: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn công thức" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeRecipes.length > 0 ? (
                        activeRecipes.map((recipe) => (
                          <SelectItem key={recipe.id} value={recipe.name}>
                            {recipe.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-recipes" disabled>
                          Chưa có công thức nào
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowAddModal(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleAddAddon}>
                    Thêm món thêm
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">Món thêm / Topping</CardTitle>
          </CardHeader>
          <CardContent>
            {addons.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <PlusCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">Chưa có món thêm nào</p>
                <p className="text-sm">Bắt đầu thêm các món thêm và topping cho sản phẩm</p>
              </div>
            ) : (
              <div className="space-y-4">
                {addons.map((addon) => (
                  <div key={addon.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{addon.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {addon.price.toLocaleString('vi-VN')}đ • {addon.temperature} • {addon.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                        </p>
                        {addon.recipe && (
                          <p className="text-sm text-muted-foreground mt-1">Công thức: {addon.recipe}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminAddons;
