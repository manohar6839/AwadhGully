---
description: Core project rules, technology stack, and best practices.
---

# Project Rules & Guidelines

## Design System: "Royal Awadhi"
- **Colors**: Maroon (`#5A0F1B`), Gold (`#C9A24D`), Ivory (`#FAF7F2`), Saffron (`#E07A2D`).
- **Typography**: Serif (Playfair Display) for headings, Sans (Poppins/Inter) for body.
- **Styling**: Tailwind CSS (v3 constrained) is the primary engine.
  - *Must use v3 due to v4 compatibility issues with current PostCSS setup.*

## 🛠 Tech Stack
- **Frontend**: Next.js 14 (TypeScript)
    - Hybrid Styling: Styled Components + Tailwind CSS
- **Backend**: Vendure (TypeScript)
    - Path: `/vendure`
    - Port: `3000` (`/shop-api`, `/admin-api`)
    - Database: SQLite (dev) / PostgreSQL (prod)

## 🎨 Coding Standards
- **TypeScript**: Strict type safety. Avoid `any`.
- **Formatting**: prettier and eslint are configured. Run `npm run lint` before committing.
- **Commits**: Atomic commits with descriptive messages.
- **Structure**: Monorepo managed with Lerna (conceptually, though currently separate folders).

## 🌍 Environment
- **Development**:
    - Backend: `DB=sqlite npx ts-node index.ts` (in `vendure/packages/dev-server`)
    - Storefront: `npm run dev` (in `storefront`)
- **Production**:
    - Server: `143.110.191.214`
    - Domain: `awadhgully.com`
    - Deployment: Docker-based standalone build.

## 📝 Best Practices
1. **Atomic Design**: Build UI components in isolation (`storefront/src/components`).
2. **Type Safety**: Generate GraphQL types using `npm run codegen`.
4. **Overlay Interactions**: When building overlays (drawers/modals) with `useOutsideClick`, always stop propagation of `mousedown` events on interactive inner elements.
5. **Deployment Hygiene**: Always clean local build artifacts (`.next`, `deployment-package`) and Docker cache before running production deployment scripts.
