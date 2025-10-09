import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
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
        <Testimonials />
        <CTASection />
        
        {/* About Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-secondary/10 to-background">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left Content */}
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold">
                    <Coffee className="h-4 w-4" />
                    Về chúng tôi
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                    Câu chuyện của Nova Souls
                  </h2>
                  
                  <div className="space-y-6 text-muted-foreground leading-relaxed">
                    <p className="text-base sm:text-lg">
                      {aboutContent.content}
                    </p>
                    
                    <p className="text-base sm:text-lg">
                      Từ những hạt cà phê được tuyển chọn kỹ lưỡng đến những chiếc bánh ngọt được làm thủ công, 
                      chúng tôi cam kết mang đến trải nghiệm ẩm thực đặc biệt cho mỗi khách hàng.
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-6 pt-6">
                    <div className="text-center p-4 bg-white/50 rounded-xl">
                      <div className="text-2xl font-bold text-accent mb-2">2019</div>
                      <div className="text-sm text-muted-foreground">Năm thành lập</div>
                    </div>
                    <div className="text-center p-4 bg-white/50 rounded-xl">
                      <div className="text-2xl font-bold text-accent mb-2">5+</div>
                      <div className="text-sm text-muted-foreground">Năm kinh nghiệm</div>
                    </div>
                    <div className="text-center p-4 bg-white/50 rounded-xl">
                      <div className="text-2xl font-bold text-accent mb-2">100%</div>
                      <div className="text-sm text-muted-foreground">Nguyên liệu tươi</div>
                    </div>
                    <div className="text-center p-4 bg-white/50 rounded-xl">
                      <div className="text-2xl font-bold text-accent mb-2">24/7</div>
                      <div className="text-sm text-muted-foreground">Hỗ trợ khách hàng</div>
                    </div>
                  </div>
                </div>

                {/* Right Content - Images */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <img
                        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                        alt="Cafe Interior"
                        className="w-full h-48 object-cover rounded-2xl shadow-lg"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                        alt="Coffee Making"
                        className="w-full h-32 object-cover rounded-2xl shadow-lg"
                      />
                    </div>
                    <div className="space-y-4 pt-8">
                      <img
                        src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                        alt="Fresh Pastries"
                        className="w-full h-32 object-cover rounded-2xl shadow-lg"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                        alt="Desserts"
                        className="w-full h-48 object-cover rounded-2xl shadow-lg"
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
