# E-Commerce Platform Implementation Guide

This document provides a comprehensive guide to the creator e-commerce platform built with Next.js 14, Sanity CMS, Stripe, ShipStation, and Kajabi.

## 🎯 Features Implemented

### 1. Product Management (Sanity CMS)
- ✅ Product catalog with variants (sizes, colors)
- ✅ Inventory tracking per variant
- ✅ Low stock alerts
- ✅ Product images with alt text
- ✅ Custom desk structure with inventory dashboard
- ✅ Filtered views (Low Stock, Out of Stock, In Stock)
- ✅ Category organization (Books, T-Shirts, Hoodies, Accessories)

### 2. E-Commerce Frontend
- ✅ Product listing page (`/products`)
- ✅ Product detail page with variant selection (`/products/[slug]`)
- ✅ Real-time stock status display
- ✅ Size and color selectors
- ✅ Responsive design with Tailwind CSS
- ✅ SEO-optimized metadata

### 3. Payment Processing (Stripe)
- ✅ Stripe Checkout integration
- ✅ Support for physical and digital products
- ✅ Shipping address collection (US, CA)
- ✅ Multiple shipping options (Standard $5, Express $15)
- ✅ Automatic tax calculation
- ✅ Secure webhook handling

### 4. Order Fulfillment (ShipStation)
- ✅ Automatic order creation on purchase
- ✅ Customer and shipping details mapping
- ✅ SKU and product information
- ✅ Weight-based shipping
- ✅ Order status tracking

### 5. Digital Product Delivery (Kajabi)
- ✅ Automatic course enrollment on upsell purchase
- ✅ Member creation with email and name
- ✅ External user ID tracking
- ✅ Tag-based segmentation

### 6. Upsell Flow
- ✅ Thank you page with order summary (`/thank-you`)
- ✅ First upsell offer with product details
- ✅ Second upsell page (`/upsell-2`)
- ✅ Final confirmation page (`/thank-you/complete`)
- ✅ Accept/decline functionality
- ✅ Discount display

### 7. Inventory Management
- ✅ Automatic inventory decrement on purchase
- ✅ Low stock email alerts
- ✅ Backorder support
- ✅ Reserved inventory tracking
- ✅ Availability checking before checkout

## 📁 Project Structure

```
jomo-cousins/
├── app/
│   ├── (shop)/
│   │   ├── products/
│   │   │   ├── page.tsx                    # Product listing
│   │   │   └── [slug]/
│   │   │       ├── page.tsx                # Product detail
│   │   │       └── ProductActions.tsx      # Variant selector
│   │   ├── thank-you/
│   │   │   ├── page.tsx                    # Order confirmation + Upsell 1
│   │   │   ├── UpsellOffer.tsx             # Upsell component
│   │   │   └── complete/
│   │   │       └── page.tsx                # Final confirmation
│   │   └── upsell-2/
│   │       └── page.tsx                    # Second upsell
│   └── api/
│       ├── create-checkout/
│       │   └── route.ts                    # Stripe checkout creation
│       └── webhooks/
│           └── stripe/
│               └── route.ts                # Stripe webhook handler
├── lib/
│   ├── types.ts                            # TypeScript interfaces
│   ├── inventory.ts                        # Inventory management
│   └── shipstation.ts                      # ShipStation integration
├── sanity/
│   ├── schemas/
│   │   └── documents/
│   │       ├── product.ts                  # Product schema
│   │       └── digitalProduct.ts           # Digital product schema
│   ├── plugins/
│   │   └── productStructure.tsx            # Custom desk structure
│   └── lib/
│       └── queries.ts                      # GROQ queries
└── .env.local                              # Environment variables
```

## 🚀 Getting Started

### 1. Environment Variables Setup

Update `.env.local` with your actual credentials:

```bash
# Stripe Webhook Secret
# 1. Go to https://dashboard.stripe.com/webhooks
# 2. Create endpoint: https://yourdomain.com/api/webhooks/stripe
# 3. Select event: checkout.session.completed
# 4. Copy the signing secret
STRIPE_WEBHOOK_SECRET=whsec_your_actual_secret_here

# Kajabi API Key
# 1. Go to Kajabi Settings -> Integrations -> API
# 2. Generate new API key
# 3. Copy the key
KAJABI_API_KEY=your_actual_kajabi_key_here

# Update production URL when deploying
NEXT_PUBLIC_URL=https://yourdomain.com
```

### 2. Run Type Generation

```bash
npm run typegen
```

This generates TypeScript types from your Sanity schemas.

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### 4. Access Sanity Studio

Navigate to `http://localhost:3000/studio` to manage products and content.

## 📦 Creating Products

### Physical Products

1. Go to Sanity Studio (`/studio`)
2. Click "Products" → "All Products"
3. Create new product with:
   - **Name**: Product name
   - **Slug**: Auto-generated from name
   - **Description**: Rich text description
   - **Category**: Select category
   - **Images**: Upload product images
   - **Base Price**: Default price in dollars
   - **Stripe Price ID**: Get from Stripe Dashboard
   - **Weight**: Weight in ounces for shipping
   - **Variants**: Add SKUs with:
     - Unique SKU
     - Size (S, M, L, XL, etc.)
     - Color with hex code
     - Inventory count
     - Optional variant-specific price
     - Optional variant image
   - **Low Stock Threshold**: Alert level (default: 5)
   - **Status**: Active/Draft/Archived

### Digital Products (Upsells)

1. Go to "Digital Products"
2. Create new digital product with:
   - **Name**: Course/product name
   - **Price**: Upsell price
   - **Stripe Price ID**: Get from Stripe Dashboard
   - **Kajabi Offer ID**: Get from Kajabi
   - **Upsell Position**: upsell_1 or upsell_2
   - **Headline**: Compelling headline
   - **Bullet Points**: Key benefits
   - **Discount**: Percentage off (optional)
   - **Status**: Active

## 🔄 Customer Purchase Flow

### Physical Product Purchase

1. **Customer browses** `/products`
2. **Selects product** → `/products/[slug]`
3. **Chooses variant** (size, color)
4. **Clicks "Buy Now"** → Creates Stripe Checkout
5. **Enters shipping info** and payment
6. **Completes payment** → Redirects to `/thank-you?session_id=xxx`

### Webhook Processing (Automatic)

When payment completes, the webhook (`/api/webhooks/stripe`) automatically:

1. ✅ Verifies webhook signature
2. ✅ Decrements inventory in Sanity
3. ✅ Checks for low stock → sends email alert if needed
4. ✅ Creates ShipStation order for fulfillment
5. ✅ Logs all actions

### Upsell Flow

1. **Thank you page** shows order summary + first upsell
2. **Customer accepts** → Creates new Stripe checkout
3. **Completes payment** → Webhook enrolls in Kajabi
4. **Redirects to** `/upsell-2` for second offer
5. **Final page** → `/thank-you/complete`

## 🔔 Inventory Alerts

### Low Stock Email

When inventory falls below threshold (default: 5), an email is sent to:

**To**: `GOOGLE_EMAIL` (configured in `.env.local`)

**Subject**: `🟡 Low Stock Alert: [Product Name] (SKU: [SKU])`

**Content**:
- Product name
- SKU
- Current inventory count
- Threshold level
- Direct link to Sanity Studio

### Email Configuration

The system uses Gmail SMTP. To use a different email provider, update in `.env.local`:

```bash
MAIL_HOST=smtp.your-provider.com
MAIL_PORT=587  # or 465 for SSL
GOOGLE_EMAIL=your-email@example.com
GOOGLE_EMAIL_PASSWORD=your-app-password
```

**Important**: Use an app-specific password, not your main email password.

## 🎨 Customization

### Changing Shipping Options

Edit `app/api/create-checkout/route.ts`:

```typescript
const shippingOptions = [
  {
    shipping_rate_data: {
      fixed_amount: { amount: 500, currency: "usd" }, // $5.00
      display_name: "Standard Shipping",
      delivery_estimate: {
        minimum: { unit: "business_day", value: 5 },
        maximum: { unit: "business_day", value: 7 },
      },
    },
  },
  // Add more options...
];
```

### Customizing Product Categories

Edit `sanity/schemas/documents/product.ts`:

```typescript
options: {
  list: [
    { title: "Books", value: "books" },
    { title: "T-Shirts", value: "tshirts" },
    // Add your categories...
  ],
}
```

### Adjusting Low Stock Threshold

In Sanity Studio, each product has a configurable `lowStockThreshold` field (default: 5).

## 🧪 Testing

### Test Stripe Checkout

1. Use test mode credentials (already configured)
2. Test card: `4242 4242 4242 4242`
3. Expiry: Any future date
4. CVC: Any 3 digits
5. ZIP: Any 5 digits

### Test Webhook Locally

Use Stripe CLI:

```bash
# Install Stripe CLI
# https://stripe.com/docs/stripe-cli

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# This will output your webhook signing secret
# Copy it to STRIPE_WEBHOOK_SECRET in .env.local

# Trigger a test event
stripe trigger checkout.session.completed
```

## 📊 Sanity Studio Features

### Inventory Dashboard

Access at `/studio` → Products → Inventory Dashboard

**Filtered Views**:
- 🟡 **Low Stock Items**: Products at or below threshold
- 🔴 **Out of Stock**: Products with 0 inventory
- 🟢 **All In Stock**: Products with available inventory

**Category Views**:
- 📚 Books
- 👕 T-Shirts
- 🧥 Hoodies
- 🎒 Accessories

### Product Previews

Products show:
- ✓/📝/📦 Status indicator
- Number of variants
- Total inventory across all variants
- Category

Variants show:
- 🟢/🟡/🔴 Stock status emoji
- Size and color
- Current inventory count

## 🔐 Security

### Webhook Verification

All Stripe webhooks are verified using signature validation:

```typescript
const event = stripe.webhooks.constructEvent(
  body,
  signature,
  webhookSecret
);
```

### Inventory Validation

Before creating checkout, inventory is checked:

```typescript
const availability = await checkInventoryAvailability(sku, quantity);
if (!availability.available) {
  return error("Out of stock");
}
```

## 🚨 Troubleshooting

### "Out of Stock" but inventory shows available

**Solution**: Check if `trackInventory` is enabled for the product in Sanity.

### Webhook not receiving events

**Solution**:
1. Verify `STRIPE_WEBHOOK_SECRET` is correct
2. Check Stripe Dashboard → Webhooks → Recent deliveries
3. Ensure webhook endpoint is accessible (use ngrok for local testing)

### ShipStation order not created

**Solution**:
1. Check `SHIPSTATION_API_KEY` and `SHIPSTATION_API_SECRET`
2. Verify ShipStation API is enabled in your account
3. Check webhook logs in terminal

### Kajabi enrollment failed

**Solution**:
1. Verify `KAJABI_API_KEY` is valid
2. Check that `kajabiOfferId` matches an active offer
3. Ensure Kajabi API is enabled

### Email alerts not sending

**Solution**:
1. Verify Gmail credentials in `.env.local`
2. Enable "Less secure app access" or use App Password
3. Check SMTP settings (host, port)

## 📈 Next Steps

### Recommended Enhancements

1. **Add product reviews** - Create review schema and display
2. **Implement cart functionality** - Multi-item checkout
3. **Add wishlist** - Save items for later
4. **Customer accounts** - Order history, saved addresses
5. **Product search** - Algolia or built-in search
6. **Email marketing** - Mailchimp integration
7. **Analytics** - Google Analytics, Facebook Pixel
8. **A/B testing** - Test upsell offers
9. **Subscription products** - Recurring billing
10. **Gift cards** - Digital gift certificates

### Production Checklist

Before deploying to production:

- [ ] Update all environment variables with production values
- [ ] Switch Stripe from test mode to live mode
- [ ] Update `NEXT_PUBLIC_URL` to production domain
- [ ] Set up Stripe webhook endpoint on production URL
- [ ] Test complete purchase flow end-to-end
- [ ] Verify ShipStation integration in production
- [ ] Test Kajabi enrollment with real offer
- [ ] Set up monitoring and error tracking (Sentry)
- [ ] Configure proper email SMTP for alerts
- [ ] Review Sanity access tokens and permissions
- [ ] Enable Sanity production dataset
- [ ] Set up backup/restore procedures
- [ ] Configure CDN and caching

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [ShipStation API Docs](https://www.shipstation.com/docs/api/)
- [Kajabi API Reference](https://developers.kajabi.com/)

## 🆘 Support

For questions or issues:

1. Check this documentation
2. Review error logs in terminal
3. Check Stripe Dashboard for payment issues
4. Verify Sanity Studio for data issues
5. Contact platform support (Stripe, ShipStation, Kajabi)

---

**Built with ❤️ using Next.js, Sanity, Stripe, ShipStation, and Kajabi**
