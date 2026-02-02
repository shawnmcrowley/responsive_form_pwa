# AGENTS.md - Agentic Coding Guidelines

## Project Overview

Next.js 16 Progressive Web App with Snowflake integration, dynamic form generation, and Swagger API documentation.

## Build Commands

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run dev-https        # HTTPS development mode
npm run dev:proxy        # Development with proxy

# Production
npm run build            # Build for production
npm start                # Start production server

# Linting
npm run lint             # Run ESLint
```

**Note:** This project does not have test infrastructure configured. There are no test runners or test scripts in package.json.

## Code Style Guidelines

### Language & Framework
- **JavaScript** (ES6+) - not TypeScript
- **Next.js 16** with App Router
- **React 19**
- **Tailwind CSS 4** for styling

### File Organization
```
src/app/
├── api/              # API routes (route.js files)
├── components/       # React components
├── configs/          # Configuration files
├── lib/              # Library code (Snowflake client)
├── ui/               # UI pages
└── utils/            # Utility functions
```

### Naming Conventions
- **Components**: PascalCase (e.g., `FormGenerator`, `Header`)
- **Files**: lowercase with underscores (e.g., `form_generator.js`, `swaggerConfig.js`)
- **Routes**: lowercase (e.g., `persons/route.js`)
- **Functions**: camelCase (e.g., `handleSubmit`, `withSnowflake`)
- **Constants**: UPPER_SNAKE_CASE for true constants

### Import Conventions
- Use `@/` path alias for src imports: `import { withSnowflake } from "@/app/lib/snowflake"`
- Use standard Next.js imports: `import { NextResponse } from "next/server"`
- Group imports: React/Next first, then libraries, then local imports

### Component Structure
- Use `"use client"` directive at top for client components
- Default exports for page components
- Named exports for reusable components
- Props destructuring in function parameters

Example:
```javascript
"use client"
import { useState } from "react"

export const FormGenerator = ({ config, handleSubmit, children }) => {
  // Component logic
}
```

### API Routes
- Use JSDoc comments for Swagger documentation
- Always wrap in try/catch blocks
- Return JSON responses with `NextResponse.json()`
- Include success/error flags in responses

Example:
```javascript
/**
 * @swagger
 * /api/v1/persons:
 *   get:
 *     summary: Description here
 *     tags:
 *       - TagName
 */
export async function GET(req) {
  try {
    // Logic
    return NextResponse.json({ success: true, data: rows })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
```

### Styling
- Use **Tailwind CSS** utility classes
- Prefer `className` over inline styles
- Use responsive prefixes (e.g., `md:`, `lg:`)
- Dark mode support with `dark:` prefix

### Error Handling
- Always use try/catch in async functions
- Log errors to console with descriptive messages
- Return appropriate HTTP status codes
- Provide user-friendly error messages

### PWA Considerations
- Service worker in `public/sw.js`
- Manifest in `public/manifest.json`
- Icons in `public/icons/`

### Environment Variables
- Use `process.env.VARIABLE_NAME`
- Store sensitive config in `.env.local`
- Never commit `.env*` files (see .gitignore)

### Key Dependencies
- next-swagger-doc: API documentation
- snowflake-sdk: Database integration
- ag-grid-react: Data grids
- swagger-ui-react: API docs UI

## Code Patterns

### Snowflake Database Access
```javascript
import { withSnowflake } from "@/app/lib/snowflake"

const rows = await withSnowflake(async (client) => {
  return await client.execute("SELECT * FROM table")
})
```

### Form Configuration
Forms are config-driven in `src/app/configs/formConfig.js` with field types: text, email, password, textarea, select, file.

## Important Notes
- No test runner configured (Jest/Vitest not present)
- No ESLint config file (uses Next.js default)
- Uses jsconfig.json for path aliases
- No TypeScript - pure JavaScript project
- Tailwind CSS v4 with PostCSS
- Turbopack enabled for development
