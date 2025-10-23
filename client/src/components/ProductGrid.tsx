import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@shared/schema';

interface ProductGridProps {
  products: Product[];
  title?: string;
  viewAllLink?: string;
}

export function ProductGrid({ products, title, viewAllLink }: ProductGridProps) {
  return (
    <div className="space-y-6">
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>
          {viewAllLink && (
            <a
              href={viewAllLink}
              className="text-sm text-primary hover:underline font-medium"
              data-testid="link-view-all"
            >
              View All →
            </a>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
