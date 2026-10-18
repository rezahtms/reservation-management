Reservation Management Panel

A modern, RTL-first reservation management dashboard designed for service-oriented businesses. Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and Base UI / shadcn, the application features URL-driven filtering, Jalali (Persian) calendar integration, bidirectional numeral normalization, and persistent client-side state.

The project is designed around a modular architecture, reusable UI components, strict type safety, and a responsive user experience optimized for Persian-language workflows.

Key Features
Authentication & Route Protection
Validated email and password authentication powered by react-hook-form and zod.
One-click demo credential auto-fill for quick evaluation.
Persistent session management using Zustand's persist middleware and localStorage.
Client-side route protection through a reusable AuthGuard component.
Dashboard & Analytics
KPI summary cards displaying total, confirmed, pending, and cancelled reservations.
Dedicated DashboardSkeleton component for smooth loading experiences and Suspense boundaries.
Centralized dashboard state management for reservation metrics and user interactions.
Reservation Management
Create Reservations: A responsive slide-over drawer (NewReservationSheet) with validated fields for customer name, Iranian mobile number, service category, Jalali date, time slot, and optional notes.
Responsive Data Views: A comprehensive data table on desktop and an ergonomic card-based layout on mobile devices.
Reservation Status Workflow: Instant confirmation and cancellation actions with contextual tooltips and toast notifications.
Reservation Details: A dedicated modal dialog (ReservationDetailsDialog) displaying customer information and booking metadata.
URL-Synchronized Filtering & Debounced Search
A reusable useSearchParamsState hook that synchronizes search queries and status filters with URL search parameters, such as ?search=...&status=....
Responsive UI updates powered by optimistic transitions and debounced text input through useDebounce.
Search across customer names, phone numbers, service categories, and reservation IDs.
A one-click Clear Filters action that resets active search and status filters.
Shareable and bookmarkable filtered views through URL-based state synchronization.
Bidirectional Numeral Normalization
Seamless support for Persian (۰–۹), Arabic (٠–٩), and Western Arabic (0–9) numerals.
Localized numeral display in controlled form inputs.
Automatic normalization of form values, validation payloads, and URL parameters to standard ASCII digits (0–9).
Consistent data handling across supported keyboard layouts without compromising the Persian user experience.
Viewport-Locked Application Shell
Full-viewport application layout using h-dvh and overflow-hidden.
Fixed-height sidebar managed by PanelShell.
Independently scrollable main content area for predictable navigation and scrolling behavior.
Mobile-first responsive layouts optimized for different screen sizes.
Tech Stack
Category Technology
Framework Next.js 16.4 — App Router and Turbopack
UI Library React 19
Language TypeScript 5 — Strict mode, no any
Styling Tailwind CSS v4 and tw-animate-css
UI Primitives @base-ui/react and shadcn/ui
State Management Zustand 5 with persist middleware
Forms & Validation React Hook Form 7 and Zod 4
Calendar & Dates react-day-picker v9 with Persian calendar support and date-fns-jalali
Typography Vazirmatn local variable font via next/font/local
Notifications Sonner
Icons Lucide React
Getting Started
Prerequisites

Ensure that the following tools are installed in your development environment:

Node.js: >= 20.x
pnpm: >= 10.x, installed through Corepack or as a standalone package manager
Installation

Install the project dependencies:

pnpm install

Development Server

Start the local development server:

pnpm dev

The application will be available at http://localhost:3000.

Production Build & Verification

Run the following commands to lint the codebase, verify TypeScript types, build the application, and start the production server.

# Run ESLint

pnpm lint

# Verify TypeScript types

pnpm exec tsc --noEmit

# Build for production

pnpm build

# Start the production server

pnpm start

Demo Credentials

Use the following credentials on the sign-in screen, or click Demo Auto-Fill on the login card to populate the fields automatically.

Email: modir@example.com
Password: 12345678
Security Notice: The authentication flow and credentials are intended for demonstration purposes only. Client-side authentication and localStorage-based session persistence do not provide production-grade security. A production deployment should implement server-side authentication, secure session management, and appropriate authorization controls.
Project Structure
reservation-management/
├── app/
│ ├── (panel)/
│ │ ├── dashboard/
│ │ │ └── page.tsx
│ │ │ # Main dashboard route with Suspense and DashboardSkeleton
│ │ └── layout.tsx
│ │ # Protected panel layout with AuthGuard and PanelShell
│ ├── error.tsx
│ │ # Route-level error boundary
│ ├── fonts.ts
│ │ # Local Vazirmatn variable font configuration
│ ├── global-error.tsx
│ │ # Root-level fallback error boundary
│ ├── globals.css
│ │ # Tailwind CSS v4 configuration and semantic design tokens
│ ├── layout.tsx
│ │ # Root RTL layout, DirectionProvider, and Toaster
│ ├── not-found.tsx
│ │ # Custom 404 page
│ └── page.tsx
│ # Public login route
│
├── components/
│ ├── pages/
│ │ ├── dashboard/
│ │ │ ├── DashboardSkeleton.tsx
│ │ │ │ # Skeleton loader for dashboard metrics and table
│ │ │ ├── DashboardView.tsx
│ │ │ │ # Dashboard container coordinating state and dialogs
│ │ │ ├── NewReservationSheet.tsx
│ │ │ │ # Slide-over form for creating reservations
│ │ │ ├── ReservationDetailsDialog.tsx
│ │ │ │ # Modal dialog for reservation details
│ │ │ ├── ReservationsTable.tsx
│ │ │ │ # Filters, desktop table, and mobile card list
│ │ │ └── StatCard.tsx
│ │ │ # Reusable KPI metric card
│ │ └── login/
│ │ └── LoginForm.tsx
│ │ # Email/password login with demo auto-fill
│ │
│ ├── shared/
│ │ ├── form/
│ │ │ ├── FormDatePicker.tsx
│ │ │ │ # Jalali calendar integrated with React Hook Form
│ │ │ ├── FormInput.tsx
│ │ │ │ # Controlled input with bidirectional numeral conversion
│ │ │ ├── FormSelect.tsx
│ │ │ │ # Accessible select wrapper with localized labels
│ │ │ └── FormTextarea.tsx
│ │ │ # Controlled textarea with numeral normalization
│ │ ├── layout/
│ │ │ ├── AuthGuard.tsx
│ │ │ │ # Client-side authentication gate
│ │ │ └── PanelShell.tsx
│ │ │ # Viewport-height sidebar and scrollable main container
│ │ └── EmptyState.tsx
│ │ # Empty state with an optional reset action
│ │
│ └── ui/
│ # Reusable UI primitives: Button, Select, Sheet, Table, and more
│
└── lib/
├── constants/
│ ├── auth.const.ts
│ │ # Demo credentials and session storage keys
│ └── reservations.const.ts
│ # Status labels, service catalog, time slots, and seed data
│
├── hooks/
│ ├── use-debounce.ts
│ │ # Generic value debouncing hook
│ ├── use-reservations.ts
│ │ # Filtering, KPI computation, and reservation mutations
│ └── use-search-params.ts
│ # Reusable URL search parameter synchronization
│
├── stores/
│ ├── auth.store.ts
│ │ # Zustand authentication store
│ └── reservation.store.ts
│ # Zustand reservation CRUD store
│
├── types/
│ └── index.ts
│ # Core TypeScript interfaces and domain types
│
├── utils/
│ ├── date.util.ts
│ │ # Jalali date formatting and parsing utilities
│ ├── persian.util.ts
│ │ # Persian, Arabic, and English numeral conversion
│ └── utils.ts
│ # Tailwind class name merging helper (cn)
│
└── validations/
├── auth.validation.ts
│ # Zod schema for email authentication
└── reservation.validation.ts # Zod schema for reservation creation

Architecture & Clean Code Conventions

1. Consistent Naming Conventions

All UI primitives, shared components, and page-level components follow a consistent PascalCase naming convention for component files and exported React components.

Examples include Button.tsx, FormSelect.tsx, and DashboardView.tsx.

2. Separation of Concerns

The application follows a modular architecture with clearly defined responsibilities:

Route Layer (app/): Handles routing, layouts, metadata, error boundaries, and Suspense boundaries.
Presentation Layer (components/pages/): Encapsulates page-specific UI and user interaction flows.
Shared UI Layer (components/shared/ and components/ui/): Provides reusable form controls, layout components, and foundational UI primitives.
Business Logic Layer (lib/hooks/): Contains reusable hooks for search, filtering, debouncing, and reservation operations.
State Management Layer (lib/stores/): Centralizes authentication and reservation state using Zustand.
Validation Layer (lib/validations/): Defines reusable Zod schemas for validating authentication and reservation data. 3. URL as the Source of Truth for Filters

The useSearchParamsState hook synchronizes filter state with URL query parameters.

React's useOptimistic and startTransition are used to support responsive filter updates while preserving shareable and bookmarkable URLs.

For example:

/dashboard?search=ali&status=confirmed

This approach makes filtered views easier to share, revisit, and navigate without relying exclusively on transient component state.

4. Strict Type Safety

The codebase uses TypeScript strict mode and Zod schema inference through z.infer to maintain consistency between validation schemas and application types.

Avoid any and // @ts-ignore.
Prefer explicit, reusable domain types.
Validate user input at form boundaries.
Keep state updates and data transformations type-safe. 5. Reusable Form Architecture

Shared form components are organized under components/shared/form/ and integrate React Hook Form, Zod, and the project's UI primitives.

This approach promotes consistent validation, reusable field behavior, accessible controls, and predictable form interactions.

6. Error Handling & Loading States

The application provides dedicated error and loading interfaces to improve resilience and user feedback.

error.tsx handles route-level errors.
global-error.tsx provides a root-level fallback error interface.
loading.tsx supports route-level loading states where configured.
DashboardSkeleton.tsx provides a structured placeholder for dashboard content during loading. 7. Search Engine Indexing Controls

Private dashboard routes are configured to discourage search engine indexing through appropriate noindex metadata.

Authentication and authorization must still be enforced independently; noindex is not a security mechanism.

Data Management & Security Considerations

The current implementation uses mock data and client-side state management to support rapid evaluation and frontend development.

Reservation data is managed through Zustand stores.
Session persistence uses localStorage.
Search and filter state is synchronized with URL query parameters.
Form validation is handled through Zod schemas and React Hook Form.

For production use, the application should be extended with a persistent backend, server-side authentication, authorization policies, and server-side validation. Client-side state and mock authentication should not be treated as trusted security boundaries.

Future Enhancements

The modular architecture provides a foundation for future improvements, including:

Backend API integration and persistent database storage.
Secure server-side authentication and role-based access control.
Reservation availability management and conflict detection.
Advanced reporting, analytics, and data visualization.
Automated unit, integration, and end-to-end testing.
CI/CD workflows and automated code quality checks.
Expanded localization and internationalization support.
Audit logs and reservation change history.
Project Goals

The Reservation Management Panel aims to deliver a polished, maintainable, and extensible reservation management experience for Persian-speaking service businesses.

By combining a native-feeling RTL interface, Jalali calendar support, flexible reservation workflows, URL-driven filtering, and modern React architecture, the project provides a strong foundation for evolving from a frontend prototype into a production-ready business application.
