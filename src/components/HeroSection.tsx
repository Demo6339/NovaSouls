import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Award, Coffee, Star, Users, Clock, Heart, MapPin, Phone } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Nova Souls Cafe Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Main Content */}
      <div className="container relative z-10 px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center min-h-[80vh] py-16 sm:py-20 lg:py-24">
            
            {/* Left Content */}
            <div className="space-y-8 lg:space-y-10 animate-fade-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 bg-accent/20 backdrop-blur-md border border-accent/40 rounded-full px-6 py-3 text-accent text-sm font-semibold shadow-lg">
                <Award className="h-5 w-5" />
                <span>Specialty Coffee & Artisan Bakery</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1]">
                  Chào mừng đến với
                  <span className="block bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent mt-2">
                    Nova Souls
                  </span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl">
                  Khám phá hương vị độc đáo của cà phê specialty được pha chế tận tâm, 
                  kết hợp với bánh ngọt artisan trong không gian ấm cúng và hiện đại.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 lg:gap-8 py-6 lg:py-8">
                <div className="text-center group">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">2,500+</div>
                  <div className="text-sm sm:text-base text-white/80 font-medium">Khách hàng hài lòng</div>
                </div>
                <div className="text-center group">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">80+</div>
                  <div className="text-sm sm:text-base text-white/80 font-medium">Món đặc sản</div>
                </div>
                <div className="text-center group">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">4.9</div>
                  <div className="text-sm sm:text-base text-white/80 font-medium">Đánh giá trung bình</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent text-white shadow-2xl hover:shadow-accent/25 transition-all duration-300 group text-base sm:text-lg px-8 py-6 rounded-2xl"
                >
                  <Link to="/menu" className="flex items-center justify-center">
                    Xem thực đơn
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-md group text-base sm:text-lg px-8 py-6 rounded-2xl"
                >
                  <Link to="/events" className="flex items-center justify-center">
                    <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Sự kiện
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Content - Feature Cards */}
            <div className="space-y-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-6 hover:bg-white/20 hover:scale-105 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent/25 to-accent/35 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Coffee className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg mb-1">Cà phê tươi</div>
                      <div className="text-white/80 text-sm">Pha chế hàng ngày</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-6 hover:bg-white/20 hover:scale-105 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent/25 to-accent/35 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Star className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg mb-1">Chất lượng cao</div>
                      <div className="text-white/80 text-sm">Nguyên liệu premium</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-6 hover:bg-white/20 hover:scale-105 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent/25 to-accent/35 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Users className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg mb-1">Không gian ấm cúng</div>
                      <div className="text-white/80 text-sm">Thoải mái, thân thiện</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-6 hover:bg-white/20 hover:scale-105 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent/25 to-accent/35 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Award className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg mb-1">Dịch vụ tốt</div>
                      <div className="text-white/80 text-sm">Chuyên nghiệp</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-r from-accent/15 to-primary/15 backdrop-blur-md border border-accent/30 rounded-2xl p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-accent/25 rounded-xl flex items-center justify-center">
                        <Clock className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Mở cửa 7:00 - 22:00</div>
                        <div className="text-white/80 text-sm">Hàng ngày</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-accent" />
                      <span className="text-white font-semibold">Yêu thích</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 pt-2 border-t border-white/20">
                    <MapPin className="h-5 w-5 text-accent" />
                    <span className="text-white/90 text-sm">123 Đường Nguyễn Huệ, Quận 1, TP.HCM</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-accent" />
                    <span className="text-white/90 text-sm">(028) 1234 5678</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;