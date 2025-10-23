
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Filter, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const orders = [
    { 
      id: "ORD-001", 
      customer: "John Doe", 
      email: "john@example.com",
      date: "2024-01-15", 
      total: "$299.00", 
      status: "Completed", 
      items: 5,
      products: [
        { name: "Organic Apples", quantity: 2, price: "$4.99" },
        { name: "Fresh Milk", quantity: 1, price: "$3.49" },
        { name: "Whole Wheat Bread", quantity: 2, price: "$2.99" }
      ],
      shipping: {
        address: "123 Main St, New York, NY 10001",
        method: "Standard Shipping"
      }
    },
    { 
      id: "ORD-002", 
      customer: "Jane Smith", 
      email: "jane@example.com",
      date: "2024-01-14", 
      total: "$149.00", 
      status: "Processing", 
      items: 3,
      products: [
        { name: "Greek Yogurt", quantity: 3, price: "$5.49" }
      ],
      shipping: {
        address: "456 Oak Ave, Los Angeles, CA 90001",
        method: "Express Shipping"
      }
    },
    { 
      id: "ORD-003", 
      customer: "Bob Johnson", 
      email: "bob@example.com",
      date: "2024-01-14", 
      total: "$399.00", 
      status: "Shipped", 
      items: 8,
      products: [
        { name: "Premium Coffee Beans", quantity: 2, price: "$8.99" },
        { name: "Angel Soft Toilet Paper", quantity: 1, price: "$14.12" }
      ],
      shipping: {
        address: "789 Pine Rd, Chicago, IL 60601",
        method: "Standard Shipping"
      }
    },
    { 
      id: "ORD-004", 
      customer: "Alice Brown", 
      email: "alice@example.com",
      date: "2024-01-13", 
      total: "$199.00", 
      status: "Pending", 
      items: 4,
      products: [
        { name: "Fresh Organic Broccoli", quantity: 2, price: "$2.99" }
      ],
      shipping: {
        address: "321 Elm St, Houston, TX 77001",
        method: "Standard Shipping"
      }
    },
    { 
      id: "ORD-005", 
      customer: "Charlie Wilson", 
      email: "charlie@example.com",
      date: "2024-01-13", 
      total: "$89.00", 
      status: "Cancelled", 
      items: 2,
      products: [
        { name: "Lay's Classic Potato Chips", quantity: 2, price: "$1.00" }
      ],
      shipping: {
        address: "654 Maple Dr, Phoenix, AZ 85001",
        method: "Standard Shipping"
      }
    },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Completed": return "default";
      case "Processing": return "secondary";
      case "Shipped": return "default";
      case "Pending": return "secondary";
      case "Cancelled": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search orders by ID, customer, or email..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(o => o.status === "Pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(o => o.status === "Processing").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(o => o.status === "Completed").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Order ID</th>
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Items</th>
                  <th className="text-left py-3 px-4">Total</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4 text-muted-foreground">{order.email}</td>
                    <td className="py-3 px-4">{order.date}</td>
                    <td className="py-3 px-4">{order.items}</td>
                    <td className="py-3 px-4 font-medium">{order.total}</td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleViewOrder(order)}
                      >
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

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Complete order information and status
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Customer Information</h4>
                  <p className="text-sm"><strong>Name:</strong> {selectedOrder.customer}</p>
                  <p className="text-sm"><strong>Email:</strong> {selectedOrder.email}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Order Information</h4>
                  <p className="text-sm"><strong>Date:</strong> {selectedOrder.date}</p>
                  <p className="text-sm"><strong>Status:</strong> 
                    <Badge variant={getStatusVariant(selectedOrder.status)} className="ml-2">
                      {selectedOrder.status}
                    </Badge>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Shipping Address</h4>
                <p className="text-sm">{selectedOrder.shipping.address}</p>
                <p className="text-sm"><strong>Method:</strong> {selectedOrder.shipping.method}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Order Items</h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Product</th>
                      <th className="text-left py-2">Quantity</th>
                      <th className="text-left py-2">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.products.map((product: any, index: number) => (
                      <tr key={index} className="border-b">
                        <td className="py-2">{product.name}</td>
                        <td className="py-2">{product.quantity}</td>
                        <td className="py-2">{product.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="font-semibold">Total:</span>
                <span className="text-xl font-bold">{selectedOrder.total}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
