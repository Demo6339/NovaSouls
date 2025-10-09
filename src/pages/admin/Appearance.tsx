import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface SiteSettings {
  homepage_hero_title?: string;
  homepage_hero_subtitle?: string;
  homepage_hero_image?: string;
  homepage_about_title?: string;
  homepage_about_content?: string;
  menu_title?: string;
  menu_subtitle?: string;
  events_title?: string;
  events_subtitle?: string;
  footer_description?: string;
  footer_phone?: string;
  footer_email?: string;
  footer_address?: string;
  primary_color?: string;
  secondary_color?: string;
}

const Appearance = () => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({
    homepage_hero_title: "Chào mừng đến Nova Souls",
    homepage_hero_subtitle: "Nơi hòa quyện hương vị và cảm xúc",
    homepage_about_title: "Về chúng tôi",
    homepage_about_content: "Nova Souls là không gian cà phê hiện đại...",
    menu_title: "Thực đơn",
    menu_subtitle: "Khám phá các món đặc trưng",
    events_title: "Sự kiện & Khuyến mãi",
    events_subtitle: "Cập nhật các chương trình đặc biệt",
    footer_description: "Nova Souls - Nơi hòa quyện hương vị và cảm xúc",
    footer_phone: "0123 456 789",
    footer_email: "contact@novasouls.com",
    footer_address: "123 Đường ABC, Quận XYZ, TP.HCM",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('setting_key', 'appearance');

      if (error) throw error;

      if (data && data.length > 0) {
        setSettings(data[0].setting_value as SiteSettings);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      const { data: existing } = await supabase
        .from('site_settings')
        .select('id')
        .eq('setting_key', 'appearance')
        .single();

      if (existing) {
        const { error } = await supabase
          .from('site_settings')
          .update({ setting_value: settings as any })
          .eq('setting_key', 'appearance');
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('site_settings')
          .insert([{
            setting_key: 'appearance',
            setting_value: settings as any
          }]);
        
        if (error) throw error;
      }

      toast.success("Đã lưu cài đặt giao diện");
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error("Lỗi khi lưu cài đặt");
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = (key: keyof SiteSettings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Tùy chỉnh giao diện</h1>
            <p className="text-muted-foreground">Thay đổi màu sắc, nội dung, hình ảnh</p>
          </div>
          <Button onClick={saveSettings} disabled={loading} className="bg-gradient-hero">
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </div>

        <Tabs defaultValue="homepage" className="space-y-6">
          <TabsList>
            <TabsTrigger value="homepage">Trang chủ</TabsTrigger>
            <TabsTrigger value="menu">Thực đơn</TabsTrigger>
            <TabsTrigger value="events">Sự kiện</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
            <TabsTrigger value="colors">Màu sắc</TabsTrigger>
          </TabsList>

          <TabsContent value="homepage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Tiêu đề chính</Label>
                  <Input
                    value={settings.homepage_hero_title}
                    onChange={(e) => updateSetting('homepage_hero_title', e.target.value)}
                    placeholder="Chào mừng đến Nova Souls"
                  />
                </div>
                <div>
                  <Label>Phụ đề</Label>
                  <Input
                    value={settings.homepage_hero_subtitle}
                    onChange={(e) => updateSetting('homepage_hero_subtitle', e.target.value)}
                    placeholder="Nơi hòa quyện hương vị và cảm xúc"
                  />
                </div>
                <div>
                  <Label>Hình ảnh Hero (URL)</Label>
                  <Input
                    value={settings.homepage_hero_image}
                    onChange={(e) => updateSetting('homepage_hero_image', e.target.value)}
                    placeholder="/assets/hero-cafe.jpg"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phần Về Chúng Tôi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Tiêu đề</Label>
                  <Input
                    value={settings.homepage_about_title}
                    onChange={(e) => updateSetting('homepage_about_title', e.target.value)}
                    placeholder="Về chúng tôi"
                  />
                </div>
                <div>
                  <Label>Nội dung</Label>
                  <Textarea
                    value={settings.homepage_about_content}
                    onChange={(e) => updateSetting('homepage_about_content', e.target.value)}
                    placeholder="Giới thiệu về quán..."
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Header Trang Thực Đơn</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Tiêu đề</Label>
                  <Input
                    value={settings.menu_title}
                    onChange={(e) => updateSetting('menu_title', e.target.value)}
                    placeholder="Thực đơn"
                  />
                </div>
                <div>
                  <Label>Phụ đề</Label>
                  <Input
                    value={settings.menu_subtitle}
                    onChange={(e) => updateSetting('menu_subtitle', e.target.value)}
                    placeholder="Khám phá các món đặc trưng"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Header Trang Sự Kiện</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Tiêu đề</Label>
                  <Input
                    value={settings.events_title}
                    onChange={(e) => updateSetting('events_title', e.target.value)}
                    placeholder="Sự kiện & Khuyến mãi"
                  />
                </div>
                <div>
                  <Label>Phụ đề</Label>
                  <Input
                    value={settings.events_subtitle}
                    onChange={(e) => updateSetting('events_subtitle', e.target.value)}
                    placeholder="Cập nhật các chương trình đặc biệt"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="footer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông Tin Footer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Mô tả</Label>
                  <Textarea
                    value={settings.footer_description}
                    onChange={(e) => updateSetting('footer_description', e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Số điện thoại</Label>
                  <Input
                    value={settings.footer_phone}
                    onChange={(e) => updateSetting('footer_phone', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    value={settings.footer_email}
                    onChange={(e) => updateSetting('footer_email', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Địa chỉ</Label>
                  <Input
                    value={settings.footer_address}
                    onChange={(e) => updateSetting('footer_address', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="colors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Màu Sắc Chủ Đạo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Màu chính (Primary)</Label>
                  <Input
                    type="color"
                    value={settings.primary_color || "#6B4423"}
                    onChange={(e) => updateSetting('primary_color', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Màu phụ (Secondary)</Label>
                  <Input
                    type="color"
                    value={settings.secondary_color || "#8B6F47"}
                    onChange={(e) => updateSetting('secondary_color', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Appearance;