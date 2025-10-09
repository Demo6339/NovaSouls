import { Link } from "react-router-dom";
import { Coffee, Menu, ShoppingCart, User, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <Coffee className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">Nova Souls</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Trang chủ
          </Link>
          <Link to="/menu" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Thực đơn
          </Link>
          <Link to="/events" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Sự kiện
          </Link>
          <Link to="/about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Về chúng tôi
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="hidden md:flex">
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Giỏ hàng</span>
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" asChild className="hidden md:flex">
            <Link to="/profile">
              <User className="h-5 w-5" />
              <span className="sr-only">Tài khoản</span>
            </Link>
          </Button>

          <Button asChild className="hidden md:flex bg-gradient-hero hover:opacity-90 transition-opacity">
            <Link to="/auth">Đặt món ngay</Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-6">
                <Link to="/" className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors">
                  <Home className="h-5 w-5" />
                  Trang chủ
                </Link>
                <Link to="/menu" className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors">
                  <Coffee className="h-5 w-5" />
                  Thực đơn
                </Link>
                <Link to="/cart" className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors">
                  <ShoppingCart className="h-5 w-5" />
                  Giỏ hàng
                </Link>
                <Link to="/profile" className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors">
                  <User className="h-5 w-5" />
                  Tài khoản
                </Link>
                <Button asChild className="mt-4 bg-gradient-hero">
                  <Link to="/auth">Đặt món ngay</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
