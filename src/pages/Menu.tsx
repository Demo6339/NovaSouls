import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  ShoppingCart, 
  Plus, 
  Search, 
  Filter,
  Coffee,
  Wine,
  X,
  SlidersHorizontal,
  Clock,
  Flame,
  DollarSign,
  Menu as MenuIcon,
  Droplets,
  Zap,
  Thermometer,
  Star,
  CheckCircle,
  Truck,
  Shield
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// H₂CO Bar menu data
const menuData = {
  categories: [
    {
      id: "soju",
      name: "Soju",
      icon: Wine,
      items: [
        {
          id: 1,
          name: "Soju Chamisul",
          description: "Soju truyền thống Hàn Quốc, mát lạnh, hương vị tinh tế và thanh khiết",
          price: 25000,
          image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "soju",
          temperature: "lạnh",
          purchaseCount: 89
        },
        {
          id: 2,
          name: "Soju Yuja",
          description: "Soju với hương chanh yuja thơm ngon, vị chua ngọt hài hòa",
          price: 30000,
          image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "soju",
          temperature: "lạnh",
          purchaseCount: 156
        },
        {
          id: 3,
          name: "Soju Peach",
          description: "Soju hương đào ngọt ngào, hương thơm quyến rũ",
          price: 35000,
          image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "soju",
          temperature: "lạnh",
          purchaseCount: 67
        }
      ]
    },
    {
      id: "cocktail",
      name: "Cocktail",
      icon: Zap,
      items: [
        {
          id: 4,
          name: "Mojito",
          description: "Rum, bạc hà, chanh tươi, soda - cocktail tươi mát và sảng khoái",
          price: 45000,
          image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "cocktail",
          temperature: "lạnh",
          purchaseCount: 234
        },
        {
          id: 5,
          name: "Cosmopolitan",
          description: "Vodka, Cointreau, cranberry juice, chanh - cocktail sang trọng và quyến rũ",
          price: 50000,
          image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "cocktail",
          temperature: "lạnh",
          purchaseCount: 189
        },
        {
          id: 6,
          name: "Old Fashioned",
          description: "Whiskey, đường, bitters, cam - cocktail cổ điển và tinh tế",
          price: 48000,
          image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "cocktail",
          temperature: "lạnh",
          purchaseCount: 98
        }
      ]
    },
    {
      id: "coffee",
      name: "Coffee",
      icon: Coffee,
      items: [
        {
          id: 7,
          name: "Espresso",
          description: "Cà phê đậm đặc, nguyên chất, hương vị mạnh mẽ và tinh tế",
          price: 20000,
          image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "coffee",
          temperature: "nóng",
          purchaseCount: 312
        },
        {
          id: 8,
          name: "Cappuccino",
          description: "Cà phê với sữa và bọt sữa, hương vị hài hòa và thơm ngon",
          price: 25000,
          image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "coffee",
          temperature: "nóng",
          purchaseCount: 278
        },
        {
          id: 9,
          name: "Iced Coffee",
          description: "Cà phê đá mát lạnh, tươi mát và sảng khoái",
          price: 22000,
          image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "coffee",
          temperature: "lạnh",
          purchaseCount: 145
        }
      ]
    },
    {
      id: "juice",
      name: "Nước hoa quả",
      icon: Droplets,
      items: [
        {
          id: 10,
          name: "Nước cam tươi",
          description: "Cam tươi vắt, mát lạnh, giàu vitamin C và tươi ngon",
          price: 18000,
          image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "juice",
          temperature: "lạnh",
          purchaseCount: 198
        },
        {
          id: 11,
          name: "Sinh tố bơ",
          description: "Bơ tươi xay với sữa, béo ngậy và thơm ngon",
          price: 22000,
          image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "juice",
          temperature: "lạnh",
          purchaseCount: 87
        },
        {
          id: 12,
          name: "Nước dưa hấu",
          description: "Dưa hấu tươi, mát lạnh, ngọt thanh và giải nhiệt",
          price: 16000,
          image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "juice",
          temperature: "lạnh",
          purchaseCount: 156
        }
      ]
    },
    {
      id: "soft-drinks",
      name: "Nước ngọt",
      icon: Thermometer,
      items: [
        {
          id: 13,
          name: "Coca Cola",
          description: "Nước ngọt có gas, mát lạnh, vị ngọt đậm đà và sảng khoái",
          price: 16000,
          image: "https://images.unsplash.com/photo-1581636625402-29b2a7041f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "soft-drinks",
          temperature: "lạnh",
          purchaseCount: 245
        },
        {
          id: 14,
          name: "Pepsi",
          description: "Nước ngọt có gas, mát lạnh, vị ngọt đặc trưng và tươi mát",
          price: 16000,
          image: "https://images.unsplash.com/photo-1581636625402-29b2a7041f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "soft-drinks",
          temperature: "lạnh",
          purchaseCount: 123
        },
        {
          id: 15,
          name: "Sprite",
          description: "Nước ngọt chanh, mát lạnh, vị chanh tươi mát và sảng khoái",
          price: 16000,
          image: "https://images.unsplash.com/photo-1581636625402-29b2a7041f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          category: "soft-drinks",
          temperature: "lạnh",
          purchaseCount: 167
        }
      ]
    }
  ]
};

const Menu = () => {
  const navigate = useNavigate();
  const { addToCart, getTotalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [filters, setFilters] = useState({
    priceRange: [16000, 50000]
  });

  // Get all items from all categories
  const allItems = menuData.categories.flatMap(cat => cat.items);

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setNotes("");
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      for (let i = 0; i < quantity; i++) {
        addToCart(selectedItem);
      }
      setSelectedItem(null);
      setQuantity(1);
      setNotes("");
    }
  };

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    
    const matchesPrice = item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <MenuIcon className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-900 rounded-lg">
                  <Coffee className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    H₂CO Bar
                  </h1>
                  <p className="text-sm text-gray-600">Drinks & Cocktails</p>
                </div>
              </div>
            </div>
            
            {/* Cart Button */}
            <Button 
              className="relative bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-2 rounded-lg transition-colors"
              onClick={() => navigate('/checkout')}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Giỏ hàng
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-600 text-white">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar - Search & Filters */}
        <div className={`w-80 flex-shrink-0 ${showSidebar ? 'block' : 'hidden lg:block'}`}>
          <div className="h-screen overflow-y-auto bg-white p-6">
            <div className="space-y-8">
              {/* Search Box */}
              <div>
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                  <Search className="h-5 w-5 text-gray-600" />
                  Tìm kiếm
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Tìm kiếm đồ uống..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 border border-gray-300 focus:border-gray-900 rounded-lg"
                    />
                </div>
              </div>

              {/* Filters */}
              <div>
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-6">
                  <SlidersHorizontal className="h-5 w-5 text-gray-600" />
                  Bộ lọc
                </div>
                <div className="space-y-6">
                  {/* Category Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-600 uppercase tracking-wide">Danh mục</Label>
                    <div className="space-y-1">
                      <button
                        onClick={() => setActiveCategory("all")}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          activeCategory === "all" 
                            ? "bg-gray-900 text-white" 
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Tất cả
                      </button>
                      {menuData.categories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                              activeCategory === category.id 
                                ? "bg-gray-900 text-white" 
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            {category.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t border-gray-200"></div>

                  {/* Price Range */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-600 uppercase tracking-wide">Khoảng giá</Label>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs text-gray-500 mb-1 block">Từ (đ)</Label>
                          <Input
                            type="number"
                            min="16000"
                            max="50000"
                            step="1000"
                            value={filters.priceRange[0]}
                            onChange={(e) => setFilters(prev => ({
                              ...prev,
                              priceRange: [parseInt(e.target.value) || 16000, prev.priceRange[1]]
                            }))}
                            className="h-9 text-sm"
                            placeholder="16.000"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500 mb-1 block">Đến (đ)</Label>
                          <Input
                            type="number"
                            min="16000"
                            max="50000"
                            step="1000"
                            value={filters.priceRange[1]}
                            onChange={(e) => setFilters(prev => ({
                              ...prev,
                              priceRange: [prev.priceRange[0], parseInt(e.target.value) || 50000]
                            }))}
                            className="h-9 text-sm"
                            placeholder="50.000"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200"></div>

                  {/* Reset Filters */}
                  <button
                    onClick={() => setFilters({
                      priceRange: [16000, 50000]
                    })}
                    className="w-full text-center px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Xóa tất cả bộ lọc
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {activeCategory === "all" ? "Tất cả đồ uống" : 
                     menuData.categories.find(cat => cat.id === activeCategory)?.name}
                  </h2>
                  <p className="text-gray-600">
                    Tìm thấy {filteredItems.length} đồ uống
                  </p>
                </div>
              <Button
                variant="outline"
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Bộ lọc
              </Button>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="group overflow-hidden hover:shadow-lg transition-all duration-200 border border-gray-200">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/80 text-white px-2 py-1 rounded-full">
                      <Thermometer className="h-3 w-3" />
                      <span className="text-sm">{item.temperature === 'nóng' ? 'Nóng' : 'Lạnh'}</span>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg group-hover:text-gray-900 transition-colors">
                      {item.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xl font-bold text-gray-900">
                          {item.price.toLocaleString('vi-VN')}đ
                        </span>
                        <span className="text-xs text-gray-500">Mỗi ly</span>
                      </div>
                      <Button 
                        onClick={() => handleViewDetails(item)}
                        className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                      >
                        Xem thêm
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Không tìm thấy đồ uống</h3>
                <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {showSidebar && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Item Details Modal - Beautiful & Complete */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in-0 duration-300">
            <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden relative flex flex-col lg:flex-row">
              {/* Left Side - Image */}
              <div className="w-full lg:w-2/5 relative h-64 lg:h-auto flex-shrink-0">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Temperature Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium shadow-lg flex items-center gap-1.5">
                      <Thermometer className="h-4 w-4" />
                      {selectedItem.temperature === 'nóng' ? 'Nóng' : 'Lạnh'}
                    </div>
                  </div>
                </div>

              {/* Right Side - Content */}
              <div className="w-full lg:w-3/5 overflow-y-auto relative flex-1">
                <div className="p-6 lg:p-8">
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 z-10 border border-gray-200"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <div className="space-y-3">
                    {/* Header */}
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        {(() => {
                          const category = menuData.categories.find(cat => cat.id === selectedItem.category);
                          const Icon = category?.icon || Coffee;
                          return (
                            <>
                              <Icon className="h-4 w-4" />
                              <span>{category?.name}</span>
                            </>
                          );
                        })()}
                      </div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedItem.name}</h1>
                      <div className="text-xl font-bold text-gray-900 mb-3">
                        {selectedItem.price.toLocaleString('vi-VN')}đ
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-2">Mô tả</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{selectedItem.description}</p>
                    </div>

                    {/* Quick Info - Beautiful Cards */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                        <div className="text-xs text-blue-600 font-medium mb-1">Lượt mua</div>
                        <div className="text-sm font-bold text-blue-800">{selectedItem.purchaseCount}</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
                        <div className="text-xs text-green-600 font-medium mb-1">Danh mục</div>
                        <div className="text-sm font-bold text-green-800">
                          {menuData.categories.find(cat => cat.id === selectedItem.category)?.name}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 border border-orange-200">
                        <div className="text-xs text-orange-600 font-medium mb-1">Trạng thái</div>
                        <div className="text-sm font-bold text-orange-800">Có sẵn</div>
                      </div>
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div className="border-t border-gray-200 pt-3 pb-3 mt-3">
                    <Label className="text-sm font-semibold text-gray-900 mb-2 block">Ghi chú thêm</Label>
                    <Textarea
                      placeholder="Ghi chú đặc biệt cho món này... (tùy chọn)"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[60px] resize-none border border-gray-300 focus:border-gray-500 rounded-lg p-3 text-sm"
                    />
                  </div>

                  {/* Order Section - Balanced Design */}
                  <div className="border-t border-gray-200 pt-4 pb-4">
                    {/* Quantity, Total & Add to Cart - Same Row */}
                    <div className="flex items-center gap-3">
                      {/* Quantity Selector */}
                      <div className="flex-1">
                        <Label className="text-xs font-medium text-gray-600 mb-2 block">Số lượng</Label>
                        <div className="flex items-center gap-2 h-11">
                          <Button
                            variant="outline"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-11 h-11 p-0 rounded-lg border-2 hover:bg-gray-50 text-base font-bold"
                          >
                            -
                          </Button>
                          <div className="flex-1 text-center">
                            <span className="text-xl font-bold text-gray-900">{quantity}</span>
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-11 h-11 p-0 rounded-lg border-2 hover:bg-gray-50 text-base font-bold"
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      {/* Total Price */}
                      <div className="flex-1">
                        <Label className="text-xs font-medium text-gray-600 mb-2 block">Tổng cộng</Label>
                        <div className="bg-gray-50 rounded-lg px-3 h-11 border border-gray-200 flex items-center justify-center">
                          <span className="text-xl font-bold text-gray-900">{(selectedItem.price * quantity).toLocaleString('vi-VN')}đ</span>
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <div className="flex-shrink-0">
                        <Label className="text-xs font-medium text-gray-600 mb-2 block invisible">.</Label>
                        <Button
                          onClick={handleAddToCart}
                          className="w-16 h-11 p-0 bg-gray-900 hover:bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                        >
                          <ShoppingCart className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
