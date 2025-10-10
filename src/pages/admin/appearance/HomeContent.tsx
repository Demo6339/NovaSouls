import { useState } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Type, 
  Palette, 
  Save,
  Eye,
  Copy
} from "lucide-react";

const contentSections = [];

const AdminHomeContent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">Nội dung Trang chủ</h1>
            <p className="text-muted-foreground">Quản lý tất cả nội dung và màu sắc trang chủ</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Xem trước
            </Button>
            <Button className="bg-gradient-hero">
              <Save className="mr-2 h-4 w-4" />
              Lưu thay đổi
            </Button>
          </div>
        </div>

        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="features">Tính năng</TabsTrigger>
            <TabsTrigger value="products">Sản phẩm</TabsTrigger>
            <TabsTrigger value="colors">Màu sắc</TabsTrigger>
          </TabsList>

          {/* Hero Section */}
          <TabsContent value="hero" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl">Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hero-title">Tiêu đề chính</Label>
                    <Input id="hero-title" placeholder="Nhập tiêu đề chính..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero-subtitle">Tiêu đề phụ</Label>
                    <Input id="hero-subtitle" placeholder="Nhập tiêu đề phụ..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-description">Mô tả</Label>
                  <Textarea id="hero-description" placeholder="Nhập mô tả..." rows={3} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hero-button-text">Text nút CTA</Label>
                    <Input id="hero-button-text" placeholder="Ví dụ: Đặt hàng ngay" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero-button-link">Link nút CTA</Label>
                    <Input id="hero-button-link" placeholder="/menu" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Section */}
          <TabsContent value="features" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg lg:text-xl">Tính năng nổi bật</CardTitle>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm tính năng
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contentSections.map((section) => (
                    <div key={section.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium">{section.title}</h3>
                          <p className="text-sm text-muted-foreground">{section.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {contentSections.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Type className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">Chưa có tính năng nào</p>
                      <p className="text-sm">Bắt đầu thêm tính năng đầu tiên</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Section */}
          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl">Sản phẩm nổi bật</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="products-title">Tiêu đề section</Label>
                      <Input id="products-title" placeholder="Sản phẩm nổi bật" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="products-subtitle">Mô tả</Label>
                      <Input id="products-subtitle" placeholder="Khám phá những món ngon nhất..." />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Số sản phẩm hiển thị</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">4</Button>
                      <Button variant="outline" size="sm">6</Button>
                      <Button variant="outline" size="sm">8</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Colors Section */}
          <TabsContent value="colors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl">Màu sắc chủ đạo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <Label>Màu chính</Label>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg border bg-gradient-hero"></div>
                      <div className="flex-1">
                        <Input placeholder="#8B4513" />
                        <p className="text-xs text-muted-foreground mt-1">Màu nền chính</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label>Màu phụ</Label>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg border bg-blue-500"></div>
                      <div className="flex-1">
                        <Input placeholder="#3B82F6" />
                        <p className="text-xs text-muted-foreground mt-1">Màu accent</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label>Màu text</Label>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg border bg-gray-900"></div>
                      <div className="flex-1">
                        <Input placeholder="#111827" />
                        <p className="text-xs text-muted-foreground mt-1">Màu chữ chính</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminHomeContent;
