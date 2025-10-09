import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Calendar,
  Palette,
  Users,
  History,
  Coffee,
} from "lucide-react";

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

  return (
    <div className="w-64 bg-card border-r border-border min-h-screen p-6">
      <Link to="/" className="flex items-center gap-2 mb-8">
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
  );
};

export default AdminSidebar;
