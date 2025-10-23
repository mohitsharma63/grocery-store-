
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function AdminAnalytics() {
  const metrics = [
    { label: "Revenue Growth", value: "+24.5%", trend: "up", color: "text-primary" },
    { label: "Customer Retention", value: "87%", trend: "up", color: "text-primary" },
    { label: "Avg Order Value", value: "$45.20", trend: "up", color: "text-primary" },
    { label: "Cart Abandonment", value: "18%", trend: "down", color: "text-destructive" },
  ];

  const topProducts = [
    { name: "Organic Apples", sales: 450, revenue: "$2,245.50" },
    { name: "Fresh Milk", sales: 380, revenue: "$1,326.20" },
    { name: "Chicken Breast", sales: 290, revenue: "$2,607.10" },
    { name: "Greek Yogurt", sales: 250, revenue: "$1,372.50" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className={`text-2xl font-bold ${metric.color}`}>
                  {metric.value}
                </div>
                {metric.trend === "up" ? (
                  <TrendingUp className="h-5 w-5 text-primary" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-destructive" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                    </div>
                  </div>
                  <p className="font-semibold">{product.revenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Sales</span>
                <span className="text-2xl font-bold">$45,231.89</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>This Month</span>
                  <span className="font-medium">$12,450.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Last Month</span>
                  <span className="font-medium">$10,350.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Growth</span>
                  <span className="font-medium text-primary">+20.3%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
