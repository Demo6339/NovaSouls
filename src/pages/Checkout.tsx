import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CreditCard, Wallet, MapPin, Clock, CheckCircle } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const cartItems = [];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = orderType === "delivery" ? 15000 : 0;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process order
    alert("Đặt hàng thành công!");
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-to-b from-background to-secondary/20">
        <div className="container px-4 max-w-5xl">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-2">Thanh toán</h1>
            <p className="text-muted-foreground">Hoàn tất đơn hàng của bạn</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Forms */}
              <div className="lg:col-span-2 space-y-6">
                {/* Order Type */}
                <Card className="animate-fade-up">
                  <CardHeader>
                    <CardTitle>Hình thức nhận hàng</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={orderType} onValueChange={(value: "delivery" | "pickup") => setOrderType(value)}>
                      <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-secondary/50">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-accent" />
                            <div>
                              <p className="font-medium">Giao hàng tận nơi</p>
                              <p className="text-sm text-muted-foreground">Phí giao hàng: 0đ</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-secondary/50">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-accent" />
                            <div>
                              <p className="font-medium">Nhận tại quán</p>
                              <p className="text-sm text-muted-foreground">Miễn phí</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Customer Info */}
                <Card className="animate-fade-up" style={{ animationDelay: "100ms" }}>
                  <CardHeader>
                    <CardTitle>Thông tin khách hàng</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Họ và tên *</Label>
                        <Input id="name" required placeholder="Họ và tên" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Số điện thoại *</Label>
                        <Input id="phone" type="tel" required placeholder="Số điện thoại" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Email" />
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Address */}
                {orderType === "delivery" && (
                  <Card className="animate-fade-up" style={{ animationDelay: "200ms" }}>
                    <CardHeader>
                      <CardTitle>Địa chỉ giao hàng</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Địa chỉ cụ thể *</Label>
                        <Input id="address" required placeholder="Địa chỉ" />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="ward">Phường/Xã *</Label>
                          <Input id="ward" required placeholder="Phường/Xã" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="district">Quận/Huyện *</Label>
                          <Input id="district" required placeholder="Quận/Huyện" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Ghi chú</Label>
                        <Textarea
                          id="notes"
                          placeholder="Ghi chú cho đơn hàng (không bắt buộc)"
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Payment Method */}
                <Card className="animate-fade-up" style={{ animationDelay: "300ms" }}>
                  <CardHeader>
                    <CardTitle>Phương thức thanh toán</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-secondary/50">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <Wallet className="h-5 w-5 text-accent" />
                            <div>
                              <p className="font-medium">Tiền mặt</p>
                              <p className="text-sm text-muted-foreground">
                                Thanh toán khi nhận hàng
                              </p>
                            </div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-secondary/50 opacity-50">
                        <RadioGroupItem value="card" id="card" disabled />
                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Thẻ tín dụng</p>
                              <p className="text-sm text-muted-foreground">
                                Đang phát triển
                              </p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 animate-fade-in">
                  <CardHeader>
                    <CardTitle>Đơn hàng của bạn</CardTitle>
                    <CardDescription>{cartItems.length} món</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Items List */}
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.name} x{item.quantity}
                          </span>
                          <span className="font-medium">
                            {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Pricing */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tạm tính</span>
                        <span className="font-medium">
                          {subtotal.toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                      {orderType === "delivery" && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Phí giao hàng</span>
                          <span className="font-medium">
                            {shipping.toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Tổng cộng</span>
                      <span className="text-primary">
                        {total.toLocaleString('vi-VN')}đ
                      </span>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-gradient-hero mt-6">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Đặt hàng
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Bằng việc đặt hàng, bạn đồng ý với{" "}
                      <a href="#" className="text-primary hover:underline">
                        điều khoản dịch vụ
                      </a>
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
