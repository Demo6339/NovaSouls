import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { 
  ShoppingCart, 
  Minus, 
  Plus, 
  X, 
  Sparkles,
  Star,
  Clock,
  Shield,
  Zap
} from "lucide-react";

interface OrderPopupProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  productName: string;
  productPrice: number;
  productImage: string;
}

const OrderPopup = ({
  isOpen,
  onClose,
  productId,
  productName,
  productPrice,
  productImage
}: OrderPopupProps) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 200);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      notes: note || undefined
    });
    onClose();
  };

  const totalPrice = productPrice * quantity;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900/60 via-purple-900/40 to-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300">
        {/* Header with Gradient */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Đặt hàng</h2>
                <p className="text-white/80 text-sm">Thêm vào giỏ hàng của bạn</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Product Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-white rounded-2xl p-4 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={productImage}
                    alt={productName}
                    className="w-20 h-20 object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    HOT
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">{productName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(4.9)</span>
                  </div>
                  <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mt-2">
                    {productPrice.toLocaleString('vi-VN')}₫
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Quantity Control */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-500" />
                Số lượng
              </Label>
              <div className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-1 shadow-inner">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="h-12 w-12 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200"
                >
                  <Minus className="h-5 w-5 text-gray-600" />
                </Button>
                <div className="flex-1 mx-2">
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className={`h-12 text-center font-bold text-xl border-0 bg-transparent focus:ring-0 transition-all duration-200 ${
                      isAnimating ? 'scale-110 text-indigo-600' : ''
                    }`}
                    min="1"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="h-12 w-12 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200"
                >
                  <Plus className="h-5 w-5 text-gray-600" />
                </Button>
              </div>
            </div>

            {/* Total Display */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Zap className="h-4 w-4 text-green-500" />
                Tổng cộng
              </Label>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold">
                    {totalPrice.toLocaleString('vi-VN')}₫
                  </div>
                  <div className="text-green-100 text-sm mt-1">
                    {quantity} sản phẩm
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Shield className="h-4 w-4 text-purple-500" />
                Thao tác
              </Label>
              <Button
                onClick={handleAddToCart}
                className="h-12 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="h-5 w-5 mr-2" />
                Thêm vào giỏ
              </Button>
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              Ghi chú đặc biệt
            </Label>
            <div className="relative">
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ghi chú đặc biệt cho món này... (tùy chọn)"
                className="min-h-[100px] border-2 border-gray-200 focus:border-indigo-500 focus:ring-0 rounded-2xl resize-none w-full transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
                maxLength={200}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded-full">
                {note.length}/200
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3 pt-4">
            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <Shield className="h-6 w-6 text-blue-600 mx-auto mb-1" />
              <div className="text-xs font-semibold text-blue-800">Bảo mật</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <Clock className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <div className="text-xs font-semibold text-green-800">Nhanh chóng</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <Star className="h-6 w-6 text-purple-600 mx-auto mb-1" />
              <div className="text-xs font-semibold text-purple-800">Chất lượng</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-xl font-semibold transition-all duration-200"
            >
              Hủy bỏ
            </Button>
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Xác nhận đặt hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;
