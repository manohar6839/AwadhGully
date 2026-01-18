module.exports = {
  apps: [
    {
      name: 'vendure-backend',
      cwd: '/var/www/awadhgully/vendure/packages/dev-server',
      script: 'npm',
      args: 'run dev:server',
      env: {
        NODE_ENV: 'production',
        DB: 'postgres',
        DB_HOST: 'localhost',
        DB_PORT: '5432',
        DB_NAME: 'awadhgully',
        DB_USERNAME: 'awadhgully',
        DB_PASSWORD: 'awadh123'
      },
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '800M',
      error_file: '/var/log/pm2/vendure-backend-error.log',
      out_file: '/var/log/pm2/vendure-backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    {
      name: 'vendure-storefront',
      cwd: '/var/www/awadhgully/storefront',
      script: 'server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        HOSTNAME: '0.0.0.0'
      },
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      error_file: '/var/log/pm2/vendure-storefront-error.log',
      out_file: '/var/log/pm2/vendure-storefront-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
};
