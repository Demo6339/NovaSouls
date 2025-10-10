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
  Calendar, 
  Save,
  Eye,
  Copy
} from "lucide-react";

const eventContent = [];

const AdminEventContent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">Nội dung Sự kiện</h1>
            <p className="text-muted-foreground">Quản lý tất cả nội dung và màu sắc trang sự kiện</p>
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
            <TabsTrigger value="events">Sự kiện</TabsTrigger>
            <TabsTrigger value="coupons">Mã giảm giá</TabsTrigger>
            <TabsTrigger value="colors">Màu sắc</TabsTrigger>
          </TabsList>

          {/* Hero Section */}
          <TabsContent value="hero" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl">Hero Section Sự kiện</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-hero-title">Tiêu đề chính</Label>
                    <Input id="event-hero-title" placeholder="Sự kiện & Khuyến mãi" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-hero-subtitle">Tiêu đề phụ</Label>
                    <Input id="event-hero-subtitle" placeholder="Khám phá các sự kiện đặc biệt" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-hero-description">Mô tả</Label>
                  <Textarea id="event-hero-description" placeholder="Tham gia các sự kiện thú vị và nhận ưu đãi hấp dẫn..." rows={3} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-hero-button-text">Text nút CTA</Label>
                    <Input id="event-hero-button-text" placeholder="Xem sự kiện" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-hero-button-link">Link nút CTA</Label>
                    <Input id="event-hero-button-link" placeholder="/events" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Section */}
          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg lg:text-xl">Nội dung sự kiện</CardTitle>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm sự kiện
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="events-title">Tiêu đề section</Label>
                      <Input id="events-title" placeholder="Sự kiện nổi bật" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="events-subtitle">Mô tả</Label>
                      <Input id="events-subtitle" placeholder="Tham gia các sự kiện đặc biệt..." />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Số sự kiện hiển thị</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">3</Button>
                      <Button variant="outline" size="sm">6</Button>
                      <Button variant="outline" size="sm">9</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Coupons Section */}
          <TabsContent value="coupons" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg lg:text-xl">Nội dung mã giảm giá</CardTitle>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm mã giảm giá
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="coupons-title">Tiêu đề section</Label>
                      <Input id="coupons-title" placeholder="Mã giảm giá" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="coupons-subtitle">Mô tả</Label>
                      <Input id="coupons-subtitle" placeholder="Nhận ưu đãi hấp dẫn..." />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Số mã giảm giá hiển thị</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">4</Button>
                      <Button variant="outline" size="sm">8</Button>
                      <Button variant="outline" size="sm">12</Button>
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
                <CardTitle className="text-lg lg:text-xl">Màu sắc trang sự kiện</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <Label>Màu chính</Label>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg border bg-orange-500"></div>
                      <div className="flex-1">
                        <Input placeholder="#F97316" />
                        <p className="text-xs text-muted-foreground mt-1">Màu nền chính</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label>Màu phụ</Label>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg border bg-red-500"></div>
                      <div className="flex-1">
                        <Input placeholder="#EF4444" />
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

export default AdminEventContent;
