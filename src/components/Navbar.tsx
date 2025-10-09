import { Link } from "react-router-dom";
import { Coffee, Menu, ShoppingCart, User, Home, QrCode, LogOut, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <Coffee className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">Nova Souls</span>
        </Link>

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
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="hidden md:flex">
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Giỏ hàng</span>
            </Link>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
                <span className="sr-only">Tài khoản</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                      <UserCircle className="h-4 w-4" />
                      Hồ sơ
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer">
                    <LogOut className="h-4 w-4" />
                    Đăng xuất
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/auth" className="cursor-pointer">
                      Đăng nhập
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/auth" className="cursor-pointer">
                      Đăng ký
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-6">
                {isMobile && (
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <QrCode className="h-5 w-5" />
                    Quét QR
                  </Button>
                )}
                <Link to="/" className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors">
                  <Home className="h-5 w-5" />
                  Trang chủ
                </Link>
                <Link to="/menu" className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors">
                  <Coffee className="h-5 w-5" />
                  Thực đơn
                </Link>
                <Link to="/events" className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors">
                  <Home className="h-5 w-5" />
                  Sự kiện
                </Link>
                <Link to="/cart" className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors">
                  <ShoppingCart className="h-5 w-5" />
                  Giỏ hàng
                </Link>
                {user ? (
                  <>
                    <Link to="/profile" className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors">
                      <User className="h-5 w-5" />
                      Hồ sơ
                    </Link>
                    <Button variant="outline" onClick={handleLogout} className="w-full">
                      Đăng xuất
                    </Button>
                  </>
                ) : (
                  <Link to="/auth">
                    <Button className="w-full bg-gradient-hero">Đăng nhập / Đăng ký</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
