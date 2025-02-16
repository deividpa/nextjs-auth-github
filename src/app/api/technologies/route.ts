import { NextResponse } from 'next/server';

interface Technology {
  name: string;
  description: string;
  logo: string;
  category: string;
  level: number;
  documentation: string;
}

export async function GET() {
  const technologies: Technology[] = [
    {
      name: "Next.js",
      description: "The React framework used for the application structure, offering server-side rendering, routing, and API routes. Powers the core architecture of the Roadmap Creator.",
      logo: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg",
      category: "Framework",
      level: 1,
      documentation: "https://nextjs.org/docs"
    },
    {
      name: "React",
      description: "The foundational UI library that enables the creation of interactive components and manages the application's view layer.",
      logo: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
      category: "Library",
      level: 1,
      documentation: "https://react.dev"
    },
    {
      name: "PostgreSQL",
      description: "The primary database system storing all roadmap data, user information, and relationships between different entities.",
      logo: "https://cdn.worldvectorlogo.com/logos/postgresql.svg",
      category: "Database",
      level: 1,
      documentation: "https://www.postgresql.org/docs/"
    },
    {
      name: "Prisma",
      description: "Modern database ORM that handles database operations, schema management, and type-safe database queries.",
      logo: "https://cdn.worldvectorlogo.com/logos/prisma-2.svg",
      category: "ORM",
      level: 1,
      documentation: "https://www.prisma.io/docs"
    },
    {
      name: "Gemini API",
      description: "Google's AI model integration that powers the intelligent roadmap generation feature, creating personalized learning paths.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
      category: "AI Service",
      level: 1,
      documentation: "https://ai.google.dev/docs"
    },
    {
      name: "TypeScript",
      description: "Adds static typing to JavaScript, enhancing code quality and developer experience with better tooling and error detection.",
      logo: "https://cdn.worldvectorlogo.com/logos/typescript.svg",
      category: "Language",
      level: 2,
      documentation: "https://www.typescriptlang.org/docs/"
    },
    {
      name: "TailwindCSS",
      description: "Utility-first CSS framework used for styling the application, providing rapid UI development capabilities.",
      logo: "https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg",
      category: "Styling",
      level: 1,
      documentation: "https://tailwindcss.com/docs"
    },
    {
      name: "NextAuth.js",
      description: "Authentication solution that handles user sessions, multiple providers (GitHub, Google), and security.",
      logo: "https://next-auth.js.org/img/logo/logo-sm.png",
      category: "Authentication",
      level: 2,
      documentation: "https://next-auth.js.org/getting-started/introduction"
    },
    {
      name: "React Query",
      description: "Data-fetching and state management library that handles server state, caching, and real-time updates.",
      logo: "https://raw.githubusercontent.com/TanStack/query/main/media/logo.svg",
      category: "State Management",
      level: 2,
      documentation: "https://tanstack.com/query/latest/docs/react/overview"
    },
    {
      name: "Zod",
      description: "TypeScript-first schema validation library ensuring data integrity throughout the application.",
      logo: "https://zod.dev/logo.svg",
      category: "Validation",
      level: 3,
      documentation: "https://zod.dev/"
    }
  ];

  return NextResponse.json(technologies);
}