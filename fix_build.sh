#!/bin/bash
set -e

echo "Starting Fix Script..."

# 1. Fix Loopback (Check if entry exists first to avoid duplicates)
if grep -q "awadhgully.com" /etc/hosts; then
    echo "Host entry already exists."
else
    echo "127.0.0.1 awadhgully.com www.awadhgully.com" >> /etc/hosts
    echo "Added host entry."
fi

# 2. Reset Processes
echo "Resetting PM2..."
pm2 stop all || true
pm2 delete all || true
killall node || true

# 3. Start Backend
echo "Starting Backend..."
cd /var/www/awadhgully/vendure
pm2 start ecosystem.config.js
echo "Waiting 10s for backend to bind..."
sleep 10

# 4. Rebuild Storefront
echo "Rebuilding Storefront..."
cd /var/www/awadhgully/storefront
# Ensure env vars are correct for the build context
export NEXT_PUBLIC_API_URL=https://awadhgully.com/shop-api
export NEXT_PUBLIC_VENDURE_URL=https://awadhgully.com/shop-api
npm run build

# 5. Restart Storefront
echo "Restarting Storefront..."
pm2 restart nextjs-storefront

echo "DONE! Everything should be live."
