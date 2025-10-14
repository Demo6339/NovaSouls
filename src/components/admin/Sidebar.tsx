import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import {
  LayoutDashboard,
  Package,
  Calendar,
  History,
  Coffee,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Utensils,
  Warehouse,
  ChefHat,
  PlusCircle,
  Activity,
  Tag,
  Settings,
  ShoppingCart,
  CheckCircle,
  CheckCircle2,
  Clock,
  XCircle,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";

const menuItems = [
  { icon: LayoutDashboard, label: "Tổng quan", path: "/admin", section: "overview" },
  { 
    icon: ShoppingCart, 
    label: "Đơn hàng", 
    path: "/admin/orders",
    subItems: [
      { icon: CheckCircle, label: "Xác nhận", path: "/admin/orders/confirmed" },
      { icon: Clock, label: "Đang làm", path: "/admin/orders/in-progress" },
      { icon: CheckCircle2, label: "Hoàn thành", path: "/admin/orders/completed" },
      { icon: XCircle, label: "Bị hủy", path: "/admin/orders/cancelled" },
    ]
  },
  { 
    icon: Package, 
    label: "Sản phẩm", 
    path: "/admin/products",
    subItems: [
      { icon: Utensils, label: "Món chính", path: "/admin/products/menu" },
      { icon: PlusCircle, label: "Món thêm", path: "/admin/products/addons" },
      { icon: ChefHat, label: "Công thức", path: "/admin/products/recipes" },
      { icon: Warehouse, label: "Kho hàng", path: "/admin/products/inventory" },
    ]
  },
  { 
    icon: Calendar, 
    label: "Sự kiện", 
    path: "/admin/events",
    subItems: [
      { icon: Activity, label: "Hoạt động", path: "/admin/events/activities" },
      { icon: Tag, label: "Mã giảm giá", path: "/admin/events/promocodes" },
    ]
  },
  { 
    icon: History, 
    label: "Lịch sử", 
    path: "/admin/history",
    subItems: [
      { icon: Clock, label: "Đơn hàng", path: "/admin/history/orders" },
      { icon: Settings, label: "Hệ thống", path: "/admin/history/system" },
    ]
  },
];

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAdminAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Auto-expand menus if on any sub-pages
  useEffect(() => {
    if (location.pathname.startsWith('/admin/products')) {
      setExpandedItems(prev => 
        prev.includes('/admin/products') ? prev : [...prev, '/admin/products']
      );
    }
    if (location.pathname.startsWith('/admin/orders')) {
      setExpandedItems(prev => 
        prev.includes('/admin/orders') ? prev : [...prev, '/admin/orders']
      );
    }
    if (location.pathname.startsWith('/admin/events')) {
      setExpandedItems(prev => 
        prev.includes('/admin/events') ? prev : [...prev, '/admin/events']
      );
    }
    if (location.pathname.startsWith('/admin/history')) {
      setExpandedItems(prev => 
        prev.includes('/admin/history') ? prev : [...prev, '/admin/history']
      );
    }
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleExpanded = (path: string) => {
    setExpandedItems(prev => 
      prev.includes(path) 
        ? prev.filter(item => item !== path)
        : [...prev, path]
    );
  };

  const handleItemClick = (item: { path: string; section?: string; subItems?: { path: string; label: string; icon: React.ComponentType; section?: string; subsection?: string }[] }) => {
    if (item.subItems) {
      toggleExpanded(item.path);
      // Navigate to first sub-item for sections with sub-items
      if (item.path === '/admin/products') {
        navigate('/admin/products/menu');
      } else if (item.path === '/admin/orders') {
        navigate('/admin/orders/confirmed');
      } else if (item.path === '/admin/events') {
        navigate('/admin/events/activities');
      }
    } else {
      // Handle regular navigation items
      navigate(item.path);
    }
  };

  const handleSubItemClick = (subItem: { path: string; section?: string; subsection?: string }) => {
    // Always navigate to the sub-item path
    navigate(subItem.path);
  };

  const isItemActive = (item: { path: string; section?: string; subItems?: { path: string; label: string; icon: React.ComponentType; section?: string; subsection?: string }[] }) => {
    // For items with subItems
    if (item.subItems) {
      return item.subItems.some((subItem: { path: string; section?: string; subsection?: string }) => {
        return location.pathname === subItem.path;
      }) || location.pathname === item.path;
    }
    
    // For regular items
    return location.pathname === item.path;
  };

  const isSubItemActive = (subItem: { path: string; section?: string; subsection?: string }) => {
    return location.pathname === subItem.path;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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
        "w-64 bg-card border-r border-border min-h-screen transition-transform duration-300",
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

        <Link to="/" className="flex items-center justify-center py-2.5" onClick={closeMobileMenu}>
          <img 
            src="/logo.png" 
            alt="H₂CO Bar Logo" 
            className="h-20 w-20 object-contain"
          />
        </Link>

        <nav className="space-y-2 px-4 pb-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isItemActive(item);
            const isExpanded = expandedItems.includes(item.path);
            
            if (item.subItems) {
              return (
                <div key={item.path}>
                  <button
                    onClick={() => handleItemClick(item)}
                    className={cn(
                      "flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-gradient-hero text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  
                   {isExpanded && (
                     <div className="ml-6 mt-2 space-y-1 border-l border-border/30 pl-4">
                       {item.subItems.map((subItem) => {
                         const SubIcon = subItem.icon;
                         const isSubActive = isSubItemActive(subItem);
                         const isSubExpanded = expandedItems.includes(subItem.path);
                         
                         if (subItem.subItems) {
                           return (
                             <div key={subItem.path} className="space-y-1">
                               <button
                                 onClick={() => toggleExpanded(subItem.path)}
                                 className={cn(
                                   "flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200 text-sm",
                                   isSubActive
                                     ? "bg-gradient-hero text-primary-foreground shadow-md"
                                     : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                 )}
                               >
                                 <div className="flex items-center gap-3">
                                   <SubIcon className="h-4 w-4" />
                                   <span className="font-medium">{subItem.label}</span>
                                 </div>
                                 {isSubExpanded ? (
                                   <ChevronDown className="h-4 w-4" />
                                 ) : (
                                   <ChevronRight className="h-4 w-4" />
                                 )}
                               </button>
                               
                               {isSubExpanded && (
                                 <div className="ml-6 space-y-1 border-l border-border/20 pl-4">
                                   {subItem.subItems.map((subSubItem) => {
                                     const SubSubIcon = subSubItem.icon;
                                     const isSubSubActive = isSubItemActive(subSubItem);
                                     return (
                                       <Link
                                         key={subSubItem.path}
                                         to={subSubItem.path}
                                         onClick={closeMobileMenu}
                                         className={cn(
                                           "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm",
                                           isSubSubActive
                                             ? "bg-gradient-hero text-primary-foreground shadow-md"
                                             : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                         )}
                                       >
                                         <SubSubIcon className="h-4 w-4" />
                                         <span className="font-medium">{subSubItem.label}</span>
                                       </Link>
                                     );
                                   })}
                                 </div>
                               )}
                             </div>
                           );
                         }
                         
                         return (
                           <button
                             key={subItem.path}
                             onClick={() => {
                               handleSubItemClick(subItem);
                               closeMobileMenu();
                             }}
                             className={cn(
                               "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm w-full text-left",
                               isSubActive
                                 ? "bg-gradient-hero text-primary-foreground shadow-md"
                                 : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                             )}
                           >
                             <SubIcon className="h-4 w-4" />
                             <span className="font-medium">{subItem.label}</span>
                           </button>
                         );
                       })}
                     </div>
                   )}
                </div>
              );
            }
            
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

        {/* Logout Button */}
        <div className="px-4 pb-4">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full flex items-center gap-3 text-muted-foreground hover:text-foreground hover:bg-destructive/10 hover:border-destructive/20"
          >
            <LogOut className="h-4 w-4" />
            <span className="font-medium">Đăng xuất</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
