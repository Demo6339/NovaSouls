import { Coffee, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground">
      <div className="container px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                <Coffee className="h-6 w-6 text-accent" />
              </div>
              <span className="text-2xl font-bold">Nova Souls</span>
            </div>
            <p className="text-sm text-primary-foreground/90 leading-relaxed max-w-sm">
              Nơi hội tụ những tâm hồn yêu cà phê, mang đến trải nghiệm đặc biệt cho mỗi khách hàng với specialty coffee và artisan bakery.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/novasouls"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary-foreground/10 hover:bg-accent/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/novasouls"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary-foreground/10 hover:bg-accent/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-primary-foreground">Liên kết nhanh</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li>
                <Link to="/menu" className="hover:text-accent transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent rounded-full"></span>
                  Thực đơn
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-accent transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent rounded-full"></span>
                  Sự kiện
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent rounded-full"></span>
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent rounded-full"></span>
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-primary-foreground">Thông tin liên hệ</h3>
            <ul className="space-y-4 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-accent" />
                <span>123 Đường Nguyễn Huệ, Quận 1, TP.HCM</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-accent" />
                <span>(028) 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-accent" />
                <span>hello@novasouls.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-primary-foreground">Giờ mở cửa</h3>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex justify-between">
                <span>Thứ 2 - Thứ 6:</span>
                <span className="text-accent font-semibold">7:00 - 22:00</span>
              </div>
              <div className="flex justify-between">
                <span>Thứ 7 - CN:</span>
                <span className="text-accent font-semibold">8:00 - 23:00</span>
              </div>
              <div className="pt-2 border-t border-primary-foreground/20">
                <p className="text-xs text-primary-foreground/60">
                  *Giao hàng tận nơi từ 8:00 - 21:00
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/70">
              &copy; 2025 Nova Souls. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex gap-6 text-xs text-primary-foreground/70">
              <a href="#" className="hover:text-accent transition-colors">Chính sách bảo mật</a>
              <a href="#" className="hover:text-accent transition-colors">Điều khoản sử dụng</a>
              <a href="#" className="hover:text-accent transition-colors">Chính sách giao hàng</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
