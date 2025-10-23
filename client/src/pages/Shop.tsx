import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, Link, useLocation } from 'wouter';
import { Grid, List, SlidersHorizontal, ChevronRight, LayoutGrid, X, Star, ShoppingCart, Minus, Plus } from 'lucide-react';
import { CategorySidebar } from '@/components/CategorySidebar';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/components/Header';
// Assuming ProductGrid and ProductListItem are in their respective files and are correctly imported
// If ProductGrid and ProductListItem were not provided, they would need to be included or a placeholder used.
// For this example, I will assume they exist and are correctly imported by the changes.
// import { ProductGrid } from '@/components/ProductGrid'; 
// import { ProductListItem } from '@/components/ProductListItem'; // Assuming this is the name if it were separate
import { useCart } from '@/contexts/CartContext';
import type { Product, Category } from '@shared/schema';

// Placeholder for ProductGrid if it's not provided and was intended to be part of the changes
// In a real scenario, this would be imported or defined.
const ProductGrid = ({ products, isLoading }: { products: Product[]; isLoading: boolean }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-3">
            <Skeleton className="w-full h-48 rounded-md" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-6 w-24" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};


export default function Shop() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split('?')[1]);
  const searchParam = params.get('search') || '';
  const categoryIdParam = params.get('category') || ''; // Use categoryIdParam to avoid conflict with local state
  const filterParam = params.get('filter') || ''; // Use filterParam

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Fetch products and categories
  const { data: products = [], isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (searchParam) {
      const search = searchParam.toLowerCase();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search) ||
        p.description?.toLowerCase().includes(search)
      );
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => 
        p.categoryId && selectedCategories.includes(p.categoryId)
      );
    } else if (categoryIdParam) { // Also filter by category from URL if no category is selected in UI
      filtered = filtered.filter((p) => p.categoryId === categoryIdParam);
    }

    // Filter by price range
    filtered = filtered.filter((p) => {
      const price = parseFloat(p.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Filter by filterParam if it exists (e.g., 'deals', 'sale')
    if (filterParam === 'deals') {
      filtered = filtered.filter(p => p.isFeatured);
    } else if (filterParam === 'sale') {
      filtered = filtered.filter(p => p.originalPrice !== null);
    }

    const sorted = [...filtered];
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-high':
        sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'popularity': // Default sort by popularity
      default:
        // Assuming 'popularity' is the default and no specific sorting logic is needed here
        break;
    }

    return sorted;
  }, [products, selectedCategories, priceRange, sortBy, searchParam, categoryIdParam, filterParam]);

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Widget price filter</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="min-price" className="text-xs text-muted-foreground">
                Min price
              </Label>
              <Input
                id="min-price"
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                data-testid="input-min-price"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="max-price" className="text-xs text-muted-foreground">
                Max price
              </Label>
              <Input
                id="max-price"
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100])}
                data-testid="input-max-price"
              />
            </div>
          </div>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={100} // Assuming max price is 100 as per original code, adjust if needed
            step={1}
            className="w-full"
            data-testid="slider-price-range"
          />
          <p className="text-sm text-muted-foreground">
            Price: ${priceRange[0]} — ${priceRange[1]}
          </p>
        </div>
      </div>
      <CategorySidebar
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
      />
    </div>
  );

  if (isLoadingProducts) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-muted rounded"></div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
     
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Shop</span>
            {categoryIdParam && (
              <>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">
                  {categories.find(c => c.id === categoryIdParam)?.name}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar for filters (visible on larger screens) */}
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="sticky top-24"> {/* Adjust sticky top value as needed */}
              <FilterContent />
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Results Header and Controls */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <div>
                  <h1 className="text-2xl font-bold mb-1">
                    {categoryIdParam
                      ? categories.find(c => c.id === categoryIdParam)?.name
                      : searchParam
                      ? `Search: "${searchParam}"`
                      : 'All Products'}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredProducts.length} results
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className="h-9 w-9"
                    aria-label="Switch to grid view"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className="h-9 w-9"
                    aria-label="Switch to list view"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Filter Bar */}
              <div className="flex items-center justify-between gap-4 p-4 bg-muted/30 rounded-lg border flex-wrap">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm font-medium">Sort:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Sort by popularity</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Name: A to Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">Show:</span>
                  <Select defaultValue="20">
                    <SelectTrigger className="w-[100px] h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20">20 items</SelectItem>
                      <SelectItem value="40">40 items</SelectItem>
                      <SelectItem value="60">60 items</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active Filters Display and Clear Button */}
              {(categoryIdParam || searchParam || filterParam) && (
                <div className="flex items-center gap-2 mt-4 flex-wrap">
                  <Link href="/shop">
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      <X className="h-3 w-3" />
                      Clear all filters
                    </Button>
                  </Link>
                  {categoryIdParam && (
                    <Badge variant="secondary" className="gap-1 px-2 py-1">
                      {categories.find(c => c.id === categoryIdParam)?.name}
                      <Link href={`/shop${searchParam ? `?search=${searchParam}` : ''}`}>
                        <X className="h-3 w-3 ml-1 cursor-pointer" />
                      </Link>
                    </Badge>
                  )}
                  {filterParam && (
                    <Badge variant="secondary" className="gap-1 px-2 py-1">
                      {filterParam}
                      <Link href={`/shop${categoryIdParam ? `?category=${categoryIdParam}` : ''}`}>
                        <X className="h-3 w-3 ml-1 cursor-pointer" />
                      </Link>
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Products Display (Grid or List) */}
            {viewMode === 'grid' ? (
              <ProductGrid products={filteredProducts} isLoading={isLoadingProducts} />
            ) : (
              <div className="space-y-4">
                {isLoadingProducts ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="border rounded-lg p-4 flex gap-4">
                      <Skeleton className="w-32 h-32 rounded-md" />
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-6 w-24" />
                      </div>
                    </div>
                  ))
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-16">
                    <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search query
                    </p>
                    <Link href="/shop">
                      <Button>Clear All Filters</Button>
                    </Link>
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <ProductListItem key={product.id} product={product} />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function ProductListItem({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-card">
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href={`/product/${product.id}`} className="flex-shrink-0">
          <div className="w-32 h-32 bg-muted rounded-lg overflow-hidden relative group mx-auto sm:mx-0">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {discountPercentage > 0 && (
              <Badge variant="destructive" className="absolute top-2 left-2 text-xs font-bold">
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>
        </Link>

        <div className="flex-1 flex flex-col justify-between text-center sm:text-left">
          <div>
            <Link href={`/product/${product.id}`}>
              <h3 className="font-semibold text-lg hover:text-primary transition-colors mb-1">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {product.description}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-muted text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.reviewCount || 3} reviews
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 sm:mt-0">
            <div className="flex items-center gap-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary">
                  ${parseFloat(product.price).toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${parseFloat(product.originalPrice).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-r-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-3 text-sm font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-l-none"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={handleAddToCart} className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}