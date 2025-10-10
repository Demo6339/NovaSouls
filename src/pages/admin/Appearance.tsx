import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, Plus, Trash2, Eye, Palette, Type, Image, Layout, Link as LinkIcon, Calendar, Coffee, MapPin, Heart, Clock } from "lucide-react";
import HomepagePreview from "@/components/admin/HomepagePreview";

interface SiteSettings {
  // Hero Section
  hero_badge_text?: string;
  hero_main_title?: string;
  hero_subtitle?: string;
  hero_background_image?: string;
  hero_stats_customers?: string;
  hero_stats_products?: string;
  hero_stats_rating?: string;
  hero_button_primary_text?: string;
  hero_button_primary_link?: string;
  hero_button_secondary_text?: string;
  hero_button_secondary_link?: string;
  hero_contact_address?: string;
  hero_contact_phone?: string;
  hero_contact_hours?: string;
  
  // Featured Products
  featured_products_title?: string;
  featured_products_subtitle?: string;
  featured_products_button_text?: string;
  featured_products_button_link?: string;
  
  // Features Section
  features_badge_text?: string;
  features_title?: string;
  features_subtitle?: string;
  
  // Stats Section
  stats_title?: string;
  stats_subtitle?: string;
  stats_customers_value?: string;
  stats_customers_label?: string;
  stats_customers_description?: string;
  stats_products_value?: string;
  stats_products_label?: string;
  stats_products_description?: string;
  stats_rating_value?: string;
  stats_rating_label?: string;
  stats_rating_description?: string;
  stats_experience_value?: string;
  stats_experience_label?: string;
  stats_experience_description?: string;
  
  
  // About Section
  about_badge_text?: string;
  about_title?: string;
  about_content?: string;
  about_additional_content?: string;
  about_founded_year?: string;
  about_experience_years?: string;
  about_fresh_ingredients?: string;
  about_support_hours?: string;
  about_images?: string[];
  
  // Footer
  footer_description?: string;
  footer_phone?: string;
  footer_email?: string;
  footer_address?: string;
  footer_facebook_url?: string;
  footer_instagram_url?: string;
  footer_weekday_hours?: string;
  footer_weekend_hours?: string;
  footer_delivery_hours?: string;
  
  // Colors
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  background_color?: string;
  text_color?: string;
  
  // Layout
  hero_layout?: 'left-right' | 'center' | 'right-left';
  featured_products_columns?: '2' | '3' | '4';
  features_columns?: '2' | '3' | '4';
  testimonials_columns?: '2' | '3';
  
  // Typography
  hero_title_size?: 'text-4xl' | 'text-5xl' | 'text-6xl' | 'text-7xl' | 'text-8xl';
  section_title_size?: 'text-2xl' | 'text-3xl' | 'text-4xl' | 'text-5xl';
  body_text_size?: 'text-sm' | 'text-base' | 'text-lg';
}

const Appearance = () => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({
    // Hero Section
    hero_badge_text: "Specialty Coffee & Artisan Bakery",
    hero_main_title: "Chào mừng đến với Nova Souls",
    hero_subtitle: "Khám phá hương vị độc đáo của cà phê specialty được pha chế tận tâm, kết hợp với bánh ngọt artisan trong không gian ấm cúng và hiện đại.",
    hero_background_image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    hero_stats_customers: "2,500+",
    hero_stats_products: "80+",
    hero_stats_rating: "4.9",
    hero_button_primary_text: "Xem thực đơn",
    hero_button_primary_link: "/menu",
    hero_button_secondary_text: "Sự kiện",
    hero_button_secondary_link: "/events",
    hero_contact_address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
    hero_contact_phone: "(028) 1234 5678",
    hero_contact_hours: "Mở cửa 7:00 - 22:00",
    
    // Featured Products
    featured_products_title: "Thực đơn đặc sản",
    featured_products_subtitle: "Những món ngon được yêu thích nhất, được chọn lọc kỹ lưỡng từ thực đơn của chúng tôi với nguyên liệu cao cấp",
    featured_products_button_text: "Xem toàn bộ thực đơn",
    featured_products_button_link: "/menu",
    
    // Features Section
    features_badge_text: "Tại sao chọn chúng tôi",
    features_title: "Trải nghiệm đặt món hiện đại",
    features_subtitle: "Công nghệ tiên tiến kết hợp với dịch vụ chuyên nghiệp, mang đến trải nghiệm tuyệt vời cho khách hàng",
    
    // Stats Section
    stats_title: "Nova Souls trong số liệu",
    stats_subtitle: "Những con số biết nói về chất lượng dịch vụ và sự tin tưởng của khách hàng",
    stats_customers_value: "1000+",
    stats_customers_label: "Khách hàng hài lòng",
    stats_customers_description: "Mỗi tháng",
    stats_products_value: "50+",
    stats_products_label: "Món ngon đa dạng",
    stats_products_description: "Cà phê & đồ ăn",
    stats_rating_value: "4.9",
    stats_rating_label: "Đánh giá trung bình",
    stats_rating_description: "Từ khách hàng",
    stats_experience_value: "5+",
    stats_experience_label: "Năm kinh nghiệm",
    stats_experience_description: "Phục vụ chuyên nghiệp",
    
    
    // About Section
    about_badge_text: "Về chúng tôi",
    about_title: "Câu chuyện của Nova Souls",
    about_content: "Nova Souls là không gian cà phê hiện đại, nơi hòa quyện giữa hương vị truyền thống và sự sáng tạo đương đại. Chúng tôi tự hào mang đến những ly cà phê được pha chế tỉ mỉ, các món ăn nhẹ tinh tế, trong không gian ấm cúng và thân thiện.",
    about_additional_content: "Từ những hạt cà phê được tuyển chọn kỹ lưỡng đến những chiếc bánh ngọt được làm thủ công, chúng tôi cam kết mang đến trải nghiệm ẩm thực đặc biệt cho mỗi khách hàng.",
    about_founded_year: "2019",
    about_experience_years: "5+",
    about_fresh_ingredients: "100%",
    about_support_hours: "24/7",
    about_images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    ],
    
    // Footer
    footer_description: "Nơi hội tụ những tâm hồn yêu cà phê, mang đến trải nghiệm đặc biệt cho mỗi khách hàng với specialty coffee và artisan bakery.",
    footer_phone: "(028) 1234 5678",
    footer_email: "hello@novasouls.com",
    footer_address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
    footer_facebook_url: "https://facebook.com/novasouls",
    footer_instagram_url: "https://instagram.com/novasouls",
    footer_weekday_hours: "7:00 - 22:00",
    footer_weekend_hours: "8:00 - 23:00",
    footer_delivery_hours: "8:00 - 21:00",
    
    // Colors
    primary_color: "#6B4423",
    secondary_color: "#8B6F47",
    accent_color: "#22C55E",
    background_color: "#FAFAFA",
    text_color: "#1F2937",
    
    // Layout
    hero_layout: 'left-right',
    featured_products_columns: '3',
    features_columns: '4',
    testimonials_columns: '3',
    
    // Typography
    hero_title_size: 'text-7xl',
    section_title_size: 'text-4xl',
    body_text_size: 'text-base',
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
      <main className="flex-1 p-3 sm:p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="mb-4 lg:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-1 sm:mb-2">Tùy chỉnh giao diện</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Thay đổi màu sắc, nội dung, hình ảnh</p>
          </div>
          <Button onClick={saveSettings} disabled={loading} className="bg-gradient-hero w-full sm:w-auto text-sm sm:text-base">
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </div>

        <Tabs defaultValue="homepage" className="space-y-4 lg:space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="homepage" className="flex items-center justify-center gap-2 text-xs lg:text-sm py-3">
              <Layout className="h-4 w-4" />
              <span>Trang chủ</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center justify-center gap-2 text-xs lg:text-sm py-3">
              <Calendar className="h-4 w-4" />
              <span>Sự kiện</span>
            </TabsTrigger>
          </TabsList>

          {/* Trang Chủ */}
          <TabsContent value="homepage" className="space-y-6">
            <Tabs defaultValue="hero" className="space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                {/* Content Sections Tabs - Mobile: 2 rows of 3 columns */}
                <div className="block sm:hidden">
                  <TabsList className="grid w-full grid-cols-3 gap-1 h-auto">
                    <TabsTrigger value="hero" className="flex flex-col items-center gap-1 p-2 text-xs min-h-[60px]">
                      <Layout className="h-4 w-4" />
                      <span className="text-center leading-tight">Hero</span>
                    </TabsTrigger>
                    <TabsTrigger value="products" className="flex flex-col items-center gap-1 p-2 text-xs min-h-[60px]">
                      <Image className="h-4 w-4" />
                      <span className="text-center leading-tight">Sản phẩm</span>
                    </TabsTrigger>
                    <TabsTrigger value="features" className="flex flex-col items-center gap-1 p-2 text-xs min-h-[60px]">
                      <Type className="h-4 w-4" />
                      <span className="text-center leading-tight">Tính năng</span>
                    </TabsTrigger>
                    <TabsTrigger value="stats" className="flex flex-col items-center gap-1 p-2 text-xs min-h-[60px]">
                      <Type className="h-4 w-4" />
                      <span className="text-center leading-tight">Thống kê</span>
                    </TabsTrigger>
                    <TabsTrigger value="about" className="flex flex-col items-center gap-1 p-2 text-xs min-h-[60px]">
                      <Image className="h-4 w-4" />
                      <span className="text-center leading-tight">Giới thiệu</span>
                    </TabsTrigger>
                    <TabsTrigger value="footer" className="flex flex-col items-center gap-1 p-2 text-xs min-h-[60px]">
                      <LinkIcon className="h-4 w-4" />
                      <span className="text-center leading-tight">Footer</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                {/* Content Sections Tabs - Desktop: Horizontal scroll */}
                <div className="hidden sm:block w-full overflow-x-auto scrollbar-thin">
                  <TabsList className="inline-flex w-max min-w-full">
                    <TabsTrigger value="hero" className="flex items-center gap-2 px-3 py-2 text-xs whitespace-nowrap">
                      <Layout className="h-4 w-4" />
                      <span>Hero</span>
                    </TabsTrigger>
                    <TabsTrigger value="products" className="flex items-center gap-2 px-3 py-2 text-xs whitespace-nowrap">
                      <Image className="h-4 w-4" />
                      <span>Sản phẩm</span>
                    </TabsTrigger>
                    <TabsTrigger value="features" className="flex items-center gap-2 px-3 py-2 text-xs whitespace-nowrap">
                      <Type className="h-4 w-4" />
                      <span>Tính năng</span>
                    </TabsTrigger>
                    <TabsTrigger value="stats" className="flex items-center gap-2 px-3 py-2 text-xs whitespace-nowrap">
                      <Type className="h-4 w-4" />
                      <span>Thống kê</span>
                    </TabsTrigger>
                    <TabsTrigger value="about" className="flex items-center gap-2 px-3 py-2 text-xs whitespace-nowrap">
                      <Image className="h-4 w-4" />
                      <span>Giới thiệu</span>
                    </TabsTrigger>
                    <TabsTrigger value="footer" className="flex items-center gap-2 px-3 py-2 text-xs whitespace-nowrap">
                      <LinkIcon className="h-4 w-4" />
                      <span>Footer</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                {/* Settings Tabs - Mobile: 2x2 grid, Desktop: Horizontal */}
                <div className="block sm:hidden">
                  <TabsList className="grid w-full grid-cols-2 gap-1 h-auto">
                    <TabsTrigger value="colors" className="flex flex-col items-center gap-1 p-2 text-xs min-h-[60px]">
                      <Palette className="h-4 w-4" />
                      <span className="text-center leading-tight">Màu sắc</span>
                    </TabsTrigger>
                    <TabsTrigger value="layout" className="flex flex-col items-center gap-1 p-2 text-xs min-h-[60px]">
                      <Layout className="h-4 w-4" />
                      <span className="text-center leading-tight">Bố cục</span>
                    </TabsTrigger>
                    <TabsTrigger value="typography" className="flex flex-col items-center gap-1 p-2 text-xs min-h-[60px]">
                      <Type className="h-4 w-4" />
                      <span className="text-center leading-tight">Typography</span>
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="flex flex-col items-center gap-1 p-2 text-xs min-h-[60px]">
                      <Eye className="h-4 w-4" />
                      <span className="text-center leading-tight">Xem trước</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="hidden sm:block w-full overflow-x-auto scrollbar-thin">
                  <TabsList className="inline-flex w-max min-w-full">
                    <TabsTrigger value="colors" className="flex items-center gap-2 px-3 py-2 text-xs whitespace-nowrap">
                      <Palette className="h-4 w-4" />
                      <span>Màu sắc</span>
                    </TabsTrigger>
                    <TabsTrigger value="layout" className="flex items-center gap-2 px-3 py-2 text-xs whitespace-nowrap">
                      <Layout className="h-4 w-4" />
                      <span>Bố cục</span>
                    </TabsTrigger>
                    <TabsTrigger value="typography" className="flex items-center gap-2 px-3 py-2 text-xs whitespace-nowrap">
                      <Type className="h-4 w-4" />
                      <span>Typography</span>
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="flex items-center gap-2 px-3 py-2 text-xs whitespace-nowrap">
                      <Eye className="h-4 w-4" />
                      <span>Xem trước</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

          {/* Hero Section */}
          <TabsContent value="hero" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="h-5 w-5" />
                  Hero Section
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 lg:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm">Badge Text</Label>
                      <Input
                        value={settings.hero_badge_text || ""}
                        onChange={(e) => updateSetting('hero_badge_text', e.target.value)}
                        placeholder="Specialty Coffee & Artisan Bakery"
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Tiêu đề chính</Label>
                      <Textarea
                        value={settings.hero_main_title || ""}
                        onChange={(e) => updateSetting('hero_main_title', e.target.value)}
                        placeholder="Chào mừng đến với Nova Souls"
                        rows={2}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Mô tả</Label>
                      <Textarea
                        value={settings.hero_subtitle || ""}
                        onChange={(e) => updateSetting('hero_subtitle', e.target.value)}
                        placeholder="Khám phá hương vị độc đáo..."
                        rows={3}
                        className="text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm">Hình ảnh nền (URL)</Label>
                      <Input
                        value={settings.hero_background_image || ""}
                        onChange={(e) => updateSetting('hero_background_image', e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm">Khách hàng</Label>
                        <Input
                          value={settings.hero_stats_customers || ""}
                          onChange={(e) => updateSetting('hero_stats_customers', e.target.value)}
                          placeholder="2,500+"
                          className="text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Sản phẩm</Label>
                        <Input
                          value={settings.hero_stats_products || ""}
                          onChange={(e) => updateSetting('hero_stats_products', e.target.value)}
                          placeholder="80+"
                          className="text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Đánh giá</Label>
                        <Input
                          value={settings.hero_stats_rating || ""}
                          onChange={(e) => updateSetting('hero_stats_rating', e.target.value)}
                          placeholder="4.9"
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Nút hành động chính</h4>
                    <div>
                      <Label>Text</Label>
                      <Input
                        value={settings.hero_button_primary_text || ""}
                        onChange={(e) => updateSetting('hero_button_primary_text', e.target.value)}
                        placeholder="Xem thực đơn"
                      />
                    </div>
                    <div>
                      <Label>Link</Label>
                      <Input
                        value={settings.hero_button_primary_link || ""}
                        onChange={(e) => updateSetting('hero_button_primary_link', e.target.value)}
                        placeholder="/menu"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Nút hành động phụ</h4>
                    <div>
                      <Label>Text</Label>
                      <Input
                        value={settings.hero_button_secondary_text || ""}
                        onChange={(e) => updateSetting('hero_button_secondary_text', e.target.value)}
                        placeholder="Sự kiện"
                      />
                    </div>
                    <div>
                      <Label>Link</Label>
                      <Input
                        value={settings.hero_button_secondary_link || ""}
                        onChange={(e) => updateSetting('hero_button_secondary_link', e.target.value)}
                        placeholder="/events"
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Thông tin liên hệ</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Địa chỉ</Label>
                      <Input
                        value={settings.hero_contact_address || ""}
                        onChange={(e) => updateSetting('hero_contact_address', e.target.value)}
                        placeholder="123 Đường Nguyễn Huệ, Quận 1, TP.HCM"
                      />
                    </div>
                    <div>
                      <Label>Số điện thoại</Label>
                      <Input
                        value={settings.hero_contact_phone || ""}
                        onChange={(e) => updateSetting('hero_contact_phone', e.target.value)}
                        placeholder="(028) 1234 5678"
                      />
                    </div>
                    <div>
                      <Label>Giờ mở cửa</Label>
                      <Input
                        value={settings.hero_contact_hours || ""}
                        onChange={(e) => updateSetting('hero_contact_hours', e.target.value)}
                        placeholder="Mở cửa 7:00 - 22:00"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Featured Products */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Sản phẩm nổi bật
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Tiêu đề</Label>
                      <Input
                        value={settings.featured_products_title || ""}
                        onChange={(e) => updateSetting('featured_products_title', e.target.value)}
                        placeholder="Thực đơn đặc sản"
                      />
                    </div>
                    <div>
                      <Label>Mô tả</Label>
                      <Textarea
                        value={settings.featured_products_subtitle || ""}
                        onChange={(e) => updateSetting('featured_products_subtitle', e.target.value)}
                        placeholder="Những món ngon được yêu thích nhất..."
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Text nút</Label>
                      <Input
                        value={settings.featured_products_button_text || ""}
                        onChange={(e) => updateSetting('featured_products_button_text', e.target.value)}
                        placeholder="Xem toàn bộ thực đơn"
                      />
                    </div>
                    <div>
                      <Label>Link nút</Label>
                      <Input
                        value={settings.featured_products_button_link || ""}
                        onChange={(e) => updateSetting('featured_products_button_link', e.target.value)}
                        placeholder="/menu"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Section */}
          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5" />
                  Tính năng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Badge Text</Label>
                      <Input
                        value={settings.features_badge_text || ""}
                        onChange={(e) => updateSetting('features_badge_text', e.target.value)}
                        placeholder="Tại sao chọn chúng tôi"
                      />
                    </div>
                    <div>
                      <Label>Tiêu đề</Label>
                      <Input
                        value={settings.features_title || ""}
                        onChange={(e) => updateSetting('features_title', e.target.value)}
                        placeholder="Trải nghiệm đặt món hiện đại"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Mô tả</Label>
                      <Textarea
                        value={settings.features_subtitle || ""}
                        onChange={(e) => updateSetting('features_subtitle', e.target.value)}
                        placeholder="Công nghệ tiên tiến kết hợp với dịch vụ chuyên nghiệp..."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stats Section */}
          <TabsContent value="stats" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5" />
                  Thống kê số liệu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Tiêu đề</Label>
                      <Input
                        value={settings.stats_title || ""}
                        onChange={(e) => updateSetting('stats_title', e.target.value)}
                        placeholder="Nova Souls trong số liệu"
                      />
                    </div>
                    <div>
                      <Label>Mô tả</Label>
                      <Textarea
                        value={settings.stats_subtitle || ""}
                        onChange={(e) => updateSetting('stats_subtitle', e.target.value)}
                        placeholder="Những con số biết nói về chất lượng dịch vụ..."
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Thống kê 1 - Khách hàng</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label>Giá trị</Label>
                        <Input
                          value={settings.stats_customers_value || ""}
                          onChange={(e) => updateSetting('stats_customers_value', e.target.value)}
                          placeholder="1000+"
                        />
                      </div>
                      <div>
                        <Label>Nhãn</Label>
                        <Input
                          value={settings.stats_customers_label || ""}
                          onChange={(e) => updateSetting('stats_customers_label', e.target.value)}
                          placeholder="Khách hàng hài lòng"
                        />
                      </div>
                      <div>
                        <Label>Mô tả</Label>
                        <Input
                          value={settings.stats_customers_description || ""}
                          onChange={(e) => updateSetting('stats_customers_description', e.target.value)}
                          placeholder="Mỗi tháng"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Thống kê 2 - Sản phẩm</h4>
                    <div className="space-y-4">
                      <div>
                        <Label>Giá trị</Label>
                        <Input
                          value={settings.stats_products_value || ""}
                          onChange={(e) => updateSetting('stats_products_value', e.target.value)}
                          placeholder="50+"
                        />
                      </div>
                      <div>
                        <Label>Nhãn</Label>
                        <Input
                          value={settings.stats_products_label || ""}
                          onChange={(e) => updateSetting('stats_products_label', e.target.value)}
                          placeholder="Món ngon đa dạng"
                        />
                      </div>
                      <div>
                        <Label>Mô tả</Label>
                        <Input
                          value={settings.stats_products_description || ""}
                          onChange={(e) => updateSetting('stats_products_description', e.target.value)}
                          placeholder="Cà phê & đồ ăn"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Thống kê 3 - Đánh giá</h4>
                    <div className="space-y-4">
                      <div>
                        <Label>Giá trị</Label>
                        <Input
                          value={settings.stats_rating_value || ""}
                          onChange={(e) => updateSetting('stats_rating_value', e.target.value)}
                          placeholder="4.9"
                        />
                      </div>
                      <div>
                        <Label>Nhãn</Label>
                        <Input
                          value={settings.stats_rating_label || ""}
                          onChange={(e) => updateSetting('stats_rating_label', e.target.value)}
                          placeholder="Đánh giá trung bình"
                        />
                      </div>
                      <div>
                        <Label>Mô tả</Label>
                        <Input
                          value={settings.stats_rating_description || ""}
                          onChange={(e) => updateSetting('stats_rating_description', e.target.value)}
                          placeholder="Từ khách hàng"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Thống kê 4 - Kinh nghiệm</h4>
                    <div className="space-y-4">
                      <div>
                        <Label>Giá trị</Label>
                        <Input
                          value={settings.stats_experience_value || ""}
                          onChange={(e) => updateSetting('stats_experience_value', e.target.value)}
                          placeholder="5+"
                        />
                      </div>
                      <div>
                        <Label>Nhãn</Label>
                        <Input
                          value={settings.stats_experience_label || ""}
                          onChange={(e) => updateSetting('stats_experience_label', e.target.value)}
                          placeholder="Năm kinh nghiệm"
                        />
                      </div>
                      <div>
                        <Label>Mô tả</Label>
                        <Input
                          value={settings.stats_experience_description || ""}
                          onChange={(e) => updateSetting('stats_experience_description', e.target.value)}
                          placeholder="Phục vụ chuyên nghiệp"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Section */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Giới thiệu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Badge Text</Label>
                      <Input
                        value={settings.about_badge_text || ""}
                        onChange={(e) => updateSetting('about_badge_text', e.target.value)}
                        placeholder="Về chúng tôi"
                      />
                    </div>
                    <div>
                      <Label>Tiêu đề</Label>
                      <Input
                        value={settings.about_title || ""}
                        onChange={(e) => updateSetting('about_title', e.target.value)}
                        placeholder="Câu chuyện của Nova Souls"
                      />
                    </div>
                    <div>
                      <Label>Nội dung chính</Label>
                      <Textarea
                        value={settings.about_content || ""}
                        onChange={(e) => updateSetting('about_content', e.target.value)}
                        placeholder="Nova Souls là không gian cà phê hiện đại..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label>Nội dung bổ sung</Label>
                      <Textarea
                        value={settings.about_additional_content || ""}
                        onChange={(e) => updateSetting('about_additional_content', e.target.value)}
                        placeholder="Từ những hạt cà phê được tuyển chọn kỹ lưỡng..."
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Thống kê</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Năm thành lập</Label>
                        <Input
                          value={settings.about_founded_year || ""}
                          onChange={(e) => updateSetting('about_founded_year', e.target.value)}
                          placeholder="2019"
                        />
                      </div>
                      <div>
                        <Label>Năm kinh nghiệm</Label>
                        <Input
                          value={settings.about_experience_years || ""}
                          onChange={(e) => updateSetting('about_experience_years', e.target.value)}
                          placeholder="5+"
                        />
                      </div>
                      <div>
                        <Label>Nguyên liệu tươi</Label>
                        <Input
                          value={settings.about_fresh_ingredients || ""}
                          onChange={(e) => updateSetting('about_fresh_ingredients', e.target.value)}
                          placeholder="100%"
                        />
                      </div>
                      <div>
                        <Label>Hỗ trợ khách hàng</Label>
                        <Input
                          value={settings.about_support_hours || ""}
                          onChange={(e) => updateSetting('about_support_hours', e.target.value)}
                          placeholder="24/7"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Hình ảnh (URL, mỗi dòng một ảnh)</Label>
                      <Textarea
                        value={settings.about_images?.join('\n') || ""}
                        onChange={(e) => updateSetting('about_images', e.target.value.split('\n').filter(url => url.trim()))}
                        placeholder="https://images.unsplash.com/photo-1...&#10;https://images.unsplash.com/photo-2..."
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>


          {/* Footer */}
          <TabsContent value="footer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5" />
                  Footer
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Tùy chỉnh thông tin hiển thị trong footer trang web
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Brand & Description */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Coffee className="h-4 w-4" />
                        Thông tin thương hiệu
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <Label>Mô tả thương hiệu</Label>
                          <Textarea
                            value={settings.footer_description || ""}
                            onChange={(e) => updateSetting('footer_description', e.target.value)}
                            placeholder="Nơi hội tụ những tâm hồn yêu cà phê, nơi mỗi ly cà phê là một câu chuyện..."
                            rows={4}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Thông tin liên hệ
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <Label>Địa chỉ</Label>
                          <Input
                            value={settings.footer_address || ""}
                            onChange={(e) => updateSetting('footer_address', e.target.value)}
                            placeholder="123 Đường Nguyễn Huệ, Quận 1, TP.HCM"
                          />
                        </div>
                        <div>
                          <Label>Số điện thoại</Label>
                          <Input
                            value={settings.footer_phone || ""}
                            onChange={(e) => updateSetting('footer_phone', e.target.value)}
                            placeholder="(028) 1234 5678"
                          />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input
                            value={settings.footer_email || ""}
                            onChange={(e) => updateSetting('footer_email', e.target.value)}
                            placeholder="hello@novasouls.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Social Media & Hours */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        Mạng xã hội
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <Label>Facebook URL</Label>
                          <Input
                            value={settings.footer_facebook_url || ""}
                            onChange={(e) => updateSetting('footer_facebook_url', e.target.value)}
                            placeholder="https://facebook.com/novasouls"
                          />
                        </div>
                        <div>
                          <Label>Instagram URL</Label>
                          <Input
                            value={settings.footer_instagram_url || ""}
                            onChange={(e) => updateSetting('footer_instagram_url', e.target.value)}
                            placeholder="https://instagram.com/novasouls"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Giờ hoạt động
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <Label>Thứ 2 - Thứ 6</Label>
                          <Input
                            value={settings.footer_weekday_hours || ""}
                            onChange={(e) => updateSetting('footer_weekday_hours', e.target.value)}
                            placeholder="7:00 - 22:00"
                          />
                        </div>
                        <div>
                          <Label>Thứ 7 - Chủ nhật</Label>
                          <Input
                            value={settings.footer_weekend_hours || ""}
                            onChange={(e) => updateSetting('footer_weekend_hours', e.target.value)}
                            placeholder="8:00 - 23:00"
                          />
                        </div>
                        <div>
                          <Label>Giao hàng tận nơi</Label>
                          <Input
                            value={settings.footer_delivery_hours || ""}
                            onChange={(e) => updateSetting('footer_delivery_hours', e.target.value)}
                            placeholder="8:00 - 21:00"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Colors */}
          <TabsContent value="colors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Màu sắc chủ đạo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 lg:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm">Màu chính (Primary)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="color"
                        value={settings.primary_color || "#6B4423"}
                        onChange={(e) => updateSetting('primary_color', e.target.value)}
                        className="w-12 h-10 flex-shrink-0"
                      />
                      <Input
                        value={settings.primary_color || "#6B4423"}
                        onChange={(e) => updateSetting('primary_color', e.target.value)}
                        placeholder="#6B4423"
                        className="text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm">Màu phụ (Secondary)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="color"
                        value={settings.secondary_color || "#8B6F47"}
                        onChange={(e) => updateSetting('secondary_color', e.target.value)}
                        className="w-12 h-10 flex-shrink-0"
                      />
                      <Input
                        value={settings.secondary_color || "#8B6F47"}
                        onChange={(e) => updateSetting('secondary_color', e.target.value)}
                        placeholder="#8B6F47"
                        className="text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm">Màu nhấn (Accent)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="color"
                        value={settings.accent_color || "#22C55E"}
                        onChange={(e) => updateSetting('accent_color', e.target.value)}
                        className="w-12 h-10 flex-shrink-0"
                      />
                      <Input
                        value={settings.accent_color || "#22C55E"}
                        onChange={(e) => updateSetting('accent_color', e.target.value)}
                        placeholder="#22C55E"
                        className="text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm">Màu nền (Background)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="color"
                        value={settings.background_color || "#FAFAFA"}
                        onChange={(e) => updateSetting('background_color', e.target.value)}
                        className="w-12 h-10 flex-shrink-0"
                      />
                      <Input
                        value={settings.background_color || "#FAFAFA"}
                        onChange={(e) => updateSetting('background_color', e.target.value)}
                        placeholder="#FAFAFA"
                        className="text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm">Màu chữ (Text)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="color"
                        value={settings.text_color || "#1F2937"}
                        onChange={(e) => updateSetting('text_color', e.target.value)}
                        className="w-12 h-10 flex-shrink-0"
                      />
                      <Input
                        value={settings.text_color || "#1F2937"}
                        onChange={(e) => updateSetting('text_color', e.target.value)}
                        placeholder="#1F2937"
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Layout */}
          <TabsContent value="layout" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="h-5 w-5" />
                  Bố cục
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Layout Hero Section</Label>
                      <Select
                        value={settings.hero_layout || "left-right"}
                        onValueChange={(value) => updateSetting('hero_layout', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left-right">Trái - Phải</SelectItem>
                          <SelectItem value="center">Giữa</SelectItem>
                          <SelectItem value="right-left">Phải - Trái</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Số cột sản phẩm nổi bật</Label>
                      <Select
                        value={settings.featured_products_columns || "3"}
                        onValueChange={(value) => updateSetting('featured_products_columns', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 cột</SelectItem>
                          <SelectItem value="3">3 cột</SelectItem>
                          <SelectItem value="4">4 cột</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Số cột tính năng</Label>
                      <Select
                        value={settings.features_columns || "4"}
                        onValueChange={(value) => updateSetting('features_columns', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 cột</SelectItem>
                          <SelectItem value="3">3 cột</SelectItem>
                          <SelectItem value="4">4 cột</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Số cột đánh giá</Label>
                      <Select
                        value={settings.testimonials_columns || "3"}
                        onValueChange={(value) => updateSetting('testimonials_columns', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 cột</SelectItem>
                          <SelectItem value="3">3 cột</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Typography */}
          <TabsContent value="typography" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5" />
                  Typography
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label>Kích thước tiêu đề Hero</Label>
                    <Select
                      value={settings.hero_title_size || "text-7xl"}
                      onValueChange={(value) => updateSetting('hero_title_size', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text-4xl">Nhỏ (4xl)</SelectItem>
                        <SelectItem value="text-5xl">Vừa (5xl)</SelectItem>
                        <SelectItem value="text-6xl">Lớn (6xl)</SelectItem>
                        <SelectItem value="text-7xl">Rất lớn (7xl)</SelectItem>
                        <SelectItem value="text-8xl">Cực lớn (8xl)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Kích thước tiêu đề section</Label>
                    <Select
                      value={settings.section_title_size || "text-4xl"}
                      onValueChange={(value) => updateSetting('section_title_size', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text-2xl">Nhỏ (2xl)</SelectItem>
                        <SelectItem value="text-3xl">Vừa (3xl)</SelectItem>
                        <SelectItem value="text-4xl">Lớn (4xl)</SelectItem>
                        <SelectItem value="text-5xl">Rất lớn (5xl)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Kích thước văn bản</Label>
                    <Select
                      value={settings.body_text_size || "text-base"}
                      onValueChange={(value) => updateSetting('body_text_size', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text-sm">Nhỏ (sm)</SelectItem>
                        <SelectItem value="text-base">Vừa (base)</SelectItem>
                        <SelectItem value="text-lg">Lớn (lg)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preview */}
          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Xem trước trang chủ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground mb-6">
                    Xem trước trang chủ với các cài đặt hiện tại. Thay đổi sẽ được phản ánh ngay lập tức.
                  </p>
                  
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <HomepagePreview settings={settings} />
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Button className="flex-1" onClick={() => window.open('/', '_blank')}>
                      <Eye className="h-4 w-4 mr-2" />
                      Mở trang chủ thực tế
                    </Button>
                    <Button variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                      Lên đầu trang
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Trang Sự Kiện */}
          <TabsContent value="events" className="space-y-4 lg:space-y-6">
            <Tabs defaultValue="event-hero" className="space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                {/* Mobile: 2x2 grid */}
                <div className="block sm:hidden">
                  <TabsList className="grid w-full grid-cols-2 gap-1 h-auto">
                    <TabsTrigger value="event-hero" className="flex flex-col items-center gap-1 p-2 text-xs min-h-[60px]">
                      <Layout className="h-4 w-4" />
                      <span className="text-center leading-tight">Hero</span>
                    </TabsTrigger>
                    <TabsTrigger value="event-list" className="flex flex-col items-center gap-1 p-2 text-xs min-h-[60px]">
                      <Calendar className="h-4 w-4" />
                      <span className="text-center leading-tight">Danh sách</span>
                    </TabsTrigger>
                    <TabsTrigger value="event-details" className="flex flex-col items-center gap-1 p-2 text-xs min-h-[60px]">
                      <Type className="h-4 w-4" />
                      <span className="text-center leading-tight">Chi tiết</span>
                    </TabsTrigger>
                    <TabsTrigger value="event-preview" className="flex flex-col items-center gap-1 p-2 text-xs min-h-[60px]">
                      <Eye className="h-4 w-4" />
                      <span className="text-center leading-tight">Xem trước</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                {/* Desktop: Horizontal scroll */}
                <div className="hidden sm:block w-full overflow-x-auto scrollbar-thin">
                  <TabsList className="inline-flex w-max min-w-full">
                    <TabsTrigger value="event-hero" className="flex items-center gap-2 px-3 py-2 text-xs whitespace-nowrap">
                      <Layout className="h-4 w-4" />
                      <span>Hero</span>
                    </TabsTrigger>
                    <TabsTrigger value="event-list" className="flex items-center gap-2 px-3 py-2 text-xs whitespace-nowrap">
                      <Calendar className="h-4 w-4" />
                      <span>Danh sách</span>
                    </TabsTrigger>
                    <TabsTrigger value="event-details" className="flex items-center gap-2 px-3 py-2 text-xs whitespace-nowrap">
                      <Type className="h-4 w-4" />
                      <span>Chi tiết</span>
                    </TabsTrigger>
                    <TabsTrigger value="event-preview" className="flex items-center gap-2 px-3 py-2 text-xs whitespace-nowrap">
                      <Eye className="h-4 w-4" />
                      <span>Xem trước</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              {/* Event Hero Section */}
              <TabsContent value="event-hero" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layout className="h-5 w-5" />
                      Hero Section - Sự kiện
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center py-12">
                      <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">
                        Tùy chỉnh Hero Section cho trang sự kiện
                      </h3>
                      <p className="text-gray-500">
                        Tính năng đang được phát triển
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Event List */}
              <TabsContent value="event-list" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Danh sách sự kiện
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center py-12">
                      <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">
                        Tùy chỉnh danh sách sự kiện
                      </h3>
                      <p className="text-gray-500">
                        Tính năng đang được phát triển
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Event Details */}
              <TabsContent value="event-details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Type className="h-5 w-5" />
                      Chi tiết sự kiện
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center py-12">
                      <Type className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">
                        Tùy chỉnh chi tiết sự kiện
                      </h3>
                      <p className="text-gray-500">
                        Tính năng đang được phát triển
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Event Preview */}
              <TabsContent value="event-preview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Xem trước trang sự kiện
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center py-12">
                      <Eye className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">
                        Xem trước trang sự kiện
                      </h3>
                      <p className="text-gray-500">
                        Tính năng đang được phát triển
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Appearance;