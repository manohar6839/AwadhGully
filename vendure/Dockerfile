# ── Stage 1: Dependencies ──────────────────────────────────────────────────
# Use Node 18 Alpine (small Linux image matching what's on DO)
FROM node:18-alpine AS deps

# These build tools are needed to compile native npm packages:
# - argon2 (password hashing)
# - sqlite3 / better-sqlite3 (even though we use Postgres, they're in package.json)
# - pg (postgres client has some native bindings)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files FIRST — Docker caches this layer
# If package.json doesn't change, npm install is skipped on redeploy (faster builds)
COPY packages/dev-server/package.json ./
COPY packages/dev-server/package-lock.json* ./

# Install all dependencies including devDependencies
# We need ts-node, tsx, typescript at runtime (vendure runs TypeScript directly)
RUN npm install

# ── Stage 2: Production Image ──────────────────────────────────────────────
FROM node:18-alpine AS runner

# Same native build tools needed at runtime for argon2
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy ALL source files from dev-server
# This includes: index.ts, dev-config.ts, email templates, plugins etc.
COPY packages/dev-server/ ./

# Tell Node/Vendure this is production
ENV NODE_ENV=production

# Vendure runs on port 3000 (set in dev-config.ts)
EXPOSE 3000

# Start command — same as what PM2 was running on DO server
# tsx runs TypeScript directly without a separate compile step
CMD ["npx", "tsx", "index.ts"]
