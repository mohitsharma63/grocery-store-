import { useState } from 'react';
import { Link } from 'wouter';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@shared/schema';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = product.originalPrice
    ? Math.round(
        ((parseFloat(product.originalPrice) - parseFloat(product.price)) /
          parseFloat(product.originalPrice)) *
          100
      )
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart`,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      description: isWishlisted
        ? `${product.name} has been removed from your wishlist`
        : `${product.name} has been added to your wishlist`,
    });
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <div
        className="group relative bg-card border border-card-border rounded-lg overflow-hidden hover-elevate transition-all duration-200"
        data-testid={`card-product-${product.id}`}
      >
        <div className="relative aspect-square bg-muted/30 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount > 0 && (
            <Badge
              variant="destructive"
              className="absolute top-2 left-2 font-bold"
              data-testid={`badge-discount-${product.id}`}
            >
              {discount}%
            </Badge>
          )}
          {product.badge && (
            <Badge
              className="absolute top-2 left-2 bg-primary text-primary-foreground font-bold uppercase text-xs"
              data-testid={`badge-type-${product.id}`}
            >
              {product.badge}
            </Badge>
          )}

          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full"
              onClick={handleToggleWishlist}
              data-testid={`button-wishlist-${product.id}`}
            >
              <Heart
                className={`h-4 w-4 ${isWishlisted ? 'fill-current text-destructive' : ''}`}
              />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full"
              data-testid={`button-quickview-${product.id}`}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-4">
          {product.rating && (
            <div className="flex items-center gap-1 mb-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(parseFloat(product.rating || '0'))
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground" data-testid={`text-reviews-${product.id}`}>
                ({product.reviewCount || 0})
              </span>
            </div>
          )}

          <h3 className="font-medium text-sm mb-2 line-clamp-2 min-h-[2.5rem]" data-testid={`text-name-${product.id}`}>
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary" data-testid={`text-price-${product.id}`}>
                ${parseFloat(product.price).toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through" data-testid={`text-original-price-${product.id}`}>
                  ${parseFloat(product.originalPrice).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <Button
            className="w-full mt-3"
            size="sm"
            onClick={handleAddToCart}
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to cart
          </Button>
        </div>
      </div>
    </Link>
  );
}
