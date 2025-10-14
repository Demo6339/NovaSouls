import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useOrders } from "@/contexts/OrderContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  CheckCircle, 
  CreditCard, 
  MapPin, 
  Phone,
  User,
  ShoppingCart,
  Clock,
  Shield,
  Truck,
  CheckCircle2,
  AlertCircle,
  Trash2
} from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, getTotalItems, clearCart, removeFromCart } = useCart();
  const { addOrder } = useOrders();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: {
      street: "",
      ward: "",
      district: "",
      city: "TP.HCM",
      fullAddress: ""
    },
    orderType: "delivery",
    note: "",
    paymentMethod: "cash",
    discountCode: ""
  });
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Auto-save form data to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('checkoutFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('checkoutFormData', JSON.stringify(formData));
  }, [formData]);

  // Mock discount codes
  const discountCodes = {
    'WELCOME10': { type: 'percentage', value: 10, description: 'Giảm 10% cho khách hàng mới' },
    'SAVE20': { type: 'percentage', value: 20, description: 'Giảm 20% cho đơn hàng trên 500k' },
    'FREESHIP': { type: 'fixed', value: 30000, description: 'Miễn phí ship' },
    'VIP50': { type: 'percentage', value: 50, description: 'Giảm 50% cho khách VIP' }
  };

  // Validation functions
  const validateField = (field: string, value: string) => {
    const errors: Record<string, string> = {};
    
    switch (field) {
      case 'name':
        if (!value.trim()) errors.name = 'Họ tên không được để trống';
        else if (value.trim().length < 2) errors.name = 'Họ tên phải có ít nhất 2 ký tự';
        break;
      case 'phone':
        if (!value.trim()) errors.phone = 'Số điện thoại không được để trống';
        else if (!/^[0-9]{10,11}$/.test(value.replace(/\s/g, ''))) {
          errors.phone = 'Số điện thoại không hợp lệ';
        }
        break;
      case 'email':
        if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          errors.email = 'Email không hợp lệ';
        }
        break;
      case 'street':
        if (formData.orderType === 'delivery' && !value.trim()) {
          errors.street = 'Địa chỉ không được để trống';
        }
        break;
    }
    
    setFormErrors(prev => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  const validateAllFields = () => {
    const isNameValid = validateField('name', formData.name);
    const isPhoneValid = validateField('phone', formData.phone);
    const isEmailValid = validateField('email', formData.email);
    const isAddressValid = formData.orderType === 'delivery' ? validateField('street', formData.address.street) : true;
    
    return isNameValid && isPhoneValid && isEmailValid && isAddressValid;
  };

  // Apply discount code
  const applyDiscountCode = () => {
    const code = formData.discountCode.toUpperCase().trim();
    setDiscountError("");
    
    if (!code) {
      setDiscountError("Vui lòng nhập mã giảm giá");
      return;
    }
    
    if (discountCodes[code as keyof typeof discountCodes]) {
      const discount = discountCodes[code as keyof typeof discountCodes];
      const totalPrice = getTotalPrice();
      
      let discountValue = 0;
      if (discount.type === 'percentage') {
        discountValue = (totalPrice * discount.value) / 100;
      } else {
        discountValue = Math.min(discount.value, totalPrice);
      }
      
      setDiscountAmount(discountValue);
      setDiscountApplied(true);
      setDiscountError("");
    } else {
      setDiscountError("Mã giảm giá không hợp lệ");
      setDiscountApplied(false);
      setDiscountAmount(0);
    }
  };

  // Remove discount code
  const removeDiscountCode = () => {
    setDiscountApplied(false);
    setDiscountAmount(0);
    setDiscountError("");
    setFormData(prev => ({ ...prev, discountCode: "" }));
  };


  const handleConfirmOrder = async () => {
    setShowConfirmation(false);
    setIsProcessing(true);
    
    // Simulate API call with progress
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Create order in the system
    const orderData = {
      customerInfo: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        address: formData.orderType === 'delivery' ? {
          street: formData.address.street,
          ward: formData.address.ward,
          district: formData.address.district,
          city: formData.address.city,
          fullAddress: `${formData.address.street}, ${formData.address.ward}, ${formData.address.district}, ${formData.address.city}`
        } : undefined
      },
      orderDetails: {
        orderTime: new Date().toISOString(),
        orderType: formData.orderType as 'delivery' | 'pickup' | 'dine-in',
        paymentMethod: formData.paymentMethod as 'cash' | 'card' | 'momo' | 'zalo',
        paymentStatus: 'pending' as 'pending' | 'paid' | 'failed',
        deliveryFee: formData.orderType === 'delivery' ? 15000 : 0,
        serviceFee: 5000,
        discount: discountAmount,
        subtotal: getTotalPrice(),
        totalAmount: getTotalPrice() - discountAmount,
        estimatedTime: 20
      },
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        notes: item.notes || undefined
      })),
      orderNotes: formData.note || undefined
    };
    
    const orderId = addOrder(orderData);
    console.log('Order created with ID:', orderId);
    
    // Clear cart and form data after successful order
    clearCart();
    localStorage.removeItem('checkoutFormData');
    
    setIsProcessing(false);
    setIsCompleted(true);
  };

  const handleCancelOrder = () => {
    setShowConfirmation(false);
  };

  const handleInputChange = (field: string, value: string | number) => {
    if (field === 'address') {
      setFormData(prev => ({
        ...prev,
        address: value
      }));
    } else if (field === 'orderType') {
      setFormData(prev => ({
        ...prev,
        orderType: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      // Step 1: Cart review - no validation needed
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Step 2: Discount & notes - no validation needed
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Step 3: Customer info - validate required fields
      if (validateField('name', formData.name) && validateField('phone', formData.phone)) {
        setCurrentStep(4);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = [
    { id: 1, title: 'Kiểm tra giỏ hàng', icon: ShoppingCart },
    { id: 2, title: 'Mã giảm giá & Ghi chú', icon: CreditCard },
    { id: 3, title: 'Thông tin đơn hàng', icon: User },
    { id: 4, title: 'Tổng kết', icon: CheckCircle }
  ];

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg border border-gray-200">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping"></div>
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto relative z-10" />
              </div>
              <h2 className="text-3xl font-bold mb-3 text-gray-900">Đặt hàng thành công!</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Cảm ơn bạn đã tin tưởng NovaSouls. Chúng tôi sẽ chuẩn bị và giao hàng sớm nhất có thể.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-gray-700 mb-2">
                  <Clock className="h-5 w-5" />
                  <span className="font-semibold">Thời gian giao hàng dự kiến: 30-45 phút</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Truck className="h-4 w-4" />
                  <span className="text-sm">Miễn phí giao hàng trong bán kính 5km</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={() => navigate('/')} 
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  Quay về menu
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border border-gray-200">
            <CardHeader className="bg-gray-50">
              <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                <AlertCircle className="h-6 w-6 text-gray-600" />
                Xác nhận đơn hàng
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-gray-700">
                  Bạn có chắc chắn muốn đặt hàng với thông tin sau không?
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Họ tên:</span>
                    <span className="text-gray-900">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Số điện thoại:</span>
                    <span className="text-gray-900">{formData.phone}</span>
                  </div>
                  {formData.email && (
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Email:</span>
                      <span className="text-gray-900">{formData.email}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Loại đơn hàng:</span>
                    <span className="text-gray-900">
                      {formData.orderType === 'delivery' ? 'Giao hàng' : 
                       formData.orderType === 'pickup' ? 'Mang về' : 'Tại quán'}
                    </span>
                  </div>
                  {formData.orderType === 'delivery' && formData.address.street && (
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Địa chỉ:</span>
                      <span className="text-right max-w-48 truncate text-gray-900">{formData.address.fullAddress}</span>
                    </div>
                  )}
                  {discountApplied && (
                    <div className="flex justify-between text-green-600">
                      <span className="font-semibold">Mã giảm giá:</span>
                      <span>{formData.discountCode} (-{discountAmount.toLocaleString('vi-VN')}đ)</span>
                    </div>
                  )}
                  {formData.note && (
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Ghi chú:</span>
                      <span className="text-right max-w-48 truncate text-gray-900">{formData.note}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Tổng cộng:</span>
                    <span>{(getTotalPrice() - discountAmount).toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleCancelOrder}
                    variant="outline"
                    className="flex-1 border-gray-300 hover:bg-gray-50"
                  >
                    Hủy
                  </Button>
                  <Button
                    onClick={handleConfirmOrder}
                    className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
                  >
                    Xác nhận đặt hàng
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">
                Thanh toán
              </h1>
            </div>
            <Badge variant="secondary" className="px-3 py-1 bg-gray-100 text-gray-700">
              {getTotalItems()} sản phẩm
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center flex-1 relative">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300
                    ${isCompleted 
                      ? 'bg-gray-900 text-white' 
                      : isActive 
                        ? 'bg-gray-900 text-white shadow-lg scale-110' 
                        : 'bg-gray-200 text-gray-500'
                    }
                  `}>
                    {isCompleted ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      <Icon className="h-6 w-6" />
                    )}
                  </div>
                  <span className={`text-sm font-medium text-center ${
                    isActive ? 'text-gray-900' : isCompleted ? 'text-gray-700' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`absolute top-6 left-1/2 w-full h-0.5 -z-10 ${
                      isCompleted ? 'bg-gray-900' : 'bg-gray-200'
                    }`} style={{ width: 'calc(100% - 3rem)', marginLeft: '1.5rem' }} />
                  )}
                </div>
              );
            })}
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="h-2 bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-200">
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                  {currentStep === 1 && <><ShoppingCart className="h-6 w-6 text-gray-600" />Kiểm tra giỏ hàng</>}
                  {currentStep === 2 && <><CreditCard className="h-6 w-6 text-gray-600" />Mã giảm giá & Ghi chú</>}
                  {currentStep === 3 && <><User className="h-6 w-6 text-gray-600" />Thông tin đơn hàng</>}
                  {currentStep === 4 && <><CheckCircle className="h-6 w-6 text-gray-600" />Tổng kết đơn hàng</>}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Step 1: Cart Review */}
                  {currentStep === 1 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Các món trong giỏ hàng</h3>
                        <div className="space-y-3">
                          {cart.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                <div className="flex items-center gap-4 mt-2">
                                  <span className="text-sm text-gray-500">Số lượng: {item.quantity}</span>
                                  <span className="font-semibold text-gray-900">
                                    {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                                  </span>
                                </div>
                                {item.notes && (
                                  <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                                    <p className="text-xs text-blue-700 font-medium">Ghi chú:</p>
                                    <p className="text-sm text-blue-800">{item.notes}</p>
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                title="Xóa món này"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                          <div className="flex justify-between text-lg font-bold">
                            <span>Tổng cộng:</span>
                            <span className="text-gray-900">{getTotalPrice().toLocaleString('vi-VN')}đ</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Discount & Notes */}
                  {currentStep === 2 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                      {/* Discount Code Section */}
                      <div className="space-y-4">
                        <Label className="text-sm font-semibold text-gray-700">
                          Mã giảm giá <span className="text-gray-400">(tùy chọn)</span>
                        </Label>
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <Input
                              value={formData.discountCode}
                              onChange={(e) => handleInputChange('discountCode', e.target.value)}
                              placeholder="Nhập mã giảm giá (tùy chọn)"
                              className={`flex-1 border-gray-300 focus:border-gray-900 ${discountError && !discountApplied ? 'border-red-500 focus:border-red-500' : ''}`}
                              disabled={discountApplied}
                            />
                            {!discountApplied ? (
                              <Button
                                type="button"
                                onClick={applyDiscountCode}
                                className="px-6 bg-gray-900 hover:bg-gray-800 text-white"
                              >
                                Áp dụng
                              </Button>
                            ) : (
                              <Button
                                type="button"
                                onClick={removeDiscountCode}
                                variant="outline"
                                className="px-6 text-red-600 border-red-300 hover:bg-red-50"
                              >
                                Hủy
                              </Button>
                            )}
                          </div>
                          
                          {discountError && (
                            <div className="flex items-center gap-1 text-red-500 text-sm">
                              <AlertCircle className="h-4 w-4" />
                              <span>{discountError}</span>
                            </div>
                          )}
                          
                          {discountApplied && (
                            <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-lg">
                              <CheckCircle className="h-4 w-4" />
                              <span>Đã áp dụng mã giảm giá: {formData.discountCode}</span>
                              <span className="font-semibold">-{discountAmount.toLocaleString('vi-VN')}đ</span>
                            </div>
                          )}
                          
                        </div>
                      </div>

                      {/* Ghi chú */}
                      <div className="space-y-2">
                        <Label htmlFor="note" className="text-sm font-semibold text-gray-700">
                          Ghi chú thêm
                        </Label>
                        <Textarea
                          id="note"
                          value={formData.note}
                          onChange={(e) => handleInputChange('note', e.target.value)}
                          placeholder="Ghi chú thêm cho đơn hàng (tùy chọn)"
                          rows={3}
                          className="border-gray-300 focus:border-gray-900"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Customer Info */}
                  {currentStep === 3 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                            Họ và tên *
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Nhập họ và tên đầy đủ"
                            className={`border-gray-300 focus:border-gray-900 ${formErrors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                            required
                          />
                          {formErrors.name && (
                            <div className="flex items-center gap-1 text-red-500 text-sm">
                              <AlertCircle className="h-4 w-4" />
                              <span>{formErrors.name}</span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                            Số điện thoại *
                          </Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="Nhập số điện thoại"
                            className={`border-gray-300 focus:border-gray-900 ${formErrors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
                            required
                          />
                          {formErrors.phone && (
                            <div className="flex items-center gap-1 text-red-500 text-sm">
                              <AlertCircle className="h-4 w-4" />
                              <span>{formErrors.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                          Email <span className="text-gray-400">(tùy chọn)</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Nhập email (tùy chọn)"
                          className={`border-gray-300 focus:border-gray-900 ${formErrors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                        />
                        {formErrors.email && (
                          <div className="flex items-center gap-1 text-red-500 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            <span>{formErrors.email}</span>
                          </div>
                        )}
                      </div>

                      {/* Order Type */}
                      <div className="space-y-4">
                        <Label className="text-sm font-semibold text-gray-700">Loại đơn hàng</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-200 border-gray-200 bg-gray-50">
                            <input
                              type="radio"
                              name="orderType"
                              value="delivery"
                              checked={formData.orderType === "delivery"}
                              onChange={(e) => handleInputChange('orderType', e.target.value)}
                              className="text-gray-900 mr-3"
                            />
                            <div className="flex items-center gap-3">
                              <Truck className="h-6 w-6 text-gray-600" />
                              <div>
                                <div className="font-semibold text-gray-900">Giao hàng</div>
                                <div className="text-sm text-gray-600">Giao tận nơi</div>
                              </div>
                            </div>
                          </label>
                          <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-200 border-gray-200 bg-gray-50">
                            <input
                              type="radio"
                              name="orderType"
                              value="pickup"
                              checked={formData.orderType === "pickup"}
                              onChange={(e) => handleInputChange('orderType', e.target.value)}
                              className="text-gray-900 mr-3"
                            />
                            <div className="flex items-center gap-3">
                              <ShoppingCart className="h-6 w-6 text-gray-600" />
                              <div>
                                <div className="font-semibold text-gray-900">Mang về</div>
                                <div className="text-sm text-gray-600">Tự lấy tại quán</div>
                              </div>
                            </div>
                          </label>
                          <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-200 border-gray-200 bg-gray-50">
                            <input
                              type="radio"
                              name="orderType"
                              value="dine-in"
                              checked={formData.orderType === "dine-in"}
                              onChange={(e) => handleInputChange('orderType', e.target.value)}
                              className="text-gray-900 mr-3"
                            />
                            <div className="flex items-center gap-3">
                              <MapPin className="h-6 w-6 text-gray-600" />
                              <div>
                                <div className="font-semibold text-gray-900">Tại quán</div>
                                <div className="text-sm text-gray-600">Ăn tại chỗ</div>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Address for delivery */}
                      {formData.orderType === 'delivery' && (
                        <div className="space-y-4">
                          <Label className="text-sm font-semibold text-gray-700">Địa chỉ giao hàng *</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Input
                                value={formData.address.street}
                                onChange={(e) => handleInputChange('address', { ...formData.address, street: e.target.value })}
                                placeholder="Số nhà, tên đường"
                                className={`border-gray-300 focus:border-gray-900 ${formErrors.street ? 'border-red-500 focus:border-red-500' : ''}`}
                                required
                              />
                              {formErrors.street && (
                                <div className="flex items-center gap-1 text-red-500 text-sm">
                                  <AlertCircle className="h-4 w-4" />
                                  <span>{formErrors.street}</span>
                                </div>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Input
                                value={formData.address.ward}
                                onChange={(e) => handleInputChange('address', { ...formData.address, ward: e.target.value })}
                                placeholder="Phường/Xã"
                                className="border-gray-300 focus:border-gray-900"
                              />
                            </div>
                            <div className="space-y-2">
                              <Input
                                value={formData.address.district}
                                onChange={(e) => handleInputChange('address', { ...formData.address, district: e.target.value })}
                                placeholder="Quận/Huyện"
                                className="border-gray-300 focus:border-gray-900"
                              />
                            </div>
                            <div className="space-y-2">
                              <Input
                                value={formData.address.city}
                                onChange={(e) => handleInputChange('address', { ...formData.address, city: e.target.value })}
                                placeholder="Thành phố"
                                className="border-gray-300 focus:border-gray-900"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Payment Method */}
                      <div className="space-y-4">
                        <Label className="text-sm font-semibold text-gray-700">Phương thức thanh toán</Label>
                        <div className="space-y-3">
                          <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-200 border-gray-200 bg-gray-50">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="cash"
                              checked={formData.paymentMethod === "cash"}
                              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                              className="text-gray-900 mr-3"
                            />
                            <div className="flex items-center gap-3">
                              <CreditCard className="h-6 w-6 text-gray-600" />
                              <div>
                                <div className="font-semibold text-gray-900">Thanh toán khi nhận hàng</div>
                                <div className="text-sm text-gray-600">COD - Trả tiền mặt khi giao hàng</div>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Order Summary */}
                  {currentStep === 4 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Tổng kết đơn hàng</h3>
                        
                        {/* Order Items */}
                        <div className="space-y-3">
                          {cart.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                                {item.notes && (
                                  <div className="mt-1 p-2 bg-blue-50 rounded border border-blue-200">
                                    <p className="text-xs text-blue-700 font-medium">Ghi chú:</p>
                                    <p className="text-xs text-blue-800">{item.notes}</p>
                                  </div>
                                )}
                              </div>
                              <span className="font-semibold text-gray-900">
                                {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Details */}
                        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Họ tên:</span>
                            <span className="font-semibold text-gray-900">{formData.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Số điện thoại:</span>
                            <span className="font-semibold text-gray-900">{formData.phone}</span>
                          </div>
                          {formData.email && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Email:</span>
                              <span className="font-semibold text-gray-900">{formData.email}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-gray-600">Loại đơn hàng:</span>
                            <span className="font-semibold text-gray-900">
                              {formData.orderType === 'delivery' ? 'Giao hàng' : 
                               formData.orderType === 'pickup' ? 'Mang về' : 'Tại quán'}
                            </span>
                          </div>
                          {formData.orderType === 'delivery' && formData.address.street && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Địa chỉ:</span>
                              <span className="font-semibold text-gray-900 text-right max-w-48 truncate">{formData.address.fullAddress}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-gray-600">Phương thức thanh toán:</span>
                            <span className="font-semibold text-gray-900">Thanh toán khi nhận hàng</span>
                          </div>
                          {formData.note && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Ghi chú:</span>
                              <span className="font-semibold text-gray-900 text-right max-w-48 truncate">{formData.note}</span>
                            </div>
                          )}
                          {discountApplied && (
                            <div className="flex justify-between text-green-600">
                              <span>Giảm giá ({formData.discountCode}):</span>
                              <span className="font-semibold">-{discountAmount.toLocaleString('vi-VN')}đ</span>
                            </div>
                          )}
                        </div>

                        {/* Total */}
                        <div className="bg-gray-100 p-4 rounded-lg">
                          <div className="flex justify-between text-xl font-bold">
                            <span>Tổng cộng:</span>
                            <span className="text-gray-900">
                              {(getTotalPrice() - discountAmount).toLocaleString('vi-VN')}đ
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="px-6 border-gray-300 hover:bg-gray-50"
                    >
                      Quay lại
                    </Button>
                    
                    {currentStep < 4 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="px-8 bg-gray-900 hover:bg-gray-800 text-white"
                      >
                        Tiếp theo
                      </Button>
                    ) : (
                      <Button 
                        type="button"
                        onClick={() => {
                          if (validateAllFields()) {
                            setShowConfirmation(true);
                          }
                        }}
                        className="px-8 bg-gray-900 hover:bg-gray-800 text-white"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Đang xử lý...
                          </div>
                        ) : (
                          'Xác nhận đặt hàng'
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border border-gray-200 sticky top-24">
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <ShoppingCart className="h-5 w-5 text-gray-600" />
                  Đơn hàng của bạn
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-600">
                          {item.price.toLocaleString('vi-VN')}đ x {item.quantity}
                        </p>
                        {item.notes && (
                          <div className="mt-1 p-1.5 bg-blue-50 rounded border border-blue-200">
                            <p className="text-xs text-blue-700 font-medium">Ghi chú:</p>
                            <p className="text-xs text-blue-800 line-clamp-2">{item.notes}</p>
                          </div>
                        )}
                      </div>
                      <p className="font-bold text-sm text-gray-900">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                      </p>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tạm tính:</span>
                      <span className="text-gray-900">{getTotalPrice().toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Phí giao hàng:</span>
                      <span>Miễn phí</span>
                    </div>
                    {discountApplied && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Giảm giá ({formData.discountCode}):</span>
                        <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Tổng cộng:</span>
                      <span className="text-gray-900">
                        {(getTotalPrice() - discountAmount).toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="pt-4 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Shield className="h-4 w-4 text-gray-500" />
                      <span>Bảo mật thông tin</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Truck className="h-4 w-4 text-gray-500" />
                      <span>Giao hàng nhanh 30-45 phút</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Checkout;
