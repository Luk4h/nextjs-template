# Next.js 15 Template

This repository is a Next.js 15 template designed to kickstart your projects with a robust setup. It includes Prisma, TypeScript, Tailwind CSS, NextAuth.js, Internationalization, and Shadcn/ui. This template is ready for production and can be easily customized to fit your needs.

## Features

-   **Next.js 15**: The latest version of Next.js with enhanced performance and features.
-   **Prisma**: Database ORM for seamless database interactions.
-   **TypeScript**: Static typing for improved code quality and maintainability.
-   **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
-   **NextAuth.js**: Authentication solution with support for multiple providers.
-   **Internationalization**: Built-in support for multiple languages.
-   **Shadcn/ui**: UI components for building modern interfaces.

## Folder Structure

```
dashboard/
├── prisma/
├── public/
├── src/
│   ├── app/
│   │   ├── [lang]/
│   │   │   ├── (auth)/signin/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   ├── api/[...nextauth]/
│   │   ├── auth/
│   │   ├── dictionaries/
│   │   ├── lib/
│   │   ├── prisma/
│   │   ├── styles/
│   │   ├── types/
├── .env
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/nextjs-template.git
   cd nextjs-template
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   - Copy `.env.example` to `.env` and fill in your environment variables.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## Key Components

### Layout

The `layout.tsx` file sets up the HTML structure and includes locale management for internationalization.

### Prisma

Prisma is configured to connect to a PostgreSQL database. The schema is set up for user authentication.

### Authentication

NextAuth.js is split into multiple files for edge compatibility:
-   `baseConfig.ts`: Basic configuration.
-   `providers.ts`: Authentication providers.
-   `index.ts`: Combines configurations and sets up Prisma adapter.

### Internationalization

Locale management is handled in `src/lib/i18n.ts` and `src/lib/dictionary.ts`, supporting `en-US` and `pt-BR`.

### Middleware

`src/middleware.ts` ensures users are redirected to the correct locale and handles authentication redirection.

### Environment Configuration

`src/lib/env.ts` validates and loads environment variables, supporting Docker secrets.

## Customization

Feel free to modify the template to suit your project's needs. The `page.tsx` file is the default Next.js page and can be customized.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For questions or suggestions, feel free to open an issue or contact me directly.

---

This template is designed to help you quickly start your Next.js projects with a solid foundation. Enjoy building!
