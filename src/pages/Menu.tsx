import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Search, 
  Filter,
  Coffee,
  Utensils,
  Star,
  Trash2
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample menu data
const menuData = {
  categories: [
    {
      id: "coffee",
      name: "Cà phê",
      icon: Coffee,
      items: [
        {
          id: 1,
          name: "Cà phê đen",
          description: "Cà phê đen truyền thống, đậm đà",
          price: 25000,
          image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          rating: 4.5,
          popular: true
        },
        {
          id: 2,
          name: "Cappuccino",
          description: "Cà phê với sữa và bọt sữa",
          price: 35000,
          image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          rating: 4.8,
          popular: true
        },
        {
          id: 3,
          name: "Latte",
          description: "Cà phê với nhiều sữa",
          price: 40000,
          image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          rating: 4.6,
          popular: false
        },
        {
          id: 4,
          name: "Espresso",
          description: "Cà phê đậm đặc, nguyên chất",
          price: 20000,
          image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          rating: 4.3,
          popular: false
        }
      ]
    },
    {
      id: "food",
      name: "Đồ ăn",
      icon: Utensils,
      items: [
        {
          id: 5,
          name: "Bánh mì thịt nướng",
          description: "Bánh mì giòn với thịt nướng thơm ngon",
          price: 45000,
          image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          rating: 4.7,
          popular: true
        },
        {
          id: 6,
          name: "Bánh ngọt",
          description: "Bánh ngọt tươi ngon mỗi ngày",
          price: 30000,
          image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          rating: 4.4,
          popular: false
        },
        {
          id: 7,
          name: "Sandwich",
          description: "Sandwich với rau tươi và thịt",
          price: 55000,
          image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          rating: 4.5,
          popular: false
        }
      ]
    }
  ]
};

const Menu = () => {
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("coffee");

  const filteredItems = menuData.categories
    .find(cat => cat.id === activeCategory)
    ?.items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coffee className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">Nova Souls</h1>
            </div>
            
            {/* Cart Button */}
            <Button 
              className="relative bg-primary hover:bg-primary/90"
              onClick={() => navigate('/checkout')}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Giỏ hàng
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Menu Content */}
          <div className="lg:col-span-3">
            {/* Search and Filter */}
            <div className="mb-6">
              <div className="flex gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm món ăn..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Lọc
                </Button>
              </div>

              {/* Category Tabs */}
              <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="grid w-full grid-cols-2">
                  {menuData.categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {category.name}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {menuData.categories.map((category) => (
                  <TabsContent key={category.id} value={category.id} className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredItems.map((item) => (
                        <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-48 object-cover"
                            />
                            {item.popular && (
                              <Badge className="absolute top-2 left-2 bg-orange-500">
                                <Star className="h-3 w-3 mr-1" />
                                Phổ biến
                              </Badge>
                            )}
                            <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded">
                              <Star className="h-3 w-3 fill-yellow-400" />
                              <span className="text-sm">{item.rating}</span>
                            </div>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-bold text-primary">
                                {item.price.toLocaleString('vi-VN')}đ
                              </span>
                              <Button 
                                onClick={() => addToCart(item)}
                                className="bg-primary hover:bg-primary/90"
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Thêm
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Giỏ hàng ({getTotalItems()})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Giỏ hàng trống</p>
                    <p className="text-sm">Thêm món ăn để bắt đầu</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.price.toLocaleString('vi-VN')}đ
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Tổng cộng:</span>
                        <span className="text-primary">
                          {getTotalPrice().toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={() => navigate('/checkout')}
                      >
                        Thanh toán
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
