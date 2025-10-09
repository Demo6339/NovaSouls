import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, ArrowRight, Gift } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary via-primary/90 to-accent">
      <div className="container px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-primary-foreground">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Sẵn sàng trải nghiệm
                <span className="block text-accent-light">
                  Nova Souls?
                </span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-primary-foreground/90 leading-relaxed">
                Đặt món ngay hôm nay và khám phá hương vị cà phê tuyệt vời cùng 
                không gian ấm cúng tại quán chúng tôi.
              </p>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-accent-light" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm sm:text-base">Địa chỉ</div>
                  <div className="text-xs sm:text-sm text-primary-foreground/80 truncate">
                    123 Đường ABC, Quận 1, TP.HCM
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-accent-light" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm sm:text-base">Hotline</div>
                  <div className="text-xs sm:text-sm text-primary-foreground/80">
                    0123 456 789
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-accent-light" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm sm:text-base">Giờ mở cửa</div>
                  <div className="text-xs sm:text-sm text-primary-foreground/80">
                    7:00 - 22:00 hàng ngày
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-accent-light" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm sm:text-base">Ưu đãi</div>
                  <div className="text-xs sm:text-sm text-primary-foreground/80">
                    Giảm 10% lần đầu
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent-light text-accent-foreground shadow-xl hover:shadow-2xl transition-all duration-300 group text-sm sm:text-base"
              >
                <Link to="/menu" className="flex items-center justify-center">
                  Đặt món ngay
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 backdrop-blur-sm text-sm sm:text-base"
              >
                <Link to="/contact">Liên hệ</Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Newsletter */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 bg-accent/20 rounded-xl sm:rounded-2xl flex items-center justify-center">
                    <Mail className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-accent-light" />
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-foreground mb-2">
                    Nhận ưu đãi đặc biệt
                  </h3>
                  <p className="text-primary-foreground/80 text-sm sm:text-base">
                    Đăng ký nhận tin để nhận thông tin về ưu đãi và sản phẩm mới
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      placeholder="Nhập email của bạn"
                      className="bg-white/20 border-white/30 text-primary-foreground placeholder:text-primary-foreground/60 text-sm sm:text-base"
                    />
                    <Button className="bg-accent hover:bg-accent-light text-accent-foreground px-4 sm:px-6 text-sm sm:text-base">
                      Đăng ký
                    </Button>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs sm:text-sm text-primary-foreground/70">
                      Bằng cách đăng ký, bạn đồng ý với{" "}
                      <Link to="/privacy" className="underline hover:text-accent-light">
                        Chính sách bảo mật
                      </Link>{" "}
                      của chúng tôi
                    </p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t border-white/20">
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-primary-foreground/80">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent-light rounded-full flex-shrink-0"></div>
                    <span>Giảm 10% cho đơn hàng đầu tiên</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-primary-foreground/80">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent-light rounded-full flex-shrink-0"></div>
                    <span>Thông báo sớm về sản phẩm mới</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-primary-foreground/80">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent-light rounded-full flex-shrink-0"></div>
                    <span>Ưu đãi đặc biệt cho thành viên</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
