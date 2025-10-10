import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminMenu from "./pages/admin/products/Menu";
import AdminInventory from "./pages/admin/products/Inventory";
import AdminRecipes from "./pages/admin/products/Recipes";
import AdminAddons from "./pages/admin/products/Addons";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminActivities from "./pages/admin/events/Activities";
import AdminCoupons from "./pages/admin/events/Coupons";
import Appearance from "./pages/admin/Appearance";
import AdminHomeContent from "./pages/admin/appearance/HomeContent";
import AdminHomeImages from "./pages/admin/appearance/HomeImages";
import AdminHomeLayout from "./pages/admin/appearance/HomeLayout";
import AdminEventContent from "./pages/admin/appearance/EventContent";
import AdminEventImages from "./pages/admin/appearance/EventImages";
import AdminEventLayout from "./pages/admin/appearance/EventLayout";
import Accounts from "./pages/admin/Accounts";
import History from "./pages/admin/History";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/events" element={<Events />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/menu" element={<AdminMenu />} />
          <Route path="/admin/products/inventory" element={<AdminInventory />} />
          <Route path="/admin/products/recipes" element={<AdminRecipes />} />
          <Route path="/admin/products/addons" element={<AdminAddons />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/events/activities" element={<AdminActivities />} />
          <Route path="/admin/events/coupons" element={<AdminCoupons />} />
          <Route path="/admin/appearance" element={<Appearance />} />
          <Route path="/admin/appearance/home/content" element={<AdminHomeContent />} />
          <Route path="/admin/appearance/home/images" element={<AdminHomeImages />} />
          <Route path="/admin/appearance/home/layout" element={<AdminHomeLayout />} />
          <Route path="/admin/appearance/events/content" element={<AdminEventContent />} />
          <Route path="/admin/appearance/events/images" element={<AdminEventImages />} />
          <Route path="/admin/appearance/events/layout" element={<AdminEventLayout />} />
          <Route path="/admin/accounts" element={<Accounts />} />
          <Route path="/admin/history" element={<History />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
