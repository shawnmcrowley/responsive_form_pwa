# Responsive Form PWA with Snowflake Integration

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<a name="readme-top"></a>

https://www.linkedin.com/in/shawnmcrowley

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#installation">Installation and Configuration</a></li>
    <li><a href="#snowflake-integration">Snowflake Integration</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
### About The Project

Simple Form to represent Responsive Design and the Ability to add PWA for Desktop/Mobile Installation, offline usage, and rendering on Desktop and Mobile

The Basics:
* Start by creating a nextjs project
* Add the snowflake-sdk via npm install
* Configure credentials, a sample warehouse, schema, and table for testing. See SQL script in "utils" folder. Follow instructions below for setting up Key/Value Pair
* Create a .env file to store Snowflake credentials and variables for connecting
* Before creating a UI, test first with a command line script to validate connectivity and simple operations. See sample node script in "utils" folder.
* Once the operations and connectivity work, move on to the UI design and API's

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Project Structure

```
/
├── public/             # Static assets and PWA files
├── src/
│   ├── app/            # Next.js app router components
│   │   ├── api/        # API routes
│   │   ├── api-docs/   # Swagger documentation
│   │   ├── components/ # UI components (footer, form_generator, header)
│   │   ├── configs/    # Configuration files (formConfig, swaggerConfig)
│   │   ├── formutil/   # Form utilities
│   │   └── utils/      # Snowflake scripts and SQL files
│   ├── globals.css     # Global styles
│   └── layout.js       # Root layout
└── .env.local          # Environment variables for Snowflake
```

### Features

- Responsive form interface with modern design
- Progressive Web App (PWA) capabilities for offline usage
- Snowflake integration for data storage and retrieval
- API documentation with Swagger
- Dynamic form generation based on configuration
- Environment-based configuration for different deployments

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/shawnmcrowley/responsive_form_pwa.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a `.env.local` file with your Snowflake credentials
   ```
   SNOWFLAKE_ACCOUNT=your_account
   SNOWFLAKE_USERNAME=your_username
   SNOWFLAKE_PASSWORD=your_password
   SNOWFLAKE_DATABASE=your_database
   SNOWFLAKE_SCHEMA=your_schema
   SNOWFLAKE_WAREHOUSE=your_warehouse
   ```
4. Start the development server
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Snowflake Integration

This project demonstrates integration with Snowflake using both the Snowflake SDK and REST API with key pair authentication.

#### Using Snowflake SDK

```javascript
// Example of connecting to Snowflake using the SDK
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
    console.error('Error connecting to Snowflake:', err);
    return;
  }
  
  // Execute a query
  connection.execute({
    sqlText: 'SELECT * FROM your_table',
    complete: (err, stmt, rows) => {
      if (err) {
        console.error('Error executing query:', err);
        return;
      }
      console.log('Query results:', rows);
      connection.destroy();
    }
  });
});
```

#### Snowflake REST API Using Key Pair Authentication

**REST API:**

A REST API (Representational State Transfer API) is a way for different software systems to talk to each other over the internet. It uses standard HTTP methods like GET, POST, PUT, and DELETE to request and send data, allowing clients (like websites or apps) to interact with a server to access, update, or delete information.

**JWT (JSON Web Token):**

JWT (JSON Web Token) is commonly used in REST APIs for secure authentication and authorization. It allows the server to verify the identity of a client by sending a token with each request. The token, containing user information, is signed to ensure integrity and can be verified without needing to store session data on the server, enabling stateless communication.

**Steps for Key Pair Authentication:**

1. Generate Public and Private Keys Using OpenSSL:

   ```bash
   # Generate private key
   openssl genrsa 2048 | openssl pkcs8 -topk8 -inform PEM -out rsa_key.p8 -nocrypt
   
   # Generate public key
   openssl rsa -in rsa_key.p8 -pubout -out rsa_key.pub
   ```

2. Assign the Public Key to a Snowflake User:

   ```sql
   ALTER USER example_user SET RSA_PUBLIC_KEY='PASTE YOUR PUBLIC KEY HERE';
   ```

3. Verify the User's Public Key Fingerprint:

   ```sql
   DESC USER example_user;
   SELECT SUBSTR((SELECT "value" FROM TABLE(RESULT_SCAN(LAST_QUERY_ID()))
     WHERE "property" = 'RSA_PUBLIC_KEY_FP'), LEN('SHA256:') + 1);
   ```

4. Generate a JWT Token using the private key and make API requests.

<p><a href="https://select.dev/docs/snowflake-developer-guide/snowflake-key-pair">Additional Link for Key/Pair Generation</a></p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/newfeature`)
3. Commit your Changes (`git commit -m 'Add some newfeature'`)
4. Push to the Branch (`git push origin feature/newfeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Your Name - [@shawnmcrowley](https://twitter.com/shawnmcrowley) - scrowley@buffalo.edu

Project Link: [https://github.com/shawnmcrowley/responsive_form_pwa](https://github.com/shawnmcrowley/responsive_form_pwa)

<p align="right">(<a href="#readme-top">back to top</a>)</p>