# 🛍️ Awadh Gully

> **Modern e-commerce platform for regional Indian goods**

Awadh Gully is a headless e-commerce platform built with cutting-edge technologies, specializing in traditional and regional products from India. The platform features a Next.js storefront powered by the Vendure headless commerce framework, offering a seamless shopping experience with INR currency support and a professional checkout flow.

---

## ✨ Features

- 🎯 **Headless Architecture** - Decoupled frontend and backend for maximum flexibility
- 💰 **INR Currency Support** - Native support for Indian Rupee with proper formatting (₹)
- 🇮🇳 **India-First Configuration** - Pre-configured for Indian market with default locations
- 🛒 **Complete E-commerce Flow** - Product browsing, cart management, and secure checkout
- 🔐 **User Authentication** - Customer accounts with order history
- 📱 **Responsive Design** - Optimized for desktop and mobile devices
- 🌐 **GraphQL API** - Type-safe API with Shop API and Admin API
- 🎨 **Modern UI/UX** - Built with styled-components and Emotion
- 🔍 **Product Search & Filters** - Advanced search and filtering capabilities
- 📦 **Inventory Management** - Real-time stock level tracking

---

## 🛠 Tech Stack

| Category                 | Technology                                                     |
| ------------------------ | -------------------------------------------------------------- |
| **Frontend**             | [Next.js 14](https://nextjs.org/) + TypeScript                 |
| **Backend**              | [Vendure](https://www.vendure.io/) Headless Commerce Framework |
| **API**                  | GraphQL (Apollo Server)                                        |
| **Database**             | SQLite (development) / PostgreSQL (production-ready)           |
| **Styling**              | Styled Components + Emotion                                    |
| **Type Safety**          | TypeScript + GraphQL Zeus                                      |
| **Internationalization** | i18next                                                        |
| **Icons**                | Lucide Icons                                                   |
| **Monorepo**             | Lerna                                                          |

---

## 📂 Project Structure

This is a monorepo containing both the frontend and backend:

```
AwadhGully/
├── storefront/          # Next.js frontend application (Port 3001)
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── layouts/     # Page layouts
│   │   ├── pages/       # Next.js pages
│   │   └── theme/       # Theme configuration
│   └── public/          # Static assets
│
├── vendure/             # Vendure backend (Port 3000)
│   ├── packages/
│   │   └── dev-server/
│   │       ├── dev-config.ts        # Backend configuration
│   │       ├── populate-awadh.ts    # Database population script
│   │       └── index.ts             # Server entry point
│   └── vendure.sqlite   # SQLite database (development)
│
├── gemini.md            # Project intelligence & technical documentation
└── README.md            # This file
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16.x or higher
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/manohar6839/AwadhGully.git
cd AwadhGully
```

2. **Install dependencies**

```bash
npm install
```

### Running the Backend (Vendure)

1. **Navigate to the Vendure directory and start the server**

```bash
cd vendure
lsof -i :3000 -t | xargs kill -9 && cd packages/dev-server && DB=sqlite npx ts-node index.ts
```

The backend will start on **http://localhost:3000**

- **Shop API**: http://localhost:3000/shop-api
- **Admin UI**: http://localhost:3000/admin

**Default Admin Credentials:**

- Email: `superadmin@vendure.io`
- Password: `superadmin`

### Running the Frontend (Storefront)

1. **In a new terminal, navigate to the storefront directory**

```bash
cd storefront
```

2. **Create a `.env` file** (if not already present)

```bash
echo 'NEXT_PUBLIC_HOST="http://localhost:3000/shop-api"' > .env
```

3. **Start the development server**

```bash
npm run dev -- -p 3001
```

The storefront will start on **http://localhost:3001**

---

## ⚙️ Configuration

### Environment Variables

**Storefront** (`/storefront/.env`):

```env
NEXT_PUBLIC_HOST="http://localhost:3000/shop-api"
```

**Backend** (`/vendure`):

```bash
DB=sqlite  # Use SQLite for development
```

### Ports

| Service          | Port | URL                            |
| ---------------- | ---- | ------------------------------ |
| Storefront       | 3001 | http://localhost:3001          |
| Backend Shop API | 3000 | http://localhost:3000/shop-api |
| Admin UI         | 3000 | http://localhost:3000/admin    |

---

## 📚 Documentation

- **[gemini.md](./gemini.md)** - Comprehensive project intelligence profile with technical details, learnings, and troubleshooting
- **[Storefront README](./storefront/README.md)** - Detailed frontend documentation including Zeus, i18next, theming, and styling

### Key Resources

- [Vendure Documentation](https://www.vendure.io/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [GraphQL Zeus Documentation](https://graphqleditor.com/docs/tools/zeus/basics/getting-started/)
- [i18next Documentation](https://www.i18next.com/)

---

## 🧠 Technical Highlights

### Payment Integration

- Configured with "Standard Payment" method
- Frontend validation for payment method availability
- Seamless checkout flow

### Localization

- India-first configuration with INR currency
- Default location: Lucknow, Uttar Pradesh, India
- Proper currency formatting using `Intl.NumberFormat`

### Database Population

- Custom population script with Indian products
- Multiple product images per item
- Proper inventory management with stock levels

### GraphQL Type Safety

- GraphQL Zeus for type-safe queries and mutations
- Automated code generation for GraphQL types
- Selector-based query building

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Best Practices

- Make atomic commits with descriptive messages
- Follow TypeScript strict mode
- Run linting before committing: `npm run lint`
- Update documentation for significant changes
- Test thoroughly before submitting PRs

---

## 📝 License

This project is currently unlicensed. Please contact the repository owner for usage permissions.

---

## 👨‍💻 Author

**Manohar**

- GitHub: [@manohar6839](https://github.com/manohar6839)

---

## 🙏 Acknowledgments

- Built with [Vendure](https://www.vendure.io/) - The headless commerce framework
- Frontend starter based on [Vendure Next.js Storefront](https://github.com/aexol-studio/vendure-nextjs-storefront)
- Icons by [Lucide](https://lucide.dev/)

---

<div align="center">

**Made with ❤️ for the Indian e-commerce ecosystem**

</div>
