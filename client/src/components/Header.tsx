import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Search, Heart, ShoppingCart, Menu, MapPin, User, ChevronDown, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import type { Category } from '@shared/schema';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const megaMenuCategories = [
  {
    name: 'Fruits & Vegetables',
    icon: '🍎',
    subcategories: [
      'Fresh Vegetables',
      'Fresh Fruits',
      'Organic Produce',
      'Herbs & Seasonings',
      'Exotic Fruits & Vegetables',
      'Salad & Dressing',
    ],
  },
  {
    name: 'Meats & Seafood',
    icon: '🥩',
    subcategories: [
      'Beef Products',
      'Chicken and Turkey Products',
      'Fish Varieties',
      'Lamb Products',
      'Processed Red Meat Products',
      'Seafood',
    ],
  },
  {
    name: 'Breakfast & Dairy',
    icon: '☕',
    subcategories: [
      'Milk & Cream',
      'Cheese',
      'Yogurt',
      'Eggs',
      'Butter & Margarine',
      'Breakfast Cereals',
    ],
  },
  {
    name: 'Breads & Bakery',
    icon: '🍞',
    subcategories: [
      'Fresh Bread',
      'Bakery Cakes',
      'Cookies & Biscuits',
      'Pastries',
      'Rolls & Buns',
      'Artisan Bread',
    ],
  },
  {
    name: 'Beverages',
    icon: '🍷',
    subcategories: [
      'Soft Drinks',
      'Juices',
      'Coffee & Tea',
      'Water',
      'Energy Drinks',
      'Wine & Beer',
    ],
  },
  {
    name: 'Frozen Foods',
    icon: '❄️',
    subcategories: [
      'Frozen Vegetables',
      'Frozen Fruits',
      'Ice Cream',
      'Frozen Pizza',
      'Frozen Meals',
      'Frozen Snacks',
    ],
  },
  {
    name: 'Biscuits & Snacks',
    icon: '🍪',
    subcategories: [
      'Chips & Crisps',
      'Cookies',
      'Crackers',
      'Nuts & Seeds',
      'Popcorn',
      'Candy & Chocolate',
    ],
  },
  {
    name: 'Grocery & Staples',
    icon: '🛒',
    subcategories: [
      'Rice & Grains',
      'Pasta',
      'Cooking Oil',
      'Spices & Condiments',
      'Canned Goods',
      'Baking Supplies',
    ],
  },
];

export function Header() {
  const [, navigate] = useLocation();
  const { cartCount, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">We deliver to you every day from 7:00 to 23:00</span>
              <span className="sm:hidden">Delivery 7:00 to 23:00</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:inline">English</span>
              <span className="hidden md:inline">USD</span>
              <Link href="/track-order" className="hover:underline">
                <span className="hidden sm:inline">Order Tracking</span>
                <span className="sm:hidden">Track</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 py-4">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground hidden sm:inline">grogin</span>
            </div>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hidden lg:flex gap-2" data-testid="button-categories">
                <Menu className="h-5 w-5" />
                All Categories
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {categories.map((category) => (
                <DropdownMenuItem key={category.id} asChild>
                  <Link href={`/shop?category=${category.id}`}>
                    {category.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products, categories or brands..."
                className="pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </form>

          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="icon" className="relative hidden sm:flex" data-testid="button-account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative hidden sm:flex" data-testid="button-wishlist">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsCartOpen(true)}
              data-testid="button-cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  data-testid="badge-cart-count"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
                <SheetHeader className="px-6 pt-6">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-5rem)] px-6">
                  <nav className="flex flex-col gap-4 mt-6 pb-6">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-base">
                        Home
                      </Button>
                    </Link>
                    <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-base">
                        Shop
                      </Button>
                    </Link>
                    <div className="border-t pt-2">
                      <p className="px-4 py-2 text-sm font-semibold text-muted-foreground">Categories</p>
                      {categories.map((category) => (
                        <Link 
                          key={category.id} 
                          href={`/shop?category=${category.id}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Button variant="ghost" className="w-full justify-start text-sm">
                            {category.name}
                          </Button>
                        </Link>
                      ))}
                    </div>
                    <Link href="/shop?filter=deals" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-base">
                        Trending Products
                      </Button>
                    </Link>
                    <Link href="/shop?filter=sale" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-base">
                        Almost Finished
                        <Badge variant="destructive" className="ml-2 text-xs">SALE</Badge>
                      </Button>
                    </Link>
                    <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-base">
                        Blog
                      </Button>
                    </Link>
                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-base">
                        Contact
                      </Button>
                    </Link>
                    <div className="border-t pt-2">
                      <p className="px-4 py-2 text-sm font-semibold text-muted-foreground">Account</p>
                      <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-base">
                          <User className="h-5 w-5 mr-2" />
                          Login
                        </Button>
                      </Link>
                      <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-base">
                          <Heart className="h-5 w-5 mr-2" />
                          Wishlist
                        </Button>
                      </Link>
                    </div>
                  </nav>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <nav className="hidden md:block border-t">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-8 py-3">
              <div className="relative" onMouseEnter={() => setIsMegaMenuOpen(true)} onMouseLeave={() => setIsMegaMenuOpen(false)}>
                <Button variant="ghost" className="gap-2 font-medium">
                  <Menu className="h-4 w-4" />
                  All Categories
                  <ChevronDown className="h-4 w-4" />
                </Button>

                {isMegaMenuOpen && (
                  <div className="absolute left-0 top-full mt-0 w-[280px] bg-background border rounded-lg shadow-lg z-50">
                    {megaMenuCategories.map((category, index) => (
                      <div key={index} className="relative group/item">
                        <Link href={`/shop?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                          <div className="flex items-center justify-between px-4 py-3 hover:bg-accent cursor-pointer border-b last:border-b-0">
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{category.icon}</span>
                              <span className="text-sm font-medium">{category.name}</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </Link>

                        <div className="absolute left-full top-0 ml-0 w-[600px] bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 z-50">
                          <div className="p-6">
                            <div className="grid grid-cols-2 gap-4">
                              {category.subcategories.map((sub, subIndex) => (
                                <Link key={subIndex} href={`/shop?category=${sub.toLowerCase().replace(/\s+/g, '-')}`}>
                                  <div className="text-sm text-muted-foreground hover:text-primary cursor-pointer py-1">
                                    {sub}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/" className="text-sm font-medium hover:text-primary">
                Home
              </Link>
              <Link href="/shop" className="text-sm font-medium hover:text-primary">
                Shop
              </Link>
              <Link href="/shop?filter=deals" className="text-sm font-medium hover:text-primary">
                Trending Products
              </Link>
              <Link href="/shop?filter=sale" className="text-sm font-medium hover:text-primary">
                <span className="flex items-center gap-1">
                  Almost Finished
                  <Badge variant="destructive" className="text-xs">
                    SALE
                  </Badge>
                </span>
              </Link>
              <Link href="/blog" className="text-sm font-medium hover:text-primary">
                Blog
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary">
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}