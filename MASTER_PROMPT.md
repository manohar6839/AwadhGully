# 🛍️ Awadh Gully E-commerce Platform - Master Prompt

## Project Overview

Create a complete, production-ready e-commerce platform called **Awadh Gully** that specializes in regional Indian goods (traditional foods, handicrafts, and cultural products). The platform should be built using a modern headless architecture with Next.js frontend and Vendure backend, configured specifically for the Indian market.

---

## 🎯 Core Requirements

### Business Requirements

- **Target Market**: India (Uttar Pradesh region, specifically Lucknow)
- **Currency**: Indian Rupee (INR) with proper formatting (₹ symbol)
- **Product Focus**: Traditional Awadhi cuisine and regional products
- **User Experience**: Seamless shopping with cart, checkout, and payment flow
- **Branding**: "Awadh Gully" - celebrating regional heritage

### Technical Requirements

- **Architecture**: Headless e-commerce (decoupled frontend/backend)
- **Frontend**: Next.js 14 with TypeScript
- **Backend**: Vendure headless commerce framework
- **API**: GraphQL with type-safe queries
- **Database**: SQLite (development) / PostgreSQL (production-ready)
- **Repository**: Monorepo structure with Lerna
- **Version Control**: Git with main branch as default

---

## 📁 Project Structure

Create a monorepo with the following structure:

```
AwadhGully/
├── storefront/              # Next.js frontend (Port 3001)
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── organisms/   # Complex components (Hero, Navigation)
│   │   │   └── pages/       # Page-specific components
│   │   │       ├── checkout/
│   │   │       │   └── components/
│   │   │       │       ├── OrderForm/
│   │   │       │       └── OrderPayment.tsx
│   │   ├── layouts/         # Layout components
│   │   │   └── layout.tsx
│   │   ├── pages/           # Next.js pages
│   │   └── theme/           # Theme configuration
│   ├── public/
│   │   └── locales/         # i18next translations
│   ├── .env                 # Environment variables
│   └── package.json
│
├── vendure/                 # Vendure backend (Port 3000)
│   ├── packages/
│   │   └── dev-server/
│   │       ├── dev-config.ts           # Backend configuration
│   │       ├── populate-awadh.ts       # Database population script
│   │       ├── add-payment-method.ts   # Payment setup script
│   │       └── index.ts                # Server entry point
│   ├── vendure.sqlite       # SQLite database
│   └── package.json
│
├── gemini.md                # Project intelligence & documentation
├── README.md                # Comprehensive project documentation
└── .gitignore
```

---

## 🛠 Technology Stack Implementation

### Frontend Stack

```json
{
  "framework": "Next.js 14",
  "language": "TypeScript",
  "styling": "Styled Components + Emotion",
  "graphql": "GraphQL Zeus (type-safe queries)",
  "i18n": "next-i18next",
  "icons": "Lucide Icons",
  "state": "React Context/Hooks"
}
```

### Backend Stack

```json
{
  "framework": "Vendure",
  "language": "TypeScript",
  "api": "GraphQL (Apollo Server)",
  "database": "SQLite (dev) / PostgreSQL (prod)",
  "orm": "TypeORM",
  "runtime": "Node.js with ts-node"
}
```

---

## 🚀 Step-by-Step Implementation Guide

### Phase 1: Project Initialization

#### 1.1 Create Repository Structure

```bash
mkdir AwadhGully && cd AwadhGully
git init
git checkout -b main
```

#### 1.2 Initialize Storefront (Next.js)

```bash
npx create-next-app@14 storefront --typescript --no-tailwind
cd storefront
npm install @emotion/styled @emotion/react graphql-zeus next-i18next lucide-react
```

**Environment Configuration** (`storefront/.env`):

```env
NEXT_PUBLIC_HOST="http://localhost:3000/shop-api"
```

#### 1.3 Initialize Vendure Backend

```bash
cd ..
npx @vendure/create vendure
cd vendure
npm install better-sqlite3 sql.js
```

---

### Phase 2: Backend Configuration

#### 2.1 Configure Vendure for India (`vendure/packages/dev-server/dev-config.ts`)

**Key Configurations**:

- Set default currency to INR
- Configure India as default country
- Set up Uttar Pradesh as default zone
- Enable proper stock level display
- Configure asset storage

```typescript
import { VendureConfig } from "@vendure/core";
import { defaultEmailHandlers, EmailPlugin } from "@vendure/email-plugin";
import { AssetServerPlugin } from "@vendure/asset-server-plugin";
import { AdminUiPlugin } from "@vendure/admin-ui-plugin";
import path from "path";

// Stock Display Strategy
export class ExactStockDisplayStrategy implements StockDisplayStrategy {
  getStockLevel(
    ctx: RequestContext,
    productVariant: ProductVariant,
    saleableStockLevel: number,
  ): string {
    return saleableStockLevel.toString();
  }
}

export const config: VendureConfig = {
  apiOptions: {
    port: 3000,
    adminApiPath: "admin-api",
    shopApiPath: "shop-api",
  },
  authOptions: {
    tokenMethod: ["bearer", "cookie"],
    superadminCredentials: {
      identifier: "superadmin@vendure.io",
      password: "superadmin",
    },
  },
  dbConnectionOptions: {
    type: "better-sqlite3",
    synchronize: true,
    database: path.join(__dirname, "../../vendure.sqlite"),
  },
  catalogOptions: {
    stockDisplayStrategy: new ExactStockDisplayStrategy(),
  },
  plugins: [
    AssetServerPlugin.init({
      route: "assets",
      assetUploadDir: path.join(__dirname, "../../assets"),
    }),
    EmailPlugin.init({
      handlers: defaultEmailHandlers,
      templatePath: path.join(__dirname, "../email/templates"),
      outputPath: path.join(__dirname, "../email/output"),
    }),
    AdminUiPlugin.init({
      route: "admin",
      port: 3000,
    }),
  ],
};
```

#### 2.2 Create Database Population Script (`populate-awadh.ts`)

**Must Include**:

1. **Initial Data Setup**:
   - Create India as country with INR currency
   - Set up Uttar Pradesh zone with Lucknow
   - Configure tax rates for India
   - Create shipping methods

2. **Payment Method Configuration**:

```typescript
// Create Standard Payment Method
await adminClient.mutate(CREATE_PAYMENT_METHOD, {
  input: {
    code: "standard-payment",
    name: "Standard Payment",
    description: "Standard payment method for Awadh Gully",
    enabled: true,
    handler: {
      code: "dummy-payment-handler",
      arguments: [],
    },
  },
});
```

3. **Product Catalog**:
   - **Biryani** (Awadhi Biryani, ₹450)
   - **Galouti Kebab** (Melt-in-mouth kebabs, ₹350)
   - **Phirni** (Traditional dessert, ₹150)
   - Add 3-5 high-quality images per product
   - Set proper stock levels (e.g., "100")
   - Include detailed descriptions

4. **Collections**:
   - "All Products" collection
   - Category-based collections (Food, Desserts, etc.)

**Sample Product Creation**:

```typescript
const biryani = await adminClient.mutate(CREATE_PRODUCT, {
  input: {
    translations: [
      {
        languageCode: LanguageCode.en,
        name: "Awadhi Biryani",
        slug: "awadhi-biryani",
        description:
          "Authentic Awadhi-style biryani with aromatic spices and tender meat",
      },
    ],
    facetValueIds: [],
  },
});

// Create variant with price in INR
await adminClient.mutate(CREATE_PRODUCT_VARIANTS, {
  input: [
    {
      productId: biryani.id,
      sku: "BIRYANI-001",
      price: 45000, // ₹450 (in paise)
      stockOnHand: 100,
      translations: [
        {
          languageCode: LanguageCode.en,
          name: "Awadhi Biryani",
        },
      ],
    },
  ],
});

// Add multiple images
await adminClient.mutate(UPDATE_PRODUCT, {
  input: {
    id: biryani.id,
    assetIds: [image1.id, image2.id, image3.id],
    featuredAssetId: image1.id,
  },
});
```

---

### Phase 3: Frontend Development

#### 3.1 Layout Configuration (`storefront/src/layouts/layout.tsx`)

**Requirements**:

- Site title: "Awadh Gully"
- Remove Aexol branding
- Clean navigation (Home, Products, Collections, Cart)
- Responsive header with logo
- Footer with basic information

#### 3.2 Hero Section (`storefront/src/components/organisms/Hero.tsx`)

**Requirements**:

- Eye-catching hero with brand-appropriate background
- Call-to-action button linking to products
- Responsive design
- Modern aesthetics with gradients/animations

#### 3.3 Currency Formatting

**Create utility function** (`storefront/src/utils/formatPrice.ts`):

```typescript
export const formatPrice = (
  price: number,
  currencyCode: string = "INR",
): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
  }).format(price / 100); // Convert paise to rupees
};
```

**Usage**: Apply to all price displays (product cards, cart, checkout)

#### 3.4 Checkout Form (`OrderForm/index.tsx`)

**Default Values Configuration**:

```typescript
const defaultFormValues = {
  emailAddress: "",
  firstName: "",
  lastName: "",
  streetLine1: "",
  streetLine2: "",
  city: "Lucknow", // Default city
  province: "Uttar Pradesh", // Default province
  postalCode: "",
  countryCode: "IN", // Default country: India
  phoneNumber: "",
};
```

**Country Dropdown**:

- Pre-select India
- Ensure proper value binding
- Handle country change events

#### 3.5 Payment Component (`OrderPayment.tsx`)

**Requirements**:

- Display available payment methods from backend
- Show warning if no payment methods configured
- Handle payment submission
- Error handling with user-friendly messages

```typescript
// Check for payment methods
if (!paymentMethods || paymentMethods.length === 0) {
  return (
    <div className="warning">
      ⚠️ No payment methods available. Please contact support.
    </div>
  );
}

// Payment submission
const handlePayment = async () => {
  try {
    const result = await addPaymentToOrder({
      method: selectedPaymentMethod,
      metadata: {},
    });

    if (result.success) {
      router.push('/order-confirmation');
    }
  } catch (error) {
    setError('Payment failed. Please try again.');
  }
};
```

---

### Phase 4: Critical Fixes & Optimizations

#### 4.1 Payment Method Fix

**Issue**: Submit Payment button non-functional due to missing payment methods

**Solution**:

1. Create one-time script (`add-payment-method.ts`) to add payment method to existing database
2. Update `populate-awadh.ts` to include payment method for fresh setups
3. Add frontend validation in `OrderPayment.tsx`

#### 4.2 Currency Display Fix

**Issue**: Showing "INR100" instead of "₹100"

**Solution**: Use `Intl.NumberFormat` with 'en-IN' locale throughout the application

#### 4.3 Checkout Form Defaults

**Issue**: Users had to manually select country, province, city

**Solution**: Set default values in form initialization for Indian market

#### 4.4 Product Images

**Requirement**: Add 3-5 high-quality images per product for professional appearance

---

### Phase 5: Documentation

#### 5.1 Create `gemini.md` - Project Intelligence Profile

**Sections**:

1. Project Overview
2. Tech Stack
3. Configuration & Environment
4. Branding & UI Details
5. Key File Locations
6. Professional Best Practices
7. Technical Learnings & Fixes (chronological log)

**Purpose**: AI-friendly documentation for efficient development

#### 5.2 Create `README.md` - Comprehensive Documentation

**Sections**:

1. Project header with branding
2. Features list (10+ key features)
3. Tech stack table
4. Project structure tree
5. Quick start guide with step-by-step instructions
6. Configuration examples
7. Port mapping
8. Documentation links
9. Contributing guidelines
10. Author & acknowledgments

**Formatting**:

- Use emojis for visual appeal
- Tables for structured data
- Code blocks with syntax highlighting
- Clear section headers

#### 5.3 Update GitHub Repository

**Repository Description**:

```
🛍️ Awadh Gully - Modern e-commerce platform for regional Indian goods built with Next.js & Vendure headless framework. Features INR currency, GraphQL API, and professional checkout flow.
```

**Topics/Tags**:

- ecommerce
- nextjs
- vendure
- graphql
- typescript
- headless-commerce
- india
- monorepo

---

## ⚙️ Configuration Details

### Port Configuration

- **Storefront**: 3001 (`npm run dev -- -p 3001`)
- **Backend Shop API**: 3000 (`/shop-api`)
- **Admin UI**: 3000 (`/admin`)

### Environment Variables

**Storefront** (`.env`):

```env
NEXT_PUBLIC_HOST="http://localhost:3000/shop-api"
```

**Backend**:

```bash
DB=sqlite  # For development
```

### Default Credentials

- **Admin Email**: `superadmin@vendure.io`
- **Admin Password**: `superadmin`

---

## 🎨 Design & Branding Guidelines

### Color Scheme

- Primary: Warm colors reflecting Awadhi culture
- Accent: Gold/saffron tones
- Background: Clean whites with subtle textures

### Typography

- Headers: Bold, clear fonts
- Body: Readable sans-serif
- Prices: Prominent display with INR symbol

### UI/UX Principles

1. **India-First**: All defaults set for Indian users
2. **Clarity**: Clear product information and pricing
3. **Trust**: Professional design with proper error handling
4. **Speed**: Optimized loading and navigation
5. **Mobile**: Responsive design for all devices

---

## 🔧 Development Workflow

### Initial Setup

```bash
# 1. Clone/Create repository
git init
git checkout -b main

# 2. Install dependencies
npm install  # In both storefront and vendure directories

# 3. Set up environment variables
# Create .env files as specified above

# 4. Populate database
cd vendure/packages/dev-server
DB=sqlite npx ts-node populate-awadh.ts

# 5. Start backend
DB=sqlite npx ts-node index.ts

# 6. Start frontend (in new terminal)
cd storefront
npm run dev -- -p 3001
```

### Running the Application

```bash
# Terminal 1: Backend
cd vendure
lsof -i :3000 -t | xargs kill -9 && cd packages/dev-server && DB=sqlite npx ts-node index.ts

# Terminal 2: Frontend
cd storefront
npm run dev -- -p 3001
```

### Access Points

- **Storefront**: http://localhost:3001
- **Admin UI**: http://localhost:3000/admin
- **Shop API**: http://localhost:3000/shop-api
- **GraphQL Playground**: http://localhost:3000/shop-api (if enabled)

---

## 🧪 Testing & Verification

### Manual Testing Checklist

#### Product Browsing

- [ ] Products display with correct INR pricing (₹ symbol)
- [ ] Multiple product images load correctly
- [ ] Stock levels show as numbers
- [ ] Product descriptions are complete

#### Cart Functionality

- [ ] Add to cart works
- [ ] Cart displays correct prices in INR
- [ ] Quantity updates work
- [ ] Remove from cart works

#### Checkout Flow

- [ ] Form defaults to India, Uttar Pradesh, Lucknow
- [ ] Country dropdown shows India selected
- [ ] All form fields validate properly
- [ ] Shipping address saves correctly

#### Payment

- [ ] Payment methods display
- [ ] Payment submission works
- [ ] Order confirmation shows
- [ ] Error handling works (if payment fails)

#### Admin Panel

- [ ] Can log in with superadmin credentials
- [ ] Products visible and editable
- [ ] Orders appear after checkout
- [ ] Payment methods configured

---

## 📊 Database Schema Essentials

### Key Entities

**Country**:

- Code: 'IN'
- Name: 'India'
- Enabled: true

**Zone** (Uttar Pradesh):

- Name: 'Uttar Pradesh'
- Members: India

**Currency**:

- Code: 'INR'
- Symbol: '₹'
- Enabled: true

**Tax Rate**:

- Name: 'India GST'
- Value: 18% (or as appropriate)
- Zone: Uttar Pradesh

**Shipping Method**:

- Code: 'standard-shipping'
- Name: 'Standard Shipping'
- Price: ₹50 (5000 paise)

**Payment Method**:

- Code: 'standard-payment'
- Name: 'Standard Payment'
- Handler: 'dummy-payment-handler' (for development)

---

## 🐛 Common Issues & Solutions

### Issue 1: Payment Button Not Working

**Symptom**: Submit payment button does nothing
**Cause**: No payment methods configured in database
**Solution**:

1. Run `add-payment-method.ts` script
2. Ensure `populate-awadh.ts` includes payment method creation
3. Add frontend validation in `OrderPayment.tsx`

### Issue 2: Currency Showing as "INR100"

**Symptom**: Prices display as "INR100" instead of "₹100"
**Cause**: Improper currency formatting
**Solution**: Use `Intl.NumberFormat` with 'en-IN' locale

### Issue 3: Checkout Form Not Defaulting to India

**Symptom**: Users must manually select country
**Cause**: Form initialization without default values
**Solution**: Set default values in form state initialization

### Issue 4: "No product in inventory"

**Symptom**: Cannot add products to cart
**Cause**: Stock level not set or set to 0
**Solution**: Ensure `stockOnHand` is set to a number (e.g., 100) in product variants

### Issue 5: Backend Won't Start

**Symptom**: ts-node compilation errors or silent failures
**Cause**: Missing dependencies or module resolution issues
**Solution**:

1. Install `better-sqlite3` and `sql.js`
2. Check `tsconfig.json` paths
3. Ensure all peer dependencies installed

---

## 🚀 Deployment Considerations

### Production Checklist

#### Backend

- [ ] Switch from SQLite to PostgreSQL
- [ ] Configure production database credentials
- [ ] Set up proper asset storage (S3/CloudFront)
- [ ] Configure real payment gateway (Razorpay/Stripe)
- [ ] Set up email service (SendGrid/AWS SES)
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set up monitoring and logging

#### Frontend

- [ ] Build production bundle (`npm run build`)
- [ ] Configure environment variables for production
- [ ] Set up CDN for static assets
- [ ] Enable image optimization
- [ ] Configure proper error tracking (Sentry)
- [ ] Set up analytics (Google Analytics)
- [ ] Test on multiple devices and browsers

#### Infrastructure

- [ ] Set up CI/CD pipeline
- [ ] Configure staging environment
- [ ] Set up database backups
- [ ] Configure SSL certificates
- [ ] Set up load balancing (if needed)
- [ ] Configure caching (Redis)

---

## 📈 Future Enhancements

### Phase 6: Advanced Features

1. **User Accounts**
   - Order history
   - Saved addresses
   - Wishlist functionality

2. **Payment Integration**
   - Razorpay integration for Indian market
   - UPI payment support
   - COD (Cash on Delivery)

3. **Search & Filters**
   - Advanced product search
   - Category filters
   - Price range filters
   - Sort options

4. **Reviews & Ratings**
   - Customer reviews
   - Star ratings
   - Review moderation

5. **Promotions**
   - Discount codes
   - Seasonal sales
   - Bundle offers

6. **Analytics**
   - Sales dashboard
   - Customer insights
   - Inventory tracking

---

## 🎓 Learning Outcomes

### Technical Skills Developed

1. **Headless Commerce Architecture**: Understanding decoupled frontend/backend
2. **GraphQL**: Type-safe API queries and mutations
3. **TypeScript**: Full-stack type safety
4. **Monorepo Management**: Lerna-based project structure
5. **Internationalization**: Currency, locale, and language handling
6. **State Management**: React context and hooks
7. **Database Design**: E-commerce schema and relationships
8. **Git Workflow**: Branch management and collaboration

### Best Practices Learned

1. **Documentation-First**: Maintain comprehensive docs (gemini.md, README.md)
2. **Type Safety**: Leverage TypeScript throughout
3. **Error Handling**: User-friendly error messages
4. **Configuration Management**: Environment-based configs
5. **Code Organization**: Clear folder structure and naming
6. **Testing**: Manual testing checklists and validation
7. **Version Control**: Atomic commits with descriptive messages

---

## 📚 Key Resources

### Official Documentation

- [Vendure Documentation](https://www.vendure.io/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [GraphQL Zeus](https://graphqleditor.com/docs/tools/zeus/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Emotion Documentation](https://emotion.sh/docs/introduction)

### Community Resources

- [Vendure Discord](https://vendure.io/community)
- [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [GraphQL Community](https://graphql.org/community/)

---

## ✅ Success Criteria

The project is considered complete when:

1. ✅ **Functional E-commerce Flow**
   - Users can browse products
   - Add items to cart
   - Complete checkout
   - Make payment
   - Receive order confirmation

2. ✅ **India-Specific Configuration**
   - INR currency with ₹ symbol
   - India pre-selected in forms
   - Proper tax and shipping for India

3. ✅ **Professional Presentation**
   - Clean, modern UI
   - Responsive design
   - Proper branding (Awadh Gully)
   - High-quality product images

4. ✅ **Complete Documentation**
   - Comprehensive README.md
   - Technical gemini.md
   - GitHub repository description and topics
   - Code comments where needed

5. ✅ **Production-Ready Code**
   - Type-safe throughout
   - Proper error handling
   - Environment-based configuration
   - Git repository with main branch

---

## 🎯 Final Deliverables

### Code Repository

- Fully functional monorepo
- Clean git history
- Main branch as default
- Proper .gitignore

### Documentation

- README.md (comprehensive)
- gemini.md (technical intelligence)
- Inline code comments
- API documentation (GraphQL schema)

### Running Application

- Backend on port 3000
- Frontend on port 3001
- Admin panel accessible
- Database populated with sample data

### GitHub Repository

- Professional description
- Relevant topics/tags
- Clean repository structure
- Updated About section

---

## 💡 Pro Tips for Implementation

1. **Start with Backend**: Set up Vendure first, populate database, verify admin panel
2. **Test Early**: Test each feature as you build it
3. **Document as You Go**: Update gemini.md with learnings and fixes
4. **Use Type Safety**: Let TypeScript catch errors early
5. **Commit Often**: Make atomic commits with clear messages
6. **Check Currency**: Always verify INR formatting in new components
7. **Default Values**: Remember to set India defaults in all forms
8. **Payment Methods**: Don't forget to configure payment methods in database
9. **Stock Levels**: Ensure stock levels are numbers, not enums
10. **Error Handling**: Add user-friendly error messages everywhere

---

## 🏁 Conclusion

This prompt provides a complete blueprint for building the Awadh Gully e-commerce platform from scratch. Follow the phases sequentially, test thoroughly at each step, and maintain comprehensive documentation. The result will be a professional, production-ready headless e-commerce platform specifically configured for the Indian market.

**Remember**: The key to success is attention to detail, especially in:

- Currency formatting (₹ not INR)
- Default values (India, Uttar Pradesh, Lucknow)
- Payment method configuration
- Stock level display
- Professional documentation

Good luck building Awadh Gully! 🛍️🇮🇳
