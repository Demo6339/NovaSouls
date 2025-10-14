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
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
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
import ConfirmedOrders from "./pages/admin/orders/ConfirmedOrders";
import InProgressOrders from "./pages/admin/orders/InProgressOrders";
import CancelledOrders from "./pages/admin/orders/CancelledOrders";
import CompletedOrders from "./pages/admin/orders/CompletedOrders";
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
                      <AdminAuthProvider>
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
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/products" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
            <Route path="/admin/products/menu" element={<ProtectedRoute><AdminMenu /></ProtectedRoute>} />
            <Route path="/admin/products/inventory" element={<ProtectedRoute><AdminInventory /></ProtectedRoute>} />
            <Route path="/admin/products/recipes" element={<ProtectedRoute><AdminRecipes /></ProtectedRoute>} />
            <Route path="/admin/products/addons" element={<ProtectedRoute><AdminAddons /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute><ConfirmedOrders /></ProtectedRoute>} />
            <Route path="/admin/orders/confirmed" element={<ProtectedRoute><ConfirmedOrders /></ProtectedRoute>} />
            <Route path="/admin/orders/in-progress" element={<ProtectedRoute><InProgressOrders /></ProtectedRoute>} />
            <Route path="/admin/orders/completed" element={<ProtectedRoute><CompletedOrders /></ProtectedRoute>} />
            <Route path="/admin/orders/cancelled" element={<ProtectedRoute><CancelledOrders /></ProtectedRoute>} />
            <Route path="/admin/events" element={<ProtectedRoute><AdminEventsRedirect /></ProtectedRoute>} />
            <Route path="/admin/events/activities" element={<ProtectedRoute><AdminEvents /></ProtectedRoute>} />
            <Route path="/admin/events/promocodes" element={<ProtectedRoute><AdminPromoCodes /></ProtectedRoute>} />
            <Route path="/admin/history" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
            <Route path="/admin/history/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
            <Route path="/admin/history/system" element={<ProtectedRoute><SystemHistory /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
                      </AdminAuthProvider>
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
