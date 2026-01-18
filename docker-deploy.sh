#!/bin/bash
set -e

SERVER="root@143.110.191.214"
REMOTE_DIR="/var/www/awadhgully/storefront"

echo "=== Docker Build & Deploy Script ==="
echo "Building storefront with Next.js standalone output..."

# Navigate to storefront directory
cd "$(dirname "$0")/storefront"

# Step 1: Remove any existing temp container
echo "Step 1: Cleaning up any existing temp containers..."
docker rm -f awadhgully-temp 2>/dev/null || true

# Step 2: Build the Docker image
echo "Step 2: Building Docker image..."
docker build -f Dockerfile.build -t awadhgully-storefront:latest .

# Step 3: Create a temporary container to extract standalone artifacts
echo "Step 3: Creating temporary container..."
docker create --name awadhgully-temp awadhgully-storefront:latest

# Step 4: Extract the standalone package (includes server.js, node_modules, .next, public)
echo "Step 4: Extracting standalone artifacts..."
rm -rf deployment-package
mkdir -p deployment-package

# The Dockerfile now prepares everything in /app (the standalone directory)
docker cp awadhgully-temp:/app/. deployment-package/

# Clean up the temporary container
echo "Step 5: Cleaning up temporary container..."
docker rm awadhgully-temp

# Verify standalone output
if [ ! -f "deployment-package/server.js" ]; then
    echo "ERROR: server.js not found in deployment-package!"
    echo "The standalone output may not have been created properly."
    echo "Check that next.config.js has: output: 'standalone'"
    exit 1
fi

echo "Standalone package size: $(du -sh deployment-package | cut -f1)"

# Step 6: Create backup on server
echo "Step 6: Creating backup on server..."
ssh $SERVER "[ -d $REMOTE_DIR ] && mv $REMOTE_DIR ${REMOTE_DIR}.backup-\$(date +%Y%m%d%H%M%S) || true"

# Step 7: Upload via rsync
echo "Step 7: Uploading to server..."
rsync -avz --delete deployment-package/ $SERVER:$REMOTE_DIR/
# Also upload ecosystem.config.js to the root directory
rsync -avz ../ecosystem.config.js $SERVER:/var/www/awadhgully/

# Step 8: Restart PM2
echo "Step 8: Restarting storefront..."
ssh $SERVER "pm2 delete vendure-storefront 2>/dev/null || true"
ssh $SERVER "cd /var/www/awadhgully/ && pm2 start ecosystem.config.js --only vendure-storefront"

# Step 9: Verify
echo "Step 9: Waiting for startup (15s)..."
sleep 15

echo "Step 10: Verifying deployment..."
ssh $SERVER "pm2 list"
echo ""
HTTP_STATUS=$(ssh $SERVER "curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3001/")
if [ "$HTTP_STATUS" = "200" ]; then
    echo "SUCCESS: Storefront responding with HTTP 200"
else
    echo "WARNING: Storefront returned HTTP $HTTP_STATUS"
    echo "Check logs: ssh $SERVER 'pm2 logs vendure-storefront --lines 50'"
fi

echo ""
echo "=== Deployment Complete ==="
echo "Test the site:"
echo "  - http://143.110.191.214"
echo "  - https://awadhgully.com"
echo ""
echo "View logs: ssh $SERVER 'pm2 logs vendure-storefront'"
echo ""
echo "Rollback if needed:"
echo "  ssh $SERVER \"BACKUP=\\\$(ls -td ${REMOTE_DIR}.backup-* | head -1) && rm -rf $REMOTE_DIR && mv \\\$BACKUP $REMOTE_DIR && pm2 restart vendure-storefront\""
