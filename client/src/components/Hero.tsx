
import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';

const slides = [
  {
    badge: 'Weekend Discount',
    title: 'Get the best quality products at the lowest prices',
    description: 'We have prepared special discounts for you on grocery products. Don\'t miss these opportunities...',
    price: '$27.99',
    oldPrice: '$56.67',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop',
    alt: 'Fresh groceries'
  },
  {
    badge: 'Fresh Daily',
    title: 'Farm fresh vegetables delivered to your doorstep',
    description: 'Organic and locally sourced produce picked fresh every morning for maximum flavor and nutrition.',
    price: '$19.99',
    oldPrice: '$29.99',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&h=600&fit=crop',
    alt: 'Fresh vegetables'
  },
  {
    badge: 'Special Offer',
    title: 'Premium fruits at unbeatable prices',
    description: 'Discover our handpicked selection of the finest seasonal fruits from around the world.',
    price: '$24.99',
    oldPrice: '$39.99',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&h=600&fit=crop',
    alt: 'Fresh fruits'
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative bg-accent rounded-2xl overflow-hidden h-[400px] lg:h-[500px]">
      {/* Background Image with Fade Transition */}
      {slides.map((s, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            currentSlide === index ? "opacity-100" : "opacity-0"
          )}
        >
          <img
            src={s.image}
            alt={s.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>
      ))}

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 h-full">
        <div className="flex items-center h-full">
          <div className="max-w-xl space-y-6">
            <Badge className="bg-primary/90 text-primary-foreground hover:bg-primary border-0">
              {slide.badge}
            </Badge>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              {slide.title}
            </h1>
            <p className="text-lg text-white/90">
              {slide.description}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-primary">{slide.price}</span>
                <span className="text-lg text-white/70 line-through">{slide.oldPrice}</span>
              </div>
              <Link href="/shop">
                <Button size="lg" className="gap-2" data-testid="button-shop-now">
                  Shop Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            <p className="text-sm text-white/80">
              Don't miss this limited time offer.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              currentSlide === index ? "bg-primary w-8" : "bg-white/50 w-2 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
