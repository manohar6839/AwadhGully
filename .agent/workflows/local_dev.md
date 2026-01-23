---
description: How to start the local development environment.
---

# Local Development Workflow

## 1. Start Support Services
Ensure you don't have zombie processes running on ports 3000 or 3001.

## 2. Start Backend (Vendure)
The backend must be running for the storefront to fetch products.

```bash
cd vendure
# Kill any existing process on 3000 if needed
lsof -i :3000 -t | xargs kill -9 2>/dev/null || true

cd packages/dev-server
DB=sqlite npx ts-node index.ts
```
Expected Output: `Shop API: http://localhost:3000/shop-api`

## 3. Start Frontend (Storefront)
In a new terminal:

```bash
cd storefront
npm run dev
```
- Access at: `http://localhost:3001`

## Common Issues
- **Currency Symbols**: If symbols look wrong, check `formatPrice` utility.
- **Images Missing**: Ensure `assets` directory is populated.
- **Login fails**: Check if `vendure.sqlite` was reset; you may need to re-verify the user.
