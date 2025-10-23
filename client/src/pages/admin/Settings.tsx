
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function AdminSettings() {
  return (
    <div className="space-y-6 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="store-name">Store Name</Label>
            <Input id="store-name" defaultValue="Grogin" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="store-email">Store Email</Label>
            <Input id="store-email" type="email" defaultValue="admin@grogin.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="store-phone">Store Phone</Label>
            <Input id="store-phone" defaultValue="+1 234 567 8900" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Order Notifications</p>
              <p className="text-sm text-muted-foreground">Receive notifications for new orders</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Low Stock Alerts</p>
              <p className="text-sm text-muted-foreground">Get alerts when products are low in stock</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Customer Messages</p>
              <p className="text-sm text-muted-foreground">Notifications for customer inquiries</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipping Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shipping-fee">Default Shipping Fee</Label>
            <Input id="shipping-fee" type="number" defaultValue="5.99" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="free-shipping">Free Shipping Threshold</Label>
            <Input id="free-shipping" type="number" defaultValue="50.00" />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button>Save Changes</Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </div>
  );
}
