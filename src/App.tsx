import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { MenuProvider } from "@/contexts/MenuContext";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminMenu from "./pages/admin/products/Menu";
import AdminInventory from "./pages/admin/products/Inventory";
import AdminRecipes from "./pages/admin/products/Recipes";
import AdminAddons from "./pages/admin/products/Addons";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminActivities from "./pages/admin/events/Activities";
import AdminCoupons from "./pages/admin/events/Coupons";
import History from "./pages/admin/History";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <MenuProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/products/menu" element={<AdminMenu />} />
            <Route path="/admin/products/inventory" element={<AdminInventory />} />
            <Route path="/admin/products/recipes" element={<AdminRecipes />} />
            <Route path="/admin/products/addons" element={<AdminAddons />} />
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/admin/events/activities" element={<AdminActivities />} />
            <Route path="/admin/events/coupons" element={<AdminCoupons />} />
            <Route path="/admin/history" element={<History />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </MenuProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
