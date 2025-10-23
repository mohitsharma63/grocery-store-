import { useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Star, Heart, Share2, Truck, Shield, ShoppingCart, Minus, Plus, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductGrid } from '@/components/ProductGrid';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@shared/schema';

export default function ProductDetail() {
  const { slug } = useParams();
  const [, navigate] = useLocation();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const product = products.find((p) => p.slug === slug);
  const relatedProducts = products.filter((p) => 
    p.categoryId === product?.categoryId && p.id !== product?.id
  ).slice(0, 5);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Button onClick={() => navigate('/shop')}>Return to Shop</Button>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(
        ((parseFloat(product.originalPrice) - parseFloat(product.price)) /
          parseFloat(product.originalPrice)) *
          100
      )
    : 0;

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: 'Added to cart',
      description: `${quantity} × ${product.name} added to your cart`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/shop')}
          data-testid="button-back"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                data-testid="img-product-main"
              />
              {discount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute top-4 left-4 text-lg font-bold px-3 py-1"
                >
                  {discount}%
                </Badge>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === idx ? 'border-primary' : 'border-transparent'
                    }`}
                    data-testid={`button-thumbnail-${idx}`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2" data-testid="text-product-name">
                {product.name}
              </h1>
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(parseFloat(product.rating || '0'))
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground" data-testid="text-reviews">
                    ({product.reviewCount || 0} reviews)
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-primary" data-testid="text-price">
                ${parseFloat(product.price).toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-2xl text-muted-foreground line-through" data-testid="text-original-price">
                  ${parseFloat(product.originalPrice).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description || 'Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeus. Integer enim purus, posuere at ultricies eu, placerat a felis.'}
            </p>

            <div className="flex items-center gap-4 p-4 bg-accent/50 rounded-lg">
              <Truck className="h-8 w-8 text-primary flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold">Shipping within 3 days</p>
                <p className="text-sm text-muted-foreground">
                  Speedy and reliable parcel delivery!
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    data-testid="button-decrease-quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold" data-testid="text-quantity">
                    {quantity}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setQuantity(quantity + 1)}
                    data-testid="button-increase-quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  data-testid="button-add-to-cart"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to cart
                </Button>

                <Button size="icon" variant="outline" className="h-11 w-11" data-testid="button-wishlist">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              <Button variant="outline" size="lg" className="w-full gap-2" data-testid="button-share">
                <Share2 className="h-5 w-5" />
                Share this Product
              </Button>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <span className="font-semibold">Warranty.</span> The Consumer Protection Act does not provide for the return of this product of proper quality.
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description" data-testid="tab-description">
              Description
            </TabsTrigger>
            <TabsTrigger value="info" data-testid="tab-info">
              Additional Information
            </TabsTrigger>
            <TabsTrigger value="reviews" data-testid="tab-reviews">
              Reviews ({product.reviewCount || 0})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="prose max-w-none pt-6">
            <p className="text-muted-foreground">
              {product.description || 'Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeus. Integer enim purus, posuere at ultricies eu, placerat a felis. Suspendisse mauris nulla, accumsan non posuere sit amet, tincidunt vel justo.'}
            </p>
          </TabsContent>
          <TabsContent value="info" className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground">Weight:</span>
                <span className="ml-2 font-medium">1 kg</span>
              </div>
              <div>
                <span className="text-muted-foreground">Dimensions:</span>
                <span className="ml-2 font-medium">10 × 10 × 10 cm</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
          </TabsContent>
        </Tabs>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
