import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { MenuProvider } from "@/contexts/MenuContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { RecipeProvider } from "@/contexts/RecipeContext";
import { AddonProvider } from "@/contexts/AddonContext";
import { InventoryProvider } from "@/contexts/InventoryContext";
import { PromoProvider } from "@/contexts/PromoContext";
import { EventProvider } from "@/contexts/EventContext";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminMenu from "./pages/admin/products/Menu";
import AdminInventory from "./pages/admin/products/Inventory";
import AdminRecipes from "./pages/admin/products/Recipes";
import AdminAddons from "./pages/admin/products/Addons";
import AdminPromoCodes from "./pages/admin/events/PromoCodes";
import AdminEvents from "./pages/admin/events/Events";
import AdminEventsRedirect from "./pages/admin/AdminEvents";
import OrderHistory from "./pages/admin/history/OrderHistory";
import SystemHistory from "./pages/admin/history/SystemHistory";
import { ConfirmedOrders, InProgressOrders, CancelledOrders } from "./pages/admin/orders";
import CompletedOrders from "./pages/admin/orders/CompletedOrders";
import History from "./pages/admin/History";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <MenuProvider>
          <OrderProvider>
            <RecipeProvider>
              <AddonProvider>
                <InventoryProvider>
                  <PromoProvider>
                    <EventProvider>
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
            <Route path="/admin/orders" element={<ConfirmedOrders />} />
            <Route path="/admin/orders/confirmed" element={<ConfirmedOrders />} />
            <Route path="/admin/orders/in-progress" element={<InProgressOrders />} />
            <Route path="/admin/orders/completed" element={<CompletedOrders />} />
            <Route path="/admin/orders/cancelled" element={<CancelledOrders />} />
            <Route path="/admin/events" element={<AdminEventsRedirect />} />
            <Route path="/admin/events/activities" element={<AdminEvents />} />
            <Route path="/admin/events/promocodes" element={<AdminPromoCodes />} />
            <Route path="/admin/history" element={<OrderHistory />} />
            <Route path="/admin/history/orders" element={<OrderHistory />} />
            <Route path="/admin/history/system" element={<SystemHistory />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
                    </EventProvider>
                  </PromoProvider>
                </InventoryProvider>
              </AddonProvider>
            </RecipeProvider>
          </OrderProvider>
        </MenuProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
