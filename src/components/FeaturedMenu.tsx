import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import coffeeImage from "@/assets/coffee-1.jpg";
import foodImage from "@/assets/food-1.jpg";

const featuredItems = [
  {
    id: 1,
    name: "Signature Latte",
    description: "Cà phê Latte đặc trưng với lớp foam mịn màng",
    price: "55.000đ",
    image: coffeeImage,
    badge: "Bán chạy",
  },
  {
    id: 2,
    name: "Croissant Bơ",
    description: "Bánh croissant thơm giòn, mới nướng mỗi ngày",
    price: "35.000đ",
    image: foodImage,
    badge: "Mới",
  },
  {
    id: 3,
    name: "Cappuccino",
    description: "Cappuccino truyền thống với hương vị đậm đà",
    price: "50.000đ",
    image: coffeeImage,
    badge: "Yêu thích",
  },
];

const FeaturedMenu = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Món nổi bật
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Những món được yêu thích nhất tại Nova Souls
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map((item, index) => (
            <Card
              key={item.id}
              className="group overflow-hidden border-border bg-gradient-card hover:shadow-hover transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                  {item.badge}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-foreground">{item.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">{item.price}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-hero hover:opacity-90 transition-opacity group">
                  <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  Thêm vào giỏ
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <a href="/menu">Xem toàn bộ thực đơn</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenu;
