import { createSwaggerSpec } from "next-swagger-doc"

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api/v1/persons", // define api folder under app folder
    definition: {
      openapi: "3.0.0",
      info: {
        title: "OpenAPI Specification Documentation",
        version: "1.0"
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
          }
        }
      },
      security: []
    }
  })
  return spec
}
