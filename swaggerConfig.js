import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Open API Documentation', version: '1.0.0' },
    description: "Front End Application demonstrating Configurable Form Generation, API's, WareHouse Integration, PWA(Progressive Web App) support",
    license: {
      name: 'Apache 2.0'
    },
    contact: {
      name: 'Shawn M. Crowley',
      url: 'https://github.com/shawnmcrowley'
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