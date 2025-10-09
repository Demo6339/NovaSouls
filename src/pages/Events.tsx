import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Gift, Percent } from "lucide-react";
import coffeeImage from "@/assets/coffee-1.jpg";

const events = [
  {
    id: 1,
    title: "Happy Hour - Giảm 30%",
    description: "Giảm 30% tất cả đồ uống từ 14:00 - 16:00 hàng ngày",
    date: "Hàng ngày",
    time: "14:00 - 16:00",
    location: "Tất cả chi nhánh",
    image: coffeeImage,
    type: "promotion",
    discount: "30%",
  },
  {
    id: 2,
    title: "Sinh nhật Nova Souls",
    description: "Mừng sinh nhật 2 năm - Ưu đãi đặc biệt cho thành viên",
    date: "15/10/2025",
    time: "Cả ngày",
    location: "Chi nhánh Quận 1",
    image: coffeeImage,
    type: "event",
    discount: "50%",
  },
  {
    id: 3,
    title: "Workshop: Pha chế cà phế cơ bản",
    description: "Học cách pha chế cà phê từ barista chuyên nghiệp",
    date: "20/10/2025",
    time: "09:00 - 12:00",
    location: "Chi nhánh Quận 1",
    image: coffeeImage,
    type: "workshop",
  },
  {
    id: 4,
    title: "Mua 2 Tặng 1",
    description: "Mua 2 đồ uống bất kỳ, tặng 1 đồ uống giá trị thấp hơn",
    date: "Cuối tuần",
    time: "Cả ngày",
    location: "Tất cả chi nhánh",
    image: coffeeImage,
    type: "promotion",
  },
];

const Events = () => {
  const getTypeBadge = (type: string) => {
    const variants = {
      promotion: { label: "Khuyến mãi", className: "bg-accent" },
      event: { label: "Sự kiện", className: "bg-primary" },
      workshop: { label: "Workshop", className: "bg-purple-500" },
    };
    const variant = variants[type as keyof typeof variants];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-to-b from-background to-secondary/20">
        <div className="container px-4">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Sự kiện & Khuyến mãi
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Khám phá những ưu đãi hấp dẫn và sự kiện đặc biệt tại Nova Souls
            </p>
          </div>

          {/* Featured Event */}
          <Card className="mb-12 overflow-hidden border-2 border-accent animate-fade-up">
            <div className="grid md:grid-cols-2">
              <img
                src={coffeeImage}
                alt="Featured Event"
                className="w-full h-full object-cover"
              />
              <div className="p-8 flex flex-col justify-center">
                <div className="mb-4">
                  <Badge className="bg-accent mb-2">Nổi bật</Badge>
                  <h2 className="text-3xl font-bold text-foreground mb-3">
                    {events[1].title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6">
                    {events[1].description}
                  </p>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-foreground">
                    <Calendar className="h-5 w-5 text-accent" />
                    <span>{events[1].date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <Clock className="h-5 w-5 text-accent" />
                    <span>{events[1].time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <MapPin className="h-5 w-5 text-accent" />
                    <span>{events[1].location}</span>
                  </div>
                </div>
                <Button className="bg-gradient-hero w-fit">
                  Tìm hiểu thêm
                </Button>
              </div>
            </div>
          </Card>

          {/* All Events */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <Card
                key={event.id}
                className="overflow-hidden hover:shadow-hover transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    {getTypeBadge(event.type)}
                  </div>
                  {event.discount && (
                    <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full font-bold">
                      -{event.discount}
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Chi tiết
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Promo Codes Section */}
          <Card className="mt-12 animate-fade-in bg-gradient-card">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-gradient-accent flex items-center justify-center">
                  <Gift className="h-8 w-8 text-accent-foreground" />
                </div>
              </div>
              <CardTitle className="text-2xl">Mã giảm giá</CardTitle>
              <CardDescription>Sử dụng các mã này khi thanh toán</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border-2 border-dashed border-accent rounded-lg p-4 text-center">
                  <Percent className="h-8 w-8 text-accent mx-auto mb-2" />
                  <p className="font-bold text-lg mb-1">WELCOME20</p>
                  <p className="text-sm text-muted-foreground">Giảm 20% đơn đầu tiên</p>
                </div>
                <div className="border-2 border-dashed border-accent rounded-lg p-4 text-center">
                  <Percent className="h-8 w-8 text-accent mx-auto mb-2" />
                  <p className="font-bold text-lg mb-1">HAPPY15</p>
                  <p className="text-sm text-muted-foreground">Giảm 15% Happy Hour</p>
                </div>
                <div className="border-2 border-dashed border-accent rounded-lg p-4 text-center">
                  <Percent className="h-8 w-8 text-accent mx-auto mb-2" />
                  <p className="font-bold text-lg mb-1">FREESHIP</p>
                  <p className="text-sm text-muted-foreground">Miễn phí giao hàng</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
