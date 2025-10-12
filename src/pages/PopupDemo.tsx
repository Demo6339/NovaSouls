import { useState } from "react";
import { Button } from "@/components/ui/button";
import OrderPopup from "@/components/OrderPopup";
import { Sparkles, Star, Zap, Shield, Clock } from "lucide-react";

const PopupDemo = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const sampleProduct = {
    name: "Cà phê đen truyền thống",
    price: 25000,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop&crop=center"
  };

  const handleAddToCart = (quantity: number, note: string) => {
    console.log("Added to cart:", { quantity, note });
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng${note ? ` với ghi chú: ${note}` : ""}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-2xl">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            <Sparkles className="h-4 w-4" />
            Thiết kế mới 2024
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Popup Đặt Hàng Chuyên Nghiệp
          </h1>
          <p className="text-gray-600 text-lg max-w-lg mx-auto">
            Trải nghiệm đặt hàng hoàn toàn mới với thiết kế hiện đại, 
            gradient đẹp mắt và micro-interactions mượt mà.
          </p>
        </div>

        {/* Demo Button */}
        <div className="space-y-6">
          <Button
            onClick={() => setIsPopupOpen(true)}
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-4 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
          >
            <Sparkles className="h-6 w-6 mr-3" />
            Khám phá Popup Mới
          </Button>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Gradient Design</h3>
              <p className="text-sm text-gray-600">Màu sắc gradient hiện đại</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Micro-interactions</h3>
              <p className="text-sm text-gray-600">Animations mượt mà</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Glassmorphism</h3>
              <p className="text-sm text-gray-600">Hiệu ứng kính mờ</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Professional</h3>
              <p className="text-sm text-gray-600">Thiết kế chuyên nghiệp</p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-500" />
              <span>Responsive Design</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-500" />
              <span>User Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>Modern UI/UX</span>
            </div>
          </div>
        </div>
      </div>

      <OrderPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        productName={sampleProduct.name}
        productPrice={sampleProduct.price}
        productImage={sampleProduct.image}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default PopupDemo;
