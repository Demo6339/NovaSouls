import { Coffee, Facebook, Instagram, Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Footer = () => {
  const [settings, setSettings] = useState({
    footer_description: "Nơi hội tụ những tâm hồn yêu cà phê, nơi mỗi ly cà phê là một câu chuyện, mỗi hương vị là một kỷ niệm đẹp.",
    footer_address: "123 Đường ABC, Quận 1, TP.HCM",
    footer_phone: "0123 456 789",
    footer_email: "info@novasouls.com",
    footer_weekday_hours: "7:00 - 22:00",
    footer_weekend_hours: "8:00 - 23:00",
    footer_delivery_hours: "Giao hàng từ 8:00 - 21:00",
    footer_facebook_url: "https://facebook.com/novasouls",
    footer_instagram_url: "https://instagram.com/novasouls"
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .single();

      if (error) {
        console.error('Error loading settings:', error);
        return;
      }

      if (data) {
        setSettings(prev => ({
          ...prev,
          ...data
        }));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 15c-8.284 0-15 6.716-15 15s6.716 15 15 15 15-6.716 15-15-6.716-15-15-15zm0 3c6.627 0 12 5.373 12 12s-5.373 12-12 12-12-5.373-12-12 5.373-12 12-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} 
        />
        <div className="absolute top-20 right-20 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-rose-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <Coffee className="h-8 w-8 text-amber-400" />
              <span className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Nova Souls
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              {settings.footer_description}
            </p>
            
            {/* Social Media */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-amber-400">Theo dõi chúng tôi</h4>
              <div className="flex gap-3">
                <a
                  href={settings.footer_facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group h-10 w-10 rounded-lg bg-slate-800/50 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-slate-700 hover:border-blue-500"
                >
                  <Facebook className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href={settings.footer_instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group h-10 w-10 rounded-lg bg-slate-800/50 hover:bg-pink-600 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-slate-700 hover:border-pink-500"
                >
                  <Instagram className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href={`mailto:${settings.footer_email}`}
                  className="group h-10 w-10 rounded-lg bg-slate-800/50 hover:bg-emerald-600 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-slate-700 hover:border-emerald-500"
                >
                  <Mail className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-emerald-400" />
              Liên hệ
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm text-slate-300 leading-relaxed">{settings.footer_address}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a href={`tel:${settings.footer_phone}`} className="text-sm text-slate-300 hover:text-blue-400 transition-colors duration-300">
                  {settings.footer_phone}
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <a href={`mailto:${settings.footer_email}`} className="text-sm text-slate-300 hover:text-purple-400 transition-colors duration-300 break-all">
                  {settings.footer_email}
                </a>
              </div>
            </div>
          </div>

          {/* Hours Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-cyan-400" />
              Giờ mở cửa
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Thứ 2 - Thứ 6</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-400">{settings.footer_weekday_hours}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Thứ 7 - CN</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-yellow-400">{settings.footer_weekend_hours}</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-slate-700/50">
                <div className="flex items-center gap-2 mb-1">
                  <Send className="h-4 w-4 text-amber-400" />
                  <span className="text-sm font-semibold text-amber-400">Giao hàng</span>
                </div>
                <div className="text-sm text-slate-300">
                  {settings.footer_delivery_hours}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-700/50">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <Coffee className="h-5 w-5 text-amber-400" />
                <span className="text-lg font-bold text-white">Nova Souls</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-slate-600/50"></div>
              <p className="text-sm text-slate-400 text-center sm:text-left">
                &copy; 2025 Nova Souls. Tất cả quyền được bảo lưu.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-end gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400">
              <a href="#" className="hover:text-amber-400 transition-colors duration-300 hover:scale-105 px-2 py-1 rounded-md hover:bg-slate-800/50">Chính sách bảo mật</a>
              <a href="#" className="hover:text-amber-400 transition-colors duration-300 hover:scale-105 px-2 py-1 rounded-md hover:bg-slate-800/50">Điều khoản sử dụng</a>
              <a href="#" className="hover:text-amber-400 transition-colors duration-300 hover:scale-105 px-2 py-1 rounded-md hover:bg-slate-800/50">Chính sách giao hàng</a>
              <a href="#" className="hover:text-amber-400 transition-colors duration-300 hover:scale-105 px-2 py-1 rounded-md hover:bg-slate-800/50">Hỗ trợ khách hàng</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;