import { QrCode, ShoppingBag, Clock, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: QrCode,
    title: "Đặt món qua QR",
    description: "Quét mã QR tại bàn để gọi món nhanh chóng, không cần đăng nhập",
  },
  {
    icon: ShoppingBag,
    title: "Giao hàng tận nơi",
    description: "Đặt hàng online và nhận tại nhà với dịch vụ giao hàng nhanh",
  },
  {
    icon: Clock,
    title: "Cập nhật realtime",
    description: "Theo dõi trạng thái đơn hàng của bạn ngay lập tức",
  },
  {
    icon: Shield,
    title: "An toàn & Bảo mật",
    description: "Thông tin cá nhân và thanh toán được bảo mật tuyệt đối",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tại sao chọn Nova Souls?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trải nghiệm đặt món hiện đại, tiện lợi và an toàn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-border hover:shadow-md transition-all duration-300 animate-fade-up bg-gradient-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
