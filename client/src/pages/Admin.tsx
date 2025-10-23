
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, BarChart3 } from "lucide-react";
import { Switch, Route, useLocation } from "wouter";
import AdminDashboard from "./admin/Dashboard";
import AdminProducts from "./admin/Products";
import AdminOrders from "./admin/Orders";
import AdminUsers from "./admin/Users";
import AdminSettings from "./admin/Settings";
import AdminAnalytics from "./admin/Analytics";

export default function Admin() {
  const [location] = useLocation();

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { title: "Products", icon: Package, path: "/admin/products" },
    { title: "Orders", icon: ShoppingCart, path: "/admin/orders" },
    { title: "Users", icon: Users, path: "/admin/users" },
    { title: "Analytics", icon: BarChart3, path: "/admin/analytics" },
    { title: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar collapsible="icon" variant="sidebar">
          <SidebarHeader className="border-b px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shrink-0">
                <span className="text-primary-foreground font-bold text-xl">G</span>
              </div>
              <h2 className="text-lg font-bold text-foreground group-data-[collapsible=icon]:hidden">Admin Panel</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="px-6 py-24 mt-24">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.path}
                    tooltip={item.title}
                  >
                    <a href={item.path} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6 shadow-sm">
            <SidebarTrigger className="md:hidden" />
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">
                {menuItems.find(item => item.path === location)?.title || "Dashboard"}
              </h1>
            </div>
          </header>
          
          <div className="flex-1 p-6 md:p-8">
            <Switch>
              <Route path="/admin" component={AdminDashboard} />
              <Route path="/admin/products" component={AdminProducts} />
              <Route path="/admin/orders" component={AdminOrders} />
              <Route path="/admin/users" component={AdminUsers} />
              <Route path="/admin/analytics" component={AdminAnalytics} />
              <Route path="/admin/settings" component={AdminSettings} />
            </Switch>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
