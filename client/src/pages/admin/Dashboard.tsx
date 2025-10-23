import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, DollarSign, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Revenue", value: "$45,231.89", icon: DollarSign, change: "+20.1%", changeType: "positive" },
    { title: "Orders", value: "2,350", icon: ShoppingCart, change: "+12.5%", changeType: "positive" },
    { title: "Products", value: "145", icon: Package, change: "+5.2%", changeType: "positive" },
    { title: "Customers", value: "1,234", icon: Users, change: "+15.3%", changeType: "positive" },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", total: "$299.00", status: "Completed" },
    { id: "ORD-002", customer: "Jane Smith", total: "$149.00", status: "Processing" },
    { id: "ORD-003", customer: "Bob Johnson", total: "$399.00", status: "Shipped" },
    { id: "ORD-004", customer: "Alice Brown", total: "$199.00", status: "Pending" },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Completed": return "default";
      case "Processing": return "secondary";
      case "Shipped": return "default";
      case "Pending": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-primary" />
                <span className="text-xs font-medium text-primary">{stat.change}</span>
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-lg">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold">{order.total}</p>
                  <Badge variant={getStatusVariant(order.status)} className="min-w-[90px] justify-center">
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}