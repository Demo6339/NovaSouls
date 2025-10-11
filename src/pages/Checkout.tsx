import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  CheckCircle, 
  CreditCard, 
  MapPin, 
  Phone,
  User,
  ShoppingCart
} from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, getTotalItems, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
    paymentMethod: "cash"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart after successful order
    clearCart();
    
    setIsProcessing(false);
    setIsCompleted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Đặt hàng thành công!</h2>
              <p className="text-muted-foreground mb-6">
                Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ chuẩn bị và giao hàng sớm nhất có thể.
              </p>
              <div className="space-y-2">
                <Button 
                  onClick={() => navigate('/')} 
                  className="w-full"
                >
                  Quay về menu
                </Button>
                <Button 
                  onClick={() => navigate('/admin')} 
                  variant="outline" 
                  className="w-full"
                >
                  Xem admin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Thanh toán</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Thông tin đặt hàng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Họ và tên *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Nhập họ và tên"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Nhập số điện thoại"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Địa chỉ giao hàng *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Nhập địa chỉ chi tiết"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="note">Ghi chú</Label>
                    <Textarea
                      id="note"
                      value={formData.note}
                      onChange={(e) => handleInputChange('note', e.target.value)}
                      placeholder="Ghi chú thêm cho đơn hàng"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Phương thức thanh toán</Label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === "cash"}
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                          className="text-primary"
                        />
                        <span className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Thanh toán khi nhận hàng
                        </span>
                      </label>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Đang xử lý..." : "Đặt hàng"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Đơn hàng của bạn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.price.toLocaleString('vi-VN')}đ x {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                      </p>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Tạm tính:</span>
                      <span>{getTotalPrice().toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phí giao hàng:</span>
                      <span>Miễn phí</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Tổng cộng:</span>
                      <span className="text-primary">
                        {getTotalPrice().toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
