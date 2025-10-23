import { type User, type InsertUser, type Product, type InsertProduct, type Category, type InsertCategory, type CartItem, type InsertCartItem } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  getAllCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<void>;
  clearCart(sessionId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private categories: Map<string, Category>;
  private cartItems: Map<string, CartItem>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.categories = new Map();
    this.cartItems = new Map();
    this.seedData();
  }

  private seedData() {
    const categories = [
      { name: 'Fruits & Vegetables', slug: 'fruits-vegetables', icon: 'apple' },
      { name: 'Meats & Seafood', slug: 'meats-seafood', icon: 'beef' },
      { name: 'Breakfast & Dairy', slug: 'breakfast-dairy', icon: 'coffee' },
      { name: 'Breads & Bakery', slug: 'breads-bakery', icon: 'bread' },
      { name: 'Beverages', slug: 'beverages', icon: 'wine' },
      { name: 'Frozen Foods', slug: 'frozen-foods', icon: 'snowflake' },
      { name: 'Biscuits & Snacks', slug: 'biscuits-snacks', icon: 'cookie' },
      { name: 'Grocery & Staples', slug: 'grocery-staples', icon: 'shopping-basket' },
    ];

    categories.forEach(cat => {
      const id = randomUUID();
      this.categories.set(id, { id, ...cat });
    });

    const catIds = Array.from(this.categories.keys());

    const products = [
      {
        name: '100 Percent Apple Juice – 64 fl oz Bottle',
        slug: '100-percent-apple-juice-64-fl-oz-bottle',
        description: 'Fresh, organic apple juice with no added sugar or preservatives.',
        price: '0.50',
        originalPrice: '1.99',
        image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop',
        categoryId: catIds[4],
        badge: 'ORGANIC',
        rating: '4.5',
        reviewCount: 3,
        inStock: true,
        featured: true,
        bestSeller: true,
        newArrival: true,
      },
      {
        name: 'Cantaloupe Melon Fresh Organic Cut',
        slug: 'cantaloupe-melon-fresh-organic-cut',
        description: 'Sweet and juicy cantaloupe melon, freshly cut and organic.',
        price: '1.25',
        originalPrice: '1.50',
        image: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=400&h=400&fit=crop',
        categoryId: catIds[0],
        badge: 'ORGANIC',
        rating: '4.8',
        reviewCount: 5,
        inStock: true,
        featured: false,
        bestSeller: true,
        newArrival: false,
      },
      {
        name: 'Great Value Rising Crust Frozen Pizza, Supreme',
        slug: 'great-value-rising-crust-frozen-pizza-supreme',
        description: 'Delicious rising crust pizza with supreme toppings.',
        price: '8.99',
        originalPrice: '9.99',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop',
        categoryId: catIds[5],
        badge: 'COLD SALE',
        rating: '4.2',
        reviewCount: 8,
        inStock: true,
        featured: true,
        bestSeller: true,
        newArrival: false,
      },
      {
        name: 'Simply Orange Pulp Free Juice – 52 fl oz',
        slug: 'simply-orange-pulp-free-juice-52-fl-oz',
        description: 'Pure orange juice with no pulp, fresh and delicious.',
        price: '2.45',
        originalPrice: '4.13',
        image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop',
        categoryId: catIds[4],
        rating: '4.6',
        reviewCount: 12,
        inStock: true,
        featured: false,
        bestSeller: false,
        newArrival: true,
      },
      {
        name: 'California Pizza Kitchen Margherita, Crispy Thin Crust',
        slug: 'california-pizza-kitchen-margherita-crispy-thin-crust',
        description: 'Authentic margherita pizza with crispy thin crust.',
        price: '11.77',
        originalPrice: '14.77',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop',
        categoryId: catIds[5],
        badge: 'COLD SALE',
        rating: '4.7',
        reviewCount: 15,
        inStock: true,
        featured: true,
        bestSeller: false,
        newArrival: true,
      },
      {
        name: 'Angel Soft Toilet Paper, 9 Mega Rolls',
        slug: 'angel-soft-toilet-paper-9-mega-rolls',
        description: 'Soft and strong toilet paper for everyday use.',
        price: '14.12',
        originalPrice: '17.12',
        image: 'https://images.unsplash.com/photo-1584556326561-c8746083993b?w=400&h=400&fit=crop',
        categoryId: catIds[7],
        rating: '4.9',
        reviewCount: 22,
        inStock: true,
        featured: false,
        bestSeller: true,
        newArrival: false,
      },
      {
        name: 'Marketside Fresh Organic Bananas, Bunch',
        slug: 'marketside-fresh-organic-bananas-bunch',
        description: 'Fresh organic bananas, perfect for snacks and smoothies.',
        price: '0.99',
        originalPrice: '1.99',
        image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=400&fit=crop',
        categoryId: catIds[0],
        badge: 'ORGANIC',
        rating: '4.5',
        reviewCount: 18,
        inStock: true,
        featured: true,
        bestSeller: false,
        newArrival: false,
      },
      {
        name: "Lay's Classic Potato Snack Chips, Party Size, 13 oz Bag",
        slug: 'lays-classic-potato-snack-chips-party-size-13-oz-bag',
        description: 'Classic potato chips, perfect for parties and snacking.',
        price: '1.00',
        originalPrice: '1.99',
        image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop',
        categoryId: catIds[6],
        rating: '4.3',
        reviewCount: 25,
        inStock: true,
        featured: false,
        bestSeller: true,
        newArrival: true,
      },
      {
        name: 'Great Value Classic Crust Pepperoni Microwave Frozen Pizza',
        slug: 'great-value-classic-crust-pepperoni-microwave-frozen-pizza',
        description: 'Quick and easy pepperoni pizza, ready in minutes.',
        price: '1.99',
        originalPrice: '3.99',
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=400&fit=crop',
        categoryId: catIds[5],
        badge: 'COLD SALE',
        rating: '4.1',
        reviewCount: 9,
        inStock: true,
        featured: true,
        bestSeller: false,
        newArrival: false,
      },
      {
        name: 'Vital Farms Pasture-Raised Grade A Large Eggs – 12ct',
        slug: 'vital-farms-pasture-raised-grade-a-large-eggs-12ct',
        description: 'Pasture-raised eggs from happy hens, rich and nutritious.',
        price: '3.99',
        originalPrice: '4.99',
        image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop',
        categoryId: catIds[2],
        rating: '4.8',
        reviewCount: 30,
        inStock: true,
        featured: false,
        bestSeller: true,
        newArrival: false,
      },
      {
        name: 'Tillamook Medium Cheddar Cheese Loaf – 32oz',
        slug: 'tillamook-medium-cheddar-cheese-loaf-32oz',
        description: 'Premium medium cheddar cheese, perfect for sandwiches.',
        price: '7.99',
        image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=400&h=400&fit=crop',
        categoryId: catIds[2],
        rating: '4.7',
        reviewCount: 14,
        inStock: true,
        featured: true,
        bestSeller: false,
        newArrival: true,
      },
      {
        name: 'All Natural 85 JG Ground Beef – 1lb',
        slug: 'all-natural-85-jg-ground-beef-1lb',
        description: 'Fresh ground beef, 85% lean, perfect for burgers and tacos.',
        price: '7.75',
        originalPrice: '8.75',
        image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=400&fit=crop',
        categoryId: catIds[1],
        rating: '4.6',
        reviewCount: 11,
        inStock: true,
        featured: false,
        bestSeller: true,
        newArrival: false,
      },
      {
        name: 'ACT Anticavity Fluoride Mouthwash With Zero Alcohol',
        slug: 'act-anticavity-fluoride-mouthwash-with-zero-alcohol',
        description: 'Alcohol-free mouthwash for healthy teeth and gums.',
        price: '2.33',
        originalPrice: '4.33',
        image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop',
        categoryId: catIds[7],
        rating: '4.4',
        reviewCount: 7,
        inStock: true,
        featured: true,
        bestSeller: false,
        newArrival: false,
      },
      {
        name: 'FireSmith Flame Grilled Chicken Breast – Deli Fresh Sliced',
        slug: 'firesmith-flame-grilled-chicken-breast-deli-fresh-sliced',
        description: 'Flame-grilled chicken breast, freshly sliced.',
        price: '15.91',
        originalPrice: '17.01',
        image: 'https://images.unsplash.com/photo-1588347818036-c6296026b249?w=400&h=400&fit=crop',
        categoryId: catIds[1],
        rating: '4.9',
        reviewCount: 20,
        inStock: true,
        featured: false,
        bestSeller: true,
        newArrival: true,
      },
      {
        name: 'Fresh Organic Broccoli Crowns',
        slug: 'fresh-organic-broccoli-crowns',
        description: 'Fresh organic broccoli, packed with nutrients.',
        price: '2.99',
        originalPrice: '3.99',
        image: 'https://images.unsplash.com/photo-1628773822990-202c9cc3cffd?w=400&h=400&fit=crop',
        categoryId: catIds[0],
        badge: 'ORGANIC',
        rating: '4.5',
        reviewCount: 16,
        inStock: true,
        featured: true,
        bestSeller: false,
        newArrival: false,
      },
      {
        name: 'Whole Wheat Bread Loaf',
        slug: 'whole-wheat-bread-loaf',
        description: 'Freshly baked whole wheat bread, healthy and delicious.',
        price: '3.49',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
        categoryId: catIds[3],
        rating: '4.6',
        reviewCount: 13,
        inStock: true,
        featured: false,
        bestSeller: true,
        newArrival: false,
      },
      {
        name: 'Premium Coffee Beans – 12oz',
        slug: 'premium-coffee-beans-12oz',
        description: 'Freshly roasted coffee beans for the perfect cup.',
        price: '8.99',
        originalPrice: '10.99',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
        categoryId: catIds[4],
        rating: '4.8',
        reviewCount: 28,
        inStock: true,
        featured: true,
        bestSeller: true,
        newArrival: true,
      },
      {
        name: 'Mixed Berry Smoothie Pack',
        slug: 'mixed-berry-smoothie-pack',
        description: 'Frozen mixed berries, perfect for smoothies and desserts.',
        price: '5.99',
        image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&h=400&fit=crop',
        categoryId: catIds[5],
        rating: '4.7',
        reviewCount: 19,
        inStock: true,
        featured: false,
        bestSeller: false,
        newArrival: true,
      },
    ];

    products.forEach(prod => {
      const id = randomUUID();
      this.products.set(id, { id, ...prod } as Product);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug,
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { id, ...insertProduct } as Product;
    this.products.set(id, product);
    return product;
  }

  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { id, ...insertCategory };
    this.categories.set(id, category);
    return category;
  }

  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId,
    );
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    const existing = Array.from(this.cartItems.values()).find(
      (item) =>
        item.productId === insertItem.productId &&
        item.sessionId === insertItem.sessionId,
    );

    if (existing) {
      existing.quantity += insertItem.quantity;
      this.cartItems.set(existing.id, existing);
      return existing;
    }

    const id = randomUUID();
    const item: CartItem = { id, ...insertItem };
    this.cartItems.set(id, item);
    return item;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set(id, item);
    }
    return item;
  }

  async removeFromCart(id: string): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    const items = await this.getCartItems(sessionId);
    items.forEach((item) => this.cartItems.delete(item.id));
  }
}

export const storage = new MemStorage();
