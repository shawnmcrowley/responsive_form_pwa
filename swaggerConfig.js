import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.4',
    info: {
      title: 'Open API Documentation',
      version: '1.0.0',
      description:
        "Front End Application demonstrating Configurable Form Generation, API's, WareHouse Integration, PWA(Progressive Web App) support",
      contact: {
        name: 'Shawn M. Crowley',
        email: 'shawn.crowley@lycra.com'
      }
    },
    license: {
      name: 'Apache 2.0'
    },

    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development Server'
      }
    ],
       components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [],
  },
  apis: ['./src/app/api/**/*.js'], // Path to API routes
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;