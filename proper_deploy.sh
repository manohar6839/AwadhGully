#!/bin/bash
set -e

echo "=== Proper Vendure Deployment Script ==="
echo "Starting deployment at $(date)"

# Step 1: Check current state
echo ""
echo "Step 1: Checking current server state..."
pm2 list || echo "PM2 not running any processes"
netstat -tulpn | grep node || echo "No node processes found"

# Step 2: Stop all existing PM2 processes
echo ""
echo "Step 2: Stopping all PM2 processes..."
pm2 delete all || echo "No processes to delete"

# Step 3: Ensure log directory exists
echo ""
echo "Step 3: Creating log directory..."
mkdir -p /var/log/pm2
chmod 755 /var/log/pm2

# Step 4: Start services using ecosystem config
echo ""
echo "Step 4: Starting services from ecosystem config..."
cd /var/www/awadhgully
pm2 start ecosystem.config.js

# Step 5: Save PM2 configuration
echo ""
echo "Step 5: Saving PM2 configuration..."
pm2 save

# Step 6: Setup PM2 startup script
echo ""
echo "Step 6: Setting up PM2 startup..."
pm2 startup systemd -u root --hp /root || echo "Startup already configured"

# Step 7: Wait for services to start
echo ""
echo "Step 7: Waiting for services to initialize..."
sleep 10

# Step 8: Check PM2 status
echo ""
echo "Step 8: Checking PM2 status..."
pm2 list

# Step 9: Test backend
echo ""
echo "Step 9: Testing backend (port 3000)..."
curl -I http://127.0.0.1:3000/shop-api || echo "Backend not responding"

# Step 10: Test storefront
echo ""
echo "Step 10: Testing storefront (port 3001)..."
curl -I http://127.0.0.1:3001 || echo "Storefront not responding"

# Step 11: Restart Nginx
echo ""
echo "Step 11: Restarting Nginx..."
nginx -t && systemctl restart nginx

# Step 12: Test external access
echo ""
echo "Step 12: Testing external access..."
sleep 3
curl -I http://143.110.191.214 || echo "External IP not responding"
curl -I https://awadhgully.com || echo "Domain not responding"

echo ""
echo "=== Deployment Complete ==="
echo "Check the status above for any errors"
echo ""
echo "View logs with:"
echo "  pm2 logs vendure-backend"
echo "  pm2 logs vendure-storefront"
