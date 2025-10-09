import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coffee, Heart, Users, Award, Clock, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-cafe.jpg";
import coffeeImage from "@/assets/coffee-1.jpg";

const values = [
  {
    icon: Coffee,
    title: "Chất lượng hàng đầu",
    description: "Chúng tôi chỉ sử dụng hạt cà phê Arabica cao cấp từ các vùng trồng nổi tiếng",
  },
  {
    icon: Heart,
    title: "Phục vụ tận tâm",
    description: "Đội ngũ barista được đào tạo chuyên nghiệp, phục vụ với tình yêu nghề",
  },
  {
    icon: Users,
    title: "Cộng đồng gắn kết",
    description: "Nova Souls là nơi kết nối những tâm hồn yêu cà phê",
  },
  {
    icon: Award,
    title: "Giải thưởng uy tín",
    description: "Đạt nhiều giải thưởng về chất lượng cà phê và dịch vụ xuất sắc",
  },
];

const milestones = [
  { year: "2023", event: "Thành lập Nova Souls tại TP.HCM" },
  { year: "2023", event: "Khai trương chi nhánh đầu tiên tại Quận 1" },
  { year: "2024", event: "Mở rộng 5 chi nhánh trong năm đầu tiên" },
  { year: "2024", event: "Ra mắt hệ thống đặt món online" },
  { year: "2025", event: "Đạt giải thưởng 'Best Coffee Shop' TP.HCM" },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <img
            src={heroImage}
            alt="About Nova Souls"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />
          <div className="relative z-10 text-center text-primary-foreground animate-fade-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Về Nova Souls</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto px-4">
              Nơi hội tụ đam mê và nghệ thuật pha chế cà phê
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-background">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <h2 className="text-4xl font-bold text-foreground mb-6">Câu chuyện của chúng tôi</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Nova Souls được thành lập với niềm đam mê mang đến những trải nghiệm cà phê
                đặc biệt nhất cho khách hàng. Tên "Nova Souls" - Những tâm hồn mới - thể hiện
                sứ mệnh tạo ra một không gian nơi mọi người có thể tìm thấy nguồn cảm hứng mới,
                kết nối và chia sẻ đam mê về cà phê.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Từ những ngày đầu khiêm tốn, chúng tôi đã không ngừng phát triển với mục tiêu
                trở thành chuỗi quán cà phê hàng đầu, nơi chất lượng và trải nghiệm khách hàng
                luôn được đặt lên hàng đầu.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card
                    key={index}
                    className="text-center hover:shadow-hover transition-all duration-300 animate-fade-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="h-16 w-16 rounded-full bg-gradient-accent mx-auto mb-4 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-accent-foreground" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-bold text-foreground mb-4">Hành trình của chúng tôi</h2>
              <p className="text-lg text-muted-foreground">Từ những bước đầu đến ngày hôm nay</p>
            </div>

            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex gap-6 mb-8 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col items-center">
                    <Badge className="bg-gradient-hero text-primary-foreground px-4 py-2 text-base font-bold min-w-[80px]">
                      {milestone.year}
                    </Badge>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-16 bg-border my-2" />
                    )}
                  </div>
                  <Card className="flex-1 mb-0">
                    <CardContent className="p-6">
                      <p className="text-lg">{milestone.event}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section className="py-20 bg-background">
          <div className="container px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-bold text-foreground mb-4">Chi nhánh</h2>
              <p className="text-lg text-muted-foreground">Ghé thăm Nova Souls gần bạn nhất</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { name: "Chi nhánh Quận 1", address: "123 Đường ABC, Quận 1, TP.HCM", hours: "07:00 - 22:00" },
                { name: "Chi nhánh Quận 3", address: "456 Đường XYZ, Quận 3, TP.HCM", hours: "07:00 - 22:00" },
                { name: "Chi nhánh Bình Thạnh", address: "789 Đường DEF, Bình Thạnh, TP.HCM", hours: "07:00 - 22:00" },
              ].map((location, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-hover transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img
                    src={coffeeImage}
                    alt={location.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <CardTitle>{location.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{location.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span>{location.hours}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
