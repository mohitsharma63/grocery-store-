
import type { Express } from "express";
import { db } from "./db";
import { categories, subcategories, products, cartItems, heroSlides } from "../shared/schema";
import { eq, desc, and } from "drizzle-orm";

export function registerRoutes(app: Express) {
  // ============================================
  // CATEGORIES CRUD
  // ============================================
  
  // Get all categories
  app.get("/api/categories", async (_req, res) => {
    try {
      const allCategories = await db.select().from(categories);
      res.json(allCategories);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get single category
  app.get("/api/categories/:id", async (req, res) => {
    try {
      const [category] = await db
        .select()
        .from(categories)
        .where(eq(categories.id, req.params.id));
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(category);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Create category
  app.post("/api/categories", async (req, res) => {
    try {
      const [newCategory] = await db
        .insert(categories)
        .values(req.body)
        .returning();
      
      res.status(201).json(newCategory);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Update category
  app.put("/api/categories/:id", async (req, res) => {
    try {
      const [updatedCategory] = await db
        .update(categories)
        .set(req.body)
        .where(eq(categories.id, req.params.id))
        .returning();
      
      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(updatedCategory);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Delete category
  app.delete("/api/categories/:id", async (req, res) => {
    try {
      const [deletedCategory] = await db
        .delete(categories)
        .where(eq(categories.id, req.params.id))
        .returning();
      
      if (!deletedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json({ message: "Category deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // ============================================
  // SUBCATEGORIES CRUD
  // ============================================
  
  // Get all subcategories
  app.get("/api/subcategories", async (req, res) => {
    try {
      const { categoryId } = req.query;
      
      let query = db.select().from(subcategories);
      
      if (categoryId) {
        query = query.where(eq(subcategories.categoryId, categoryId as string)) as any;
      }
      
      const allSubcategories = await query;
      res.json(allSubcategories);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get single subcategory
  app.get("/api/subcategories/:id", async (req, res) => {
    try {
      const [subcategory] = await db
        .select()
        .from(subcategories)
        .where(eq(subcategories.id, req.params.id));
      
      if (!subcategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }
      
      res.json(subcategory);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Create subcategory
  app.post("/api/subcategories", async (req, res) => {
    try {
      const [newSubcategory] = await db
        .insert(subcategories)
        .values(req.body)
        .returning();
      
      res.status(201).json(newSubcategory);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Update subcategory
  app.patch("/api/subcategories/:id", async (req, res) => {
    try {
      const [updatedSubcategory] = await db
        .update(subcategories)
        .set(req.body)
        .where(eq(subcategories.id, req.params.id))
        .returning();
      
      if (!updatedSubcategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }
      
      res.json(updatedSubcategory);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Delete subcategory
  app.delete("/api/subcategories/:id", async (req, res) => {
    try {
      const [deletedSubcategory] = await db
        .delete(subcategories)
        .where(eq(subcategories.id, req.params.id))
        .returning();
      
      if (!deletedSubcategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }
      
      res.json({ message: "Subcategory deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // ============================================
  // PRODUCTS CRUD
  // ============================================
  
  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const { category, featured, bestSeller, newArrival } = req.query;
      
      let query = db.select().from(products);
      const conditions = [];
      
      if (category) {
        conditions.push(eq(products.categoryId, category as string));
      }
      if (featured === "true") {
        conditions.push(eq(products.featured, true));
      }
      if (bestSeller === "true") {
        conditions.push(eq(products.bestSeller, true));
      }
      if (newArrival === "true") {
        conditions.push(eq(products.newArrival, true));
      }
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions)) as any;
      }
      
      const allProducts = await query;
      res.json(allProducts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get single product
  app.get("/api/products/:id", async (req, res) => {
    try {
      const [product] = await db
        .select()
        .from(products)
        .where(eq(products.id, req.params.id));
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get product by slug
  app.get("/api/products/slug/:slug", async (req, res) => {
    try {
      const [product] = await db
        .select()
        .from(products)
        .where(eq(products.slug, req.params.slug));
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Create product
  app.post("/api/products", async (req, res) => {
    try {
      const [newProduct] = await db
        .insert(products)
        .values(req.body)
        .returning();
      
      res.status(201).json(newProduct);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Update product
  app.put("/api/products/:id", async (req, res) => {
    try {
      const [updatedProduct] = await db
        .update(products)
        .set(req.body)
        .where(eq(products.id, req.params.id))
        .returning();
      
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(updatedProduct);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Delete product
  app.delete("/api/products/:id", async (req, res) => {
    try {
      const [deletedProduct] = await db
        .delete(products)
        .where(eq(products.id, req.params.id))
        .returning();
      
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json({ message: "Product deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // ============================================
  // CART ITEMS CRUD
  // ============================================
  
  // Get cart items by session
  app.get("/api/cart/:sessionId", async (req, res) => {
    try {
      const items = await db
        .select()
        .from(cartItems)
        .where(eq(cartItems.sessionId, req.params.sessionId));
      
      res.json(items);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Add item to cart
  app.post("/api/cart", async (req, res) => {
    try {
      // Check if item already exists in cart
      const [existingItem] = await db
        .select()
        .from(cartItems)
        .where(
          and(
            eq(cartItems.productId, req.body.productId),
            eq(cartItems.sessionId, req.body.sessionId)
          )
        );

      if (existingItem) {
        // Update quantity if item exists
        const [updated] = await db
          .update(cartItems)
          .set({ quantity: existingItem.quantity + (req.body.quantity || 1) })
          .where(eq(cartItems.id, existingItem.id))
          .returning();
        
        return res.json(updated);
      }

      // Create new cart item
      const [newItem] = await db
        .insert(cartItems)
        .values(req.body)
        .returning();
      
      res.status(201).json(newItem);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Update cart item quantity
  app.put("/api/cart/:id", async (req, res) => {
    try {
      const [updated] = await db
        .update(cartItems)
        .set({ quantity: req.body.quantity })
        .where(eq(cartItems.id, req.params.id))
        .returning();
      
      if (!updated) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Remove item from cart
  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const [deleted] = await db
        .delete(cartItems)
        .where(eq(cartItems.id, req.params.id))
        .returning();
      
      if (!deleted) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json({ message: "Item removed from cart" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Clear cart by session
  app.delete("/api/cart/session/:sessionId", async (req, res) => {
    try {
      await db
        .delete(cartItems)
        .where(eq(cartItems.sessionId, req.params.sessionId));
      
      res.json({ message: "Cart cleared successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // ============================================
  // HERO SLIDES CRUD
  // ============================================
  
  // Get all hero slides
  app.get("/api/hero-slides", async (req, res) => {
    try {
      const { active } = req.query;
      
      let query = db.select().from(heroSlides).orderBy(desc(heroSlides.order));
      
      if (active === "true") {
        query = query.where(eq(heroSlides.isActive, true)) as any;
      }
      
      const slides = await query;
      res.json(slides);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get single hero slide
  app.get("/api/hero-slides/:id", async (req, res) => {
    try {
      const [slide] = await db
        .select()
        .from(heroSlides)
        .where(eq(heroSlides.id, req.params.id));
      
      if (!slide) {
        return res.status(404).json({ message: "Hero slide not found" });
      }
      
      res.json(slide);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Create hero slide
  app.post("/api/hero-slides", async (req, res) => {
    try {
      const [newSlide] = await db
        .insert(heroSlides)
        .values(req.body)
        .returning();
      
      res.status(201).json(newSlide);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Update hero slide
  app.put("/api/hero-slides/:id", async (req, res) => {
    try {
      const [updated] = await db
        .update(heroSlides)
        .set(req.body)
        .where(eq(heroSlides.id, req.params.id))
        .returning();
      
      if (!updated) {
        return res.status(404).json({ message: "Hero slide not found" });
      }
      
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Delete hero slide
  app.delete("/api/hero-slides/:id", async (req, res) => {
    try {
      const [deleted] = await db
        .delete(heroSlides)
        .where(eq(heroSlides.id, req.params.id))
        .returning();
      
      if (!deleted) {
        return res.status(404).json({ message: "Hero slide not found" });
      }
      
      res.json({ message: "Hero slide deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // ============================================
  // ADMIN HERO SLIDES ROUTES
  // ============================================
  
  // Get all hero slides (admin)
  app.get("/api/admin/hero-slides", async (req, res) => {
    try {
      const slides = await db.select().from(heroSlides).orderBy(desc(heroSlides.order));
      res.json(slides);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get single hero slide (admin)
  app.get("/api/admin/hero-slides/:id", async (req, res) => {
    try {
      const [slide] = await db
        .select()
        .from(heroSlides)
        .where(eq(heroSlides.id, req.params.id));
      
      if (!slide) {
        return res.status(404).json({ message: "Hero slide not found" });
      }
      
      res.json(slide);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Create hero slide (admin)
  app.post("/api/admin/hero-slides", async (req, res) => {
    try {
      const [newSlide] = await db
        .insert(heroSlides)
        .values(req.body)
        .returning();
      
      res.status(201).json(newSlide);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Update hero slide (admin)
  app.put("/api/admin/hero-slides/:id", async (req, res) => {
    try {
      const [updated] = await db
        .update(heroSlides)
        .set(req.body)
        .where(eq(heroSlides.id, req.params.id))
        .returning();
      
      if (!updated) {
        return res.status(404).json({ message: "Hero slide not found" });
      }
      
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Delete hero slide (admin)
  app.delete("/api/admin/hero-slides/:id", async (req, res) => {
    try {
      const [deleted] = await db
        .delete(heroSlides)
        .where(eq(heroSlides.id, req.params.id))
        .returning();
      
      if (!deleted) {
        return res.status(404).json({ message: "Hero slide not found" });
      }
      
      res.json({ message: "Hero slide deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
}
