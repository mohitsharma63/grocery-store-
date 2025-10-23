# Design Guidelines: Grogin Grocery E-Commerce

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern grocery e-commerce leaders like Instacart, Whole Foods Market online, and Amazon Fresh, combined with the clean, fresh aesthetic shown in the provided designs. This is an experience-focused, visual-rich platform where product presentation drives purchasing decisions.

## Core Design Principles
1. **Fresh & Trustworthy**: Convey product quality and freshness through clean imagery and organized layouts
2. **Efficient Shopping**: Enable quick product discovery with clear categories and intuitive navigation
3. **Deal Visibility**: Prominently showcase discounts and promotions to drive conversions
4. **Mobile-First Responsiveness**: Ensure seamless shopping across all devices

## Color Palette

### Light Mode
- **Primary Green**: 142 71% 45% (Fresh, organic green for CTAs, badges, active states)
- **Secondary Green**: 142 60% 96% (Light green backgrounds for highlights, hover states)
- **Accent Orange**: 25 95% 53% (Discount badges, sale prices, urgency indicators)
- **Text Primary**: 0 0% 13% (Headings, important text)
- **Text Secondary**: 0 0% 45% (Descriptions, secondary information)
- **Border**: 0 0% 88% (Dividers, card outlines)
- **Background**: 0 0% 98% (Page background)
- **Surface White**: 0 0% 100% (Cards, product backgrounds)

### Dark Mode
- **Primary Green**: 142 65% 55%
- **Secondary Green**: 142 40% 15%
- **Accent Orange**: 25 90% 60%
- **Text Primary**: 0 0% 95%
- **Text Secondary**: 0 0% 65%
- **Border**: 0 0% 25%
- **Background**: 0 0% 8%
- **Surface**: 0 0% 12%

## Typography
- **Primary Font**: 'Inter' or 'DM Sans' from Google Fonts (clean, modern sans-serif)
- **Headings**: Font weights 600-700, sizes from text-2xl to text-5xl
- **Body Text**: Font weight 400-500, text-sm to text-base
- **Prices**: Font weight 600-700 for prominence
- **Discount Labels**: Font weight 700, uppercase, text-xs

## Layout System
**Spacing Units**: Consistent use of Tailwind units 2, 4, 6, 8, 12, 16, 20, 24 for a harmonious rhythm.
- **Container**: max-w-7xl with px-4 sm:px-6 lg:px-8
- **Section Spacing**: py-12 md:py-16 lg:py-20
- **Card Padding**: p-4 to p-6
- **Grid Gaps**: gap-4 to gap-6

## Component Library

### Navigation
- **Header**: Sticky navigation with logo, search bar (prominent center), category menu, cart icon with item count badge
- **Category Mega Menu**: Dropdown with multi-column category grid including icons
- **Breadcrumbs**: On product and category pages for navigation context

### Hero Section
- **Design**: Full-width banner showcasing seasonal produce or deals with compelling imagery
- **Content**: Large heading (text-4xl lg:text-5xl), subheading, primary CTA button
- **Height**: h-96 to h-[500px] on desktop
- **Overlay**: If text over image, use subtle dark overlay (bg-black/30) with white text

### Product Cards
- **Structure**: Image (square ratio), product name, price display (current + crossed-out original if discounted), rating stars, quick add button
- **Discount Badge**: Positioned top-right, orange background with white text showing percentage off
- **Hover State**: Subtle scale transform (hover:scale-105), shadow increase, show wishlist and quick view icons
- **Image Container**: bg-gray-50 for product image placeholder, rounded corners (rounded-lg)

### Category Sidebar
- **Layout**: Fixed width on desktop (w-64), collapsible drawer on mobile
- **Sections**: Expandable category groups with checkboxes, price range slider, brand filters
- **Active State**: Green background for selected items

### Shopping Cart
- **Design**: Slide-over panel from right side
- **Items**: Product thumbnail, name, quantity selector (+/- buttons), price, remove option
- **Summary**: Subtotal, taxes, delivery fee breakdown, total in bold
- **CTA**: Large green checkout button

### Promotional Sections
- **Featured Deals**: Grid of 2-4 promotional cards with images, bold discount text, shop now links
- **Feature Highlights**: Icons + text showcasing free delivery, money-back guarantee, secure payment (3-4 columns on desktop)

### Form Elements
- **Input Fields**: Rounded borders (rounded-lg), focus ring in primary green, placeholder text in gray-400
- **Buttons**: 
  - Primary: Green background, white text, rounded-lg, px-6 py-3
  - Secondary: White background, green border and text
  - Icon Buttons: Circular or square with subtle hover backgrounds

### Product Detail Page
- **Image Gallery**: Main large image with thumbnail carousel below
- **Info Panel**: Product title (text-3xl), rating and review count, price (large, bold), quantity selector, add to cart (large green button), wishlist icon
- **Tabs**: Description, Nutritional Info, Reviews with tab navigation
- **Related Products**: Grid showing similar items

## Images
**Hero Images**: 
- Large, high-quality lifestyle images of fresh produce, prepared meals, or happy shoppers
- Seasonal themes (summer fruits, winter vegetables, holiday spreads)
- Placement: Home page hero (full-width), category landing pages

**Product Images**:
- Clean, white-background product photography
- Consistent sizing and lighting
- Square aspect ratio for grid uniformity

**Promotional Banners**:
- Eye-catching graphics for deals (2-3 across home page)
- Mix of product photos with bold typography overlays

## Interactions & Animations
- **Minimal Animations**: Subtle transitions only (duration-200 to duration-300)
- **Hover Effects**: Scale transforms on cards, color transitions on buttons
- **Cart Notifications**: Toast messages on add-to-cart actions
- **Loading States**: Skeleton screens for product grids

## Responsive Breakpoints
- **Mobile** (base): Single column product grids, hamburger menu, stacked layouts
- **Tablet** (md): 2-column product grids, visible category sidebar option
- **Desktop** (lg): 3-4 column product grids, permanent sidebar, multi-column features

## Accessibility
- Color contrast ratios meeting WCAG AA standards
- Keyboard navigation for all interactive elements
- Alt text for all product images
- Focus indicators on form inputs and buttons
- Semantic HTML structure with proper headings

This design creates a fresh, modern grocery shopping experience that builds trust through clean presentation while making deals and promotions immediately visible to drive conversions.