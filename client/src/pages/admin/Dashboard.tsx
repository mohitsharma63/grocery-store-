
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Revenue", value: "$45,231.89", icon: DollarSign, change: "+20.1%" },
    { title: "Orders", value: "2,350", icon: ShoppingCart, change: "+12.5%" },
    { title: "Products", value: "145", icon: Package, change: "+5.2%" },
    { title: "Customers", value: "1,234", icon: Users, change: "+15.3%" },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", total: "$299.00", status: "Completed" },
    { id: "ORD-002", customer: "Jane Smith", total: "$149.00", status: "Processing" },
    { id: "ORD-003", customer: "Bob Johnson", total: "$399.00", status: "Shipped" },
    { id: "ORD-004", customer: "Alice Brown", total: "$199.00", status: "Pending" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.total}</p>
                  <p className="text-sm text-muted-foreground">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
