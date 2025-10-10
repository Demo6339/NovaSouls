import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  Calendar,
  Palette,
  Users,
  History,
  Coffee,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { icon: LayoutDashboard, label: "Tổng quan", path: "/admin" },
  { icon: Package, label: "Sản phẩm", path: "/admin/products" },
  { icon: Calendar, label: "Sự kiện", path: "/admin/events" },
  { icon: Palette, label: "Giao diện", path: "/admin/appearance" },
  { icon: Users, label: "Tài khoản", path: "/admin/accounts" },
  { icon: History, label: "Lịch sử", path: "/admin/history" },
];

const AdminSidebar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm border"
        onClick={toggleMobileMenu}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "w-64 bg-card border-r border-border min-h-screen p-6 transition-transform duration-300",
        "lg:translate-x-0 lg:static lg:z-auto",
        isMobileMenuOpen 
          ? "fixed top-0 left-0 z-50 translate-x-0" 
          : "fixed top-0 left-0 z-50 -translate-x-full"
      )}>
        {/* Mobile Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden absolute top-4 right-4"
          onClick={closeMobileMenu}
        >
          <X className="h-5 w-5" />
        </Button>

        <Link to="/" className="flex items-center gap-2 mb-8" onClick={closeMobileMenu}>
          <Coffee className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">Nova Souls</span>
        </Link>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-gradient-hero text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;
