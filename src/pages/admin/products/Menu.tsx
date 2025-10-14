import { useState } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, X } from "lucide-react";
import { useMenu } from "@/contexts/MenuContext";
import { useAddons } from "@/contexts/AddonContext";
import { useRecipes } from "@/contexts/RecipeContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const AdminMenu = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "",
    temperature: "lạnh" as "nóng" | "lạnh",
    status: "active" as "active" | "inactive",
    addons: [] as string[],
    recipes: [] as string[]
  });
  
  const { allItems, deleteItem, addItem, updateItem } = useMenu();
  const { getActiveAddons } = useAddons();
  const { getActiveRecipes } = useRecipes();
  
  const activeAddons = getActiveAddons();
  const activeRecipes = getActiveRecipes();

  // Filter products based on search query
  const filteredProducts = allItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddItem = () => {
    if (newItem.name && newItem.description && newItem.price > 0 && newItem.category) {
      addItem(newItem);
      setNewItem({
        name: "",
        description: "",
        price: 0,
        image: "",
        category: "",
        temperature: "lạnh",
        status: "active",
        addons: [],
        recipes: []
      });
      setShowAddModal(false);
    }
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setShowEditModal(true);
  };

  const handleUpdateItem = () => {
    if (editingItem) {
      updateItem(editingItem.id, editingItem);
      setShowEditModal(false);
      setEditingItem(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">Món chính</h1>
            <p className="text-muted-foreground">Quản lý món chính trong thực đơn</p>
          </div>
          <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-hero w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Thêm món
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Thêm món mới</DialogTitle>
                <DialogDescription>
                  Điền thông tin để thêm món chính mới vào thực đơn
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Tên món *</Label>
                    <Input
                      id="name"
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                      placeholder="Nhập tên món"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Giá (đ) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newItem.price}
                      onChange={(e) => setNewItem({...newItem, price: parseInt(e.target.value) || 0})}
                      placeholder="Nhập giá"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Mô tả *</Label>
                  <Textarea
                    id="description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    placeholder="Nhập mô tả món"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Danh mục *</Label>
                    <Select value={newItem.category} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="soju">Soju</SelectItem>
                        <SelectItem value="cocktail">Cocktail</SelectItem>
                        <SelectItem value="coffee">Coffee</SelectItem>
                        <SelectItem value="juice">Nước hoa quả</SelectItem>
                        <SelectItem value="soft-drinks">Nước ngọt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="temperature">Nhiệt độ</Label>
                    <Select value={newItem.temperature} onValueChange={(value: "nóng" | "lạnh") => setNewItem({...newItem, temperature: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn nhiệt độ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nóng">Nóng</SelectItem>
                        <SelectItem value="lạnh">Lạnh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="image">URL hình ảnh</Label>
                  <Input
                    id="image"
                    value={newItem.image}
                    onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                    placeholder="Nhập URL hình ảnh"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Trạng thái</Label>
                    <Select value={newItem.status} onValueChange={(value: "active" | "inactive") => setNewItem({...newItem, status: value})}>
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
                  <Label htmlFor="addons">Món thêm</Label>
                  <Select onValueChange={(value) => {
                    if (!newItem.addons.includes(value)) {
                      setNewItem({...newItem, addons: [...newItem.addons, value]});
                    }
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn món thêm" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeAddons.length > 0 ? (
                        activeAddons.map((addon) => (
                          <SelectItem key={addon.id} value={addon.name}>
                            {addon.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-addons" disabled>
                          Chưa có món thêm nào
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  {newItem.addons.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {newItem.addons.map((addon, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {addon}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => setNewItem({
                              ...newItem, 
                              addons: newItem.addons.filter((_, i) => i !== index)
                            })}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="recipes">Công thức</Label>
                  <Select onValueChange={(value) => {
                    if (!newItem.recipes.includes(value)) {
                      setNewItem({...newItem, recipes: [...newItem.recipes, value]});
                    }
                  }}>
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
                  {newItem.recipes.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {newItem.recipes.map((recipe, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {recipe}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => setNewItem({
                              ...newItem, 
                              recipes: newItem.recipes.filter((_, i) => i !== index)
                            })}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowAddModal(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleAddItem}>
                    Thêm món
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-lg lg:text-xl">Danh sách sản phẩm</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sản phẩm</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Giá</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {product.category === 'soju' ? 'Soju' :
                         product.category === 'cocktail' ? 'Cocktail' :
                         product.category === 'coffee' ? 'Coffee' :
                         product.category === 'juice' ? 'Nước hoa quả' :
                         product.category === 'soft-drinks' ? 'Nước ngọt' : product.category}
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.price.toLocaleString('vi-VN')}đ
                      </TableCell>
                      <TableCell>
                        <Badge className={product.status === 'active' ? "bg-green-500" : "bg-red-500"}>
                          {product.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditItem(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-destructive"
                            onClick={() => deleteItem(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card Layout */}
            <div className="lg:hidden space-y-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{product.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {product.category === 'soju' ? 'Soju' :
                         product.category === 'cocktail' ? 'Cocktail' :
                         product.category === 'coffee' ? 'Coffee' :
                         product.category === 'juice' ? 'Nước hoa quả' :
                         product.category === 'soft-drinks' ? 'Nước ngọt' : product.category}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={product.status === 'active' ? "bg-green-500 text-xs" : "bg-red-500 text-xs"}>
                          {product.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Giá:</span>
                      <p className="font-medium">{product.price.toLocaleString('vi-VN')}đ</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2 border-t">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditItem(product)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Sửa
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive"
                      onClick={() => deleteItem(product.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Xóa
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Edit Modal */}
        {editingItem && (
          <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Chỉnh sửa món</DialogTitle>
                <DialogDescription>
                  Cập nhật thông tin món chính trong thực đơn
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-name">Tên món *</Label>
                    <Input
                      id="edit-name"
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                      placeholder="Nhập tên món"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-price">Giá (đ) *</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      value={editingItem.price}
                      onChange={(e) => setEditingItem({...editingItem, price: parseInt(e.target.value) || 0})}
                      placeholder="Nhập giá"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="edit-description">Mô tả *</Label>
                  <Textarea
                    id="edit-description"
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                    placeholder="Nhập mô tả món"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-category">Danh mục *</Label>
                    <Select value={editingItem.category} onValueChange={(value) => setEditingItem({...editingItem, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="soju">Soju</SelectItem>
                        <SelectItem value="cocktail">Cocktail</SelectItem>
                        <SelectItem value="coffee">Coffee</SelectItem>
                        <SelectItem value="juice">Nước hoa quả</SelectItem>
                        <SelectItem value="soft-drinks">Nước ngọt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-temperature">Nhiệt độ</Label>
                    <Select value={editingItem.temperature} onValueChange={(value: "nóng" | "lạnh") => setEditingItem({...editingItem, temperature: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn nhiệt độ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nóng">Nóng</SelectItem>
                        <SelectItem value="lạnh">Lạnh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="edit-image">URL hình ảnh</Label>
                  <Input
                    id="edit-image"
                    value={editingItem.image}
                    onChange={(e) => setEditingItem({...editingItem, image: e.target.value})}
                    placeholder="Nhập URL hình ảnh"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-status">Trạng thái</Label>
                    <Select value={editingItem.status || 'active'} onValueChange={(value: "active" | "inactive") => setEditingItem({...editingItem, status: value})}>
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
                  <Label htmlFor="edit-addons">Món thêm</Label>
                  <Select onValueChange={(value) => {
                    if (!editingItem.addons?.includes(value)) {
                      setEditingItem({...editingItem, addons: [...(editingItem.addons || []), value]});
                    }
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn món thêm" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeAddons.length > 0 ? (
                        activeAddons.map((addon) => (
                          <SelectItem key={addon.id} value={addon.name}>
                            {addon.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-addons" disabled>
                          Chưa có món thêm nào
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  {editingItem.addons && editingItem.addons.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {editingItem.addons.map((addon, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {addon}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => setEditingItem({
                              ...editingItem, 
                              addons: editingItem.addons?.filter((_, i) => i !== index) || []
                            })}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="edit-recipes">Công thức</Label>
                  <Select onValueChange={(value) => {
                    if (!editingItem.recipes?.includes(value)) {
                      setEditingItem({...editingItem, recipes: [...(editingItem.recipes || []), value]});
                    }
                  }}>
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
                  {editingItem.recipes && editingItem.recipes.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {editingItem.recipes.map((recipe, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {recipe}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => setEditingItem({
                              ...editingItem, 
                              recipes: editingItem.recipes?.filter((_, i) => i !== index) || []
                            })}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowEditModal(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleUpdateItem}>
                    Cập nhật
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </div>
  );
};

export default AdminMenu;
