import { CreditCard, Package, Shield, Truck } from 'lucide-react';

const features = [
  {
    icon: CreditCard,
    title: 'Payment only online',
    description: 'Tasnim mit beatae design. Mobile checkout. Ying kiartropa.',
  },
  {
    icon: Package,
    title: 'New stocks and sales',
    description: 'Tasnim samet beatae design. Mobile checkout. Ying kiartropa.',
  },
  {
    icon: Shield,
    title: 'Quality assurance',
    description: 'Tasnim amir beatae design. Mobile checkout. Ying kiartropa.',
  },
  {
    icon: Truck,
    title: 'Delivery from 1 hour',
    description: 'Tasnim samir beatae design. Mobile checkout. Ying kiartropa.',
  },
];

export function FeatureHighlights() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex gap-4 p-6 rounded-lg border hover-elevate transition-all"
          data-testid={`feature-${index}`}
        >
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
              <feature.icon className="h-6 w-6 text-accent-foreground" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-1">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
