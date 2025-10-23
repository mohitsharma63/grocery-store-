import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
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
import type { Product } from '@shared/schema';

export default function Shop() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split('?')[1]);
  const searchParam = params.get('search') || '';
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchParam) {
      const search = searchParam.toLowerCase();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search) ||
        p.description?.toLowerCase().includes(search)
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => 
        p.categoryId && selectedCategories.includes(p.categoryId)
      );
    }

    filtered = filtered.filter((p) => {
      const price = parseFloat(p.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

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
      default:
        break;
    }

    return sorted;
  }, [products, selectedCategories, priceRange, sortBy, searchParam]);

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
            max={100}
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
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
      />
    </div>
  );

  if (isLoading) {
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
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 p-8 rounded-2xl bg-accent">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-primary mb-2 block">
              Only This Week
            </span>
            <h1 className="text-4xl font-bold mb-2">
              Grocery store with different treasures
            </h1>
            <p className="text-muted-foreground mb-4">
              We have prepared special discounts for you on grocery products...
            </p>
            <a href="/shop" className="text-primary font-semibold hover:underline">
              Shop Now →
            </a>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterContent />
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <p className="text-sm text-muted-foreground">
                Showing 1-20 of {filteredProducts.length} results
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="sort" className="text-sm whitespace-nowrap">
                    Sort:
                  </Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]" id="sort" data-testid="select-sort">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Sort by popularity</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Sort by name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Label className="text-sm whitespace-nowrap">Show:</Label>
                  <Select defaultValue="20">
                    <SelectTrigger className="w-24" data-testid="select-items-per-page">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20">20 items</SelectItem>
                      <SelectItem value="40">40 items</SelectItem>
                      <SelectItem value="60">60 items</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-1 border rounded-lg p-1">
                  <Button
                    size="icon"
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    className="h-8 w-8"
                    onClick={() => setViewMode('grid')}
                    data-testid="button-grid-view"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    className="h-8 w-8"
                    onClick={() => setViewMode('list')}
                    data-testid="button-list-view"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden" data-testid="button-filters">
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                : 'space-y-4'
              }>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
