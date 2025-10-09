import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
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
        
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
                {aboutContent.title}
              </h2>
              <Card className="bg-card/50 backdrop-blur">
                <CardContent className="p-8">
                  <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                    {aboutContent.content}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
