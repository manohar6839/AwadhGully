#!/bin/bash
set -e

echo "=== Deployment Fix Script ==="

# Restart Nginx
echo "Restarting Nginx..."
systemctl restart nginx

# Navigate to storefront
cd /var/www/awadhgully/storefront

# Stop any existing process
echo "Stopping existing storefront process..."
pm2 delete nextjs-storefront || true

# Start with explicit binding
echo "Starting storefront on port 3001..."
pm2 start npm --name nextjs-storefront -- start

# Wait for startup
sleep 5

# Check status
echo "Checking PM2 status..."
pm2 list

# Test local connection
echo "Testing local connection..."
curl -I http://127.0.0.1:3001 || echo "Local connection failed"

# Test external connection  
echo "Testing external connection..."
curl -I https://awadhgully.com || echo "External connection failed"

echo "=== Deployment complete ==="
