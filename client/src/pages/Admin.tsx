import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, BarChart3, FolderTree, Search, Bell, User, LogOut, UserCircle } from "lucide-react";
import { Switch, Route, useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AdminDashboard from "./admin/Dashboard";
import AdminProducts from "./admin/Products";
import AdminCategories from "./admin/Categories";
import AdminOrders from "./admin/Orders";
import AdminUsers from "./admin/Users";
import AdminSettings from "./admin/Settings";
import AdminAnalytics from "./admin/Analytics";
import AdminHeroSlides from "./admin/HeroSlides";

export default function Admin() {
  const [location] = useLocation();

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { title: "Hero Slides", icon: LayoutDashboard, path: "/admin/hero-slides" },
    { title: "Products", icon: Package, path: "/admin/products" },
    { title: "Categories", icon: FolderTree, path: "/admin/categories" },
    { title: "Orders", icon: ShoppingCart, path: "/admin/orders" },
    { title: "Users", icon: Users, path: "/admin/users" },
    { title: "Analytics", icon: BarChart3, path: "/admin/analytics" },
    { title: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-muted/30">
        <Sidebar collapsible="icon" variant="sidebar" className="border-r">
          <SidebarHeader className="border-b px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-primary-foreground font-bold text-xl">G</span>
              </div>
              <div className="group-data-[collapsible=icon]:hidden">
                <h2 className="text-lg font-bold text-foreground">Grogin</h2>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-3 py-4">
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.path}
                    tooltip={item.title}
                    className="w-full"
                  >
                    <a href={item.path} className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex items-center justify-between flex-1">
              <h1 className="text-xl font-semibold text-foreground hidden md:block">
                {menuItems.find(item => item.path === location)?.title || "Dashboard"}
              </h1>
              
              <div className="flex items-center gap-3 ml-auto">
                {/* Search Bar */}
                <div className="relative hidden md:flex items-center">
                  <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search..." 
                    className="pl-9 w-64 h-9"
                  />
                </div>

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </Button>

                {/* Admin Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          AD
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Admin User</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          admin@grogin.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <a href="/admin/settings" className="cursor-pointer">
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/admin/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer text-red-600 focus:text-red-600"
                      onClick={() => {
                        // Handle logout
                        window.location.href = "/login";
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          
          <div className="flex-1 p-6 md:p-8 lg:p-10">
            <Switch>
              <Route path="/admin" component={AdminDashboard} />
              <Route path="/admin/hero-slides" component={AdminHeroSlides} />
              <Route path="/admin/products" component={AdminProducts} />
              <Route path="/admin/categories" component={AdminCategories} />
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