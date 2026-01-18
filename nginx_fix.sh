#!/bin/bash
set -e

# Define the Nginx Config
# This uses a 'heredoc' to write the content cleanly
cat > /etc/nginx/sites-available/awadhgully <<EOF
server {
    listen 80;
    server_name awadhgully.com www.awadhgully.com 143.110.191.214;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl;
    server_name awadhgully.com www.awadhgully.com;

    ssl_certificate /etc/letsencrypt/live/awadhgully.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/awadhgully.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # 1. Storefront (Next.js) - Default
    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    # 2. Backend API (Vendure)
    location /shop-api {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }

    location /admin-api {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
    }

    location /admin {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
    }

    location /assets {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host \$host;
    }

    location /health {
        proxy_pass http://127.0.0.1:3000;
    }
}
EOF

# Test and Reload
echo "Testing Nginx Config..."
nginx -t

echo "Reloading Nginx..."
systemctl reload nginx

echo "Nginx Updated Successfully!"
