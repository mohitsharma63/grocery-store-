
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@shared/schema';

export default function Wishlist() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    // Mock wishlist items - in a real app, this would come from user's account
  ]);

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistIds(wishlistIds.filter((id) => id !== productId));
    toast({
      title: 'Removed from wishlist',
      description: 'Product has been removed from your wishlist',
    });
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart`,
    });
  };

  const handleAddAllToCart = () => {
    wishlistProducts.forEach((product) => addToCart(product));
    toast({
      title: 'All items added to cart',
      description: `${wishlistProducts.length} items have been added to your cart`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            My Wishlist
          </h1>
          <p className="text-muted-foreground">
            {wishlistProducts.length > 0
              ? `You have ${wishlistProducts.length} ${wishlistProducts.length === 1 ? 'item' : 'items'} in your wishlist`
              : 'Your wishlist is empty'}
          </p>
        </div>

        {wishlistProducts.length > 0 ? (
          <>
            <div className="flex justify-end mb-6">
              <Button onClick={handleAddAllToCart} size="lg" className="gap-2">
                <ShoppingCart className="h-5 w-5" />
                Add All to Cart
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistProducts.map((product) => {
                const discount = product.originalPrice
                  ? Math.round(
                      ((parseFloat(product.originalPrice) - parseFloat(product.price)) /
                        parseFloat(product.originalPrice)) *
                        100
                    )
                  : 0;

                return (
                  <div
                    key={product.id}
                    className="group bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <Link href={`/product/${product.slug}`}>
                      <div className="relative aspect-square bg-muted overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {discount > 0 && (
                          <Badge
                            variant="destructive"
                            className="absolute top-2 left-2 font-bold"
                          >
                            {discount}%
                          </Badge>
                        )}
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute top-2 right-2 h-8 w-8 rounded-full"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemoveFromWishlist(product.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Link>

                    <div className="p-4 space-y-3">
                      <Link href={`/product/${product.slug}`}>
                        <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-primary">
                          ${parseFloat(product.price).toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${parseFloat(product.originalPrice).toFixed(2)}
                          </span>
                        )}
                      </div>

                      <Button
                        className="w-full gap-2"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-muted rounded-full mb-6">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">
              Start adding products you love to your wishlist
            </p>
            <Link href="/shop">
              <Button size="lg" className="gap-2">
                Start Shopping
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
