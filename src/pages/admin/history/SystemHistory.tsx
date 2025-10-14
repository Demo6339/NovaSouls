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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Calendar, Clock, User, Settings, Database, AlertTriangle, CheckCircle } from "lucide-react";

const SystemHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Dữ liệu mẫu cho lịch sử hệ thống
  const systemHistory = [
    {
      id: "LOGIN-20240115-001",
      type: "login",
      action: "Đăng nhập hệ thống",
      description: "Quản trị viên đăng nhập vào dashboard",
      status: "success",
      user: "Quản trị",
      timestamp: "2024-01-15T09:00:00"
    },
    {
      id: "UPDATE-20240115-002",
      action: "Cập nhật hệ thống",
      description: "Nâng cấp phiên bản từ v1.2.0 lên v1.3.0",
      status: "success",
      user: "Hệ thống",
      timestamp: "2024-01-15T02:00:00"
    },
    {
      id: "BACKUP-20240115-003",
      type: "backup",
      action: "Sao lưu dữ liệu",
      description: "Tạo bản sao lưu toàn bộ cơ sở dữ liệu",
      status: "success",
      user: "Hệ thống",
      timestamp: "2024-01-15T01:00:00"
    },
    {
      id: "RESTORE-20240114-004",
      type: "restore",
      action: "Khôi phục dữ liệu",
      description: "Khôi phục từ file backup ngày 13/01/2024",
      status: "success",
      user: "Quản trị",
      timestamp: "2024-01-14T22:30:00"
    },
    {
      id: "USE-20240115-005",
      type: "use",
      action: "Thêm món ăn mới",
      description: "Thêm món Phở Bò vào menu chính",
      status: "success",
      user: "Quản trị",
      timestamp: "2024-01-15T10:30:00"
    },
    {
      id: "USE-20240115-006",
      type: "use",
      action: "Cập nhật thông tin khách hàng",
      description: "Chỉnh sửa thông tin khách hàng ORD001",
      status: "success",
      user: "Quản trị",
      timestamp: "2024-01-15T11:15:00"
    },
    {
      id: "USE-20240115-007",
      type: "use",
      action: "Xóa mã giảm giá",
      description: "Xóa mã giảm giá WELCOME10 đã hết hạn",
      status: "success",
      user: "Quản trị",
      timestamp: "2024-01-15T14:20:00"
    },
    {
      id: "UPDATE-20240115-008",
      type: "update",
      action: "Sửa lỗi hệ thống",
      description: "Khắc phục lỗi không thể tải hình ảnh sản phẩm",
      status: "error",
      user: "Hệ thống",
      timestamp: "2024-01-15T16:45:00"
    },
    {
      id: "USE-20240114-009",
      type: "use",
      action: "Nhập hàng vào kho",
      description: "Nhập 5kg thịt bò vào kho nguyên liệu",
      status: "success",
      user: "Quản trị",
      timestamp: "2024-01-14T16:45:00"
    },
    {
      id: "LOGIN-20240114-010",
      type: "login",
      action: "Đăng nhập hệ thống",
      description: "Quản trị viên đăng nhập vào dashboard",
      status: "success",
      user: "Quản trị",
      timestamp: "2024-01-14T08:30:00"
    }
  ];

  const getTypeIcon = (type: string) => {
    const typeIcons = {
      login: <User className="h-4 w-4" />,
      update: <Settings className="h-4 w-4" />,
      backup: <Database className="h-4 w-4" />,
      restore: <Database className="h-4 w-4" />,
      use: <Settings className="h-4 w-4" />
    };
    return typeIcons[type as keyof typeof typeIcons] || <Settings className="h-4 w-4" />;
  };

  const getTypeLabel = (type: string) => {
    const typeLabels = {
      login: 'Đăng nhập',
      update: 'Cập nhật',
      backup: 'Sao lưu',
      restore: 'Khôi phục',
      use: 'Sử dụng'
    };
    return typeLabels[type as keyof typeof typeLabels] || type;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      success: { label: 'Thành công', className: 'bg-green-500' },
      error: { label: 'Bị lỗi', className: 'bg-red-500' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.success;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const filteredHistory = systemHistory.filter(entry => {
    const matchesSearch = entry.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.user.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === "all" || entry.type === typeFilter;
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">Lịch sử hệ thống</h1>
          <p className="text-muted-foreground">Theo dõi hoạt động và sự kiện hệ thống</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Tìm kiếm theo hành động, mô tả, người dùng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Loại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="login">Đăng nhập</SelectItem>
                <SelectItem value="update">Cập nhật</SelectItem>
                <SelectItem value="backup">Sao lưu</SelectItem>
                <SelectItem value="restore">Khôi phục</SelectItem>
                <SelectItem value="use">Sử dụng</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="success">Thành công</SelectItem>
                <SelectItem value="error">Bị lỗi</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-gradient-hero">
              <Download className="mr-2 h-4 w-4" />
              Xuất Excel
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Nhật ký hệ thống ({filteredHistory.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Hành động</TableHead>
                    <TableHead>Người dùng</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thời gian</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">
                        <code className="bg-muted px-2 py-1 rounded text-sm">{entry.id}</code>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(entry.type)}
                          <span className="text-sm">{getTypeLabel(entry.type)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {entry.action}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <User className="h-4 w-4" />
                          {entry.user}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(entry.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {formatDateTime(entry.timestamp).split(',')[0]}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {formatDateTime(entry.timestamp).split(',')[1]}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card Layout */}
            <div className="lg:hidden space-y-4">
              {filteredHistory.map((entry) => (
                <div key={entry.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{entry.id}</code>
                        {getStatusBadge(entry.status)}
                      </div>
                      <h3 className="font-medium text-sm">{entry.action}</h3>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Loại:</span>
                      <div className="flex items-center gap-1 mt-1">
                        {getTypeIcon(entry.type)}
                        <span>{getTypeLabel(entry.type)}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Người dùng:</span>
                      <div className="flex items-center gap-1 mt-1">
                        <User className="h-4 w-4" />
                        <span>{entry.user}</span>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Thời gian:</span>
                      <p className="text-sm">{formatDateTime(entry.timestamp)}</p>
                    </div>
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

export default SystemHistory;
