import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart } from "lucide-react";
import coffeeImage from "@/assets/coffee-1.jpg";
import foodImage from "@/assets/food-1.jpg";

const menuItems = {
  coffee: [
    { id: 1, name: "Espresso", description: "Cà phê espresso đậm đà", price: "45.000đ", image: coffeeImage },
    { id: 2, name: "Americano", description: "Espressopha loãng với nước nóng", price: "45.000đ", image: coffeeImage },
    { id: 3, name: "Cappuccino", description: "Espresso, sữa nóng và foam", price: "50.000đ", image: coffeeImage, badge: "Yêu thích" },
    { id: 4, name: "Latte", description: "Espresso với nhiều sữa", price: "55.000đ", image: coffeeImage, badge: "Bán chạy" },
    { id: 5, name: "Mocha", description: "Latte với chocolate", price: "60.000đ", image: coffeeImage },
    { id: 6, name: "Caramel Macchiato", description: "Espresso, sữa và caramel", price: "65.000đ", image: coffeeImage },
  ],
  tea: [
    { id: 7, name: "Trà xanh", description: "Trà xanh Nhật Bản cao cấp", price: "40.000đ", image: coffeeImage },
    { id: 8, name: "Trà ô long", description: "Trà ô long thơm ngon", price: "40.000đ", image: coffeeImage },
    { id: 9, name: "Trà hoa cúc", description: "Trà hoa cúc thanh mát", price: "35.000đ", image: coffeeImage },
  ],
  food: [
    { id: 10, name: "Croissant Bơ", description: "Bánh croissant giòn thơm", price: "35.000đ", image: foodImage, badge: "Mới" },
    { id: 11, name: "Bánh mì que", description: "Bánh mì que tươi mỗi ngày", price: "25.000đ", image: foodImage },
    { id: 12, name: "Sandwich", description: "Sandwich với nhiều nhân", price: "45.000đ", image: foodImage },
  ],
  dessert: [
    { id: 13, name: "Tiramisu", description: "Tiramisu Ý truyền thống", price: "55.000đ", image: foodImage },
    { id: 14, name: "Cheesecake", description: "Bánh phô mai New York", price: "50.000đ", image: foodImage },
  ],
};

const Menu = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-to-b from-background to-secondary/20">
        <div className="container px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Thực đơn</h1>
            <p className="text-muted-foreground text-lg">Khám phá những món ngon tại Nova Souls</p>
          </div>

          <Tabs defaultValue="coffee" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="coffee">Cà phê</TabsTrigger>
              <TabsTrigger value="tea">Trà</TabsTrigger>
              <TabsTrigger value="food">Đồ ăn</TabsTrigger>
              <TabsTrigger value="dessert">Tráng miệng</TabsTrigger>
            </TabsList>

            {Object.entries(menuItems).map(([category, items]) => (
              <TabsContent key={category} value={category} className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item, index) => (
                    <Card
                      key={item.id}
                      className="group overflow-hidden border-border bg-gradient-card hover:shadow-hover transition-all duration-300 animate-fade-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {item.badge && (
                          <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-primary">{item.price}</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-gradient-hero hover:opacity-90 transition-opacity">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Thêm vào giỏ
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Menu;
