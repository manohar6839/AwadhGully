# Troubleshooting Guide

## 1. Storefront Connectivity Issues
### "FetchError" or 500 during Build
- **Cause**: Next.js SSG trying to hit public URL during build.
- **Fix**: Ensure `/etc/hosts` includes `127.0.0.1 awadhgully.com`.

### Images Missing
- **Cause**: Assets directory not correctly mounted or `AssetServerPlugin` path mismatch.
- **Fix**: Check `dev-config.ts` points to `../../assets`.

## 2. Backend Issues
### "Address already in use: 3000"
- **Fix**: `lsof -i :3000 -t | xargs kill -9`

### Login Fails ("Invalid Credentials")
- **Cause**: Hashing algorithm mismatch (Bcrypt vs Argon2).
- **Fix**: Check `authentication_method` table. Vendure uses Argon2 by default.

## 3. Database
### "Token Invalid" for Default Channel
- **Cause**: Database reset generated new token, frontend has old one.
- **Fix**: Update `DEFAULT_CHANNEL` in `storefront/src/lib/consts.ts` with token from `channel` table.

## 4. Frontend Build Issues
### Tailwind CSS v4 vs PostCSS Compatibility
- **Error**: `Error: PostCSS plugin tailwindcss requires PostCSS 8.` (or similar version mismatch).
- **Cause**: Tailwind CSS v4 (alpha/beta) architecture mismatch with standard PostCSS 8 setups.
- **Fix**: Downgrade to stable v3:
  ```bash
  npm uninstall tailwindcss postcss autoprefixer
  npm install tailwindcss@3.4.1 postcss@8.4.31 autoprefixer@10.4.16 -D
  ```

### Backend Connection Failed
- **Error**: `Network Error` or `ECONNREFUSED` when fetching products.
- **Cause**: Backend not running or not accessible at `http://localhost:3000/shop-api` (default).
- **Fix**: Start the backend:
  ```bash
  cd vendure/packages/dev-server
  npm run dev:server
  ```
### Cart Buttons (Qty/Remove) Not Working
- **Issue**: Clicking buttons inside the cart closes the cart immediately.
- **Cause**: Race condition with `useOutsideClick`. `mousedown` triggers close before `click` fires.
- **Fix**: Add `e.stopPropagation()` to `onMouseDown` and `onTouchStart` on the button.

### Deployment: Old Code Persists
- **Issue**: Changes made to code don't appear on production after deployment.
- **Cause**: Docker and Next.js caching layers holding onto old builds.
- **Fix**: Always run clean build: `rm -rf .next deployment-package && docker system prune -f`.
