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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, Edit, Trash2, Eye, Copy, Calendar, Users, Percent, DollarSign, Power, PowerOff } from "lucide-react";
import { usePromoCodes } from "@/contexts/PromoContext";
import { useEvents } from "@/contexts/EventContext";
import { useMenu } from "@/contexts/MenuContext";

const AdminPromoCodes = () => {
  const { promoCodes, addPromoCode, updatePromoCode, deletePromoCode } = usePromoCodes();
  const { events, getActiveEvents } = useEvents();
  const { allItems } = useMenu();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState<number | null>(null);
  const [newPromo, setNewPromo] = useState({
    code: "",
    name: "",
    description: "",
    type: "percentage" as "percentage" | "fixed" | "gift",
    value: 0,
    giftItem: "",
    giftQuantity: 1,
    minOrderAmount: 0,
    maxDiscountAmount: 0,
    usageLimit: 0,
    startDate: "",
    endDate: "",
    status: "active" as "active" | "inactive",
    applicableItems: [] as string[],
    eventId: 0
  });

  const activeEvents = getActiveEvents();
  const filteredPromos = promoCodes.filter(promo =>
    promo.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    promo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Hoạt động', className: 'bg-green-500' },
      inactive: { label: 'Tạm dừng', className: 'bg-gray-500' },
      expired: { label: 'Hết hạn', className: 'bg-red-500' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getTypeIcon = (type: string) => {
    return type === 'percentage' ? <Percent className="h-4 w-4" /> : <DollarSign className="h-4 w-4" />;
  };

  const handleAddPromo = () => {
    if (newPromo.code && newPromo.name && newPromo.usageLimit > 0 && 
        (newPromo.type === 'gift' ? (newPromo.giftItem && newPromo.giftQuantity > 0) : newPromo.value > 0)) {
      
      // Tạo ngày bắt đầu và kết thúc mặc định
      const today = new Date().toISOString().split('T')[0];
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      const endDate = nextMonth.toISOString().split('T')[0];
      
      addPromoCode({
        ...newPromo,
        description: "",
        minOrderAmount: 0,
        maxDiscountAmount: 0,
        startDate: today,
        endDate: endDate,
        status: "active",
        applicableItems: [],
        eventId: 0
      });
      
      setNewPromo({
        code: "",
        name: "",
        description: "",
        type: "percentage",
        value: 0,
        giftItem: "",
        giftQuantity: 1,
        minOrderAmount: 0,
        maxDiscountAmount: 0,
        usageLimit: 1,
        startDate: "",
        endDate: "",
        status: "active",
        applicableItems: [],
        eventId: 0
      });
      setShowAddModal(false);
    }
  };

  const handleViewDetail = (promoId: number) => {
    setSelectedPromo(promoId);
    setShowDetailModal(true);
  };

  const handleEditPromo = (promoId: number) => {
    const promo = promoCodes.find(p => p.id === promoId);
    if (promo) {
      setNewPromo({
        code: promo.code,
        name: promo.name,
        description: promo.description,
        type: promo.type,
        value: promo.value,
        giftItem: promo.giftItem || "",
        giftQuantity: promo.giftQuantity || 1,
        minOrderAmount: promo.minOrderAmount || 0,
        maxDiscountAmount: promo.maxDiscountAmount || 0,
        usageLimit: promo.usageLimit || 1,
        startDate: promo.startDate,
        endDate: promo.endDate,
        status: promo.status,
        applicableItems: promo.applicableItems,
        eventId: promo.eventId || 0
      });
      setShowAddModal(true);
    }
  };

  const handleTogglePromo = (promoId: number) => {
    const promo = promoCodes.find(p => p.id === promoId);
    if (promo) {
      const newStatus = promo.status === 'active' ? 'inactive' : 'active';
      updatePromoCode(promoId, { status: newStatus });
    }
  };

  const handleDeletePromo = (promoId: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa mã giảm giá này?")) {
      deletePromoCode(promoId);
    }
  };

  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // Có thể thêm toast notification ở đây
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">Mã giảm giá</h1>
          <p className="text-muted-foreground">Quản lý mã giảm giá và khuyến mãi</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Tìm kiếm mã giảm giá..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-hero">
                <Plus className="mr-2 h-4 w-4" />
                Tạo mã giảm giá
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Tạo mã giảm giá mới</DialogTitle>
                <DialogDescription>
                  Tạo mã giảm giá mới cho khách hàng
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Tên mã *</Label>
                  <Input
                    id="name"
                    value={newPromo.name}
                    onChange={(e) => setNewPromo({...newPromo, name: e.target.value})}
                    placeholder="VD: Chào mừng khách hàng mới"
                  />
                </div>

                <div>
                  <Label htmlFor="code">Mã áp dụng *</Label>
                  <Input
                    id="code"
                    value={newPromo.code}
                    onChange={(e) => setNewPromo({...newPromo, code: e.target.value.toUpperCase()})}
                    placeholder="VD: WELCOME10"
                  />
                </div>

                <div>
                  <Label htmlFor="type">Hình thức *</Label>
                  <Select value={newPromo.type} onValueChange={(value: "percentage" | "fixed" | "gift") => setNewPromo({...newPromo, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn hình thức" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Phần trăm</SelectItem>
                      <SelectItem value="fixed">Cố định</SelectItem>
                      <SelectItem value="gift">Tặng kèm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="usageLimit">Số lượng tối đa *</Label>
                  <Input
                    id="usageLimit"
                    type="number"
                    min="1"
                    value={newPromo.usageLimit}
                    onChange={(e) => setNewPromo({...newPromo, usageLimit: parseInt(e.target.value) || 1})}
                    placeholder="100"
                  />
                </div>

                {newPromo.type === 'gift' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="giftItem">Món quà *</Label>
                      <Input
                        id="giftItem"
                        value={newPromo.giftItem}
                        onChange={(e) => setNewPromo({...newPromo, giftItem: e.target.value})}
                        placeholder="VD: Coca Cola 330ml"
                      />
                    </div>
                    <div>
                      <Label htmlFor="giftQuantity">Số lượng *</Label>
                      <Input
                        id="giftQuantity"
                        type="number"
                        min="1"
                        value={newPromo.giftQuantity}
                        onChange={(e) => setNewPromo({...newPromo, giftQuantity: parseInt(e.target.value) || 1})}
                        placeholder="1"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="valueType">Kiểu giá trị *</Label>
                      <Select value={newPromo.type} onValueChange={(value: "percentage" | "fixed") => setNewPromo({...newPromo, type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn kiểu giá trị" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Phần trăm</SelectItem>
                          <SelectItem value="fixed">Trực tiếp</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="value">Giá trị *</Label>
                      <Input
                        id="value"
                        type="number"
                        min="0"
                        value={newPromo.value}
                        onChange={(e) => setNewPromo({...newPromo, value: parseInt(e.target.value) || 0})}
                        placeholder={newPromo.type === "percentage" ? "10" : "20000"}
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowAddModal(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleAddPromo}>
                    Tạo mã giảm giá
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách mã giảm giá</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên mã</TableHead>
                    <TableHead>Mã áp dụng</TableHead>
                    <TableHead>Hình thức</TableHead>
                    <TableHead>Giá trị</TableHead>
                    <TableHead>Đã dùng</TableHead>
                    <TableHead>Tối đa</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPromos.map((promo) => (
                    <TableRow key={promo.id}>
                      <TableCell className="font-medium">
                        {promo.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted px-2 py-1 rounded text-sm">{promo.code}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyPromoCode(promo.code)}
                            title="Sao chép mã"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(promo.type)}
                          <span className="text-sm">
                            {promo.type === 'percentage' ? 'Phần trăm' : promo.type === 'fixed' ? 'Cố định' : 'Tặng kèm'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {promo.type === 'percentage' 
                          ? `${promo.value}%` 
                          : promo.type === 'fixed'
                          ? formatCurrency(promo.value)
                          : `${promo.giftQuantity}x ${promo.giftItem}`
                        }
                      </TableCell>
                      <TableCell>
                        {promo.usedCount}
                      </TableCell>
                      <TableCell>
                        {promo.usageLimit > 0 ? promo.usageLimit : '∞'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditPromo(promo.id)}
                            title="Chỉnh sửa"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleTogglePromo(promo.id)}
                            title="Vô hiệu hóa"
                            className={promo.status === 'active' ? 'text-orange-600 hover:text-orange-700 hover:bg-orange-50' : 'text-green-600 hover:text-green-700 hover:bg-green-50'}
                          >
                            {promo.status === 'active' ? <PowerOff className="h-4 w-4" /> : <Power className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeletePromo(promo.id)}
                            title="Xóa bỏ"
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
              {filteredPromos.map((promo) => (
                <div key={promo.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{promo.code}</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyPromoCode(promo.code)}
                          title="Sao chép mã"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <h3 className="font-medium text-sm">{promo.name}</h3>
                    </div>
                    {getStatusBadge(promo.status)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Hình thức:</span>
                      <div className="flex items-center gap-1 mt-1">
                        {getTypeIcon(promo.type)}
                        <span>{promo.type === 'percentage' ? 'Phần trăm' : promo.type === 'fixed' ? 'Cố định' : 'Tặng kèm'}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Giá trị:</span>
                      <p className="font-medium">
                        {promo.type === 'percentage' 
                          ? `${promo.value}%` 
                          : promo.type === 'fixed'
                          ? formatCurrency(promo.value)
                          : `${promo.giftQuantity}x ${promo.giftItem}`
                        }
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Đã sử dụng:</span>
                      <p className="font-medium">
                        {promo.usageLimit > 0 
                          ? `${promo.usedCount}/${promo.usageLimit}`
                          : `${promo.usedCount}/∞`
                        }
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Thời gian:</span>
                      <p className="font-medium text-xs">
                        {formatDate(promo.startDate)} - {formatDate(promo.endDate)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditPromo(promo.id)}
                      title="Chỉnh sửa"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePromo(promo.id)}
                      title="Vô hiệu hóa"
                      className={promo.status === 'active' ? 'text-orange-600 hover:text-orange-700 hover:bg-orange-50' : 'text-green-600 hover:text-green-700 hover:bg-green-50'}
                    >
                      {promo.status === 'active' ? <PowerOff className="h-4 w-4" /> : <Power className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePromo(promo.id)}
                      title="Xóa bỏ"
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

        {/* Detail Modal */}
        <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chi tiết mã giảm giá</DialogTitle>
              <DialogDescription>
                Thông tin chi tiết về mã giảm giá
              </DialogDescription>
            </DialogHeader>
            {selectedPromo && (() => {
              const promo = promoCodes.find(p => p.id === selectedPromo);
              if (!promo) return null;
              
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Mã giảm giá</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{promo.code}</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyPromoCode(promo.code)}
                          title="Sao chép mã"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Tên</Label>
                      <p className="text-lg font-medium mt-1">{promo.name}</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Mô tả</Label>
                    <p className="text-lg font-medium mt-1">{promo.description || 'Không có mô tả'}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Loại giảm giá</Label>
                      <div className="flex items-center gap-2 mt-1">
                        {getTypeIcon(promo.type)}
                        <span>{promo.type === 'percentage' ? 'Phần trăm' : 'Số tiền cố định'}</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Giá trị</Label>
                      <p className="text-lg font-medium mt-1">
                        {promo.type === 'percentage' 
                          ? `${promo.value}%` 
                          : formatCurrency(promo.value)
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Đơn hàng tối thiểu</Label>
                      <p className="text-lg font-medium mt-1">
                        {promo.minOrderAmount > 0 ? formatCurrency(promo.minOrderAmount) : 'Không có'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Giảm giá tối đa</Label>
                      <p className="text-lg font-medium mt-1">
                        {promo.maxDiscountAmount > 0 ? formatCurrency(promo.maxDiscountAmount) : 'Không giới hạn'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Sử dụng</Label>
                      <p className="text-lg font-medium mt-1">
                        {promo.usageLimit > 0 
                          ? `${promo.usedCount}/${promo.usageLimit}`
                          : `${promo.usedCount}/∞`
                        }
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Trạng thái</Label>
                      <div className="mt-1">{getStatusBadge(promo.status)}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Ngày bắt đầu</Label>
                      <p className="text-lg font-medium mt-1">{formatDate(promo.startDate)}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Ngày kết thúc</Label>
                      <p className="text-lg font-medium mt-1">{formatDate(promo.endDate)}</p>
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
      </main>
    </div>
  );
};

export default AdminPromoCodes;
