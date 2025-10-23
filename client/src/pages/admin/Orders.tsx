
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Eye } from "lucide-react";

export default function AdminOrders() {
  const orders = [
    { id: "ORD-001", customer: "John Doe", date: "2024-01-15", total: "$299.00", status: "Completed", items: 5 },
    { id: "ORD-002", customer: "Jane Smith", date: "2024-01-14", total: "$149.00", status: "Processing", items: 3 },
    { id: "ORD-003", customer: "Bob Johnson", date: "2024-01-14", total: "$399.00", status: "Shipped", items: 8 },
    { id: "ORD-004", customer: "Alice Brown", date: "2024-01-13", total: "$199.00", status: "Pending", items: 4 },
    { id: "ORD-005", customer: "Charlie Wilson", date: "2024-01-13", total: "$89.00", status: "Cancelled", items: 2 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search orders..." className="pl-10" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Order ID</th>
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Items</th>
                  <th className="text-left py-3 px-4">Total</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4">{order.date}</td>
                    <td className="py-3 px-4">{order.items}</td>
                    <td className="py-3 px-4 font-medium">{order.total}</td>
                    <td className="py-3 px-4">
                      <Badge variant={
                        order.status === "Completed" ? "default" :
                        order.status === "Processing" ? "secondary" :
                        order.status === "Shipped" ? "default" :
                        order.status === "Pending" ? "secondary" : "destructive"
                      }>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
