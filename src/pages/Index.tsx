import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Coffee } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [aboutContent, setAboutContent] = useState({
    title: "Về chúng tôi",
    content: "Nova Souls là không gian cà phê hiện đại, nơi hòa quyện giữa hương vị truyền thống và sự sáng tạo đương đại. Chúng tôi tự hào mang đến những ly cà phê được pha chế tỉ mỉ, các món ăn nhẹ tinh tế, trong không gian ấm cúng và thân thiện."
  });

  useEffect(() => {
    loadAboutContent();
  }, []);

  const loadAboutContent = async () => {
    try {
      const { data } = await supabase
        .from('site_settings')
        .select('setting_value')
        .eq('setting_key', 'appearance')
        .single();

      if (data) {
        const settings = data.setting_value as any;
        setAboutContent({
          title: settings.homepage_about_title || "Về chúng tôi",
          content: settings.homepage_about_content || aboutContent.content
        });
      }
    } catch (error) {
      console.error('Error loading about content:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturedProducts />
        <Features />
        
        {/* About Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-secondary/10 to-background">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-2 rounded-full text-xs font-semibold">
                    <Coffee className="h-3 w-3" />
                    Về chúng tôi
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                    Câu chuyện của Nova Souls
                  </h2>
                  
                  <div className="space-y-3 sm:space-y-4 text-muted-foreground leading-relaxed">
                    <p className="text-xs sm:text-sm md:text-base">
                      {aboutContent.content}
                    </p>
                    
                    <p className="text-xs sm:text-sm md:text-base">
                      Từ những hạt cà phê được tuyển chọn kỹ lưỡng đến những chiếc bánh ngọt được làm thủ công, 
                      chúng tôi cam kết mang đến trải nghiệm ẩm thực đặc biệt cho mỗi khách hàng.
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-3 sm:pt-4">
                    <div className="text-center p-2 sm:p-3 bg-white/50 rounded-lg">
                      <div className="text-base sm:text-lg font-bold text-accent mb-1">2019</div>
                      <div className="text-xs text-muted-foreground">Năm thành lập</div>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-white/50 rounded-lg">
                      <div className="text-base sm:text-lg font-bold text-accent mb-1">5+</div>
                      <div className="text-xs text-muted-foreground">Năm kinh nghiệm</div>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-white/50 rounded-lg">
                      <div className="text-base sm:text-lg font-bold text-accent mb-1">100%</div>
                      <div className="text-xs text-muted-foreground">Nguyên liệu tươi</div>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-white/50 rounded-lg">
                      <div className="text-base sm:text-lg font-bold text-accent mb-1">24/7</div>
                      <div className="text-xs text-muted-foreground">Hỗ trợ khách hàng</div>
                    </div>
                  </div>
                </div>

                {/* Right Content - Images */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="space-y-2 sm:space-y-3">
                      <img
                        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                        alt="Cafe Interior"
                        className="w-full h-24 sm:h-32 md:h-40 object-cover rounded-lg sm:rounded-xl shadow-lg"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                        alt="Coffee Making"
                        className="w-full h-20 sm:h-24 md:h-32 object-cover rounded-lg sm:rounded-xl shadow-lg"
                      />
                    </div>
                    <div className="space-y-2 sm:space-y-3 pt-4 sm:pt-6">
                      <img
                        src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                        alt="Fresh Pastries"
                        className="w-full h-20 sm:h-24 md:h-32 object-cover rounded-lg sm:rounded-xl shadow-lg"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                        alt="Desserts"
                        className="w-full h-24 sm:h-32 md:h-40 object-cover rounded-lg sm:rounded-xl shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
