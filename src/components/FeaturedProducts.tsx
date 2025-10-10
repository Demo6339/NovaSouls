import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Heart, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import coffeeImage from "@/assets/coffee-1.jpg";
import foodImage from "@/assets/food-1.jpg";

const featuredProducts = [];

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
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-background to-secondary/20">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-2 rounded-full text-xs font-semibold mb-2 sm:mb-3">
              <Star className="h-3 w-3" />
              Sản phẩm nổi bật
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4">
              Thực đơn đặc sản
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg max-w-3xl mx-auto">
              Những món ngon được yêu thích nhất, được chọn lọc kỹ lưỡng từ thực đơn của chúng tôi với nguyên liệu cao cấp
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12">
          {featuredProducts.map((product, index) => (
            <Card
              key={product.id}
              className="group overflow-hidden bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-2xl transition-all duration-500 animate-fade-up border-0 shadow-lg hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden h-32 sm:h-40 md:h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Badge */}
                <div className="absolute top-2 left-2">
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
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="text-xs bg-white/90 text-foreground">
                    {product.category}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-5 w-5 sm:h-6 sm:w-6 p-0 bg-white/90 hover:bg-white shadow-md rounded-full"
                  >
                    <Heart className="h-3 w-3 text-gray-600" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-5 w-5 sm:h-6 sm:w-6 p-0 bg-white/90 hover:bg-white shadow-md rounded-full"
                  >
                    <Eye className="h-3 w-3 text-gray-600" />
                  </Button>
                </div>

                {/* Hot/Cold Indicator */}
                <div className="absolute bottom-2 right-2">
                  <Badge variant={product.isHot ? "destructive" : "secondary"} className="text-xs bg-white/90">
                    {product.isHot ? "🔥 Nóng" : "❄️ Lạnh"}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-3 sm:p-4">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-xs sm:text-sm md:text-base line-clamp-1 text-foreground flex-1">{product.name}</h3>
                    <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full flex-shrink-0">
                      {product.calories} cal
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {product.rating}/5
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
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

                  <Button className="w-full bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent text-white shadow-lg hover:shadow-xl transition-all duration-300 group text-xs font-semibold py-2">
                    <ShoppingCart className="mr-2 h-3 w-3 group-hover:scale-110 transition-transform" />
                    Thêm vào giỏ
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="sm" variant="outline" className="group text-xs sm:text-sm font-semibold px-4 sm:px-6 py-2 border-2 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300">
            <Link to="/menu">
              Xem toàn bộ thực đơn
              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
