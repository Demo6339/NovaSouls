import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useMenu } from "@/contexts/MenuContext";
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
  Shield,
  Eye
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Category icons mapping
const categoryIcons = {
  soju: Wine,
  cocktail: Zap,
  coffee: Coffee,
  juice: Droplets,
  "soft-drinks": Thermometer
};

const Menu = () => {
  const navigate = useNavigate();
  const { addToCart, getTotalItems } = useCart();
  const { categories, allItems } = useMenu();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [filters, setFilters] = useState({
    priceRange: [16000, 50000]
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 2 rows × 4 columns = 8 items per page

  // Add custom styles for range slider
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      input[type="range"]::-webkit-slider-thumb {
        appearance: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #374151;
        cursor: pointer;
        border: 3px solid #ffffff;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        transition: all 0.2s ease;
      }
      
      input[type="range"]::-webkit-slider-thumb:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }
      
      input[type="range"]::-moz-range-thumb {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #374151;
        cursor: pointer;
        border: 3px solid #ffffff;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        transition: all 0.2s ease;
      }
      
      input[type="range"]::-moz-range-thumb:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setNotes("");
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      for (let i = 0; i < quantity; i++) {
        addToCart({ ...selectedItem, notes: notes || undefined });
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

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-center">
          <img 
            src="/logo.png" 
            alt="H₂CO Bar Logo" 
            className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 object-contain"
          />
        </div>
      </div>

      {/* Mobile Search & Filter Bar */}
      <div className="lg:hidden bg-white border-b border-gray-200 sticky top-[88px] z-40">
        <div className="p-3 space-y-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm đồ uống..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 border border-gray-300 focus:border-gray-900 rounded-lg text-sm"
            />
          </div>
          
          {/* Category Filter - Horizontal Scroll */}
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveCategory("all")}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === "all" 
                  ? "bg-gray-900 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tất cả
            </button>
            {categories.map((category) => {
              const Icon = categoryIcons[category.id as keyof typeof categoryIcons] || Coffee;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    activeCategory === category.id 
                      ? "bg-gray-900 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar - Search & Filters - Desktop Only */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="h-screen overflow-y-auto bg-white">
            <div className="p-6 space-y-8">
              {/* Search Box */}
              <div>
                <div className="flex items-center gap-3 text-lg font-bold text-gray-900 mb-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Search className="h-5 w-5 text-gray-700" />
                  </div>
                  Tìm kiếm
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm đồ uống..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-gray-900 rounded-xl bg-gray-50 focus:bg-white transition-all duration-200"
                  />
                </div>
              </div>

              {/* Filters */}
              <div>
                <div className="flex items-center gap-3 text-lg font-bold text-gray-900 mb-6">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <SlidersHorizontal className="h-5 w-5 text-gray-700" />
                  </div>
                  Bộ lọc
                </div>
                <div className="space-y-6">
                  {/* Category Filter */}
                  <div className="space-y-4">
                    <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      Danh mục
                    </Label>
                    <div className="space-y-2">
                      <button
                        onClick={() => setActiveCategory("all")}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          activeCategory === "all" 
                            ? "bg-gray-900 text-white shadow-md" 
                            : "text-gray-700 hover:bg-gray-100 hover:shadow-sm"
                        }`}
                      >
                        Tất cả
                      </button>
                      {categories.map((category) => {
                        const Icon = categoryIcons[category.id as keyof typeof categoryIcons] || Coffee;
                        return (
                          <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
                              activeCategory === category.id 
                                ? "bg-gray-900 text-white shadow-md" 
                                : "text-gray-700 hover:bg-gray-100 hover:shadow-sm"
                            }`}
                          >
                            <div className={`p-1.5 rounded-lg ${activeCategory === category.id ? 'bg-white/20' : 'bg-gray-100'}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            {category.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t border-gray-200"></div>

                  {/* Price Range - Modern Slider */}
                  <div className="space-y-4">
                    <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      Khoảng giá
                    </Label>
                    
                    {/* Price Display */}
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Từ</div>
                        <div className="text-lg font-bold text-gray-900">
                          {filters.priceRange[0].toLocaleString('vi-VN')}đ
                        </div>
                      </div>
                      <div className="w-8 h-0.5 bg-gray-300"></div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Đến</div>
                        <div className="text-lg font-bold text-gray-900">
                          {filters.priceRange[1].toLocaleString('vi-VN')}đ
                        </div>
                      </div>
                    </div>

                    {/* Range Slider */}
                    <div className="relative h-8 flex items-center">
                      {/* Track */}
                      <div className="absolute w-full h-2 bg-gray-200 rounded-full"></div>
                      
                      {/* Active Range */}
                      <div 
                        className="absolute h-2 bg-gray-900 rounded-full"
                        style={{
                          left: `${((filters.priceRange[0] - 16000) / (50000 - 16000)) * 100}%`,
                          width: `${((filters.priceRange[1] - filters.priceRange[0]) / (50000 - 16000)) * 100}%`
                        }}
                      ></div>
                      
                      {/* Min Thumb */}
                      <input
                        type="range"
                        min="16000"
                        max="50000"
                        step="1000"
                        value={filters.priceRange[0]}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          priceRange: [parseInt(e.target.value), prev.priceRange[1]]
                        }))}
                        className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-10"
                        style={{
                          background: 'transparent'
                        }}
                      />
                      
                      {/* Max Thumb */}
                      <input
                        type="range"
                        min="16000"
                        max="50000"
                        step="1000"
                        value={filters.priceRange[1]}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                        }))}
                        className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-20"
                        style={{
                          background: 'transparent'
                        }}
                      />
                    </div>

                    {/* Price Labels */}
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>16.000đ</span>
                      <span>50.000đ</span>
                    </div>

                    {/* Quick Price Buttons */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'Dưới 20k', range: [16000, 20000] },
                        { label: '20k-30k', range: [20000, 30000] },
                        { label: 'Trên 30k', range: [30000, 50000] }
                      ].map((preset, index) => (
                        <button
                          key={index}
                          onClick={() => setFilters(prev => ({
                            ...prev,
                            priceRange: preset.range
                          }))}
                          className={`px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                            filters.priceRange[0] === preset.range[0] && filters.priceRange[1] === preset.range[1]
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200"></div>

                  {/* Reset Filters */}
                  <button
                    onClick={() => setFilters({
                      priceRange: [16000, 50000]
                    })}
                    className="w-full text-center px-4 py-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 font-medium"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <X className="h-4 w-4" />
                      Xóa tất cả bộ lọc
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-2 sm:p-4 lg:p-6">
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">

            {/* Menu Items Grid - Tall Rectangular Design */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-4">
              {currentItems.map((item) => (
                <Card key={item.id} className="group overflow-hidden hover:shadow-lg transition-all duration-200 border border-gray-200 rounded-xl flex flex-col h-full">
                  {/* Image Section */}
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-32 sm:h-36 lg:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/80 text-white px-1.5 py-0.5 rounded-full">
                      <Thermometer className="h-2.5 w-2.5" />
                      <span className="text-xs">{item.temperature === 'nóng' ? 'Nóng' : 'Lạnh'}</span>
                    </div>
                  </div>
                  
                  {/* Content Section - Flexible */}
                  <div className="flex flex-col flex-1 px-4 pt-4">
                    {/* Title */}
                    <CardTitle className="text-base font-semibold group-hover:text-gray-900 transition-colors line-clamp-1 leading-tight mb-2">
                      {item.name}
                    </CardTitle>
                    
                    {/* Description - Flexible space */}
                    <div className="flex-1 mb-4">
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Fixed Bottom Section */}
                  <div className="px-4 pb-4 mt-auto">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-gray-900">
                          {item.price.toLocaleString('vi-VN')}đ
                        </span>
                        <span className="text-sm text-gray-500">Mỗi ly</span>
                      </div>
                      <button 
                        onClick={() => handleViewDetails(item)}
                        className="text-white hover:text-gray-200 transition-colors p-2.5 rounded-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center flex-shrink-0"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {filteredItems.length > 0 && totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 py-6">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Trước
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        currentPage === page
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Sau
                </button>
              </div>
            )}

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Không tìm thấy đồ uống</h3>
                <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
              </div>
            )}
          </div>
        </div>


        {/* Item Details Modal - Beautiful & Complete */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 animate-in fade-in-0 duration-300">
            <div className="bg-white rounded-xl sm:rounded-2xl max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden relative flex flex-col lg:flex-row">
              {/* Left Side - Image */}
              <div className="w-full lg:w-2/5 relative h-48 sm:h-56 lg:h-auto flex-shrink-0">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Temperature Badge */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <div className="bg-white/95 backdrop-blur-sm text-gray-800 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-lg flex items-center gap-1 sm:gap-1.5">
                      <Thermometer className="h-3 w-3 sm:h-4 sm:w-4" />
                      {selectedItem.temperature === 'nóng' ? 'Nóng' : 'Lạnh'}
                    </div>
                  </div>
                </div>

              {/* Right Side - Content */}
              <div className="w-full lg:w-3/5 overflow-y-auto relative flex-1">
                <div className="p-4 sm:p-6 lg:p-8">
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full p-1.5 sm:p-2 shadow-md hover:shadow-lg transition-all duration-200 z-10 border border-gray-200"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>

                  <div className="space-y-3 sm:space-y-4">
                    {/* Header */}
                    <div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-2">
                        {(() => {
                          const category = categories.find(cat => cat.id === selectedItem.category);
                          const Icon = categoryIcons[selectedItem.category as keyof typeof categoryIcons] || Coffee;
                          return (
                            <>
                              <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span>{category?.name}</span>
                            </>
                          );
                        })()}
                      </div>
                      <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">{selectedItem.name}</h1>
                      <div className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                        {selectedItem.price.toLocaleString('vi-VN')}đ
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Mô tả</h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{selectedItem.description}</p>
                    </div>

                    {/* Quick Info - Beautiful Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-2 sm:p-3 border border-purple-200">
                        <div className="text-xs text-purple-600 font-medium mb-1">Phân loại</div>
                        <div className="text-sm font-bold text-purple-800">
                          {selectedItem.temperature === 'nóng' ? 'Nóng' : 'Lạnh'}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-2 sm:p-3 border border-blue-200">
                        <div className="text-xs text-blue-600 font-medium mb-1">Lượt mua</div>
                        <div className="text-sm font-bold text-blue-800">{selectedItem.purchaseCount || 0}</div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-2 sm:p-3 border border-orange-200">
                        <div className="text-xs text-orange-600 font-medium mb-1">Trạng thái</div>
                        <div className="text-sm font-bold text-orange-800">
                          {selectedItem.stockStatus === 'còn hàng' ? 'Còn hàng' : 
                           selectedItem.stockStatus === 'gần hết' ? 'Gần hết' : 'Đã hết'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div className="border-t border-gray-200 pt-3 pb-3 mt-3">
                    <Label className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 block">Ghi chú thêm</Label>
                    <Textarea
                      placeholder="Ghi chú đặc biệt cho món này... (tùy chọn)"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[50px] sm:min-h-[60px] resize-none border border-gray-300 focus:border-gray-500 rounded-lg p-2 sm:p-3 text-xs sm:text-sm"
                    />
                  </div>

                  {/* Order Section - Balanced Design */}
                  <div className="border-t border-gray-200 pt-3 sm:pt-4 pb-3 sm:pb-4">
                    {/* Quantity, Total & Add to Cart - Responsive Layout */}
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      {/* Quantity Selector */}
                      <div className="flex-1 w-full sm:w-auto">
                        <Label className="text-xs font-medium text-gray-600 mb-2 block">Số lượng</Label>
                        <div className="flex items-center gap-2 h-10 sm:h-11">
                          <Button
                            variant="outline"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-10 h-10 sm:w-11 sm:h-11 p-0 rounded-lg border-2 hover:bg-gray-50 text-base font-bold"
                          >
                            -
                          </Button>
                          <div className="flex-1 text-center">
                            <span className="text-lg sm:text-xl font-bold text-gray-900">{quantity}</span>
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-10 h-10 sm:w-11 sm:h-11 p-0 rounded-lg border-2 hover:bg-gray-50 text-base font-bold"
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      {/* Total Price */}
                      <div className="flex-1 w-full sm:w-auto">
                        <Label className="text-xs font-medium text-gray-600 mb-2 block">Tổng cộng</Label>
                        <div className="bg-gray-50 rounded-lg px-3 h-10 sm:h-11 border border-gray-200 flex items-center justify-center">
                          <span className="text-lg sm:text-xl font-bold text-gray-900">{(selectedItem.price * quantity).toLocaleString('vi-VN')}đ</span>
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <div className="flex-shrink-0 w-full sm:w-auto">
                        <Label className="text-xs font-medium text-gray-600 mb-2 block invisible">.</Label>
                        <Button
                          onClick={handleAddToCart}
                          className="w-full sm:w-16 h-10 sm:h-11 p-0 bg-gray-900 hover:bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                        >
                          <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                          <span className="ml-2 sm:hidden">Thêm vào giỏ</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating Cart Button - Circular Design */}
        <div className="fixed bottom-4 right-4 z-40">
          <div className="relative">
            <Button 
              className="group relative bg-gray-900 hover:bg-gray-800 text-white rounded-full w-11 h-11 sm:w-12 sm:h-12 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 p-0 flex items-center justify-center"
              onClick={() => navigate('/checkout')}
            >
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:scale-110" />
            </Button>
            
            {/* Item count badge - positioned outside the button */}
            {getTotalItems() > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold min-w-[16px] h-4 sm:min-w-[18px] sm:h-[18px] flex items-center justify-center rounded-full shadow-lg border-2 border-white">
                {getTotalItems() > 99 ? '99+' : getTotalItems()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
