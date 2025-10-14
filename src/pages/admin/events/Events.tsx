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
import { Plus, Search, Edit, Trash2, Eye, Calendar, Users, Star, Target, Gift, Power, PowerOff } from "lucide-react";
import { useEvents } from "@/contexts/EventContext";
import { usePromoCodes } from "@/contexts/PromoContext";
import { useMenu } from "@/contexts/MenuContext";

const AdminEvents = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const { promoCodes, getPromoCodesByEvent } = usePromoCodes();
  const { allItems } = useMenu();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    type: "promotion" as "promotion" | "discount" | "special" | "seasonal",
    startDate: "",
    endDate: "",
    status: "active" as "active" | "inactive" | "upcoming" | "ended",
    targetAudience: "all" as "all" | "new_customers" | "vip_customers" | "returning_customers",
    conditions: "",
    benefits: "",
    applicableItems: [] as string[],
    promoCodeIds: [] as number[],
    priority: 5,
    isFeatured: false
  });

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Đang diễn ra', className: 'bg-green-500' },
      inactive: { label: 'Tạm dừng', className: 'bg-gray-500' },
      upcoming: { label: 'Sắp diễn ra', className: 'bg-blue-500' },
      ended: { label: 'Đã kết thúc', className: 'bg-red-500' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getTypeIcon = (type: string) => {
    const typeIcons = {
      promotion: <Gift className="h-4 w-4" />,
      discount: <Target className="h-4 w-4" />,
      special: <Star className="h-4 w-4" />,
      seasonal: <Calendar className="h-4 w-4" />
    };
    return typeIcons[type as keyof typeof typeIcons] || <Gift className="h-4 w-4" />;
  };

  const getTypeLabel = (type: string) => {
    const typeLabels = {
      promotion: 'Khuyến mãi',
      discount: 'Giảm giá',
      special: 'Đặc biệt',
      seasonal: 'Theo mùa'
    };
    return typeLabels[type as keyof typeof typeLabels] || type;
  };

  const getAudienceLabel = (audience: string) => {
    const audienceLabels = {
      all: 'Tất cả khách hàng',
      new_customers: 'Khách hàng mới',
      vip_customers: 'Khách hàng VIP',
      returning_customers: 'Khách hàng quay lại'
    };
    return audienceLabels[audience as keyof typeof audienceLabels] || audience;
  };

  const handleAddEvent = () => {
    if (newEvent.name && newEvent.description && newEvent.startDate && newEvent.endDate) {
      addEvent(newEvent);
      setNewEvent({
        name: "",
        description: "",
        type: "promotion",
        startDate: "",
        endDate: "",
        status: "active",
        targetAudience: "all",
        conditions: "",
        benefits: "",
        applicableItems: [],
        promoCodeIds: [],
        priority: 5,
        isFeatured: false
      });
      setShowAddModal(false);
    }
  };

  const handleViewDetail = (eventId: number) => {
    setSelectedEvent(eventId);
    setShowDetailModal(true);
  };

  const handleEditEvent = (eventId: number) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      setNewEvent({
        name: event.name,
        description: event.description,
        type: event.type,
        startDate: event.startDate,
        endDate: event.endDate,
        status: event.status,
        targetAudience: event.targetAudience,
        conditions: event.conditions,
        benefits: event.benefits,
        applicableItems: event.applicableItems,
        promoCodeIds: event.promoCodeIds,
        priority: event.priority,
        isFeatured: event.isFeatured
      });
      setShowAddModal(true);
    }
  };

  const handleToggleEvent = (eventId: number) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      const newStatus = event.status === 'active' ? 'inactive' : 'active';
      updateEvent(eventId, { status: newStatus });
    }
  };

  const handleDeleteEvent = (eventId: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa hoạt động này?")) {
      deleteEvent(eventId);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">Hoạt động</h1>
          <p className="text-muted-foreground">Quản lý các hoạt động và sự kiện khuyến mãi</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Tìm kiếm hoạt động..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-hero">
                <Plus className="mr-2 h-4 w-4" />
                Tạo hoạt động
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Tạo hoạt động mới</DialogTitle>
                <DialogDescription>
                  Tạo hoạt động khuyến mãi mới cho khách hàng
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Tên hoạt động *</Label>
                  <Input
                    id="name"
                    value={newEvent.name}
                    onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                    placeholder="VD: Khuyến mãi chào mừng năm mới"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Mô tả hoạt động *</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    placeholder="Mô tả chi tiết về hoạt động"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="targetAudience">Đối tượng *</Label>
                  <Select value={newEvent.targetAudience} onValueChange={(value: "all" | "new_customers" | "vip_customers" | "returning_customers") => setNewEvent({...newEvent, targetAudience: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn đối tượng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="new_customers">Người mới</SelectItem>
                      <SelectItem value="vip_customers">Thân thiết</SelectItem>
                      <SelectItem value="returning_customers">Quay lại</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Ngày bắt đầu *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newEvent.startDate}
                      onChange={(e) => setNewEvent({...newEvent, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">Ngày kết thúc *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newEvent.endDate}
                      onChange={(e) => setNewEvent({...newEvent, endDate: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="promoCodes">Tên giảm giá</Label>
                  <Select 
                    value={newEvent.promoCodeIds.length > 0 ? newEvent.promoCodeIds[0].toString() : "none"} 
                    onValueChange={(value) => setNewEvent({...newEvent, promoCodeIds: value && value !== "none" ? [parseInt(value)] : []})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn mã giảm giá" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Không chọn mã giảm giá</SelectItem>
                      {promoCodes.filter(promo => promo.status === 'active').map((promo) => (
                        <SelectItem key={promo.id} value={promo.id.toString()}>
                          {promo.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowAddModal(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleAddEvent}>
                    Tạo hoạt động
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách hoạt động</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên hoạt động</TableHead>
                    <TableHead>Đối tượng</TableHead>
                    <TableHead>Ngày bắt đầu</TableHead>
                    <TableHead>Ngày kết thúc</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => {
                    const linkedPromoCodes = getPromoCodesByEvent(event.id);
                    return (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {event.name}
                            {event.isFeatured && <Star className="h-4 w-4 text-yellow-500" />}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            {getAudienceLabel(event.targetAudience)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {formatDate(event.startDate)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {formatDate(event.endDate)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetail(event.id)}
                              title="Xem chi tiết"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditEvent(event.id)}
                              title="Chỉnh sửa"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleEvent(event.id)}
                              title="Vô hiệu hóa"
                              className={event.status === 'active' ? 'text-orange-600 hover:text-orange-700 hover:bg-orange-50' : 'text-green-600 hover:text-green-700 hover:bg-green-50'}
                            >
                              {event.status === 'active' ? <PowerOff className="h-4 w-4" /> : <Power className="h-4 w-4" />}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteEvent(event.id)}
                              title="Xóa bỏ"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card Layout */}
            <div className="lg:hidden space-y-4">
              {filteredEvents.map((event) => {
                const linkedPromoCodes = getPromoCodesByEvent(event.id);
                return (
                  <div key={event.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-sm">{event.name}</h3>
                          {event.isFeatured && <Star className="h-4 w-4 text-yellow-500" />}
                        </div>
                        <p className="text-xs text-muted-foreground">{event.description}</p>
                      </div>
                      {getStatusBadge(event.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Đối tượng:</span>
                        <p className="font-medium text-xs mt-1">{getAudienceLabel(event.targetAudience)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Ngày bắt đầu:</span>
                        <p className="font-medium text-xs mt-1">{formatDate(event.startDate)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Ngày kết thúc:</span>
                        <p className="font-medium text-xs mt-1">{formatDate(event.endDate)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Trạng thái:</span>
                        <div className="mt-1">{getStatusBadge(event.status)}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-2 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetail(event.id)}
                        title="Xem chi tiết"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditEvent(event.id)}
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleEvent(event.id)}
                        title="Vô hiệu hóa"
                        className={event.status === 'active' ? 'text-orange-600 hover:text-orange-700 hover:bg-orange-50' : 'text-green-600 hover:text-green-700 hover:bg-green-50'}
                      >
                        {event.status === 'active' ? <PowerOff className="h-4 w-4" /> : <Power className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteEvent(event.id)}
                        title="Xóa bỏ"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Detail Modal */}
        <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chi tiết hoạt động</DialogTitle>
              <DialogDescription>
                Thông tin chi tiết về hoạt động
              </DialogDescription>
            </DialogHeader>
            {selectedEvent && (() => {
              const event = events.find(e => e.id === selectedEvent);
              if (!event) return null;
              
              const linkedPromoCodes = getPromoCodesByEvent(event.id);
              
              return (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">{event.name}</h3>
                    {event.isFeatured && <Star className="h-5 w-5 text-yellow-500" />}
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Mô tả</Label>
                    <p className="text-lg font-medium mt-1">{event.description}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Đối tượng</Label>
                    <p className="text-lg font-medium mt-1">{getAudienceLabel(event.targetAudience)}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Ngày bắt đầu</Label>
                      <p className="text-lg font-medium mt-1">{formatDate(event.startDate)}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Ngày kết thúc</Label>
                      <p className="text-lg font-medium mt-1">{formatDate(event.endDate)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Trạng thái</Label>
                    <div className="mt-1">{getStatusBadge(event.status)}</div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Tên mã</Label>
                    <div className="mt-2">
                      {linkedPromoCodes.length > 0 ? (
                        <div className="space-y-2">
                          {linkedPromoCodes.map((promo) => (
                            <div key={promo.id} className="flex items-center justify-between p-2 bg-muted rounded">
                              <div>
                                <p className="font-medium text-sm">{promo.name}</p>
                                <code className="font-mono text-xs text-muted-foreground">{promo.code}</code>
                              </div>
                              <Badge variant="outline">
                                {promo.type === 'percentage' ? `${promo.value}%` : `${promo.value.toLocaleString()} VNĐ`}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Không có mã giảm giá liên kết</p>
                      )}
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

export default AdminEvents;
