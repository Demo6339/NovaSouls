import { useState } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Layout, 
  Grid, 
  List, 
  Monitor,
  Smartphone,
  Tablet,
  Eye,
  Save,
  RotateCcw
} from "lucide-react";

const layoutTemplates = [];

const AdminHomeLayout = () => {
  const [selectedLayout, setSelectedLayout] = useState(1);
  const [previewDevice, setPreviewDevice] = useState("desktop");

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">Bố cục Trang chủ</h1>
            <p className="text-muted-foreground">Quản lý bố cục và preview trang chủ</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Xem trước
            </Button>
            <Button className="bg-gradient-hero">
              <Save className="mr-2 h-4 w-4" />
              Lưu bố cục
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Layout Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">Mẫu bố cục</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {layoutTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedLayout === template.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedLayout(template.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                      {template.isActive && (
                        <Badge className="bg-green-500">Đang sử dụng</Badge>
                      )}
                    </div>
                    <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                      <Layout className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {template.sections.map((section) => (
                        <Badge key={section} variant="outline" className="text-xs">
                          {section}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg lg:text-xl">Preview</CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant={previewDevice === "desktop" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewDevice("desktop")}
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={previewDevice === "tablet" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewDevice("tablet")}
                  >
                    <Tablet className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={previewDevice === "mobile" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewDevice("mobile")}
                  >
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`border rounded-lg bg-muted/50 ${
                previewDevice === "desktop" ? "w-full" :
                previewDevice === "tablet" ? "w-3/4 mx-auto" :
                "w-1/2 mx-auto"
              }`}>
                <div className="aspect-video bg-background rounded-lg border flex items-center justify-center">
                  <div className="text-center">
                    <Layout className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Preview bố cục</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {previewDevice === "desktop" ? "Desktop" :
                       previewDevice === "tablet" ? "Tablet" : "Mobile"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section Management */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">Quản lý Section</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Hero Section", enabled: true, order: 1 },
                { name: "Features", enabled: true, order: 2 },
                { name: "Products", enabled: true, order: 3 },
                { name: "Testimonials", enabled: false, order: 4 },
                { name: "CTA Section", enabled: false, order: 5 },
                { name: "Footer", enabled: true, order: 6 }
              ].map((section) => (
                <div key={section.name} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{section.name}</h3>
                    <Badge variant={section.enabled ? "default" : "secondary"}>
                      {section.enabled ? "Bật" : "Tắt"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">Thứ tự:</Label>
                    <span className="text-sm font-medium">{section.order}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Grid className="mr-1 h-3 w-3" />
                      Cấu hình
                    </Button>
                    <Button variant="outline" size="sm">
                      <RotateCcw className="h-3 w-3" />
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

export default AdminHomeLayout;
