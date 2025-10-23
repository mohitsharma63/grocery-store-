import { useState } from 'react';
import { useLocation } from 'wouter';
import { ChevronRight, Apple, Beef, Coffee, Cake, Wine, Snowflake, Cookie, ShoppingBasket, Package } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useQuery } from '@tanstack/react-query';
import type { Category, Product } from '@shared/schema';

const iconMap: Record<string, any> = {
  'fruits-vegetables': Apple,
  'meats-seafood': Beef,
  'breakfast-dairy': Coffee,
  'breads-bakery': Cake,
  'beverages': Wine,
  'frozen-foods': Snowflake,
  'biscuits-snacks': Cookie,
  'grocery-staples': ShoppingBasket,
};

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory?: string;
  selectedCategories?: string[];
  onCategoryChange?: (categories: string[]) => void;
}

export function CategorySidebar({ categories, selectedCategory, selectedCategories = [], onCategoryChange }: CategorySidebarProps) {
  const [, navigate] = useLocation();
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>(selectedCategories);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleToggle = (categoryId: string) => {
    const newSelected = selected.includes(categoryId)
      ? selected.filter((c) => c !== categoryId)
      : [...selected, categoryId];
    setSelected(newSelected);
    onCategoryChange?.(newSelected);
  };

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const getCategoryCount = (categoryId: string) => {
    return products.filter((p) => p.categoryId === categoryId).length;
  };

  return (
    <aside className="w-full space-y-4">
      {/* Price Filter */}
      <div className="border rounded-lg bg-card">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-base">Widget price filter</h3>
        </div>
        <div className="p-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={100}
            step={1}
            className="mb-4"
          />
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 flex-1">
              <label className="text-sm text-muted-foreground">Min price</label>
              <Input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                className="h-8"
              />
            </div>
            <div className="flex items-center gap-2 flex-1">
              <label className="text-sm text-muted-foreground">Max price</label>
              <Input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100])}
                className="h-8"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Price: ${priceRange[0]} — ${priceRange[1]}
          </p>
        </div>
      </div>

      {/* Product Categories */}
      <div className="border rounded-lg bg-card">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-base">Product Categories</h3>
        </div>
        <div className="p-3">
          <div className="space-y-1">
            {categories.map((category) => {
              const Icon = iconMap[category.slug] || Package;
              const count = getCategoryCount(category.id);
              return (
                <div key={category.id}>
                  <button
                    onClick={() => handleToggle(category.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                      selected.includes(category.id)
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span>{category.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">({count})</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </button>
                  {selected.includes(category.id) && (
                    <div className="pl-4 mt-1 space-y-1">
                      {/* Placeholder for subcategories if needed */}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter by Color */}
      <div className="border rounded-lg bg-card">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-base">Filter by Color</h3>
        </div>
        <div className="p-4 space-y-2">
          {['Green', 'Red', 'Yellow', 'Orange', 'Purple'].map((color) => (
            <label key={color} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={false} // Replace with actual state management if needed
                onCheckedChange={() => {}} // Replace with actual handler
                className="rounded border-gray-300"
              />
              <div className={`w-4 h-4 rounded-full border ${
                color === 'Green' ? 'bg-green-500' :
                color === 'Red' ? 'bg-red-500' :
                color === 'Yellow' ? 'bg-yellow-500' :
                color === 'Orange' ? 'bg-orange-500' :
                'bg-purple-500'
              }`} />
              <span className="text-sm">{color}</span>
              <span className="text-xs text-muted-foreground ml-auto">(1)</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}