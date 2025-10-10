import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Coffee, Award, Heart, MapPin, Phone, Clock, ArrowRight } from "lucide-react";

interface HomepagePreviewProps {
  settings: any;
}

const HomepagePreview = ({ settings }: HomepagePreviewProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Hero Section Preview */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${settings.hero_background_image})` }}>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 p-8 h-full flex items-center">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-accent/20 text-accent">
              {settings.hero_badge_text || "Specialty Coffee & Artisan Bakery"}
            </Badge>
            <h1 className={`${settings.hero_title_size || 'text-7xl'} font-bold text-white mb-4`}>
              {settings.hero_main_title || "Chào mừng đến với Nova Souls"}
            </h1>
            <p className="text-white/90 text-lg mb-6">
              {settings.hero_subtitle || "Khám phá hương vị độc đáo của cà phê specialty..."}
            </p>
            <div className="flex gap-4">
              <Button className="bg-accent text-white">
                {settings.hero_button_primary_text || "Xem thực đơn"}
              </Button>
              <Button variant="outline" className="text-white border-white/30">
                {settings.hero_button_secondary_text || "Sự kiện"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Preview */}
      <div className="p-8 bg-gray-50">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-accent/10 text-accent">
            Sản phẩm nổi bật
          </Badge>
          <h2 className={`${settings.section_title_size || 'text-4xl'} font-bold mb-4`}>
            {settings.featured_products_title || "Thực đơn đặc sản"}
          </h2>
          <p className="text-gray-600">
            {settings.featured_products_subtitle || "Những món ngon được yêu thích nhất..."}
          </p>
        </div>
        
        <div className={`grid grid-cols-${settings.featured_products_columns || '3'} gap-6 mb-8`}>
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Sản phẩm {i}</h3>
                <p className="text-sm text-gray-600 mb-2">Mô tả sản phẩm...</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-accent">50,000đ</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm">4.9</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="outline">
            {settings.featured_products_button_text || "Xem toàn bộ thực đơn"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Features Preview */}
      <div className="p-8">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-accent/10 text-accent">
            {settings.features_badge_text || "Tại sao chọn chúng tôi"}
          </Badge>
          <h2 className={`${settings.section_title_size || 'text-4xl'} font-bold mb-4`}>
            {settings.features_title || "Trải nghiệm đặt món hiện đại"}
          </h2>
          <p className="text-gray-600">
            {settings.features_subtitle || "Công nghệ tiên tiến kết hợp với dịch vụ chuyên nghiệp..."}
          </p>
        </div>
        
        <div className={`grid grid-cols-${settings.features_columns || '4'} gap-6`}>
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="text-center p-6">
              <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Tính năng {i}</h3>
              <p className="text-sm text-gray-600">Mô tả tính năng...</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section Preview */}
      <div className="p-8 bg-gray-50">
        <div className="text-center mb-8">
          <h2 className={`${settings.section_title_size || 'text-4xl'} font-bold mb-4`}>
            {settings.stats_title || "Nova Souls trong số liệu"}
          </h2>
          <p className="text-gray-600">
            {settings.stats_subtitle || "Những con số biết nói về chất lượng dịch vụ..."}
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              value: settings.stats_customers_value || "1000+",
              label: settings.stats_customers_label || "Khách hàng hài lòng",
              description: settings.stats_customers_description || "Mỗi tháng"
            },
            {
              value: settings.stats_products_value || "50+",
              label: settings.stats_products_label || "Món ngon đa dạng",
              description: settings.stats_products_description || "Cà phê & đồ ăn"
            },
            {
              value: settings.stats_rating_value || "4.9",
              label: settings.stats_rating_label || "Đánh giá trung bình",
              description: settings.stats_rating_description || "Từ khách hàng"
            },
            {
              value: settings.stats_experience_value || "5+",
              label: settings.stats_experience_label || "Năm kinh nghiệm",
              description: settings.stats_experience_description || "Phục vụ chuyên nghiệp"
            }
          ].map((stat, index) => (
            <Card key={index} className="text-center p-6">
              <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-8 w-8 text-accent" />
              </div>
              <div className="text-2xl font-bold text-accent mb-2">
                {stat.value}
              </div>
              <div className="font-semibold mb-2">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </Card>
          ))}
        </div>
      </div>


      {/* About Preview */}
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <Badge className="mb-4 bg-accent/10 text-accent">
              {settings.about_badge_text || "Về chúng tôi"}
            </Badge>
            <h2 className={`${settings.section_title_size || 'text-4xl'} font-bold mb-4`}>
              {settings.about_title || "Câu chuyện của Nova Souls"}
            </h2>
            <p className="text-gray-600 mb-4">
              {settings.about_content || "Nova Souls là không gian cà phê hiện đại..."}
            </p>
            <p className="text-gray-600 mb-6">
              {settings.about_additional_content || "Từ những hạt cà phê được tuyển chọn kỹ lưỡng..."}
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-accent mb-2">
                  {settings.about_founded_year || "2019"}
                </div>
                <div className="text-sm text-gray-600">Năm thành lập</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-accent mb-2">
                  {settings.about_experience_years || "5+"}
                </div>
                <div className="text-sm text-gray-600">Năm kinh nghiệm</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-32 bg-gray-200 rounded-xl"></div>
              <div className="h-20 bg-gray-200 rounded-xl"></div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="h-20 bg-gray-200 rounded-xl"></div>
              <div className="h-32 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Preview */}
      <div className="bg-gray-800 text-white p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="h-6 w-6 text-accent" />
              <span className="text-xl font-bold">Nova Souls</span>
            </div>
            <p className="text-gray-300 text-sm">
              {settings.footer_description || "Nơi hội tụ những tâm hồn yêu cà phê..."}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Thực đơn</li>
              <li>Sự kiện</li>
              <li>Về chúng tôi</li>
              <li>Liên hệ</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Thông tin liên hệ</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                {settings.footer_address || "123 Đường Nguyễn Huệ, Quận 1, TP.HCM"}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                {settings.footer_phone || "(028) 1234 5678"}
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                {settings.footer_weekday_hours || "7:00 - 22:00"}
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Theo dõi</h3>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          &copy; 2025 Nova Souls. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </div>
  );
};

export default HomepagePreview;
