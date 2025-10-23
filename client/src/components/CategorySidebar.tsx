import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight, Apple, Beef, Coffee, Cake, Wine, Snowflake, Cookie, ShoppingBasket, Package } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
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
  selectedCategories?: string[];
  onCategoryChange?: (categories: string[]) => void;
}

export function CategorySidebar({ selectedCategories = [], onCategoryChange }: CategorySidebarProps) {
  const [selected, setSelected] = useState<string[]>(selectedCategories);
  
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const getCategoryCount = (categoryId: string) => {
    return products.filter((p) => p.categoryId === categoryId).length;
  };

  const handleToggle = (categoryId: string) => {
    const newSelected = selected.includes(categoryId)
      ? selected.filter((c) => c !== categoryId)
      : [...selected, categoryId];
    setSelected(newSelected);
    onCategoryChange?.(newSelected);
  };

  return (
    <div className="w-full lg:w-64 space-y-6" data-testid="category-sidebar">
      <div>
        <h3 className="font-semibold mb-4">Product Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => {
            const Icon = iconMap[category.slug] || Package;
            const count = getCategoryCount(category.id);
            
            return (
              <div
                key={category.id}
                className="flex items-center gap-3 p-2 rounded-lg hover-elevate cursor-pointer group"
                onClick={() => handleToggle(category.id)}
                data-testid={`category-item-${category.slug}`}
              >
                <Checkbox
                  id={category.id}
                  checked={selected.includes(category.id)}
                  onCheckedChange={() => handleToggle(category.id)}
                />
                <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <Label
                  htmlFor={category.id}
                  className="flex-1 cursor-pointer font-normal text-sm"
                >
                  {category.name}
                </Label>
                <span className="text-xs text-muted-foreground">({count})</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
