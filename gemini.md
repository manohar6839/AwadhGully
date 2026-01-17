# Awadh Gully - Project Intelligence Profile

This document provides essential context and technical details for the Awadh Gully e-commerce storefront and backend, designed to help AI agents and developers work efficiently.

## 🚀 Project Overview

Awadh Gully is a modern e-commerce platform specializing in regional/traditional goods, built on a headless architecture.

- **Frontend:** Next.js (located in `/storefront`)
- **Backend:** Vendure Headless Framework (located in `/vendure`)
- **Repository Structure:** Monolithic Git repository (Monorepo) managed with Lerna.

## 🛠 Tech Stack

- **Frameworks:** [Next.js](https://nextjs.org/), [Vendure](https://www.vendure.io/)
- **Database:** SQLite (for development, defined by `DB=sqlite`)
- **Language:** TypeScript
- **Styling:** Vanilla CSS / Styled Components
- **API:** GraphQL (Shop API & Admin API)

## ⚙️ Configuration & Environment

### Ports

- **Storefront:** `3001` (Started with `npm run dev -- -p 3001`)
- **Backend (Shop API):** `3000` (Path: `/shop-api`)
- **Admin UI:** Usually port `3000` (Path: `/admin`) or defined in `dev-config.ts`.

### Key Environment Variables

- `DB=sqlite`: Points the backend to the SQLite database.
- `NEXT_PUBLIC_HOST="http://localhost:3000/shop-api"`: Configures the storefront to connect to the backend.

## 🎨 Branding & UI Details

- **Site Title:** "Awadh Gully" (Configured in `storefront/src/layouts/layout.tsx`).
- **Logo:** Currently uses `LogoAexol` as a placeholder, intended for future replacement.
- **Primary Market:** India (INR currency enabled, India pre-selected in checkout).

## 📂 Key File Locations

- **Database Population:** `vendure/packages/dev-server/populate-awadh.ts`
- **Backend Config:** `vendure/packages/dev-server/dev-config.ts`
- **Storefront Layout:** `storefront/src/layouts/layout.tsx`
- **Checkout Form:** `storefront/src/components/pages/checkout/components/OrderForm/index.tsx`
- **Hero Section:** `storefront/src/components/organisms/Hero.tsx`

## 🏆 Professional Best Practices

To ensure a high-quality, maintainable codebase, follow these guidelines:

1.  **Atomic Commits:** Make small, logical commits with descriptive messages.
2.  **Documentation First:** Keep this `gemini.md` updated with any major structural or configuration changes.
3.  **Environment Isolation:** Use package-specific `.env` files for secrets and local config, following `.env.example` patterns.
4.  **Component Driven Development:** Build UI elements in isolation (e.g., using Storybook) to ensure consistency and reusability.
5.  **Automated Testing:**
    - Use `Vitest` for backend logic and service tests.
    - Implement `Playwright` or `Cypress` for critical frontend user flows (checkout, cart, login).
6.  **Type Safety:** Strictly adhere to TypeScript. Avoid `any` and ensure GraphQL types are generated and updated (`npm run codegen`).
7.  **Linting & Formatting:** Always run `npm run lint` and `npm run format` (or use Husky hooks) before pushing code.
8.  **Performance Optimization:**
    - Optimize images using Next.js `Image` component.
    - Monitor backend query performance and implementation of caching where necessary.
9.  **Security:** Regularly audit dependencies (`npm audit`) and follow Vendure security best practices.
10. **Branching Strategy:** Use a clear branching model like `git-flow` or Trunk-Based Development for collaboration.

---

_Last updated: 2026-01-17_

## 🧠 Recent Technical Learnings & Fixes

### Payment Method Configuration (Jan 17, 2026)

**Issue:** The "Submit Payment" button on the checkout page was non-functional, preventing order completion.

**Root Cause:** The Vendure backend had no payment methods configured in the database, causing the frontend to fail silently when attempting to process payments.

**Solution:**

1. Created a one-time script (`vendure/packages/dev-server/add-payment-method.ts`) to add a "Standard Payment" method to the existing database.
2. Updated the database population script (`populate-awadh.ts`) to include payment method creation for fresh database setups.
3. Enhanced the frontend payment component (`storefront/src/components/pages/checkout/components/OrderPayment.tsx`) to display warnings when no payment methods are available.

**Key Files Modified:**

- `vendure/packages/dev-server/add-payment-method.ts` (new)
- `vendure/packages/dev-server/populate-awadh.ts`
- `storefront/src/components/pages/checkout/components/OrderPayment.tsx`

**Lesson Learned:** Always verify that essential backend configurations (payment methods, shipping methods, tax rates) are properly initialized during database population. Frontend error handling should provide clear feedback when backend data is missing.

### User Menu Dropdown Implementation (Jan 17, 2026)

**Issue:** The user icon in the navigation bar was not showing a user profile dropdown menu when clicked. It only functioned as a direct link to either the sign-in page (when logged out) or the account management page (when logged in).

**Root Cause:** The `UserMenu` component was wrapped in a `Dropdown` container but lacked the actual dropdown menu content. It only contained a simple link without implementing the hover menu functionality that the `Dropdown` component was designed to support.

**Solution:**

1. **Enhanced UserMenu Component** (`storefront/src/components/molecules/UserMenu.tsx`):
   - Added `HoverMenu` component with dynamic menu items based on authentication state
   - Implemented state-aware menu options:
     - **Logged Out:** "Sign in" and "Sign up" options
     - **Logged In:** "My Account", "My Orders", "Manage Addresses", and "Logout" options
   - Added Lucide React icons for visual clarity (UserCircle, Package, MapPin, LogOut, LogIn, UserPlus)
   - Implemented functional logout handler using Vendure's GraphQL API
   - Changed from direct link navigation to hover-triggered dropdown

2. **Improved HoverMenu Styling** (`storefront/src/styles/reusableStyles.tsx`):
   - Updated background color from gray to white for better readability
   - Enhanced positioning for the customer menu (right-aligned, below icon)
   - Added proper shadows, borders, and rounded corners
   - Improved transition animations for smooth appearance
   - Set minimum width and proper spacing for menu items

3. **Added Interactive Features:**
   - Hover effects on menu items with background color changes
   - Proper cursor states and click handling
   - Divider between account options and logout
   - Smooth transitions and animations

**Key Files Modified:**

- `storefront/src/components/molecules/UserMenu.tsx` (complete rewrite)
- `storefront/src/styles/reusableStyles.tsx` (HoverMenu styling updates)

**Testing:**

- Verified dropdown appears on hover in both logged-in and logged-out states
- Confirmed all menu items navigate to correct pages
- Tested logout functionality successfully ends session
- Validated visual styling matches site design system

**Lesson Learned:** When implementing dropdown menus, ensure the component structure includes both the trigger element and the menu content. Leverage existing styled components (like `HoverMenu` and `Dropdown`) that already have hover logic built-in, rather than reimplementing from scratch.

### Test Account Creation (Jan 17, 2026)

**Purpose:** Created a verified test account in the Vendure database to enable comprehensive testing of customer-facing features without requiring email verification.

**Implementation:**

1. **Created Test Account via Vendure Admin Panel:**
   - Navigated to Customers section in admin UI (http://localhost:3000/admin)
   - Created new customer with verified status
   - Set secure password meeting validation requirements

**Test Account Credentials:**

```
Email: test@awadhgully.com
Password: TestUser123!
Status: Verified ✓
Name: Test User
```

**Testing Capabilities:**

This account enables testing of:

- ✅ Sign In/Sign Out functionality
- ✅ Account Management (view/edit profile)
- ✅ Address Management (add/edit/delete addresses)
- ✅ Order Management (view order history)
- ✅ Password Change functionality
- ✅ Shopping Cart operations
- ✅ Complete checkout flows
- ✅ User menu dropdown (all logged-in options)

**Verification:**

- Successfully logged in via storefront sign-in page
- Confirmed account details display correctly in "My Account" section
- Verified user menu dropdown shows logged-in state with checkmark icon
- Tested logout functionality returns to logged-out state

**Lesson Learned:** Having a pre-verified test account in development environments significantly speeds up testing workflows by eliminating the need for email verification steps. Always create test accounts through the admin panel with proper verification status for realistic testing scenarios.

### Checkout Form Default Values (Jan 16, 2026)

**Issue:** The checkout form's country dropdown wasn't properly defaulting to India, and users had to manually select country, province, and city.

**Root Cause:** The form initialization logic wasn't properly setting default values for the Indian market configuration.

**Solution:**

1. Updated `OrderForm/index.tsx` to set default values for country (India), province (Uttar Pradesh), and city (Lucknow).
2. Ensured the country dropdown properly reflects the selected value on initial render.
3. Configured the form to match the backend's India-first configuration.

**Key Files Modified:**

- `storefront/src/components/pages/checkout/components/OrderForm/index.tsx`

**Lesson Learned:** When configuring a storefront for a specific market, ensure all form defaults align with the target geography to provide a seamless user experience.

### Currency Display & Formatting (Jan 16, 2026)

**Issue:** Currency values were displaying as "INR100" instead of "₹100" throughout the cart and checkout pages.

**Root Cause:** The currency formatting utility wasn't properly handling the INR currency code and symbol.

**Solution:**

1. Updated the `formatPrice` utility to use the native Intl.NumberFormat API with proper INR locale settings.
2. Ensured consistent currency display across all components (cart, checkout, product pages).

**Key Files Modified:**

- Currency formatting utilities (exact path varies based on implementation)

**Lesson Learned:** Use browser-native internationalization APIs (Intl.NumberFormat) for currency formatting rather than custom string manipulation to ensure proper locale-specific display.

### Database Reset & Product Images (Jan 16, 2026)

**Issue:** Products in the admin panel were showing issues, and product images needed to be enhanced with multiple high-quality images per product.

**Solution:**

1. Reset the database by deleting `vendure.sqlite` and repopulating with fresh data.
2. Enhanced the `populate-awadh.ts` script to include multiple product images per item.
3. Ensured all products have proper inventory levels and variant configurations.

**Key Files Modified:**

- `vendure/packages/dev-server/populate-awadh.ts`

**Lesson Learned:** When making structural changes to the database schema or population logic, a clean reset ensures data integrity. Always include multiple product images for a professional e-commerce appearance.

## Technical Learnings & Fixes (Jan 17 2026 - Earlier)

### The "Dependency Hell" Resolution (CJS vs ESM)

We successfully restored the full Vendure backend by resolving a complex chain of CommonJS/ESM conflicts in a TypeScript environment.
**Key Solutions:**

1.  **Module Patching**: Created `vendure/fix-modules.js` to strip `"type": "module"` from `package.json` of incorrectly resolved packages (`@apollo/server`, `graphql-tools`, `tar`, `parse5`, etc.).
2.  **Filesystem Surgery**: Manually replaced corrupted/missing nested dependencies (`@graphql-tools/merge`) with healthy copies from root.
3.  **Missing Headers**: Created manual shims (e.g., `index.js`, `arguments.js`) for packages that failed to export correctly in CJS.
4.  **Database Driver**: Added `better-sqlite3` and `sql.js` (fallback) to resolve native binding issues.
5.  **Runtime Dependencies**: Manually installed missing runtime peers like `@nestjs/platform-express`, `multer`, `concat-stream`, `readable-stream`.
6.  **Bootstrap**: Used a custom `NODE_PATH` and `ts-node` invocation to force correct module resolution.

**Artifacts:**

- `vendure/fix-modules.js`: The "magic wand" script affecting deep `node_modules`.
- `vendure/packages/dev-server/populate-awadh.ts`: Custom population script with India configuration.
- `vendure/packages/dev-server/index.ts`: Restored server entry point.
- `vendure/vendure.sqlite`: The real, populated database (Source of Truth).

**Current Status:**

- **Backend**: Running on Port 3000 (Real Server, not Mock).
- **Storefront**: Running on Port 3001.
- **Database**: SQLite (populated with Initial Data).

## 🧠 Technical Learnings & Troubleshooting Log

### 1. Resource Constraints & Backend Failure

- **Issue:** The real Vendure backend failed to bind to port 3000 despite freeing up RAM (~180MB free is insufficient).
- **Symptom:** Silent process death or `ts-node` compilation errors.
- **Solution:** Deployed a lightweight Node.js **Mock Server** (`mock-server.js`) to emulate the GraphQL API. This unblocked the frontend.

### 2. Dependency Management in Monorepos

- **Issue:** `argon2` and `better-sqlite3` native modules failed to install or compile due to resource limits.
- **Issue:** `ts-node` failed to resolve `@vendure/core` and `tsconfig-paths` was missing, likely due to hoisting in the `lerna` monorepo structure.
- **Fix:** Attempted `install-strategy=nested` and manual mocking of `argon2`. Ultimately, the emulator was the most reliable path.

### 3. Storefront Data Requirements

- **Navigation Error:** Only providing `id` and `slug` for collections caused serialization errors (`.navigation.id` undefined).
  - **Fix:** The frontend's `arrayToTree` utility explicitly requires a `parentId` field (even if null).
- **Inventory Error:** "No product in inventory" when adding to cart.
  - **Fix:** The backend (or mock) MUST return a `stockLevel` string (e.g., "100") for product variants. Zero or missing stock breaks the cart flow.

### 4. Git Hygiene

- **Issue:** Nested `.git` directories in `storefront` and `vendure` caused confusion.
- **Fix:** Consolidated into a single root git repository to track the entire project state.
