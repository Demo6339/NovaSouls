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
import { Plus, Search, Edit, Trash2, Tag, Percent, Calendar, Copy } from "lucide-react";

const coupons = [];

const AdminCoupons = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">Mã giảm giá</h1>
            <p className="text-muted-foreground">Quản lý mã giảm giá và khuyến mãi</p>
          </div>
          <Button className="bg-gradient-hero w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Tạo mã giảm giá
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tổng mã giảm giá
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Đang hoạt động
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Đã hết hạn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Đã sử dụng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">0</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-lg lg:text-xl">Danh sách mã giảm giá</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm mã giảm giá..."
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
                    <TableHead>Mã giảm giá</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Giá trị</TableHead>
                    <TableHead>Thời hạn</TableHead>
                    <TableHead>Sử dụng</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coupons.map((coupon) => (
                    <TableRow key={coupon.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Tag className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium font-mono">{coupon.code}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {coupon.type === 'percentage' ? 'Phần trăm' : 'Số tiền'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {coupon.type === 'percentage' ? (
                            <Percent className="h-3 w-3 text-muted-foreground" />
                          ) : null}
                          <span className="font-medium">
                            {coupon.type === 'percentage' 
                              ? `${coupon.value}%` 
                              : `${coupon.value.toLocaleString('vi-VN')}đ`
                            }
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{coupon.startDate}</div>
                          <div className="text-muted-foreground">{coupon.endDate}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{coupon.usedCount}/{coupon.maxUses || '∞'}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          coupon.status === 'active' ? 'bg-green-500' :
                          coupon.status === 'expired' ? 'bg-red-500' :
                          'bg-gray-500'
                        }>
                          {coupon.status === 'active' ? 'Hoạt động' :
                           coupon.status === 'expired' ? 'Hết hạn' :
                           'Tạm dừng'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" title="Sao chép mã">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive">
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
              {coupons.map((coupon) => (
                <div key={coupon.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Tag className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium font-mono text-sm">{coupon.code}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {coupon.type === 'percentage' ? 'Giảm phần trăm' : 'Giảm số tiền'}
                      </p>
                    </div>
                    <Badge className={
                      coupon.status === 'active' ? 'bg-green-500' :
                      coupon.status === 'expired' ? 'bg-red-500' :
                      'bg-gray-500'
                    }>
                      {coupon.status === 'active' ? 'Hoạt động' :
                       coupon.status === 'expired' ? 'Hết hạn' :
                       'Tạm dừng'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Giá trị:</span>
                      <p className="font-medium">
                        {coupon.type === 'percentage' 
                          ? `${coupon.value}%` 
                          : `${coupon.value.toLocaleString('vi-VN')}đ`
                        }
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Sử dụng:</span>
                      <p className="font-medium">{coupon.usedCount}/{coupon.maxUses || '∞'}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{coupon.startDate} - {coupon.endDate}</span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2 border-t">
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4 mr-1" />
                      Sao chép
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Sửa
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Xóa
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {coupons.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Tag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">Chưa có mã giảm giá nào</p>
                <p className="text-sm">Bắt đầu tạo mã giảm giá đầu tiên của bạn</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminCoupons;
