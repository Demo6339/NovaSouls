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
import { Upload, Plus, Trash2, Eye, Palette, Type, Image, Layout, Link as LinkIcon, Calendar, Coffee, MapPin, Heart, Clock, Gift, Sparkles, Search, Percent } from "lucide-react";
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
  
  // Hero Feature Cards
  hero_feature_1_title?: string;
  hero_feature_1_description?: string;
  hero_feature_2_title?: string;
  hero_feature_2_description?: string;
  hero_feature_3_title?: string;
  hero_feature_3_description?: string;
  hero_feature_4_title?: string;
  hero_feature_4_description?: string;
  
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

  // Events Page
  events_badge_text?: string;
  events_title?: string;
  events_subtitle?: string;
  events_search_placeholder?: string;
  events_filter_all?: string;
  events_filter_promotion?: string;
  events_filter_event?: string;
  events_filter_workshop?: string;
  events_featured_badge?: string;
  events_promo_title?: string;
  events_promo_description?: string;
  events_promo_code_1?: string;
  events_promo_code_1_desc?: string;
  events_promo_code_2?: string;
  events_promo_code_2_desc?: string;
  events_promo_code_3?: string;
  events_promo_code_3_desc?: string;
  
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
    hero_badge_text: "",
    hero_main_title: "",
    hero_subtitle: "",
    hero_background_image: "",
    hero_stats_customers: "",
    hero_stats_products: "",
    hero_stats_rating: "",
    hero_button_primary_text: "",
    hero_button_primary_link: "",
    hero_button_secondary_text: "",
    hero_button_secondary_link: "",
    hero_contact_address: "",
    hero_contact_phone: "",
    hero_contact_hours: "",
    
    // Hero Feature Cards
    hero_feature_1_title: "",
    hero_feature_1_description: "",
    hero_feature_2_title: "",
    hero_feature_2_description: "",
    hero_feature_3_title: "",
    hero_feature_3_description: "",
    hero_feature_4_title: "",
    hero_feature_4_description: "",
    
    // Featured Products
    featured_products_title: "",
    featured_products_subtitle: "",
    featured_products_button_text: "",
    featured_products_button_link: "",
    
    // Features Section
    features_badge_text: "",
    features_title: "",
    features_subtitle: "",
    
    // Stats Section
    stats_title: "",
    stats_subtitle: "",
    stats_customers_value: "",
    stats_customers_label: "",
    stats_customers_description: "",
    stats_products_value: "",
    stats_products_label: "",
    stats_products_description: "",
    stats_rating_value: "",
    stats_rating_label: "",
    stats_rating_description: "",
    stats_experience_value: "",
    stats_experience_label: "",
    stats_experience_description: "",
    
    
    // About Section
    about_badge_text: "",
    about_title: "",
    about_content: "",
    about_additional_content: "",
    about_founded_year: "",
    about_experience_years: "",
    about_fresh_ingredients: "",
    about_support_hours: "",
    about_images: [],
    
    // Footer
    footer_description: "",
    footer_phone: "",
    footer_email: "",
    footer_address: "",
    footer_facebook_url: "",
    footer_instagram_url: "",
    footer_weekday_hours: "",
    footer_weekend_hours: "",
    footer_delivery_hours: "",
    
    // Events Page
    events_badge_text: "",
    events_title: "",
    events_subtitle: "",
    events_search_placeholder: "",
    events_filter_all: "",
    events_filter_promotion: "",
    events_filter_event: "",
    events_filter_workshop: "",
    events_featured_badge: "",
    events_promo_title: "",
    events_promo_description: "",
    events_promo_code_1: "",
    events_promo_code_1_desc: "",
    events_promo_code_2: "",
    events_promo_code_2_desc: "",
    events_promo_code_3: "",
    events_promo_code_3_desc: "",
    
    // Colors
    primary_color: "",
    secondary_color: "",
    accent_color: "",
    background_color: "",
    text_color: "",
    
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
                          placeholder="0"
                          className="text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Sản phẩm</Label>
                        <Input
                          value={settings.hero_stats_products || ""}
                          onChange={(e) => updateSetting('hero_stats_products', e.target.value)}
                          placeholder="0"
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
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Feature Cards (4 cards bên phải)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h5 className="font-medium text-sm">Card 1</h5>
                      <div>
                        <Label>Tiêu đề</Label>
                        <Input
                          value={settings.hero_feature_1_title || ""}
                          onChange={(e) => updateSetting('hero_feature_1_title', e.target.value)}
                          placeholder="Cà phê tươi"
                        />
                      </div>
                      <div>
                        <Label>Mô tả</Label>
                        <Input
                          value={settings.hero_feature_1_description || ""}
                          onChange={(e) => updateSetting('hero_feature_1_description', e.target.value)}
                          placeholder="Pha chế hàng ngày"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h5 className="font-medium text-sm">Card 2</h5>
                      <div>
                        <Label>Tiêu đề</Label>
                        <Input
                          value={settings.hero_feature_2_title || ""}
                          onChange={(e) => updateSetting('hero_feature_2_title', e.target.value)}
                          placeholder="Chất lượng cao"
                        />
                      </div>
                      <div>
                        <Label>Mô tả</Label>
                        <Input
                          value={settings.hero_feature_2_description || ""}
                          onChange={(e) => updateSetting('hero_feature_2_description', e.target.value)}
                          placeholder="Nguyên liệu premium"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h5 className="font-medium text-sm">Card 3</h5>
                      <div>
                        <Label>Tiêu đề</Label>
                        <Input
                          value={settings.hero_feature_3_title || ""}
                          onChange={(e) => updateSetting('hero_feature_3_title', e.target.value)}
                          placeholder="Không gian ấm cúng"
                        />
                      </div>
                      <div>
                        <Label>Mô tả</Label>
                        <Input
                          value={settings.hero_feature_3_description || ""}
                          onChange={(e) => updateSetting('hero_feature_3_description', e.target.value)}
                          placeholder="Thoải mái, thân thiện"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h5 className="font-medium text-sm">Card 4</h5>
                      <div>
                        <Label>Tiêu đề</Label>
                        <Input
                          value={settings.hero_feature_4_title || ""}
                          onChange={(e) => updateSetting('hero_feature_4_title', e.target.value)}
                          placeholder="Dịch vụ tốt"
                        />
                      </div>
                      <div>
                        <Label>Mô tả</Label>
                        <Input
                          value={settings.hero_feature_4_description || ""}
                          onChange={(e) => updateSetting('hero_feature_4_description', e.target.value)}
                          placeholder="Chuyên nghiệp"
                        />
                      </div>
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
                          placeholder="0"
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
                          placeholder="0"
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
                          placeholder="0"
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
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label>Nguyên liệu tươi</Label>
                        <Input
                          value={settings.about_fresh_ingredients || ""}
                          onChange={(e) => updateSetting('about_fresh_ingredients', e.target.value)}
                          placeholder="0%"
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
                    <p className="text-sm text-muted-foreground">
                      Tùy chỉnh tiêu đề và mô tả cho trang sự kiện
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Badge Text</Label>
                          <Input
                            value={settings.events_badge_text || ""}
                            onChange={(e) => updateSetting('events_badge_text', e.target.value)}
                            placeholder="Sự kiện đặc biệt"
                          />
                        </div>
                        <div>
                          <Label>Tiêu đề chính</Label>
                          <Input
                            value={settings.events_title || ""}
                            onChange={(e) => updateSetting('events_title', e.target.value)}
                            placeholder="Sự kiện & Khuyến mãi"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label>Mô tả</Label>
                          <Textarea
                            value={settings.events_subtitle || ""}
                            onChange={(e) => updateSetting('events_subtitle', e.target.value)}
                            placeholder="Khám phá những ưu đãi hấp dẫn và sự kiện đặc biệt tại Nova Souls"
                            rows={3}
                          />
                        </div>
                      </div>
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
                      Tìm kiếm & Lọc
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Tùy chỉnh thanh tìm kiếm và các nút lọc
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Placeholder tìm kiếm</Label>
                          <Input
                            value={settings.events_search_placeholder || ""}
                            onChange={(e) => updateSetting('events_search_placeholder', e.target.value)}
                            placeholder="Tìm kiếm sự kiện..."
                          />
                        </div>
                        <div>
                          <Label>Badge sự kiện nổi bật</Label>
                          <Input
                            value={settings.events_featured_badge || ""}
                            onChange={(e) => updateSetting('events_featured_badge', e.target.value)}
                            placeholder="⭐ Nổi bật"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold">Nút lọc</h4>
                        <div className="space-y-3">
                          <div>
                            <Label>Tất cả</Label>
                            <Input
                              value={settings.events_filter_all || ""}
                              onChange={(e) => updateSetting('events_filter_all', e.target.value)}
                              placeholder="Tất cả"
                            />
                          </div>
                          <div>
                            <Label>Khuyến mãi</Label>
                            <Input
                              value={settings.events_filter_promotion || ""}
                              onChange={(e) => updateSetting('events_filter_promotion', e.target.value)}
                              placeholder="Khuyến mãi"
                            />
                          </div>
                          <div>
                            <Label>Sự kiện</Label>
                            <Input
                              value={settings.events_filter_event || ""}
                              onChange={(e) => updateSetting('events_filter_event', e.target.value)}
                              placeholder="Sự kiện"
                            />
                          </div>
                          <div>
                            <Label>Workshop</Label>
                            <Input
                              value={settings.events_filter_workshop || ""}
                              onChange={(e) => updateSetting('events_filter_workshop', e.target.value)}
                              placeholder="Workshop"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Event Details */}
              <TabsContent value="event-details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="h-5 w-5" />
                      Mã giảm giá
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Tùy chỉnh phần mã giảm giá cuối trang
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Tiêu đề phần mã giảm giá</Label>
                          <Input
                            value={settings.events_promo_title || ""}
                            onChange={(e) => updateSetting('events_promo_title', e.target.value)}
                            placeholder="Mã giảm giá"
                          />
                        </div>
                        <div>
                          <Label>Mô tả phần mã giảm giá</Label>
                          <Textarea
                            value={settings.events_promo_description || ""}
                            onChange={(e) => updateSetting('events_promo_description', e.target.value)}
                            placeholder="Sử dụng các mã này khi thanh toán"
                            rows={2}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold">Mã giảm giá</h4>
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg space-y-2">
                            <Label className="text-sm font-medium">Mã 1</Label>
                            <Input
                              value={settings.events_promo_code_1 || ""}
                              onChange={(e) => updateSetting('events_promo_code_1', e.target.value)}
                              placeholder="WELCOME20"
                            />
                            <Input
                              value={settings.events_promo_code_1_desc || ""}
                              onChange={(e) => updateSetting('events_promo_code_1_desc', e.target.value)}
                              placeholder="Mô tả mã giảm giá"
                            />
                          </div>
                          
                          <div className="p-4 border rounded-lg space-y-2">
                            <Label className="text-sm font-medium">Mã 2</Label>
                            <Input
                              value={settings.events_promo_code_2 || ""}
                              onChange={(e) => updateSetting('events_promo_code_2', e.target.value)}
                              placeholder="HAPPY15"
                            />
                            <Input
                              value={settings.events_promo_code_2_desc || ""}
                              onChange={(e) => updateSetting('events_promo_code_2_desc', e.target.value)}
                              placeholder="Mô tả mã giảm giá"
                            />
                          </div>
                          
                          <div className="p-4 border rounded-lg space-y-2">
                            <Label className="text-sm font-medium">Mã 3</Label>
                            <Input
                              value={settings.events_promo_code_3 || ""}
                              onChange={(e) => updateSetting('events_promo_code_3', e.target.value)}
                              placeholder="FREESHIP"
                            />
                            <Input
                              value={settings.events_promo_code_3_desc || ""}
                              onChange={(e) => updateSetting('events_promo_code_3_desc', e.target.value)}
                              placeholder="Miễn phí giao hàng"
                            />
                          </div>
                        </div>
                      </div>
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
                    <p className="text-sm text-muted-foreground">
                      Xem trước các thay đổi cho trang sự kiện
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border rounded-lg p-6 bg-gradient-to-br from-slate-50 to-white">
                      {/* Header Preview */}
                      <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 mb-4">
                          <Sparkles className="h-5 w-5 text-accent" />
                          <span className="text-accent font-semibold text-sm">
                            {settings.events_badge_text || "Sự kiện đặc biệt"}
                          </span>
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
                          {settings.events_title || "Sự kiện & Khuyến mãi"}
                        </h1>
                        <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
                          {settings.events_subtitle || "Khám phá những ưu đãi hấp dẫn và sự kiện đặc biệt tại Nova Souls"}
                        </p>
                      </div>

                      {/* Search & Filter Preview */}
                      <div className="mb-8 space-y-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <input
                            type="text"
                            placeholder={settings.events_search_placeholder || "Tìm kiếm sự kiện..."}
                            className="w-full pl-10 pr-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent bg-white/50 backdrop-blur-sm text-sm"
                            readOnly
                          />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="default" size="sm" className="rounded-xl text-xs px-3 py-2">
                            {settings.events_filter_all || "Tất cả"}
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-xl text-xs px-3 py-2">
                            {settings.events_filter_promotion || "Khuyến mãi"}
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-xl text-xs px-3 py-2">
                            {settings.events_filter_event || "Sự kiện"}
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-xl text-xs px-3 py-2">
                            {settings.events_filter_workshop || "Workshop"}
                          </Button>
                        </div>
                      </div>

                      {/* Promo Codes Preview */}
                      <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 border">
                        <div className="text-center mb-6">
                          <div className="flex justify-center mb-4">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-accent to-accent-light flex items-center justify-center shadow-lg">
                              <Gift className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          <h3 className="text-xl font-bold mb-2">
                            {settings.events_promo_title || "Mã giảm giá"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {settings.events_promo_description || "Sử dụng các mã này khi thanh toán"}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="border-2 border-dashed border-accent/30 rounded-xl p-4 text-center">
                            <div className="p-2 rounded-full bg-accent/10 w-fit mx-auto mb-2">
                              <Percent className="h-5 w-5 text-accent" />
                            </div>
                            <p className="font-bold text-sm mb-1">
                              {settings.events_promo_code_1 || "WELCOME20"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {settings.events_promo_code_1_desc || "Mô tả mã giảm giá"}
                            </p>
                          </div>
                          <div className="border-2 border-dashed border-accent/30 rounded-xl p-4 text-center">
                            <div className="p-2 rounded-full bg-accent/10 w-fit mx-auto mb-2">
                              <Percent className="h-5 w-5 text-accent" />
                            </div>
                            <p className="font-bold text-sm mb-1">
                              {settings.events_promo_code_2 || "HAPPY15"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {settings.events_promo_code_2_desc || "Mô tả mã giảm giá"}
                            </p>
                          </div>
                          <div className="border-2 border-dashed border-accent/30 rounded-xl p-4 text-center">
                            <div className="p-2 rounded-full bg-accent/10 w-fit mx-auto mb-2">
                              <Percent className="h-5 w-5 text-accent" />
                            </div>
                            <p className="font-bold text-sm mb-1">
                              {settings.events_promo_code_3 || "FREESHIP"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {settings.events_promo_code_3_desc || "Miễn phí giao hàng"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 pt-4">
                      <Button className="flex-1" onClick={() => window.open('/events', '_blank')}>
                        <Eye className="h-4 w-4 mr-2" />
                        Mở trang sự kiện thực tế
                      </Button>
                      <Button variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        Lên đầu trang
                      </Button>
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