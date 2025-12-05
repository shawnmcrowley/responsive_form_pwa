# Responsive Form PWA with Snowflake Integration

A modern [Next.js](https://nextjs.org) Progressive Web App demonstrating responsive form design with seamless Snowflake database integration for enterprise data management.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Snowflake Integration](#snowflake-integration)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About

This project combines responsive web design principles with Progressive Web App (PWA) capabilities to create a modern form interface with robust Snowflake backend integration. Users can access the application on desktop or mobile, with offline functionality and seamless data synchronization.

### Key Highlights

- 📱 **Responsive Design** - Works flawlessly across all devices
- 🔌 **PWA Enabled** - Install as a native app, works offline
- 🗄️ **Snowflake Integration** - Enterprise-grade data management
- 🔐 **Secure Authentication** - Key pair authentication support
- 📊 **API Documentation** - Built-in Swagger UI
- ⚙️ **Dynamic Forms** - Configuration-driven form generation

---

## Features

- ✅ Responsive form interface with modern design patterns
- ✅ Progressive Web App (PWA) capabilities for offline usage and home screen installation
- ✅ Snowflake integration for enterprise data storage and retrieval
- ✅ API documentation with Swagger
- ✅ Dynamic form generation based on configuration files
- ✅ Environment-based configuration for multiple deployments
- ✅ Key pair authentication for secure Snowflake connections

---

## Project Structure

```
responsive_form_pwa/
├── public/                 # Static assets and PWA manifest files
├── src/
│   ├── app/
│   │   ├── api/           # API routes for backend operations
│   │   ├── api-docs/      # Swagger API documentation
│   │   ├── components/    # Reusable UI components
│   │   │   ├── footer/
│   │   │   ├── form_generator/
│   │   │   └── header/
│   │   ├── configs/       # Configuration files
│   │   │   ├── formConfig.js
│   │   │   └── swaggerConfig.js
│   │   ├── formutil/      # Form utilities and helpers
│   │   ├── utils/         # Snowflake setup scripts and SQL
│   │   ├── globals.css    # Global styles
│   │   └── layout.js      # Root layout component
│   └── .env.local         # Environment variables (not in version control)
├── package.json
└── README.md
```

---

## Installation

### Prerequisites

- Node.js 18+ and npm
- Snowflake account with database and warehouse access
- OpenSSL (for key pair generation)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/shawnmcrowley/responsive_form_pwa.git
   cd responsive_form_pwa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Generate Snowflake key pair** (see [Key Pair Authentication](#key-pair-authentication))

4. **Create `.env.local`** with your Snowflake credentials
   ```env
   SNOWFLAKE_ACCOUNT=your_account
   SNOWFLAKE_USERNAME=your_username
   SNOWFLAKE_DATABASE=your_database
   SNOWFLAKE_SCHEMA=your_schema
   SNOWFLAKE_WAREHOUSE=your_warehouse
   SNOWFLAKE_PRIVATE_KEY=your_private_key_path
   SNOWFLAKE_PRIVATE_KEY_PASSPHRASE=your_passphrase
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Test Snowflake connectivity** using the sample script in `src/app/utils/`

---

## Snowflake Integration

This project supports two methods of connecting to Snowflake:

### SDK Connection

```javascript
// filepath: src/app/api/snowflake-connection.js
import snowflake from 'snowflake-sdk';

const connection = snowflake.createConnection({
  account: process.env.SNOWFLAKE_ACCOUNT,
  username: process.env.SNOWFLAKE_USERNAME,
  password: process.env.SNOWFLAKE_PASSWORD,
  database: process.env.SNOWFLAKE_DATABASE,
  schema: process.env.SNOWFLAKE_SCHEMA,
  warehouse: process.env.SNOWFLAKE_WAREHOUSE
});

connection.connect((err, conn) => {
  if (err) {
    console.error('Connection error:', err);
    return;
  }
  
  connection.execute({
    sqlText: 'SELECT * FROM your_table LIMIT 10',
    complete: (err, stmt, rows) => {
      if (err) console.error('Query error:', err);
      else console.log('Results:', rows);
      connection.destroy();
    }
  });
});
```

### REST API with Key Pair Authentication

#### Key Concepts

**REST API** - Standard HTTP-based communication allowing clients to interact with servers using GET, POST, PUT, and DELETE methods.

**JWT (JSON Web Token)** - Secure, stateless authentication mechanism containing encoded user information and cryptographic signatures.

#### Setup Instructions

1. **Generate RSA Key Pair**
   ```bash
   # Generate private key (PKCS8 format)
   openssl genrsa 2048 | openssl pkcs8 -topk8 -inform PEM -out rsa_key.p8 -nocrypt
   
   # Generate public key
   openssl rsa -in rsa_key.p8 -pubout -out rsa_key.pub
   ```

2. **Assign Public Key to Snowflake User**
   ```sql
   ALTER USER example_user SET RSA_PUBLIC_KEY='<YOUR_PUBLIC_KEY>';
   ```

3. **Verify Key Fingerprint**
   ```sql
   DESC USER example_user;
   ```

4. **Use Private Key for JWT Authentication** in API requests

📖 **Reference:** [Snowflake Key Pair Authentication Guide](https://select.dev/docs/snowflake-developer-guide/snowflake-key-pair)

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE.txt` for details.

---

## Contact

**Shawn Crowley**

- 📧 Email: [shawn.crowley@lycra.com](mailto:shawn.crowley@lycra.com)
- 🔗 LinkedIn: [@shawnmcrowley](https://www.linkedin.com/in/shawnmcrowley)
- 🐦 Twitter: [@shawnmcrowley](https://twitter.com/shawnmcrowley)
- 🔗 GitHub: [responsive_form_pwa](https://github.com/shawnmcrowley/responsive_form_pwa)

---

**[Back to top](#)**