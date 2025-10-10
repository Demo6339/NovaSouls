import { useState } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Image as ImageIcon, 
  Upload,
  Download,
  Eye,
  Copy,
  Calendar,
  Tag
} from "lucide-react";

const eventImages = [];

const AdminEventImages = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">Hình ảnh Sự kiện</h1>
            <p className="text-muted-foreground">Quản lý tất cả hình ảnh trang sự kiện</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Tải lên
            </Button>
            <Button className="bg-gradient-hero">
              <Plus className="mr-2 h-4 w-4" />
              Thêm hình ảnh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tổng hình ảnh
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Hình sự kiện
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Hình mã giảm giá
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Hình banner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">0</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Event Images */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Hình ảnh sự kiện
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Tải lên hình sự kiện</p>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Chọn file
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Kích thước khuyến nghị</Label>
                  <p className="text-xs text-muted-foreground">800x600px (4:3)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coupon Images */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Hình mã giảm giá
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Tải lên hình mã giảm giá</p>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Chọn file
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Kích thước khuyến nghị</Label>
                  <p className="text-xs text-muted-foreground">600x400px (3:2)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Banner Images */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hình banner</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Tải lên hình banner</p>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Chọn file
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Kích thước khuyến nghị</Label>
                  <p className="text-xs text-muted-foreground">1920x400px</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-lg lg:text-xl">Thư viện hình ảnh sự kiện</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm hình ảnh..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {eventImages.map((image) => (
                <div key={image.id} className="group relative">
                  <div className="aspect-square rounded-lg border overflow-hidden bg-muted">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-1">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs font-medium truncate">{image.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {image.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {eventImages.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">Chưa có hình ảnh sự kiện nào</p>
                <p className="text-sm">Bắt đầu tải lên hình ảnh sự kiện đầu tiên</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminEventImages;
