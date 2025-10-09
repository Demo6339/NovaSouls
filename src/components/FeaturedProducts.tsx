import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Heart, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import coffeeImage from "@/assets/coffee-1.jpg";
import foodImage from "@/assets/food-1.jpg";

const featuredProducts = [
  {
    id: 1,
    name: "Cappuccino Signature",
    description: "Espresso đậm đà với sữa nóng và lớp foam mịn màng, tạo nên hương vị cân bằng hoàn hảo",
    price: 55000,
    originalPrice: 65000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "Bán chạy",
    isHot: true,
    calories: 120,
    category: "Cà phê"
  },
  {
    id: 2,
    name: "Latte Art Special",
    description: "Espresso với sữa tươi và nghệ thuật latte tinh tế, mang đến trải nghiệm thị giác và vị giác tuyệt vời",
    price: 60000,
    originalPrice: 70000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "Yêu thích",
    isHot: true,
    calories: 150,
    category: "Cà phê"
  },
  {
    id: 3,
    name: "Croissant Bơ Tươi",
    description: "Bánh croissant giòn thơm với bơ Pháp, được nướng tươi mỗi sáng theo công thức truyền thống",
    price: 38000,
    originalPrice: 45000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "Mới",
    isHot: false,
    calories: 320,
    category: "Bánh ngọt"
  },
  {
    id: 4,
    name: "Tiramisu Ý",
    description: "Tiramisu truyền thống với mascarpone, cà phê espresso và cacao, mang hương vị Ý đích thực",
    price: 65000,
    originalPrice: 75000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "Đặc biệt",
    isHot: false,
    calories: 380,
    category: "Tráng miệng"
  },
  {
    id: 5,
    name: "Americano Premium",
    description: "Cà phê đen đậm đà với hạt Arabica 100%, pha chế theo phong cách Mỹ truyền thống",
    price: 45000,
    originalPrice: 55000,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "Premium",
    isHot: true,
    calories: 5,
    category: "Cà phê"
  },
  {
    id: 6,
    name: "Chocolate Croissant",
    description: "Croissant nhân sô cô la đen Bỉ, kết hợp hoàn hảo giữa vị bơ thơm và sô cô la đậm đà",
    price: 42000,
    originalPrice: 50000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "Hot",
    isHot: false,
    calories: 350,
    category: "Bánh ngọt"
  }
];

const FeaturedProducts = () => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 sm:h-4 sm:w-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-background to-secondary/20">
      <div className="container px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Star className="h-4 w-4" />
              Sản phẩm nổi bật
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Thực đơn đặc sản
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-3xl mx-auto">
              Những món ngon được yêu thích nhất, được chọn lọc kỹ lưỡng từ thực đơn của chúng tôi với nguyên liệu cao cấp
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {featuredProducts.map((product, index) => (
            <Card
              key={product.id}
              className="group overflow-hidden bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-2xl transition-all duration-500 animate-fade-up border-0 shadow-lg hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden h-48 sm:h-56">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className={`text-xs font-semibold ${
                    product.badge === 'Bán chạy' ? 'bg-red-500 text-white' :
                    product.badge === 'Yêu thích' ? 'bg-pink-500 text-white' :
                    product.badge === 'Mới' ? 'bg-green-500 text-white' :
                    product.badge === 'Đặc biệt' ? 'bg-purple-500 text-white' :
                    product.badge === 'Premium' ? 'bg-yellow-500 text-black' :
                    'bg-orange-500 text-white'
                  }`}>
                    {product.badge}
                  </Badge>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="text-xs bg-white/90 text-foreground">
                    {product.category}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-md rounded-full"
                  >
                    <Heart className="h-4 w-4 text-gray-600" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-md rounded-full"
                  >
                    <Eye className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>

                {/* Hot/Cold Indicator */}
                <div className="absolute bottom-3 right-3">
                  <Badge variant={product.isHot ? "destructive" : "secondary"} className="text-xs bg-white/90">
                    {product.isHot ? "🔥 Nóng" : "❄️ Lạnh"}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-base sm:text-lg line-clamp-1 text-foreground">{product.name}</h3>
                    <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {product.calories} cal
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating}/5
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg sm:text-xl font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    {product.originalPrice && (
                      <div className="text-xs text-accent font-semibold bg-accent/10 px-2 py-1 rounded-full">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </div>
                    )}
                  </div>

                  <Button className="w-full bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent text-white shadow-lg hover:shadow-xl transition-all duration-300 group text-sm font-semibold py-3">
                    <ShoppingCart className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    Thêm vào giỏ
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="group text-base font-semibold px-8 py-3 border-2 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300">
            <Link to="/menu">
              Xem toàn bộ thực đơn
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
