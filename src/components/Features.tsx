import { QrCode, ShoppingBag, Clock, Shield, Zap, Award, Coffee, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [];

const additionalFeatures = [];

const Features = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-secondary/10 to-background">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-2 rounded-full text-xs font-semibold mb-2 sm:mb-3">
              <Award className="h-3 w-3" />
              Tại sao chọn chúng tôi
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4">
              Trải nghiệm đặt món hiện đại
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg max-w-3xl mx-auto">
              Công nghệ tiên tiến kết hợp với dịch vụ chuyên nghiệp, mang đến trải nghiệm tuyệt vời cho khách hàng
            </p>
          </div>

          {/* Main Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 md:mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group border-0 hover:shadow-2xl transition-all duration-500 animate-fade-up bg-white/80 backdrop-blur-sm hover:bg-white hover:-translate-y-3 shadow-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4">
                  <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex flex-col gap-1 sm:gap-2">
                      <CardTitle className="text-sm sm:text-base font-bold text-foreground">{feature.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs w-fit bg-accent/10 text-accent border-accent/20">
                        {feature.highlight}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0">
                  <CardDescription className="text-muted-foreground leading-relaxed text-xs">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-accent/10">
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1 sm:mb-2">
              Cam kết chất lượng
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm max-w-2xl mx-auto">
              Những điều chúng tôi cam kết mang đến cho khách hàng với tiêu chuẩn cao nhất
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center group animate-fade-up hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-gradient-to-br from-accent/20 to-accent/30 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent/40 transition-all duration-300 shadow-lg">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                  </div>
                  <h4 className="font-bold text-foreground mb-1 text-xs sm:text-sm">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
