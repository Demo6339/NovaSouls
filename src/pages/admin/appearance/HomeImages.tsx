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
  Copy
} from "lucide-react";

const images = [];

const AdminHomeImages = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">Hình ảnh Trang chủ</h1>
            <p className="text-muted-foreground">Quản lý tất cả hình ảnh trang chủ</p>
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
                Hero Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Product Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Background Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">0</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hero Images */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hình ảnh Hero</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Kéo thả hình ảnh vào đây</p>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Chọn file
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Kích thước khuyến nghị</Label>
                  <p className="text-xs text-muted-foreground">1920x1080px (16:9)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Images */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hình sản phẩm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Tải lên hình sản phẩm</p>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Chọn file
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Kích thước khuyến nghị</Label>
                  <p className="text-xs text-muted-foreground">800x800px (1:1)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Background Images */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hình nền</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Tải lên hình nền</p>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Chọn file
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Kích thước khuyến nghị</Label>
                  <p className="text-xs text-muted-foreground">1920x1080px</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-lg lg:text-xl">Thư viện hình ảnh</CardTitle>
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
              {images.map((image) => (
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

            {images.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">Chưa có hình ảnh nào</p>
                <p className="text-sm">Bắt đầu tải lên hình ảnh đầu tiên</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminHomeImages;
