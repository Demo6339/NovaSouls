import { Users, Coffee, Star, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    icon: Users,
    value: "1000+",
    label: "Khách hàng hài lòng",
    description: "Mỗi tháng"
  },
  {
    icon: Coffee,
    value: "50+",
    label: "Món ngon đa dạng",
    description: "Cà phê & đồ ăn"
  },
  {
    icon: Star,
    value: "4.9",
    label: "Đánh giá trung bình",
    description: "Từ khách hàng"
  },
  {
    icon: Award,
    value: "5+",
    label: "Năm kinh nghiệm",
    description: "Phục vụ chuyên nghiệp"
  }
];

const StatsSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="container px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Nova Souls trong số liệu
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-3xl mx-auto">
              Những con số biết nói về chất lượng dịch vụ và sự tin tưởng của khách hàng
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-xl transition-all duration-300 animate-fade-up bg-gradient-card border-border/50 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 sm:p-8 lg:p-10">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-accent rounded-2xl flex items-center justify-center">
                      <Icon className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 text-accent-foreground" />
                    </div>
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2 sm:mb-3">
                      {stat.value}
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-foreground mb-2">
                      {stat.label}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
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
