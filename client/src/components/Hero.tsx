import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';

export function Hero() {
  return (
    <div className="relative bg-accent rounded-2xl overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[400px] lg:min-h-[500px] py-12 lg:py-0">
          <div className="space-y-6">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
              Weekend Discount
            </Badge>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
              Get the best quality products at the lowest prices
            </h1>
            <p className="text-lg text-muted-foreground">
              We have prepared special discounts for you on grocery products. Don't miss these opportunities...
            </p>
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-primary">$27.99</span>
                <span className="text-lg text-muted-foreground line-through">$56.67</span>
              </div>
              <Link href="/shop">
                <Button size="lg" className="gap-2" data-testid="button-shop-now">
                  Shop Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Don't miss this limited time offer.
            </p>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-transparent z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop"
              alt="Fresh groceries"
              className="w-full h-full object-cover rounded-r-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
