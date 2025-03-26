import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Open API Documentation', version: '1.0.0' },
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