import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';

const promotions = [
  {
    title: 'Quality eggs at an affordable price',
    description: 'Eat one every day',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=300&fit=crop',
    badge: 'Only This Week',
  },
  {
    title: 'Snacks that nourishes our mind and body',
    description: 'Shine the morning...',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=300&fit=crop',
    badge: 'Only This Week',
  },
  {
    title: 'Unbeatable quality, unbeatable prices.',
    description: "Only this week. Don't miss...",
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop',
    badge: 'Only This Week',
  },
];

export function PromotionalCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {promotions.map((promo, index) => (
        <div
          key={index}
          className="relative group rounded-xl overflow-hidden hover-elevate transition-all"
          data-testid={`promo-card-${index}`}
        >
          <div className="relative h-64">
            <img
              src={promo.image}
              alt={promo.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <Badge className="w-fit mb-2 bg-chart-2 text-white border-0 hover:bg-chart-2">
                {promo.badge}
              </Badge>
              <h3 className="text-xl font-bold mb-1">{promo.title}</h3>
              <p className="text-sm text-white/90 mb-4">{promo.description}</p>
              <Link href="/shop">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-fit gap-2"
                  data-testid={`button-shop-promo-${index}`}
                >
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
