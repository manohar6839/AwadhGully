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

### Production Deployment & Troubleshooting (Jan 18, 2026)

**Goal:** Restore functionality to a DigitalOcean Droplet where the Storefront was missing images and failing to connect to the backend.

**Critical Configuration Learnings:**

1.  **IPv6 vs IPv4 Binding (Connection Refused):**
    *   **Issue:** Nginx (IPv4) could not connect to Node.js (defaulting to IPv6 `::1` on Node 17+) on `localhost`.
    *   **Fix:** Explicitly set `hostname: '0.0.0.0'` in `dev-config.ts` `apiOptions`. This forces binding to ALL interfaces.
    *   **Snippet:**
        ```typescript
        apiOptions: {
            hostname: '0.0.0.0', // CRITICAL for Nginx Proxy
            port: 3000,
            // ...
        }
        ```

2.  **Asset Directory Mismatch (Missing Images):**
    *   **Issue:** Images were missing despite the server running.
    *   **Cause:** `AssetServerPlugin` was pointing to `dev-server/assets` (empty) instead of the project root `assets`.
    *   **Fix:** Update path to `path.join(__dirname, '../../assets')`.

3.  **Phantom Plugins (Build Failures):**
    *   **Issue:** `npm run build` failed with `Cannot find module`, causing the server to run old code.
    *   **Cause:** Importing `DashboardPlugin` or `AdminUiPlugin` when they are not installed/configured strictly.
    *   **Fix:** **Only** include plugins present in `package.json`. If restoring stability, comment out complex plugins (like AdminUI) first.

4.  **Admin UI Architecture:**
    *   **Guidance:** Attempting to run Admin UI as Middleware (Port 3000) crashed the process.
    *   **Recommendation:** Run Admin UI as a separate simplified build or stick to strict port separation (5001) proxied via Nginx.
    *   **Pro Tip:** For maximum stability, **serve the Admin UI static files directly via Nginx** (using `alias` and `try_files`) instead of proxying to a Node server. This decouples the Admin Panel from the Backend API status.

5.  **PM2 Interactive Pager (Stuck at Colon):**
    *   **Issue:** Running `pm2 stop all` or similar commands hangs at a `:` prompt.
    *   **Cause:** PM2 outputs long lists to a pager (like `less`).
    *   **Fix:** Press `q` to exit. For scripts, use `pm2 stop all | cat` to bypass the pager.

6.  **Monitoring Silent Installs:**
    *   **Issue:** `npm install` with Swap runs silently for 10+ minutes, looking "frozen".
    *   **Verify:** Open a **second terminal**, SSH in, and run `top`.
    *   **Signs of Life:** `node`, `npm`, or `kswapd0` using CPU/Memory means it is working.

### SSL & Production Configuration (Jan 18, 2026)

**Goal:** Secure the deployment with SSL and ensure correct internal routing.

**Critical Learnings:**

1.  **The "No Healthy Upstream" Build Error (Next.js SSR):**
    *   **Issue:** `npm run build` failed with `FetchError` or `502` when `NEXT_PUBLIC_API_URL` was set to `https://awadhgully.com/shop-api`.
    *   **Cause:** The server tried to reach its own public domain during the build (Static Generation). Without a loopback entry, the request went out to the internet and hit the Droplet's external firewall or failed DNS resolution, rather than hitting `localhost:3000`.
    *   **Fix:** Add the domain to `/etc/hosts` to force local resolution.
    *   **Snippet:** `echo "127.0.0.1 awadhgully.com www.awadhgully.com" >> /etc/hosts`

2.  **Asset Migration Strategy:**
    *   **Issue:** Products appeared in the DB but images were broken.
    *   **Cause:** The `populate` script creates DB entries referencing images (e.g., `assets/preview.jpg`), but does *not* upload the physical files from your local machine.
    *   **Fix:** Manually SCP the assets *before* running populate, or ensure the local `assets` folder is mirrored to the server.
    *   **Command:** `scp -r mock-data/assets root@IP:/var/www/awadhgully/...`

3.  **Environment Variable Consistency:**
    *   **Issue:** "Add to Cart" failed due to Mixed Content (HTTPS site calling HTTP API).
    *   **Fix:** Ensure `NEXT_PUBLIC_API_URL` in `.env.production` uses `https://` matching the site's protocol.
    *   **Important:** This requires the Backend to be running and accessible via that HTTPS URL (see point #1) during the build.

4.  **PM2 Process Hygiene:**
    *   **Issue:** `EADDRINUSE: 3000`.
    *   **Cause:** `pm2 restart` doesn't always clear zombie processes or released ports immediately.
    *   **Fix:** Use `pm2 delete all && killall node` for a true hard reset when changing low-level configs (env vars, ports).

5.  **Nginx & Port Conflicts (The 502/404 Saga):**
    *   **Issue:** Nginx returned 502/404 because both the Backend and Storefront tried to default to Port 3000.
    *   **Fix:**
        *   **Backend:** Runs on Port 3000.
        *   **Storefront:** Patched `package.json` to `"start": "next start -p 3001"`.
        *   **Nginx:** Updated config to proxy `/` to `3001` and `/shop-api` to `3000`.

    **Nginx Config Snippet:**
    ```nginx
    # Storefront on 3001
    location / {
        proxy_pass http://127.0.0.1:3001;
        # ... standard headers
    }
    # Backend on 3000
    location /shop-api {
        proxy_pass http://127.0.0.1:3000;
    }
    ```

6.  **Resource Management (Swap):**
    *   **Issue:** Builds crashed with "Killed" or "Timeout" due to 1GB RAM limit.
    *   **Fix:** Added 2GB Swap File.
    *   **Command:** `fallocate -l 2G /swapfile && mkswap /swapfile && swapon /swapfile`.

### 8. Docker Standalone Deployment Strategy (Jan 19, 2026)

**Goal:** Efficiently build and deploy the Next.js storefront using Docker standalone output, bypassing server resource constraints.

**Key Components:**

1.  **Optimized Dockerfile (`storefront/Dockerfile.build`):**
    *   Uses `output: 'standalone'` for a minimal production build.
    *   **Environment Variable:** `SKIP_BUILD_STATIC_GENERATION=true` to skip expensive SSG during the build phase (since the API isn't accessible).
    *   **Manual Asset Injection:** Explicitly copies `.next/static` and `public` into the `standalone` directory to ensure all assets are available.
    *   **Runtime Command:** Executes `node server.js` directly for maximum efficiency and compatibility.

2.  **Deployment Script (`docker-deploy.sh`):**
    *   Builds the Docker image locally (leveraging local RAM).
    *   Extracts the standalone package (approx. 50-100MB) into a `deployment-package` directory.
    *   Transfers the package to the server via `rsync`.
    *   Automates PM2 management (backup, extraction, and restart).

3.  **Stability Optimizations:**
    *   **SSG Fallback:** Changed `fallback: false` to `fallback: 'blocking'` in product and collection paths to allow on-demand generation on the server.
    *   **Error Handling:** Added try/catch blocks with fallback properties in `props.ts` to prevent crashes when the API is unavailable.
    *   **Resource Limits:** Reduced PM2 memory limit to 300MB in `ecosystem.config.js`.

**Deployment Workflow:**

```bash
./docker-deploy.sh
```

This script handles the entire process:
1. Local Docker build
2. Standalone artifact extraction
3. Server backup creation
4. Rsync upload
5. PM2 restart with `server.js`
6. Automated health checks (HTTP 200 verification)

### Troubleshooting & Fixes (Jan 19, 2026)

**Goal:** Deployment and Connection Fixes for Production Environment.

**Critical Learnings:**

1.  **Admin UI Connectivity (Mixed Content & Protocol Mismatch):**
    *   **Issue:** The Admin Panel loaded but showed a connection error and couldn't fetch data.
    *   **Cause:** The `vendure-ui-config.json` was configured to point to `http://<IP_ADDRESS>:80/admin-api`, but the site was accessed via `https://awadhgully.com`. Browsers block mixed content (HTTP requests from HTTPS pages).
    *   **Fix:** Updated `vendure-ui-config.json` on the server to use the secure domain and port.
    *   **Configuration:**
        ```json
        {
            "apiHost": "https://awadhgully.com",
            "apiPort": "443",
            "adminApiPath": "admin-api",
            ...
        }
        ```
    *   **Lesson:** Always ensure the API configuration matches the protocol (HTTPS) and domain of the deployment environment.

2.  **Storefront Menu & Cart Failure (Channel Token Mismatch):**
    *   **Issue:** The Storefront loaded, but the navigation menu was empty, and "Add to Cart" failed.
    *   **Cause:** The frontend was hardcoded with `default-channel` as the token, but the production database (Postgres) used a generated token (e.g., `fosrdc0pacptsremtq5`).
    *   **Fix:**
        1.  Retrieved the correct token from the DB: `SELECT token FROM channel;`
        2.  Updated `storefront/src/lib/consts.ts`: `export const DEFAULT_CHANNEL = 'fosrdc0pacptsremtq5';`
    *   **Lesson:** The Channel Token acts as the API key for the frontend. If it doesn't match the backend database, all channel-aware requests (products, collections, orders) will silently fail or return empty results.

3.  **Docker Build "No Space Left on Device" (Context Optimization):**
    *   **Issue:** `docker build` failed with I/O errors because the build context was too large (>300MB), filling up the temporary disk space.
    *   **Cause:** The build was copying `deployment.tar.gz` (the output of previous builds) and the local `node_modules` folder into the Docker daemon.
    *   **Fix:** Created a `.dockerignore` file:
        ```text
        node_modules
        .next
        deployment-package
        deployment.tar.gz
        .git
        ```
    *   **Lesson:** Always use `.dockerignore` in CI/CD or local build scripts to exclude heavy artifacts. It speeds up builds and prevents disk exhaustion.

4.  **Database Seeding in Production:**
    *   **Issue:** After a fresh deployment, the Admin Panel was empty (no products).
    *   **Cause:** The production database was blank.
    *   **Fix:** Ran the population script directly on the server: `npx tsx packages/dev-server/populate-awadh.ts`. Note: Had to run from the `packages/dev-server` directory to pick up the correct `.env` (Postgres config).
    *   **Lesson:** Deployment != Data Migration. Automated deployments should include a migration/seeding step if the database is expected to be fresh.

5.  **Authentication Failure (Channel Token Mismatch):**
    *   **Issue:** Login failed for newly created users ("Incorrect credentials").
    *   **Cause:** Re-populating the database generated a new default channel with a random token, but the frontend was using the old token (`fosrdc0pacptsremtq5`).
    *   **Fix:** Updated the database default channel token to match the frontend using a direct SQL script (`fix-state-sql.ts`).
    *   **Lesson:** When resetting a database for an existing frontend build, ensure the Channel Token is restored to match the build configuration.

6.  **User Authentication Failure (Missing Password Hash):**
    *   **Issue:** Even after fixing the channel token, login failed with "Invalid credentials".
    *   **Cause:** The `populate-awadh.ts` script created the user entity but failed to generate/store the password hash in the `authentication_method` table, likely due to configuration nuance in the bootstrap context.
    *   **Fix:** Created and ran a diagnostic script (`debug-auth.ts`) that confirmed the empty hash, generated a valid `bcrypt` hash for `TestUser123!` using `bcryptjs`, and manually updated the database record.
    *   **Lesson:** Verify user creation success by inspecting the database (specifically `authentication_method`) if login fails immediately after seed.

7.  **Admin UI Health Check Failure (Nginx Routing):**
    *   **Issue:** Admin UI showed "Http failure during parsing" for `/health` endpoint.
    *   **Cause:** Nginx didn't have a specific location block for `/health`, so requests fell through to the Storefront (Port 3001) instead of the Backend (Port 3000), returning an HTML error page instead of JSON.
    *   **Fix:** Added a dedicated `location /health` block in Nginx config proxying to `http://127.0.0.1:3000`.
    *   **Lesson:** When routing API endpoints, ensure every backend service path (like `/health`) is explicitly defined in Nginx if the default fallback goes to a different service (like the frontend).

8.  **Login Failure & Data Integrity (Manual User Correction):**
    *   **Issue:** Users reported inability to login with seeded test accounts ("Invalid Credentials").
    *   **Cause:** Seed scripts sometimes failed to create the password hash or authentication method correctly in the specific production DB environment.
    *   **Fix:** Created `create-verified-user.ts` to explicitly INSERT or UPDATE the `user`, `customer`, and `authentication_method` tables with a known valid bcrypt hash.
    *   **Command:** `npx tsx create-verified-user.ts` (Run on server in `vendure` directory).
### 9. Persistent Login Failures & Email Verification (Jan 20, 2026)

**Goal:** Resolve "Invalid Credentials" for test users and "Not Verified" errors for new sign-ups.

**Critical Learnings:**

1.  **Password Hashing Mismatch (Argon2 vs Bcrypt) - The Silent Killer:**
    *   **Issue:** Manually creating users with `bcryptjs` hashes (starting with `$2a$` or `$2b$`) resulted in persistent "Invalid credentials" errors, even with the correct password.
    *   **Cause:** Vendure defaults to **Argon2** hashing (hashes start with `$argon2`). Providing a Bcrypt hash caused the generic invalid error.
    *   **Fix:** Instead of trying to install heavy libraries like `argon2` on the production server (which timed out), we **copied the known valid hash** from the `superadmin` account to the target user.
    *   **Lesson:** Before generating hashes, always check the format of an existing working user: `SELECT "passwordHash" FROM authentication_method LIMIT 1;`.

2.  **Server-Side Script Instability (Timeouts):**
    *   **Issue:** Running complex Node.js/TypeScript scripts (`npx tsx script.ts`) on the production server frequently timed out or hung indefinitely (especially during `npm install` or DB connection).
    *   **Fix:** Switched to **Direct SQL Execution** via SSH.
    *   **Command:** `ssh root@<IP> "PGPASSWORD=<PASS> psql -h localhost -U <USER> -d <DB> -c \"UPDATE ...\""`
    *   **Lesson:** For urgent production data fixes, raw SQL is infinitely faster and more reliable than heavy application-layer scripts.

3.  **Email Verification in "Dev Mode":**
    *   **Issue:** New users could not log in because they were "Unverified". The system was configured with `devMode: true`, which saves emails to `test-emails` folders instead of sending them.
    *   **Effect:** Verification links pointed to `localhost:4201`, which is inaccessible in production.
    *   **Fix:**
        1.  Updated `dev-config.ts` `emailPlugin` to use production URLs (`https://awadhgully.com/verify-email`).
        2.  **Workaround:** Manually Force-Verified users via SQL: `UPDATE "user" SET verified = true WHERE identifier = '...';`
    *   **Lesson:** A production environment without an active SMTP provider must have a documented process for retrieving verification tokens or manually verifying users.

4.  **Database Enum Types:**
    *   **Issue:** An SQL update (`UPDATE authentication_method ... WHERE type = 'native'`) failed (`UPDATE 0`) despite the logic being correct.
    *   **Cause:** The database stored the full string `'NativeAuthenticationMethod'`, not the simple key `'native'`.
    *   **Lesson:** Never assume database values based on code constants. Always `SELECT` first to see the raw data format.

### 10. Docker Deployment Public Assets & Build Cache Issues (Jan 24, 2026)

**Goal:** Fix recurring deployment issues where cart functionality breaks and images disappear after deployment.

**Critical Learnings:**

1.  **Public Directory Nesting Issue (The Image Killer):**
    *   **Issue:** After deployment, logo and hero background images were missing (404 errors).
    *   **Root Cause:** The Dockerfile.build was copying the entire `public/` directory INTO `.next/standalone/public/`, creating a nested structure: `/public/public/logo.png` instead of `/public/logo.png`.
    *   **Symptom:** Images referenced as `/logo.png` in code couldn't be found because they were actually at `/public/logo.png` on the server.
    *   **Fix:** Modified `Dockerfile.build` line 31 from:
        ```dockerfile
        cp -r public .next/standalone/public
        ```
        To:
        ```dockerfile
        mkdir -p .next/standalone/public && \
        cp -r public/* .next/standalone/public/
        ```
    *   **Verification:** After deployment, `ls /var/www/awadhgully/storefront/public/` should show `logo.png`, `hero-background.png`, `locales/`, `images/` directly (NOT a nested `public/` subdirectory).
    *   **Lesson:** When copying directories in Docker, use `source/*` to copy contents, not `source` to copy the directory itself, unless you explicitly want nesting.

2.  **Build Cache Causing Stale Code Deployment:**
    *   **Issue:** Code changes (like cart button fixes) were made locally but didn't appear in production after deployment.
    *   **Root Cause:** Docker and Next.js build caches can persist old compiled code even when source files change.
    *   **Symptom:** TypeScript source files (`src/`) exist on server but changes aren't reflected in the running application (which uses compiled `.next/` directory).
    *   **Fix:** Always force a clean build before deployment:
        ```bash
        cd storefront
        rm -rf .next
        rm -rf deployment-package
        docker system prune -f
        ./docker-deploy.sh
        ```
    *   **Lesson:** For critical bug fixes or UI changes, ALWAYS clear build artifacts before deploying to ensure fresh compilation.

3.  **Deployment Verification Checklist:**
    *   After every deployment, verify these critical items:
        ```bash
        # 1. Check public directory structure (no nesting)
        ssh root@143.110.191.214 'ls -la /var/www/awadhgully/storefront/public/'
        
        # 2. Verify images are accessible
        curl -I https://awadhgully.com/logo.png
        curl -I https://awadhgully.com/hero-background.png
        
        # 3. Check PM2 process health
        ssh root@143.110.191.214 'pm2 list'
        
        # 4. Review recent logs for errors
        ssh root@143.110.191.214 'pm2 logs vendure-storefront --lines 50'
        ```
    *   **Lesson:** Automated health checks should include asset accessibility, not just HTTP 200 status.

4.  **Dockerfile Best Practices for Next.js Standalone:**
    *   **Critical Files to Copy:**
        1. `.next/static` → `.next/standalone/.next/static` (compiled assets)
        2. `public/*` → `.next/standalone/public/` (static files - CONTENTS only)
        3. Standalone already includes: `server.js`, `node_modules`, `.next/server`
    *   **Common Mistakes:**
        - Copying `public` directory instead of `public/*` (creates nesting)
        - Forgetting to copy `.next/static` (breaks client-side JS)
        - Not setting proper environment variables at build time
    *   **Lesson:** The standalone output is minimal by design. You MUST manually copy static assets.

5.  **Cart Button Fix Implementation:**
    *   **Issue:** Cart +/- buttons not working after deployment.
    *   **Root Cause:** Changes were in source files but not compiled into production build due to cache.
    *   **Permanent Fix:**
        1. Modified `QuantityCounter.tsx` to prevent quantity < 1
        2. Added validation in `cart.ts` state management
        3. Cleared all caches before rebuild
        4. Verified changes in deployed `.next` directory
    *   **Lesson:** UI component changes require full rebuild + cache clear to take effect in production.

**Updated Deployment Workflow (Mandatory for All Future Deployments):**

```bash
# 1. Navigate to storefront
cd /Users/manohar_air/Desktop/Coding/AwadhGully/storefront

# 2. CRITICAL: Clear all caches
rm -rf .next
rm -rf deployment-package
docker system prune -f

# 3. Deploy with clean build
cd ..
./docker-deploy.sh

# 4. Verify deployment
ssh root@143.110.191.214 'ls -la /var/www/awadhgully/storefront/public/' | grep -E "logo.png|hero-background.png"
curl -I https://awadhgully.com/logo.png
curl -I https://awadhgully.com/hero-background.png
```

**Files Modified:**
- `storefront/Dockerfile.build` (public directory copy fix)
- `storefront/src/components/molecules/QuantityCounter.tsx` (cart button validation)
- `storefront/src/state/cart.ts` (state management validation)

**Prevention Strategy:**
- ✅ Always clear caches before deployment
- ✅ Verify public directory structure after deployment
- ✅ Test critical user flows (cart, images) immediately after deployment
- ✅ Document any Dockerfile changes in this file
- ✅ Never assume cached builds are fresh

### Cart Interaction & Clean Build (Jan 24, 2026)

**Issue:** Cart quantity buttons (+/-) and Remove button were failing to work and causing the cart to close immediately.
**Root Cause:** A race condition between the global `useOutsideClick` hook (listening on `mousedown`) and the button `onClick` events. The "outside click" logic triggered first, unmounting the component before the action could execute.
**Solution:**
1.  Implemented a propagation barrier by adding `e.stopPropagation()` to `onMouseDown` and `onTouchStart` events on all interactive cart elements.
2.  Applied this fix to `QuantityCounter.tsx` (globally used) and `CartBody.tsx`/`Cart.tsx` (remove buttons).

**Critical Deployment Rule:**
Always run the following clean build command before deploying to flush stale caches:
```bash
cd storefront
rm -rf .next deployment-package
docker system prune -f
../docker-deploy.sh
```

### Hide Empty Cart Icon (Jan 24, 2026)
**Feature:** Automatically hide the floating cart icon/button when the cart is empty (count = 0).
**Implementation:** Conditioned the rendering of the trigger button in `src/layouts/CartDrawer/index.tsx` based on `cartItemCount > 0`.
**Behavior:**
- **Empty:** Icon Hidden.
- **Added:** Icon Appears.
- **Removed:** Icon Disappears (Drawer stays open until closed).
