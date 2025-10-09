import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Star, 
  Heart, 
  Clock, 
  Users, 
  Flame,
  Coffee,
  Utensils,
  IceCream,
  Leaf,
  X,
  ChevronDown,
  SortAsc,
  SortDesc,
  GitCompare,
  Trash2,
  Grid3X3,
  List,
  Eye,
  Plus,
  Minus,
  Home,
  ChevronRight,
  SlidersHorizontal,
  RefreshCw,
  Zap,
  Award,
  TrendingUp
} from "lucide-react";
import { useState, useMemo } from "react";
import coffeeImage from "@/assets/coffee-1.jpg";
import foodImage from "@/assets/food-1.jpg";

const menuItems = {
  coffee: [
    { 
      id: 1, 
      name: "Espresso", 
      description: "Cà phê espresso đậm đà, được pha từ hạt cà phê Arabica cao cấp", 
      price: 45000, 
      image: coffeeImage,
      rating: 4.8,
      prepTime: 3,
      calories: 5,
      isHot: true,
      isPopular: false,
      ingredients: ["Cà phê Arabica", "Nước tinh khiết"],
      nutrition: { calories: 5, protein: 0.3, carbs: 0.1, fat: 0.1 }
    },
    { 
      id: 2, 
      name: "Americano", 
      description: "Espresso pha loãng với nước nóng, vị đậm đà nhưng nhẹ nhàng hơn", 
      price: 45000, 
      image: coffeeImage,
      rating: 4.5,
      prepTime: 4,
      calories: 8,
      isHot: true,
      isPopular: false,
      ingredients: ["Espresso", "Nước nóng"],
      nutrition: { calories: 8, protein: 0.4, carbs: 0.2, fat: 0.1 }
    },
    { 
      id: 3, 
      name: "Cappuccino", 
      description: "Espresso với sữa nóng và lớp foam mịn màng, vị cân bằng hoàn hảo", 
      price: 50000, 
      image: coffeeImage, 
      badge: "Yêu thích",
      rating: 4.9,
      prepTime: 5,
      calories: 120,
      isHot: true,
      isPopular: true,
      ingredients: ["Espresso", "Sữa tươi", "Foam sữa"],
      nutrition: { calories: 120, protein: 6, carbs: 8, fat: 6 }
    },
    { 
      id: 4, 
      name: "Latte", 
      description: "Espresso với nhiều sữa, vị ngọt ngào và mềm mại", 
      price: 55000, 
      image: coffeeImage, 
      badge: "Bán chạy",
      rating: 4.7,
      prepTime: 6,
      calories: 150,
      isHot: true,
      isPopular: true,
      ingredients: ["Espresso", "Sữa tươi", "Latte art"],
      nutrition: { calories: 150, protein: 8, carbs: 12, fat: 8 }
    },
    { 
      id: 5, 
      name: "Mocha", 
      description: "Latte với chocolate đậm đà, vị ngọt ngào quyến rũ", 
      price: 60000, 
      image: coffeeImage,
      rating: 4.6,
      prepTime: 7,
      calories: 200,
      isHot: true,
      isPopular: false,
      ingredients: ["Espresso", "Sữa tươi", "Chocolate", "Whipped cream"],
      nutrition: { calories: 200, protein: 8, carbs: 20, fat: 12 }
    },
    { 
      id: 6, 
      name: "Caramel Macchiato", 
      description: "Espresso với sữa và caramel, vị ngọt ngào đặc trưng", 
      price: 65000, 
      image: coffeeImage,
      rating: 4.8,
      prepTime: 8,
      calories: 180,
      isHot: true,
      isPopular: false,
      ingredients: ["Espresso", "Sữa tươi", "Caramel syrup", "Vanilla"],
      nutrition: { calories: 180, protein: 7, carbs: 18, fat: 9 }
    },
  ],
  tea: [
    { 
      id: 7, 
      name: "Trà xanh", 
      description: "Trà xanh Nhật Bản cao cấp, vị thanh mát và tốt cho sức khỏe", 
      price: 40000, 
      image: coffeeImage,
      rating: 4.4,
      prepTime: 3,
      calories: 2,
      isHot: true,
      isPopular: false,
      ingredients: ["Lá trà xanh Nhật Bản", "Nước tinh khiết"],
      nutrition: { calories: 2, protein: 0.2, carbs: 0.1, fat: 0 }
    },
    { 
      id: 8, 
      name: "Trà ô long", 
      description: "Trà ô long thơm ngon, vị đậm đà và hương vị đặc trưng", 
      price: 40000, 
      image: coffeeImage,
      rating: 4.3,
      prepTime: 4,
      calories: 3,
      isHot: true,
      isPopular: false,
      ingredients: ["Lá trà ô long", "Nước tinh khiết"],
      nutrition: { calories: 3, protein: 0.1, carbs: 0.2, fat: 0 }
    },
    { 
      id: 9, 
      name: "Trà hoa cúc", 
      description: "Trà hoa cúc thanh mát, giúp thư giãn và dễ ngủ", 
      price: 35000, 
      image: coffeeImage,
      rating: 4.5,
      prepTime: 3,
      calories: 1,
      isHot: true,
      isPopular: false,
      ingredients: ["Hoa cúc khô", "Nước tinh khiết"],
      nutrition: { calories: 1, protein: 0.1, carbs: 0.1, fat: 0 }
    },
  ],
  food: [
    { 
      id: 10, 
      name: "Croissant Bơ", 
      description: "Bánh croissant giòn thơm, được nướng tươi mỗi sáng", 
      price: 35000, 
      image: foodImage, 
      badge: "Mới",
      rating: 4.6,
      prepTime: 2,
      calories: 300,
      isHot: false,
      isPopular: true,
      ingredients: ["Bột mì", "Bơ", "Men", "Muối"],
      nutrition: { calories: 300, protein: 8, carbs: 35, fat: 15 }
    },
    { 
      id: 11, 
      name: "Bánh mì que", 
      description: "Bánh mì que tươi mỗi ngày, giòn ngoài mềm trong", 
      price: 25000, 
      image: foodImage,
      rating: 4.2,
      prepTime: 1,
      calories: 200,
      isHot: false,
      isPopular: false,
      ingredients: ["Bột mì", "Men", "Nước", "Muối"],
      nutrition: { calories: 200, protein: 6, carbs: 40, fat: 2 }
    },
    { 
      id: 12, 
      name: "Sandwich", 
      description: "Sandwich với nhiều nhân tươi ngon, đầy đủ dinh dưỡng", 
      price: 45000, 
      image: foodImage,
      rating: 4.4,
      prepTime: 5,
      calories: 400,
      isHot: false,
      isPopular: false,
      ingredients: ["Bánh mì", "Thịt nguội", "Rau xanh", "Sốt"],
      nutrition: { calories: 400, protein: 20, carbs: 35, fat: 18 }
    },
  ],
  dessert: [
    { 
      id: 13, 
      name: "Tiramisu", 
      description: "Tiramisu Ý truyền thống, vị ngọt ngào và mềm mại", 
      price: 55000, 
      image: foodImage,
      rating: 4.8,
      prepTime: 10,
      calories: 350,
      isHot: false,
      isPopular: true,
      ingredients: ["Mascarpone", "Cà phê", "Cocoa", "Biscuit"],
      nutrition: { calories: 350, protein: 12, carbs: 25, fat: 22 }
    },
    { 
      id: 14, 
      name: "Cheesecake", 
      description: "Bánh phô mai New York, vị béo ngậy và thơm ngon", 
      price: 50000, 
      image: foodImage,
      rating: 4.7,
      prepTime: 8,
      calories: 320,
      isHot: false,
      isPopular: false,
      ingredients: ["Cream cheese", "Biscuit", "Trứng", "Đường"],
      nutrition: { calories: 320, protein: 10, carbs: 28, fat: 20 }
    },
  ],
};

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState("name");
  const [selectedCategory, setSelectedCategory] = useState("coffee");
  const [selectedItem, setSelectedItem] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [compareItems, setCompareItems] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showSidebar, setShowSidebar] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [selectedFilters, setSelectedFilters] = useState({
    category: "all",
    priceRange: [0, 100000],
    rating: 0,
    isHot: null,
    isPopular: false
  });

  const categoryIcons = {
    coffee: Coffee,
    tea: Leaf,
    food: Utensils,
    dessert: IceCream,
  };

  const filteredItems = useMemo(() => {
    let items = Object.values(menuItems).flat();
    
    // Filter by search term
    if (searchTerm) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedFilters.category !== "all") {
      items = items.filter(item => {
        const category = Object.keys(menuItems).find(cat => 
          menuItems[cat].some(menuItem => menuItem.id === item.id)
        );
        return category === selectedFilters.category;
      });
    }
    
    // Filter by price range
    items = items.filter(item => 
      item.price >= selectedFilters.priceRange[0] && 
      item.price <= selectedFilters.priceRange[1]
    );
    
    // Filter by rating
    if (selectedFilters.rating > 0) {
      items = items.filter(item => item.rating >= selectedFilters.rating);
    }
    
    // Filter by temperature
    if (selectedFilters.isHot !== null) {
      items = items.filter(item => item.isHot === selectedFilters.isHot);
    }
    
    // Filter by popularity
    if (selectedFilters.isPopular) {
      items = items.filter(item => item.isPopular);
    }
    
    // Sort items
    items.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });
    
    return items;
  }, [searchTerm, selectedFilters, sortBy]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredItems.slice(startIndex, endIndex);
  }, [filteredItems, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const toggleFavorite = (itemId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  };

  const toggleCompare = (item) => {
    setCompareItems(prev => {
      const isInCompare = prev.find(i => i.id === item.id);
      if (isInCompare) {
        return prev.filter(i => i.id !== item.id);
      } else if (prev.length < 3) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const removeFromCompare = (itemId) => {
    setCompareItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

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
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      

      <main className="flex-1 py-6">
        <div className="container px-4">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
                Thực đơn Nova Souls
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 px-2">
                Khám phá những món ngon đặc biệt, được chế biến từ những nguyên liệu tươi ngon nhất
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto px-2">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 sm:h-5 sm:w-5" />
                <Input
                  placeholder="Tìm kiếm món ăn..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 sm:pl-12 h-10 sm:h-12 text-sm sm:text-base lg:text-lg rounded-full border-2 focus:border-primary/50"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Sidebar Filters */}
            <aside className={`w-full lg:w-80 ${showSidebar ? 'block' : 'hidden'} lg:block`}>
              <div className="lg:sticky lg:top-6 space-y-4 lg:space-y-6">
                {/* Filter Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5" />
                    Bộ lọc
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSidebar(false)}
                    className="lg:hidden"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Category Filter */}
                <Card className="p-3 sm:p-4">
                  <h3 className="font-semibold mb-3 text-sm sm:text-base">Danh mục</h3>
                  <RadioGroup
                    value={selectedFilters.category}
                    onValueChange={(value) => setSelectedFilters(prev => ({ ...prev, category: value }))}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" className="h-4 w-4" />
                      <Label htmlFor="all" className="flex items-center gap-2 text-sm">
                        <Grid3X3 className="h-3 w-3 sm:h-4 sm:w-4" />
                        Tất cả
                      </Label>
                    </div>
                    {Object.entries(menuItems).map(([category, items]) => {
                      const Icon = categoryIcons[category];
                      return (
                        <div key={category} className="flex items-center space-x-2">
                          <RadioGroupItem value={category} id={category} className="h-4 w-4" />
                          <Label htmlFor={category} className="flex items-center gap-2 text-sm flex-1">
                            <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="truncate">
                              {category === 'coffee' ? 'Cà phê' : 
                               category === 'tea' ? 'Trà' :
                               category === 'food' ? 'Đồ ăn' : 'Tráng miệng'}
                            </span>
                            <Badge variant="secondary" className="ml-auto text-xs">
                              {items.length}
                            </Badge>
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </Card>

                {/* Price Filter */}
                <Card className="p-3 sm:p-4">
                  <h3 className="font-semibold mb-3 text-sm sm:text-base">Khoảng giá</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                      <span className="truncate">{formatPrice(selectedFilters.priceRange[0])}</span>
                      <span className="truncate">{formatPrice(selectedFilters.priceRange[1])}</span>
                    </div>
                    <Slider
                      value={selectedFilters.priceRange}
                      onValueChange={(value) => setSelectedFilters(prev => ({ ...prev, priceRange: value }))}
                      max={100000}
                      min={0}
                      step={5000}
                      className="w-full"
                    />
                  </div>
                </Card>

                {/* Rating Filter */}
                <Card className="p-3 sm:p-4">
                  <h3 className="font-semibold mb-3 text-sm sm:text-base">Đánh giá</h3>
                  <RadioGroup
                    value={selectedFilters.rating.toString()}
                    onValueChange={(value) => setSelectedFilters(prev => ({ ...prev, rating: parseInt(value) }))}
                    className="space-y-2"
                  >
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} className="h-4 w-4" />
                        <Label htmlFor={`rating-${rating}`} className="flex items-center gap-2 text-sm flex-1">
                          <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                  i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs sm:text-sm text-muted-foreground">
                            {rating}+ sao
                          </span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </Card>

                {/* Temperature Filter */}
                <Card className="p-3 sm:p-4">
                  <h3 className="font-semibold mb-3 text-sm sm:text-base">Nhiệt độ</h3>
                  <RadioGroup
                    value={selectedFilters.isHot === null ? "all" : selectedFilters.isHot.toString()}
                    onValueChange={(value) => {
                      const isHot = value === "all" ? null : value === "true";
                      setSelectedFilters(prev => ({ ...prev, isHot }));
                    }}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="temp-all" className="h-4 w-4" />
                      <Label htmlFor="temp-all" className="text-sm">Tất cả</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="temp-hot" className="h-4 w-4" />
                      <Label htmlFor="temp-hot" className="flex items-center gap-2 text-sm">
                        <Flame className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                        Nóng
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="temp-cold" className="h-4 w-4" />
                      <Label htmlFor="temp-cold" className="flex items-center gap-2 text-sm">
                        <IceCream className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                        Lạnh
                      </Label>
                    </div>
                  </RadioGroup>
                </Card>

                {/* Special Filters */}
                <Card className="p-3 sm:p-4">
                  <h3 className="font-semibold mb-3 text-sm sm:text-base">Đặc biệt</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="popular"
                        checked={selectedFilters.isPopular}
                        onCheckedChange={(checked) => 
                          setSelectedFilters(prev => ({ ...prev, isPopular: checked }))
                        }
                        className="h-4 w-4"
                      />
                      <Label htmlFor="popular" className="flex items-center gap-2 text-sm">
                        <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500" />
                        Món phổ biến
                      </Label>
                    </div>
                  </div>
                </Card>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSidebar(true)}
                    className="lg:hidden"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Bộ lọc
                  </Button>
                  
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {paginatedItems.length}/{filteredItems.length} món
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {/* View Mode Toggle */}
                  <div className="flex border rounded-lg w-fit">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none px-3"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none px-3"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Sắp xếp theo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Tên A-Z</SelectItem>
                      <SelectItem value="price-low">Giá thấp đến cao</SelectItem>
                      <SelectItem value="price-high">Giá cao đến thấp</SelectItem>
                      <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Compare Button */}
                  <Button
                    variant="outline"
                    onClick={() => setShowCompare(true)}
                    className="flex items-center gap-2 w-full sm:w-auto"
                    disabled={compareItems.length === 0}
                  >
                    <GitCompare className="h-4 w-4" />
                    <span className="hidden sm:inline">So sánh</span>
                    {compareItems.length > 0 && (
                      <Badge className="ml-2 bg-accent text-accent-foreground text-xs">
                        {compareItems.length}
                      </Badge>
                    )}
                  </Button>
                </div>
              </div>

              {/* Products Grid/List */}
              {isLoading ? (
                <div className={viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6" : "space-y-3 sm:space-y-4"}>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                      <Skeleton className="h-32 sm:h-40 lg:h-48 w-full" />
                      <CardContent className="p-2 sm:p-3 lg:p-4">
                        <Skeleton className="h-3 sm:h-4 w-3/4 mb-2" />
                        <Skeleton className="h-2 sm:h-3 w-full mb-2" />
                        <Skeleton className="h-2 sm:h-3 w-1/2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className={viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6" : "space-y-3 sm:space-y-4"}>
                  {paginatedItems.map((item, index) => (
                    <Card
                      key={item.id}
                      className={`product-card group overflow-hidden bg-white shadow-ecommerce hover:shadow-ecommerce-xl cursor-pointer ${
                        viewMode === "list" ? "flex" : ""
                      }`}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className={`relative overflow-hidden ${viewMode === "list" ? "w-32 sm:w-48 h-32 sm:h-48" : "h-32 sm:h-40 lg:h-48"}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="product-image w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Badges */}
                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 sm:gap-2">
                          {item.badge && (
                            <Badge className="bg-accent text-accent-foreground text-xs px-1 py-0.5">
                              {item.badge}
                            </Badge>
                          )}
                          {item.isPopular && (
                            <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs px-1 py-0.5">
                              <TrendingUp className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                              <span className="hidden sm:inline">Phổ biến</span>
                            </Badge>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="action-buttons absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-1 sm:gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-white/90 hover:bg-white shadow-md"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(item.id);
                            }}
                          >
                            <Heart 
                              className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                favorites.has(item.id) 
                                  ? "text-red-500 fill-current" 
                                  : "text-gray-600"
                              }`} 
                            />
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-white/90 hover:bg-white shadow-md"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCompare(item);
                            }}
                            disabled={compareItems.length >= 3 && !compareItems.find(i => i.id === item.id)}
                          >
                            <GitCompare 
                              className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                compareItems.find(i => i.id === item.id)
                                  ? "text-blue-500 fill-current" 
                                  : "text-gray-600"
                              }`} 
                            />
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-white/90 hover:bg-white shadow-md"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedItem(item);
                            }}
                          >
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                          </Button>
                        </div>

                        {/* Hot/Cold Indicator */}
                        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3">
                          <Badge variant={item.isHot ? "destructive" : "secondary"} className="text-xs px-1 py-0.5">
                            {item.isHot ? "Nóng" : "Lạnh"}
                          </Badge>
                        </div>
                      </div>

                      <div className={`p-2 sm:p-3 lg:p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                        <div className="space-y-1 sm:space-y-2">
                          <h3 className="font-semibold text-sm sm:text-base lg:text-lg line-clamp-1">{item.name}</h3>
                          <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2">
                            {item.description}
                          </p>
                          
                          <div className="flex items-center gap-1">
                            {renderStars(item.rating)}
                            <span className="text-xs sm:text-sm text-muted-foreground ml-1">
                              ({item.rating})
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-2 w-2 sm:h-3 sm:w-3" />
                                <span className="hidden sm:inline">{item.prepTime} phút</span>
                                <span className="sm:hidden">{item.prepTime}m</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Flame className="h-2 w-2 sm:h-3 sm:w-3" />
                                <span className="hidden sm:inline">{item.calories} cal</span>
                                <span className="sm:hidden">{item.calories}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-1 sm:pt-2">
                            <span className="text-sm sm:text-lg lg:text-xl font-bold text-primary">
                              {formatPrice(item.price)}
                            </span>
                            <Button 
                              size="sm"
                              className="btn-ecommerce bg-gradient-hero hover:opacity-90 text-xs sm:text-sm px-2 sm:px-3"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Add to cart logic here
                              }}
                            >
                              <ShoppingCart className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="hidden sm:inline">Thêm</span>
                              <span className="sm:hidden">+</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6 sm:mt-8">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="h-8 w-8 sm:h-9 sm:w-9"
                    >
                      <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 rotate-90" />
                    </Button>
                    
                    {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="h-8 w-8 sm:h-9 sm:w-9 text-xs sm:text-sm"
                        >
                          {page}
                        </Button>
                      );
                    })}
                    
                    {totalPages > 3 && (
                      <span className="text-xs sm:text-sm text-muted-foreground px-1">...</span>
                    )}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8 sm:h-9 sm:w-9"
                    >
                      <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 -rotate-90" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Item Detail Modal */}
          <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
              {selectedItem && (
                <ScrollArea className="max-h-[80vh]">
                  <div className="space-y-6">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{selectedItem.name}</DialogTitle>
                      <DialogDescription className="text-base">
                        {selectedItem.description}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="relative h-64 rounded-lg overflow-hidden">
                          <img
                            src={selectedItem.image}
                            alt={selectedItem.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {renderStars(selectedItem.rating)}
                            <span className="text-sm text-muted-foreground">
                              ({selectedItem.rating}/5)
                            </span>
                          </div>
                          <Badge variant={selectedItem.isHot ? "destructive" : "secondary"}>
                            {selectedItem.isHot ? "Nóng" : "Lạnh"}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">Thông tin dinh dưỡng</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex justify-between">
                              <span>Calories:</span>
                              <span className="font-medium">{selectedItem.calories}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Protein:</span>
                              <span className="font-medium">{selectedItem.nutrition.protein}g</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Carbs:</span>
                              <span className="font-medium">{selectedItem.nutrition.carbs}g</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Fat:</span>
                              <span className="font-medium">{selectedItem.nutrition.fat}g</span>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">Thời gian chuẩn bị</h3>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{selectedItem.prepTime} phút</span>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">Nguyên liệu</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedItem.ingredients.map((ingredient, index) => (
                              <Badge key={index} variant="outline">
                                {ingredient}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-bold text-primary">
                              {formatPrice(selectedItem.price)}
                            </span>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleFavorite(selectedItem.id)}
                              >
                                <Heart 
                                  className={`h-4 w-4 mr-2 ${
                                    favorites.has(selectedItem.id) 
                                      ? "text-red-500 fill-current" 
                                      : "text-gray-600"
                                  }`} 
                                />
                                {favorites.has(selectedItem.id) ? "Đã yêu thích" : "Yêu thích"}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleCompare(selectedItem)}
                                disabled={compareItems.length >= 3 && !compareItems.find(i => i.id === selectedItem.id)}
                              >
                                <GitCompare className="h-4 w-4 mr-2" />
                                So sánh
                              </Button>
                            </div>
                          </div>
                          
                          <Button className="w-full bg-gradient-hero hover:opacity-90 transition-opacity">
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Thêm vào giỏ hàng
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              )}
            </DialogContent>
          </Dialog>

          {/* Compare Modal */}
          <Dialog open={showCompare} onOpenChange={setShowCompare}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-2">
                  <GitCompare className="h-6 w-6" />
                  So sánh món ăn
                </DialogTitle>
                <DialogDescription>
                  So sánh chi tiết các món ăn đã chọn
                </DialogDescription>
              </DialogHeader>

              <ScrollArea className="max-h-[70vh]">
                <div className="space-y-6">
                  {compareItems.length === 0 ? (
                    <div className="text-center py-8">
                      <GitCompare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Chưa có món nào để so sánh</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Thêm tối đa 3 món ăn để so sánh
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {compareItems.map((item, index) => (
                        <Card key={item.id} className="relative">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 h-8 w-8 p-0 z-10"
                            onClick={() => removeFromCompare(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          
                          <div className="p-4">
                            <div className="relative h-32 rounded-lg overflow-hidden mb-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                              {item.description}
                            </p>

                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Đánh giá:</span>
                                <div className="flex items-center gap-1">
                                  {renderStars(item.rating)}
                                  <span className="text-sm text-muted-foreground ml-1">
                                    ({item.rating})
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Giá:</span>
                                <span className="font-bold text-primary">
                                  {formatPrice(item.price)}
                                </span>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Thời gian:</span>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span className="text-sm">{item.prepTime} phút</span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Calories:</span>
                                <div className="flex items-center gap-1">
                                  <Flame className="h-3 w-3" />
                                  <span className="text-sm">{item.calories} cal</span>
                                </div>
                              </div>

                              <Separator />

                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">Dinh dưỡng:</h4>
                                <div className="grid grid-cols-3 gap-2 text-xs">
                                  <div className="text-center">
                                    <div className="font-medium">{item.nutrition.protein}g</div>
                                    <div className="text-muted-foreground">Protein</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="font-medium">{item.nutrition.carbs}g</div>
                                    <div className="text-muted-foreground">Carbs</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="font-medium">{item.nutrition.fat}g</div>
                                    <div className="text-muted-foreground">Fat</div>
                                  </div>
                                </div>
                              </div>

                              <div className="pt-2">
                                <Button 
                                  className="w-full" 
                                  size="sm"
                                  onClick={() => {
                                    // Add to cart logic
                                  }}
                                >
                                  <ShoppingCart className="mr-2 h-3 w-3" />
                                  Thêm vào giỏ
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>

              {compareItems.length > 0 && (
                <div className="flex justify-between items-center pt-4 border-t">
                  <Button variant="outline" onClick={clearCompare}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Xóa tất cả
                  </Button>
                  <Button onClick={() => setShowCompare(false)}>
                    Đóng
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Menu;
