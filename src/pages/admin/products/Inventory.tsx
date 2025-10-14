import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Package, Plus, ArrowUpDown, Eye, Edit, Trash2, Power, PowerOff } from "lucide-react";
import { useInventory, InventoryItem } from "@/contexts/InventoryContext";

const AdminInventory = () => {
  const { 
    inventory, 
    addInventoryItem, 
    updateInventoryItem, 
    deleteInventoryItem,
    convertToBaseUnit,
    convertFromBaseUnit,
    getSmallestUnit,
    getLargestUnit
  } = useInventory();
  const [showImportModal, setShowImportModal] = useState(false);
  const [showSupplementModal, setShowSupplementModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [importForm, setImportForm] = useState({
    name: "",
    price: 0,
    units: [] as string[],
    primaryUnit: "",
    stock: 0,
    category: "Thực phẩm" as "Thực phẩm" | "Gia vị",
    origin: "",
    productionDate: "",
    expiryDate: "",
    status: "active" as "active" | "inactive"
  });
  const [supplementForm, setSupplementForm] = useState({
    itemId: "",
    quantity: 0,
    reason: ""
  });
  const [editForm, setEditForm] = useState({
    name: "",
    category: "Thực phẩm" as "Thực phẩm" | "Gia vị",
    productionDate: "",
    expiryDate: "",
    units: [] as string[],
    primaryUnit: "",
    stock: 0,
    status: "active" as "active" | "inactive"
  });

  // Calculate statistics
  const totalItems = inventory.length;
  const lowStockItems = inventory.filter(item => item.stock <= 50).length; // Assuming low stock threshold
  const totalValue = inventory.reduce((sum, item) => sum + (item.stock * item.price), 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatStockAmount = (amount: number) => {
    // Làm tròn xuống với tối đa 4 chữ số thập phân
    return Math.floor(amount * 10000) / 10000;
  };

  const handleImportItem = () => {
    if (importForm.name && importForm.units.length > 0 && importForm.stock > 0 && importForm.category) {
      const primaryUnit = getLargestUnit(importForm.units);
      const stockInBaseUnit = convertToBaseUnit(importForm.stock, primaryUnit);
      
      addInventoryItem({
        ...importForm,
        primaryUnit,
        stock: stockInBaseUnit
      });
      setImportForm({
        name: "",
        price: 0,
        units: [],
        primaryUnit: "",
        stock: 0,
        category: "Thực phẩm",
        origin: "",
        productionDate: "",
        expiryDate: "",
        status: "active"
      });
      setShowImportModal(false);
    }
  };

  const handleSupplementItem = () => {
    if (supplementForm.itemId && supplementForm.quantity > 0) {
      const item = inventory.find(i => i.id.toString() === supplementForm.itemId);
      if (item) {
        updateInventoryItem(item.id, {
          stock: item.stock + supplementForm.quantity
        });
        setSupplementForm({
          itemId: "",
          quantity: 0,
          reason: ""
        });
        setShowSupplementModal(false);
      }
    }
  };


  const handleDeleteItem = (itemId: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa nguyên liệu này?")) {
      deleteInventoryItem(itemId);
    }
  };

  const handleViewDetail = (item: InventoryItem) => {
    setSelectedItem(item.id);
    setShowDetailModal(true);
  };

  const handleEditItem = (item: InventoryItem) => {
    const smallestUnit = getSmallestUnit(item.units);
    const stockInSmallestUnit = convertFromBaseUnit(item.stock, smallestUnit);
    
    setEditForm({
      name: item.name,
      category: item.category,
      productionDate: item.productionDate,
      expiryDate: item.expiryDate,
      units: item.units,
      primaryUnit: item.primaryUnit,
      stock: stockInSmallestUnit,
      status: item.status
    });
    setSelectedItem(item.id);
    setShowEditModal(true);
  };

  const handleUpdateItem = () => {
    if (selectedItem && editForm.name && editForm.units.length > 0 && editForm.category) {
      const smallestUnit = getSmallestUnit(editForm.units);
      const stockInBaseUnit = convertToBaseUnit(editForm.stock, smallestUnit);
      const primaryUnit = getLargestUnit(editForm.units);
      
      updateInventoryItem(selectedItem, {
        ...editForm,
        primaryUnit,
        stock: stockInBaseUnit
      });
      setShowEditModal(false);
      setSelectedItem(null);
    }
  };

  const handleToggleStatus = (itemId: number, currentStatus: string) => {
    updateInventoryItem(itemId, {
      status: currentStatus === "active" ? "inactive" : "active"
    });
  };

  const handleUnitToggle = (unit: string, formType: 'import' | 'edit') => {
    if (formType === 'import') {
      setImportForm(prev => ({
        ...prev,
        units: prev.units.includes(unit) 
          ? prev.units.filter(u => u !== unit)
          : [...prev.units, unit]
      }));
    } else {
      setEditForm(prev => ({
        ...prev,
        units: prev.units.includes(unit) 
          ? prev.units.filter(u => u !== unit)
          : [...prev.units, unit]
      }));
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">Kho hàng</h1>
            <p className="text-muted-foreground">Quản lý kho nguyên liệu và tồn kho</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={showImportModal} onOpenChange={setShowImportModal}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-hero w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Nhập hàng
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Nhập hàng mới</DialogTitle>
                  <DialogDescription>
                    Thêm nguyên liệu mới vào kho hàng
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="import-name">Tên nguyên liệu *</Label>
                    <Input
                      id="import-name"
                      value={importForm.name}
                      onChange={(e) => setImportForm({...importForm, name: e.target.value})}
                      placeholder="Nhập tên nguyên liệu"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="import-price">Giá tiền *</Label>
                    <Input
                      id="import-price"
                      type="number"
                      min="0"
                      value={importForm.price}
                      onChange={(e) => setImportForm({...importForm, price: parseInt(e.target.value) || 0})}
                      placeholder="Nhập giá tiền (VNĐ)"
                    />
                  </div>
                  
                  <div>
                    <Label>Đơn vị * (Chọn tối thiểu 1 đơn vị)</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {['g', 'ml', 'kg', 'l'].map((unit) => (
                        <Button
                          key={unit}
                          type="button"
                          variant={importForm.units.includes(unit) ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleUnitToggle(unit, 'import')}
                        >
                          {unit === 'g' ? 'Gram (g)' : 
                           unit === 'ml' ? 'Mililit (ml)' :
                           unit === 'kg' ? 'Kilogram (kg)' : 'Lít (l)'}
                        </Button>
                      ))}
                    </div>
                    {importForm.units.length === 0 && (
                      <p className="text-sm text-red-500 mt-1">Vui lòng chọn ít nhất 1 đơn vị</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="import-stock">
                      Số lượng * (Nhập bằng đơn vị lớn nhất: {getLargestUnit(importForm.units) || 'chưa chọn'})
                    </Label>
                    <Input
                      id="import-stock"
                      type="number"
                      min="0"
                      step="0.01"
                      value={importForm.stock}
                      onChange={(e) => setImportForm({...importForm, stock: parseFloat(e.target.value) || 0})}
                      placeholder="Nhập số lượng"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="import-category">Danh mục *</Label>
                      <Select value={importForm.category} onValueChange={(value: "Thực phẩm" | "Gia vị") => setImportForm({...importForm, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Thực phẩm">Thực phẩm</SelectItem>
                          <SelectItem value="Gia vị">Gia vị</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="import-origin">Xuất xứ *</Label>
                      <Input
                        id="import-origin"
                        value={importForm.origin}
                        onChange={(e) => setImportForm({...importForm, origin: e.target.value})}
                        placeholder="Nhập xuất xứ"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="import-production-date">Ngày sản xuất *</Label>
                      <Input
                        id="import-production-date"
                        type="date"
                        value={importForm.productionDate}
                        onChange={(e) => setImportForm({...importForm, productionDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="import-expiry-date">Hạn sử dụng *</Label>
                      <Input
                        id="import-expiry-date"
                        type="date"
                        value={importForm.expiryDate}
                        onChange={(e) => setImportForm({...importForm, expiryDate: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setShowImportModal(false)}>
                      Hủy
                    </Button>
                    <Button onClick={handleImportItem}>
                      Nhập hàng
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog open={showSupplementModal} onOpenChange={setShowSupplementModal}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  Bổ sung
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Bổ sung nguyên liệu</DialogTitle>
                  <DialogDescription>
                    Thêm số lượng cho nguyên liệu có sẵn trong kho
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="supplement-item">Chọn nguyên liệu *</Label>
                    <Select value={supplementForm.itemId} onValueChange={(value) => setSupplementForm({...supplementForm, itemId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn nguyên liệu cần bổ sung" />
                      </SelectTrigger>
                      <SelectContent>
                        {inventory.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name} (Hiện tại: {item.stock} {item.unit})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="supplement-quantity">Số lượng bổ sung *</Label>
                    <Input
                      id="supplement-quantity"
                      type="number"
                      min="0"
                      value={supplementForm.quantity}
                      onChange={(e) => setSupplementForm({...supplementForm, quantity: parseInt(e.target.value) || 0})}
                      placeholder="Nhập số lượng cần bổ sung"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="supplement-reason">Lý do bổ sung</Label>
                    <Input
                      id="supplement-reason"
                      value={supplementForm.reason}
                      onChange={(e) => setSupplementForm({...supplementForm, reason: e.target.value})}
                      placeholder="Nhập lý do bổ sung (tùy chọn)"
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setShowSupplementModal(false)}>
                      Hủy
                    </Button>
                    <Button onClick={handleSupplementItem}>
                      Bổ sung
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            
            <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Chi tiết nguyên liệu</DialogTitle>
                  <DialogDescription>
                    Thông tin chi tiết về nguyên liệu trong kho
                  </DialogDescription>
                </DialogHeader>
                {selectedItem && (() => {
                  const item = inventory.find(i => i.id === selectedItem);
                  if (!item) return null;
                  
                  return (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Tên nguyên liệu</Label>
                          <p className="text-lg font-medium">{item.name}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Giá tiền</Label>
                          <p className="text-lg font-medium">{formatCurrency(item.price)}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Danh mục</Label>
                          <p className="text-lg font-medium">{item.category}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Xuất xứ</Label>
                          <p className="text-lg font-medium">{item.origin}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Ngày sản xuất</Label>
                          <p className="text-lg font-medium">{item.productionDate}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Hạn sử dụng</Label>
                          <p className="text-lg font-medium">{item.expiryDate}</p>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Đơn vị</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.units.map((unit, index) => (
                            <Badge key={index} variant="outline" className="text-sm">
                              {unit === 'g' ? 'Gram (g)' : 
                               unit === 'ml' ? 'Mililit (ml)' :
                               unit === 'kg' ? 'Kilogram (kg)' : 'Lít (l)'}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Tồn kho (đơn vị nhỏ nhất)</Label>
                          <p className="text-lg font-medium">
                            {formatStockAmount(convertFromBaseUnit(item.stock, getSmallestUnit(item.units)))} {getSmallestUnit(item.units)}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Tồn kho (đơn vị lớn nhất)</Label>
                          <p className="text-lg font-medium">
                            {formatStockAmount(convertFromBaseUnit(item.stock, getLargestUnit(item.units)))} {getLargestUnit(item.units)}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Trạng thái</Label>
                        <div className="mt-2">
                          <Badge className={item.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}>
                            {item.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                          Đóng
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </DialogContent>
            </Dialog>
            
            <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Chỉnh sửa nguyên liệu</DialogTitle>
                  <DialogDescription>
                    Cập nhật thông tin nguyên liệu trong kho
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-name">Tên nguyên liệu *</Label>
                    <Input
                      id="edit-name"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      placeholder="Nhập tên nguyên liệu"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="edit-category">Danh mục *</Label>
                    <Select value={editForm.category} onValueChange={(value: "Thực phẩm" | "Gia vị") => setEditForm({...editForm, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Thực phẩm">Thực phẩm</SelectItem>
                        <SelectItem value="Gia vị">Gia vị</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-production-date">Ngày sản xuất *</Label>
                      <Input
                        id="edit-production-date"
                        type="date"
                        value={editForm.productionDate}
                        onChange={(e) => setEditForm({...editForm, productionDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-expiry-date">Hạn sử dụng *</Label>
                      <Input
                        id="edit-expiry-date"
                        type="date"
                        value={editForm.expiryDate}
                        onChange={(e) => setEditForm({...editForm, expiryDate: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Đơn vị * (Chọn tối thiểu 1 đơn vị)</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {['g', 'ml', 'kg', 'l'].map((unit) => (
                        <Button
                          key={unit}
                          type="button"
                          variant={editForm.units.includes(unit) ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleUnitToggle(unit, 'edit')}
                        >
                          {unit === 'g' ? 'Gram (g)' : 
                           unit === 'ml' ? 'Mililit (ml)' :
                           unit === 'kg' ? 'Kilogram (kg)' : 'Lít (l)'}
                        </Button>
                      ))}
                    </div>
                    {editForm.units.length === 0 && (
                      <p className="text-sm text-red-500 mt-1">Vui lòng chọn ít nhất 1 đơn vị</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="edit-stock">
                      Số lượng * (Hiển thị bằng đơn vị nhỏ nhất: {getSmallestUnit(editForm.units) || 'chưa chọn'})
                    </Label>
                    <Input
                      id="edit-stock"
                      type="number"
                      min="0"
                      step="0.01"
                      value={editForm.stock}
                      onChange={(e) => setEditForm({...editForm, stock: parseFloat(e.target.value) || 0})}
                      placeholder="Nhập số lượng"
                    />
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
          </div>
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
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Hạn sử dụng</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {item.units.map((unit, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {unit}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatStockAmount(convertFromBaseUnit(item.stock, getLargestUnit(item.units)))} {getLargestUnit(item.units)}
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.expiryDate}</TableCell>
                      <TableCell>
                        <Badge className={item.stock > 50 ? 'bg-green-500' : 'bg-destructive'}>
                          {item.stock > 50 ? 'Đủ hàng' : 'Sắp hết'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewDetail(item)}
                            title="Xem chi tiết"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditItem(item)}
                            title="Chỉnh sửa"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleToggleStatus(item.id, item.status)}
                            title={item.status === "active" ? "Vô hiệu hóa" : "Kích hoạt"}
                          >
                            {item.status === "active" ? <PowerOff className="h-4 w-4" /> : <Power className="h-4 w-4" />}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteItem(item.id)}
                            title="Xóa"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
              {inventory.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                    <Badge className={item.stock > 50 ? 'bg-green-500' : 'bg-destructive'}>
                      {item.stock > 50 ? 'Đủ hàng' : 'Sắp hết'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Tồn kho:</span>
                      <p className="font-medium">
                        {formatStockAmount(convertFromBaseUnit(item.stock, getLargestUnit(item.units)))} {getLargestUnit(item.units)}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Hạn sử dụng:</span>
                      <p className="font-medium">{item.expiryDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Đơn vị:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.units.map((unit, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {unit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2 border-t">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetail(item)}
                      title="Xem chi tiết"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditItem(item)}
                      title="Chỉnh sửa"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleToggleStatus(item.id, item.status)}
                      title={item.status === "active" ? "Vô hiệu hóa" : "Kích hoạt"}
                    >
                      {item.status === "active" ? <PowerOff className="h-4 w-4" /> : <Power className="h-4 w-4" />}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteItem(item.id)}
                      title="Xóa"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
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
