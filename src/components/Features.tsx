import { QrCode, ShoppingBag, Clock, Shield, Zap, Award, Coffee, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: QrCode,
    title: "Đặt món qua QR",
    description: "Quét mã QR tại bàn để gọi món nhanh chóng, không cần đăng nhập. Trải nghiệm đặt món hiện đại và tiện lợi",
    highlight: "Nhanh chóng",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: ShoppingBag,
    title: "Giao hàng tận nơi",
    description: "Đặt hàng online và nhận tại nhà với dịch vụ giao hàng nhanh trong vòng 30 phút",
    highlight: "Tiện lợi",
    color: "from-green-500 to-green-600"
  },
  {
    icon: Clock,
    title: "Cập nhật realtime",
    description: "Theo dõi trạng thái đơn hàng của bạn ngay lập tức với hệ thống thông báo thông minh",
    highlight: "Thời gian thực",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: Shield,
    title: "An toàn & Bảo mật",
    description: "Thông tin cá nhân và thanh toán được bảo mật tuyệt đối với công nghệ mã hóa tiên tiến",
    highlight: "Bảo mật",
    color: "from-purple-500 to-purple-600"
  },
];

const additionalFeatures = [
  {
    icon: Coffee,
    title: "Cà phê tươi mỗi ngày",
    description: "Pha chế từ hạt cà phê chất lượng cao"
  },
  {
    icon: Award,
    title: "Chất lượng đảm bảo",
    description: "Nguyên liệu tươi ngon, quy trình chuẩn"
  },
  {
    icon: Heart,
    title: "Dịch vụ tận tâm",
    description: "Nhân viên thân thiện, phục vụ chuyên nghiệp"
  },
  {
    icon: Zap,
    title: "Phục vụ nhanh",
    description: "Đơn hàng được xử lý và phục vụ trong thời gian ngắn"
  }
];

const Features = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-secondary/10 to-background">
      <div className="container px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Award className="h-4 w-4" />
              Tại sao chọn chúng tôi
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Trải nghiệm đặt món hiện đại
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-3xl mx-auto">
              Công nghệ tiên tiến kết hợp với dịch vụ chuyên nghiệp, mang đến trải nghiệm tuyệt vời cho khách hàng
            </p>
          </div>

          {/* Main Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group border-0 hover:shadow-2xl transition-all duration-500 animate-fade-up bg-white/80 backdrop-blur-sm hover:bg-white hover:-translate-y-3 shadow-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-4 p-6">
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-col gap-2">
                      <CardTitle className="text-lg font-bold text-foreground">{feature.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs w-fit bg-accent/10 text-accent border-accent/20">
                        {feature.highlight}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <CardDescription className="text-muted-foreground leading-relaxed text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-3xl p-6 lg:p-8 border border-accent/10">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Cam kết chất lượng
            </h3>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              Những điều chúng tôi cam kết mang đến cho khách hàng với tiêu chuẩn cao nhất
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center group animate-fade-up hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-accent/20 to-accent/30 rounded-2xl flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent/40 transition-all duration-300 shadow-lg">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2 text-sm sm:text-base">
                    {feature.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
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
