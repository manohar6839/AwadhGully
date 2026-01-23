# System Architecture

## Overview
Awadh Gully uses a headless architecture separating the presentation layer (Next.js) from the commerce logic (Vendure).

## Components

### 1. Storefront (Frontend)
- **Tech**: Next.js 14
- **Port**: 3001
- **Role**: Renders UI, handles client-side routing, communicates with backend via GraphQL.

### 2. Backend (API)
- **Tech**: Vendure (Node.js/NestJS)
- **Port**: 3000
- **Role**: Handles business logic, database interactions, auth, and admin API.

### 3. Infrastructure
- **Reverse Proxy**: Nginx (handles SSL termination and routing).
- **Database**: SQLite (local) or PostgreSQL (prod).
