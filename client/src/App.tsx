import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import { Header } from "@/components/Header";
import { Cart } from "@/components/Cart";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Wishlist from "@/pages/Wishlist";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/product/:slug" component={ProductDetail} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/wishlist" component={Wishlist} />
      <Route path="/admin" component={Admin} />
      <Route path="/admin/:rest*" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Cart />
            <footer className="bg-muted mt-16">
              <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4">grogin</h3>
                    <p className="text-sm text-muted-foreground">
                      Your trusted grocery delivery service. Fresh products, best prices.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Shop</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><a href="/shop" className="hover:text-foreground">All Products</a></li>
                      <li><a href="/shop?filter=featured" className="hover:text-foreground">Featured</a></li>
                      <li><a href="/shop?filter=sale" className="hover:text-foreground">On Sale</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Customer Service</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><a href="/contact" className="hover:text-foreground">Contact Us</a></li>
                      <li><a href="/track-order" className="hover:text-foreground">Track Order</a></li>
                      <li><a href="/returns" className="hover:text-foreground">Returns</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">About</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><a href="/about" className="hover:text-foreground">About Us</a></li>
                      <li><a href="/blog" className="hover:text-foreground">Blog</a></li>
                      <li><a href="/careers" className="hover:text-foreground">Careers</a></li>
                    </ul>
                  </div>
                </div>
                <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                  <p>&copy; 2024 Grogin. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;