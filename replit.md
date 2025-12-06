# Gemini Chatbot Application

## Overview

This is a modern AI chatbot application powered by Google's Gemini API. The application provides a conversation-first interface inspired by ChatGPT and Claude, focusing on clarity, readability, and distraction-free dialogue. Users can engage in natural language conversations with the AI, with full conversation history maintained locally in browser storage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Tooling**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, providing fast HMR (Hot Module Replacement)
- **Wouter** for client-side routing (lightweight alternative to React Router)
- **TanStack Query (React Query)** for server state management and API data fetching

**UI Component System**
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom design tokens
- Design system follows "New York" style variant with neutral base colors
- Custom spacing scale using Tailwind units (2, 3, 4, 6, 8) for consistent rhythm
- Responsive layout with mobile-first approach (768px breakpoint)

**State Management**
- Local browser storage (localStorage) for chat history persistence using `STORAGE_KEY = "gemini-chat-history"`
- React hooks for component-level state
- TanStack Query for server state caching and synchronization

**Chat Interface Design**
- Full-height layout (`h-screen flex flex-col`) with fixed header and input areas
- Scrollable chat container with `max-w-3xl` centered layout
- Message bubbles with distinct styling for user (right-aligned) and AI (left-aligned) messages
- Typing indicator animation during AI response generation
- Suggested prompts feature for quick conversation starters

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript for the HTTP server
- **Node.js** runtime with ESM module system
- Development mode uses `tsx` for TypeScript execution
- Production builds compile to CommonJS using esbuild

**API Design**
- RESTful endpoint: `POST /api/chat`
- Request validation using Zod schemas
- Accepts message text and optional conversation history
- Returns AI-generated response as JSON

**Build Strategy**
- Client and server built separately
- Server bundles specific dependencies (allowlist) to reduce syscalls and improve cold start times
- Vite handles client bundling with code splitting and optimization
- Static assets served from `dist/public` directory

### Data Storage Solutions

**Current Implementation**
- **In-Memory Storage** using Map data structure for user data (demo/placeholder implementation)
- **Client-Side Storage** using localStorage for chat conversation history
- No persistent database currently active (schema defined but not connected)

**Database Schema (Configured but Unused)**
- **Drizzle ORM** configured with PostgreSQL dialect
- Schema file location: `shared/schema.ts`
- Migration output directory: `./migrations`
- Database connection via `DATABASE_URL` environment variable
- Note: The application is ready to add PostgreSQL when needed via `db:push` script

### External Dependencies

**AI Service Integration**
- **Google Gemini API** (`@google/genai` package) as the primary AI provider
- Model: `gemini-2.5-flash` for conversational responses
- API key configuration: `GEMINI_API_KEY` environment variable
- Conversation history sent with each request to maintain context
- Handles content generation with error fallback messaging

**UI Libraries**
- **Radix UI** component primitives for accessible, unstyled components
- **Lucide React** for iconography
- **class-variance-authority** for variant-based component styling
- **clsx** and **tailwind-merge** for conditional className composition

**Form & Validation**
- **React Hook Form** with Zod resolver for form state management
- **Zod** for runtime type validation and schema definition
- **drizzle-zod** for deriving Zod schemas from Drizzle ORM schemas

**Developer Experience**
- **Replit plugins** for development banner, error overlay, and cartographer (code mapping)
- TypeScript strict mode enabled with path aliases (`@/*`, `@shared/*`)
- ESLint and Prettier implied by project structure

**Session Management (Configured)**
- **express-session** with **connect-pg-simple** store adapter (ready for PostgreSQL)
- **memorystore** as alternative session store option

**Additional Integrations (Available)**
- Package.json includes various libraries for potential features:
  - **Stripe** for payments
  - **Passport.js** for authentication
  - **Nodemailer** for email
  - **Multer** for file uploads
  - **OpenAI** SDK (alternative to Gemini)
  - **WebSockets** (`ws`) for real-time communication