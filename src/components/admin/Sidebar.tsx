import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  Calendar,
  Palette,
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
  Home,
  Type,
  Image as ImageIcon,
  Layout,
  Settings,
} from "lucide-react";
import { useState, useEffect } from "react";

const menuItems = [
  { icon: LayoutDashboard, label: "Tổng quan", path: "/admin" },
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
      { icon: Tag, label: "Mã giảm giá", path: "/admin/events/coupons" },
    ]
  },
  { 
    icon: Palette, 
    label: "Giao diện", 
    path: "/admin/appearance",
    subItems: [
      { 
        icon: Home, 
        label: "Trang chủ", 
        path: "/admin/appearance/home",
        subItems: [
          { icon: Type, label: "Nội dung", path: "/admin/appearance/home/content" },
          { icon: ImageIcon, label: "Hình ảnh", path: "/admin/appearance/home/images" },
          { icon: Layout, label: "Bố cục", path: "/admin/appearance/home/layout" },
        ]
      },
      { 
        icon: Calendar, 
        label: "Sự kiện", 
        path: "/admin/appearance/events",
        subItems: [
          { icon: Type, label: "Nội dung", path: "/admin/appearance/events/content" },
          { icon: ImageIcon, label: "Hình ảnh", path: "/admin/appearance/events/images" },
          { icon: Layout, label: "Bố cục", path: "/admin/appearance/events/layout" },
        ]
      },
    ]
  },
  { icon: History, label: "Lịch sử", path: "/admin/history" },
];

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Auto-expand menus if on any sub-pages
  useEffect(() => {
    if (location.pathname.startsWith('/admin/products')) {
      setExpandedItems(prev => 
        prev.includes('/admin/products') ? prev : [...prev, '/admin/products']
      );
    }
    if (location.pathname.startsWith('/admin/events')) {
      setExpandedItems(prev => 
        prev.includes('/admin/events') ? prev : [...prev, '/admin/events']
      );
    }
    if (location.pathname.startsWith('/admin/appearance')) {
      setExpandedItems(prev => {
        const newItems = [...prev];
        if (!newItems.includes('/admin/appearance')) {
          newItems.push('/admin/appearance');
        }
        if (location.pathname.startsWith('/admin/appearance/home')) {
          if (!newItems.includes('/admin/appearance/home')) {
            newItems.push('/admin/appearance/home');
          }
        }
        if (location.pathname.startsWith('/admin/appearance/events')) {
          if (!newItems.includes('/admin/appearance/events')) {
            newItems.push('/admin/appearance/events');
          }
        }
        return newItems;
      });
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

  const handleItemClick = (item: { path: string; subItems?: { path: string; label: string; icon: React.ComponentType }[] }) => {
    if (item.subItems) {
      toggleExpanded(item.path);
      // If clicking on products, navigate to menu by default
      if (item.path === '/admin/products') {
        navigate('/admin/products/menu');
      }
      // If clicking on events, navigate to activities by default
      if (item.path === '/admin/events') {
        navigate('/admin/events/activities');
      }
      // If clicking on appearance, navigate to home content by default
      if (item.path === '/admin/appearance') {
        navigate('/admin/appearance/home/content');
      }
      // If clicking on home, navigate to content by default
      if (item.path === '/admin/appearance/home') {
        navigate('/admin/appearance/home/content');
      }
      // If clicking on events appearance, navigate to content by default
      if (item.path === '/admin/appearance/events') {
        navigate('/admin/appearance/events/content');
      }
    } else {
      navigate(item.path);
    }
  };

  const isItemActive = (item: { path: string; subItems?: { path: string; label: string; icon: React.ComponentType; subItems?: { path: string; label: string; icon: React.ComponentType }[] }[] }) => {
    if (item.subItems) {
      return item.subItems.some((subItem: { path: string; subItems?: { path: string; label: string; icon: React.ComponentType }[] }) => {
        if (subItem.subItems) {
          return subItem.subItems.some((subSubItem: { path: string; label: string; icon: React.ComponentType }) => location.pathname === subSubItem.path) ||
                 location.pathname === subItem.path;
        }
        return location.pathname === subItem.path;
      }) || location.pathname === item.path;
    }
    return location.pathname === item.path;
  };

  const isSubItemActive = (subItem: { path: string }) => {
    return location.pathname === subItem.path;
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
                           <Link
                             key={subItem.path}
                             to={subItem.path}
                             onClick={closeMobileMenu}
                             className={cn(
                               "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm",
                               isSubActive
                                 ? "bg-gradient-hero text-primary-foreground shadow-md"
                                 : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                             )}
                           >
                             <SubIcon className="h-4 w-4" />
                             <span className="font-medium">{subItem.label}</span>
                           </Link>
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
      </div>
    </>
  );
};

export default AdminSidebar;
