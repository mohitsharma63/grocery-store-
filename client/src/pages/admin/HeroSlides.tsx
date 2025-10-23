import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, MoveUp, MoveDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { HeroSlide } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function AdminHeroSlides() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    buttonText: "",
    buttonLink: "",
    badge: "",
    order: 0,
    isActive: true,
  });
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: slides = [] } = useQuery<HeroSlide[]>({
    queryKey: ["admin-hero-slides"],
    queryFn: async () => {
      const response = await fetch("/api/admin/hero-slides");
      if (!response.ok) throw new Error("Failed to fetch slides");
      return response.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch("/api/admin/hero-slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create slide");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hero-slides"] });
      queryClient.invalidateQueries({ queryKey: ["hero-slides"] });
      toast({ title: "Slide created successfully" });
      setIsDialogOpen(false);
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<typeof formData> }) => {
      const response = await fetch(`/api/admin/hero-slides/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update slide");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hero-slides"] });
      queryClient.invalidateQueries({ queryKey: ["hero-slides"] });
      toast({ title: "Slide updated successfully" });
      setIsDialogOpen(false);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/hero-slides/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete slide");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hero-slides"] });
      queryClient.invalidateQueries({ queryKey: ["hero-slides"] });
      toast({ title: "Slide deleted successfully" });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      image: "",
      buttonText: "",
      buttonLink: "",
      badge: "",
      order: 0,
      isActive: true,
    });
    setEditingSlide(null);
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle || "",
      description: slide.description || "",
      image: slide.image,
      buttonText: slide.buttonText || "",
      buttonLink: slide.buttonLink || "",
      badge: slide.badge || "",
      order: slide.order,
      isActive: slide.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSlide) {
      updateMutation.mutate({ id: editingSlide.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const toggleActive = (slide: HeroSlide) => {
    updateMutation.mutate({
      id: slide.id,
      data: { isActive: !slide.isActive },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Hero Slides</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Slide
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingSlide ? "Edit Slide" : "Add New Slide"}</DialogTitle>
              <DialogDescription>
                {editingSlide ? "Update slide details" : "Create a new hero slide"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL *</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      Upload
                    </Button>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData({ ...formData, image: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {formData.image && (
                    <div className="mt-2">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-md border"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="badge">Badge Text</Label>
                <Input
                  id="badge"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input
                    id="buttonText"
                    value={formData.buttonText}
                    onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buttonLink">Button Link</Label>
                  <Input
                    id="buttonLink"
                    value={formData.buttonLink}
                    onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="order">Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">
                  {editingSlide ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {slides.map((slide) => (
          <Card key={slide.id}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{slide.title}</h3>
                      {slide.subtitle && (
                        <p className="text-muted-foreground">{slide.subtitle}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={slide.isActive ? "default" : "secondary"}>
                        {slide.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant="outline">Order: {slide.order}</Badge>
                    </div>
                  </div>
                  {slide.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {slide.description}
                    </p>
                  )}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(slide)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleActive(slide)}
                    >
                      {slide.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteMutation.mutate(slide.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}