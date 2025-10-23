import { Hero } from '@/components/Hero';
import { FeatureHighlights } from '@/components/FeatureHighlights';
import { PromotionalCards } from '@/components/PromotionalCards';
import { ProductGrid } from '@/components/ProductGrid';
import { useQuery } from '@tanstack/react-query';
import type { Product } from '@shared/schema';

export default function Home() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const newArrivals = products.filter((p) => p.newArrival).slice(0, 6);
  const featured = products.filter((p) => p.featured).slice(0, 6);
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 6);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-96 bg-muted rounded-2xl"></div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 space-y-12">
        <Hero />
        
        <FeatureHighlights />

        <PromotionalCards />

        {newArrivals.length > 0 && (
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-1">New Arrivals</h2>
              <p className="text-muted-foreground">
                Don't miss this opportunity at a special discount just for this week.
              </p>
            </div>
            <ProductGrid products={newArrivals} viewAllLink="/shop?filter=new" />
          </section>
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative rounded-xl overflow-hidden bg-accent p-8 hover-elevate">
            <div className="relative z-10">
              <span className="text-sm font-semibold text-primary mb-2 block">
                Only This Week
              </span>
              <h3 className="text-2xl font-bold mb-2">
                Provides you experienced quality products
              </h3>
              <p className="text-muted-foreground mb-4">Feed your family the best</p>
              <a href="/shop" className="text-primary font-semibold hover:underline">
                Shop Now →
              </a>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden bg-accent p-8 hover-elevate">
            <div className="relative z-10">
              <span className="text-sm font-semibold text-primary mb-2 block">
                Only This Week
              </span>
              <h3 className="text-2xl font-bold mb-2">
                Shopping with us for better quality and the best price
              </h3>
              <p className="text-muted-foreground mb-4">Only this week. Don't miss...</p>
              <a href="/shop" className="text-primary font-semibold hover:underline">
                Shop Now →
              </a>
            </div>
          </div>
        </section>

        {featured.length > 0 && (
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-1">Featured Products</h2>
              <p className="text-muted-foreground">
                Do not miss the current offers until the end of March.
              </p>
            </div>
            <ProductGrid products={featured} viewAllLink="/shop?filter=featured" />
          </section>
        )}

        {bestSellers.length > 0 && (
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-1">Best Sellers</h2>
              <p className="text-muted-foreground">
                Some of the new products arriving this weeks.
              </p>
            </div>
            <ProductGrid products={bestSellers} viewAllLink="/shop?filter=bestsellers" />
          </section>
        )}

        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="relative rounded-xl overflow-hidden bg-accent p-6 hover-elevate">
            <span className="text-sm font-semibold text-primary mb-2 block">
              Only This Week
            </span>
            <h3 className="text-lg font-bold mb-2">
              We are always here to help you with your grocery
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              A different kind of grocery store
            </p>
            <a href="/shop" className="text-primary font-semibold hover:underline text-sm">
              Shop Now →
            </a>
          </div>
          <div className="relative rounded-xl overflow-hidden bg-accent p-6 hover-elevate">
            <span className="text-sm font-semibold text-primary mb-2 block">
              Only This Week
            </span>
            <h3 className="text-lg font-bold mb-2">
              With your favorite food, we will make your mood
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Only this week. Don't miss...
            </p>
            <a href="/shop" className="text-primary font-semibold hover:underline text-sm">
              Shop Now →
            </a>
          </div>
          <div className="relative rounded-xl overflow-hidden bg-accent p-6 hover-elevate">
            <span className="text-sm font-semibold text-primary mb-2 block">
              Only This Week
            </span>
            <h3 className="text-lg font-bold mb-2">
              Get the best quality products at the lowest prices
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              A different kind of grocery store
            </p>
            <a href="/shop" className="text-primary font-semibold hover:underline text-sm">
              Shop Now →
            </a>
          </div>
          <div className="relative rounded-xl overflow-hidden bg-accent p-6 hover-elevate">
            <span className="text-sm font-semibold text-primary mb-2 block">
              Only This Week
            </span>
            <h3 className="text-lg font-bold mb-2">
              Where you get your all favorite brands under one roof
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Only this week. Don't miss...
            </p>
            <a href="/shop" className="text-primary font-semibold hover:underline text-sm">
              Shop Now →
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
