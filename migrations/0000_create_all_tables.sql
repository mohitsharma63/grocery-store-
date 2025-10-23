
-- Create categories table
CREATE TABLE IF NOT EXISTS "categories" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"icon" text
);

-- Create products table
CREATE TABLE IF NOT EXISTS "products" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"description" text,
	"price" numeric(10, 2) NOT NULL,
	"original_price" numeric(10, 2),
	"image" text NOT NULL,
	"images" text[],
	"category_id" varchar REFERENCES "categories"("id"),
	"badge" text,
	"rating" numeric(2, 1),
	"review_count" integer DEFAULT 0,
	"in_stock" boolean DEFAULT true NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"best_seller" boolean DEFAULT false NOT NULL,
	"new_arrival" boolean DEFAULT false NOT NULL
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS "cart_items" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),
	"product_id" varchar NOT NULL REFERENCES "products"("id"),
	"quantity" integer DEFAULT 1 NOT NULL,
	"session_id" text NOT NULL
);

-- Create hero_slides table
CREATE TABLE IF NOT EXISTS "hero_slides" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" text NOT NULL,
	"subtitle" text,
	"description" text,
	"image" text NOT NULL,
	"button_text" text,
	"button_link" text,
	"badge" text,
	"order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "idx_products_category" ON "products"("category_id");
CREATE INDEX IF NOT EXISTS "idx_products_slug" ON "products"("slug");
CREATE INDEX IF NOT EXISTS "idx_cart_items_session" ON "cart_items"("session_id");
CREATE INDEX IF NOT EXISTS "idx_cart_items_product" ON "cart_items"("product_id");
CREATE INDEX IF NOT EXISTS "idx_hero_slides_order" ON "hero_slides"("order");
CREATE INDEX IF NOT EXISTS "idx_hero_slides_active" ON "hero_slides"("is_active");
