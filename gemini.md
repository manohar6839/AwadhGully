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

## Technical Learnings & Fixes (Jan 17 2026)

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
