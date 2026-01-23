---
description: How to deploy the Next.js storefront to production.
---

# Storefront Deployment Workflow

This workflow describes the process for deploying changes to the production server.

## Prerequisites
- SSH access to `root@143.110.191.214`
- Docker installed locally

## // turbo-all
1. **Navigate to Project Root**
   ```bash
   cd /Users/manohar_air/Desktop/Coding/AwadhGully
   ```

2. **Execute Deployment Script**
   ```bash
   ./docker-deploy.sh
   ```

## What Happens Behind the Scenes
1. **Build**: The script builds a Docker image of the storefront locally.
2. **Extract**: It extracts the `standalone` Next.js build artifacts.
3. **Backup**: It backs up the existing `/var/www/awadhgully/storefront` on the server.
4. **Upload**: It uploads the new artifacts using `rsync`.
5. **Restart**: It recycles the PM2 process `vendure-storefront`.

## Verification
- Visit [https://awadhgully.com](https://awadhgully.com)
- Check HTTP status:
  ```bash
  curl -I https://awadhgully.com
  ```
