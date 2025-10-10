import { Users, Coffee, Star, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const StatsSection = () => {
  const [settings, setSettings] = useState({
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
    stats_experience_description: "Phục vụ chuyên nghiệp"
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('setting_value')
        .eq('setting_key', 'appearance')
        .single();

      if (error) {
        console.warn('No appearance settings found, using defaults');
        return;
      }

      if (data) {
        const appearanceSettings = data.setting_value as any;
        setSettings(prev => ({
          ...prev,
          ...appearanceSettings
        }));
      }
    } catch (error) {
      console.warn('Error loading stats settings, using defaults:', error);
    }
  };

  const stats = [
    {
      icon: Users,
      value: settings.stats_customers_value,
      label: settings.stats_customers_label,
      description: settings.stats_customers_description
    },
    {
      icon: Coffee,
      value: settings.stats_products_value,
      label: settings.stats_products_label,
      description: settings.stats_products_description
    },
    {
      icon: Star,
      value: settings.stats_rating_value,
      label: settings.stats_rating_label,
      description: settings.stats_rating_description
    },
    {
      icon: Award,
      value: settings.stats_experience_value,
      label: settings.stats_experience_label,
      description: settings.stats_experience_description
    }
  ];
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4">
              {settings.stats_title}
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg max-w-3xl mx-auto">
              {settings.stats_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-xl transition-all duration-300 animate-fade-up bg-gradient-card border-border/50 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-3 sm:p-4 md:p-6 lg:p-8">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 bg-gradient-accent rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-accent-foreground" />
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-1 sm:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-foreground mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.description}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
