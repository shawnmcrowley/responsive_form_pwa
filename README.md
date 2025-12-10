<div align="center">

# Responsive Form PWA

**Modern Progressive Web App with Snowflake integration and dynamic form generation**

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![Snowflake](https://img.shields.io/badge/Snowflake-Database-29B5E8)](https://www.snowflake.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

<a name="toc"></a>

[Features](#features) •
[Getting Started](#getting-started) •
[PWA Setup](#pwa-setup) •
[Snowflake Integration](#snowflake-integration) •
[API Documentation](#api-documentation) •
[Contributing](#contributing)

</div>

---

<a name="overview"></a>

## 📋 Overview

A production-ready Progressive Web App built with Next.js 16 that combines responsive form design with enterprise-grade Snowflake database integration. Features offline functionality, dynamic form generation, and comprehensive API documentation with Swagger UI.

<a name="features"></a>

## ✨ Features

- 📱 **Progressive Web App** - Install as native app with offline support
- 🎨 **Responsive Design** - Seamless experience across desktop, tablet, and mobile
- 🗄️ **Snowflake Integration** - Enterprise data storage with SDK and REST API support
- 📝 **Dynamic Forms** - Configuration-driven form generation
- 📊 **API Documentation** - Built-in Swagger UI for API exploration
- 🔐 **Secure Authentication** - Key pair authentication for Snowflake
- ⚡ **Turbopack** - Fast development with Next.js 16 Turbopack bundler
- 🎯 **AG Grid** - Advanced data grid for displaying results

[Back to Top](#toc)

<a name="getting-started"></a>

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Snowflake account (optional for database features)

### Installation

```bash
# Clone the repository
git clone https://github.com/shawnmcrowley/responsive_form_pwa.git

# Navigate to project directory
cd responsive_form_pwa

# Install dependencies
npm install

# Run development server with Turbopack
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production

```bash
npm run build
npm start
```

[Back to Top](#toc)

<a name="pwa-setup"></a>

## 📱 PWA Setup

### Service Worker

The application uses a custom service worker (`public/sw.js`) for offline functionality and caching strategies.

**Key Features:**
- Network-first caching strategy
- Automatic cache management
- Offline fallback support

### Manifest Configuration

Edit `public/manifest.json` to customize your PWA:

```json
{
  "name": "Responsive Form with PWA",
  "short_name": "Form Entry PWA",
  "description": "A Progressive Web Form with PWA Support",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#ffffff",
  "background_color": "#ffffff"
}
```

### Installation

The PWA can be installed on:
- **Desktop**: Chrome, Edge, Safari (macOS)
- **Mobile**: Android (Chrome), iOS (Safari)

Users will see an install prompt when visiting the application.

[Back to Top](#toc)

<a name="snowflake-integration"></a>

## 🗄️ Snowflake Integration

### Environment Variables

Create `.env.local` in the project root:

```env
SNOWFLAKE_ACCOUNT=your_account
SNOWFLAKE_USERNAME=your_username
SNOWFLAKE_DATABASE=your_database
SNOWFLAKE_SCHEMA=your_schema
SNOWFLAKE_WAREHOUSE=your_warehouse
SNOWFLAKE_PRIVATE_KEY_PATH=path/to/rsa_key.p8
SNOWFLAKE_PRIVATE_KEY_PASSPHRASE=your_passphrase
```

### SDK Connection

```javascript
import snowflake from 'snowflake-sdk';

const connection = snowflake.createConnection({
  account: process.env.SNOWFLAKE_ACCOUNT,
  username: process.env.SNOWFLAKE_USERNAME,
  database: process.env.SNOWFLAKE_DATABASE,
  schema: process.env.SNOWFLAKE_SCHEMA,
  warehouse: process.env.SNOWFLAKE_WAREHOUSE
});
```

### Key Pair Authentication

1. **Generate RSA Key Pair**
   ```bash
   openssl genrsa 2048 | openssl pkcs8 -topk8 -inform PEM -out rsa_key.p8 -nocrypt
   openssl rsa -in rsa_key.p8 -pubout -out rsa_key.pub
   ```

2. **Assign Public Key to Snowflake User**
   ```sql
   ALTER USER example_user SET RSA_PUBLIC_KEY='<YOUR_PUBLIC_KEY>';
   ```

3. **Verify Configuration**
   ```sql
   DESC USER example_user;
   ```

📖 **Reference:** [Snowflake Key Pair Authentication Guide](https://select.dev/docs/snowflake-developer-guide/snowflake-key-pair)

[Back to Top](#toc)

<a name="api-documentation"></a>

## 📚 API Documentation

Access the Swagger UI at [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Available Endpoints

- `GET /api/v1/persons` - Retrieve person records
- `POST /api/v1/persons` - Create new person record
- `GET /api/health` - Health check endpoint

### Adding New Endpoints

1. Create route file in `src/app/api/`
2. Documentation is automatically generated from route files
3. View in Swagger UI

[Back to Top](#toc)

<a name="project-structure"></a>

## 📁 Project Structure

```
responsive_form_pwa/
├── public/
│   ├── icons/              # PWA icons and screenshots
│   ├── manifest.json       # PWA manifest
│   └── sw.js              # Service worker
├── src/
│   └── app/
│       ├── api/           # API routes
│       │   └── v1/        # Versioned API endpoints
│       ├── api-docs/      # Swagger UI page
│       ├── components/    # Reusable components
│       │   ├── footer.js
│       │   ├── header.js
│       │   ├── form_generator.js
│       │   └── ServiceWorkerRegistration.js
│       ├── configs/       # Configuration files
│       ├── formutil/      # Form utilities
│       ├── ui/            # UI pages
│       │   ├── forms/     # Form entry page
│       │   └── console/   # Data view page
│       ├── utils/         # Utility functions
│       ├── layout.js      # Root layout
│       └── page.js        # Home page
├── next.config.mjs        # Next.js configuration
├── package.json
└── README.md
```

[Back to Top](#toc)

<a name="configuration"></a>

## 🔧 Configuration

### Dynamic Form Generation

Forms are configured in `src/app/configs/formConfig.js`:

```javascript
export const formConfig = {
  fields: [
    { name: 'firstName', type: 'text', label: 'First Name', required: true },
    { name: 'lastName', type: 'text', label: 'Last Name', required: true },
    { name: 'email', type: 'email', label: 'Email', required: true }
  ]
};
```

### Swagger Configuration

API documentation settings in `src/app/configs/swaggerConfig.js`

[Back to Top](#toc)

<a name="deployment"></a>

## 🚀 Deployment

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Vercel Deployment

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push code to GitHub
2. Import repository in Vercel
3. Configure environment variables
4. Deploy

[Back to Top](#toc)

<a name="contributing"></a>

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

[Back to Top](#toc)

<a name="license"></a>

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

[Back to Top](#toc)

<a name="acknowledgments"></a>

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Snowflake for enterprise data platform
- AG Grid for data visualization
- Swagger UI for API documentation

[Back to Top](#toc)

<a name="contact"></a>

## 📧 Contact

**Shawn M. Crowley**

- 📧 Email: [shawn.crowley@lycra.com](mailto:shawn.crowley@lycra.com)
- 🔗 LinkedIn: [@shawnmcrowley](https://www.linkedin.com/in/shawnmcrowley)
- 🐦 Twitter: [@shawnmcrowley](https://twitter.com/shawnmcrowley)
- 🔗 GitHub: [responsive_form_pwa](https://github.com/shawnmcrowley/responsive_form_pwa)

[Back to Top](#toc)

---

<div align="center">
Made with ❤️ using Next.js 16 and Snowflake
</div>
