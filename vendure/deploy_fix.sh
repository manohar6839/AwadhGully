#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status

console_log() {
  echo "[$(date '+%H:%M:%S')] $1"
}

console_log ">>> 1. KILLING blocking processes to free up RAM..."
# We use 'kill' instead of 'stop' to ensure no interactive prompts appear
pm2 kill || true
pkill -f node || true

console_log ">>> 2. FIXING TypeScript Versions (Enforcing 5.8.2)..."
cd /var/www/awadhgully/vendure
# Fix Root
sed -i 's/"typescript": "\^5.9.3"/"typescript": "5.8.2"/' package.json
# Fix Dev Server
sed -i 's/"typescript": "\^5.9.3"/"typescript": "5.8.2"/' packages/dev-server/package.json

console_log ">>> 3. CLEAN INSTALL (Root)..."
rm -rf node_modules package-lock.json
# High memory limit for install
export NODE_OPTIONS="--max-old-space-size=4096"
# --quiet prevents long output from triggering pagers
npm install --legacy-peer-deps --no-audit --no-fund --quiet

console_log ">>> 4. CLEAN INSTALL (Dev Server)..."
cd packages/dev-server
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps --no-audit --no-fund --quiet

console_log ">>> 5. COMPILING Admin UI..."
npx ts-node compile-admin-ui.ts

console_log ">>> 6. RESTARTING Application..."
# Restart using the config file
pm2 start /var/www/awadhgully/ecosystem.config.js

console_log ">>> SUCCESS! Admin UI compiled and server restarted."
console_log ">>> Check http://143.110.191.214/admin"
