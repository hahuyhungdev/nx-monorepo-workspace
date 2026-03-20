# My Org — NX Monorepo

> Domain-driven SaaS platform monorepo powered by **Nx 22**, **pnpm**, **React 19**, **NestJS 11**, and **Astro 6**.

---

## Quick Start

```bash
pnpm install

# Frontend
pnpm exec nx serve front-office   # React SPA     → http://localhost:4200
pnpm exec nx serve backoffice     # Admin SPA     → http://localhost:4300

# Backend
pnpm exec nx serve api-main       # NestJS main   → http://localhost:3000
pnpm exec nx serve api-admin      # NestJS admin  → http://localhost:3001
pnpm exec nx serve api-worker     # NestJS worker → http://localhost:3002

# Run everything at once
pnpm dev
```

## Architecture

```
apps/
  front-office/        React 19 + Vite — customer-facing SPA (routing + layout only)
  backoffice/          React 19 + Vite — internal admin dashboard (routing + layout only)
  landing/             Astro 6 — marketing/SEO landing page
  api-main/            NestJS 11 — primary REST API (port 3000)
    src/
      auth/            AuthModule — login, signup, me
      billing/         BillingModule — plans, subscriptions, invoices
  api-admin/           NestJS 11 — internal admin API (port 3001)
    src/
      user-management/ UserManagementModule
      audit-log/       AuditLogModule
  api-worker/          NestJS 11 — background worker (port 3002)
    src/
      billing-renewal/ BillingRenewalModule
      email-digest/    EmailDigestModule
  front-office-e2e/    Playwright e2e tests
  backoffice-e2e/      Playwright e2e tests

libs/
  fe-auth/             React auth domain lib (shared by front-office + backoffice)
    src/
      feature/         AuthProvider, useAuth, ProtectedRoute, LoginPage, auth.api.ts
      ui/              LoginForm, SignupForm
  fe-billing/          React billing domain lib
    src/
      feature/         BillingProvider, useBilling, billing.api.ts
      ui/              PricingCard, PlanBadge, InvoiceTable
  fe-shared/           Shared FE primitives (design system + utilities)
    src/
      ui/              Button, Card
      util/            formatDate, capitalize, ApiResponse<T>
  be-shared/           Shared NestJS utilities (used by all 3 backends)
    src/
      database/        DatabaseModule (TypeORM + SQLite), User entity
      middleware/      LoggingMiddleware
      filters/         HttpExceptionFilter
      guards/          (AuthGuard — coming soon)
      health/          HealthModule → GET /api/health

tools/
  generators/
    domain-lib/        Custom Nx generator for new domain libs

data/
  dev.sqlite           SQLite database file (git-ignored)
```

## Tag System

Every project has **three tags**: `scope` + `type` + `platform`.

| Tag          | Values                             |
| ------------ | ---------------------------------- |
| **scope**    | `app`, `auth`, `billing`, `shared` |
| **type**     | `app`, `lib`, `e2e`                |
| **platform** | `fe`, `be`, `shared`               |

### Platform Rules (isolation)

```
platform:fe   → can only depend on platform:fe or platform:shared
platform:be   → can only depend on platform:be or platform:shared
```

### Scope Rules (domain isolation)

```
scope:auth     → auth, shared
scope:billing  → billing, shared
scope:shared   → shared only
scope:app      → auth, billing, shared
```

## Path Aliases

```
@my-org/fe-auth    → libs/fe-auth/src/index.ts
@my-org/fe-billing → libs/fe-billing/src/index.ts
@my-org/fe-shared  → libs/fe-shared/src/index.ts
@my-org/be-shared  → libs/be-shared/src/index.ts
```

## Naming Conventions

| Item           | Convention     | Example                 |
| -------------- | -------------- | ----------------------- |
| Files          | dot-separated  | `auth.provider.tsx`     |
| Specs          | `*.spec.tsx`   | `auth.spec.tsx`         |
| CSS Modules    | `*.module.css` | `login-form.module.css` |
| Barrel exports | `src/index.ts` | single re-export point  |

## Common Commands

```bash
# Development
pnpm exec nx serve front-office
pnpm exec nx serve api-main

# Testing
pnpm exec nx run-many -t test --parallel=3
pnpm exec nx run front-office-e2e:e2e

# Linting & Formatting
pnpm exec nx run-many -t lint --parallel=3
pnpm exec nx format:check
pnpm exec nx format:write

# Building
pnpm exec nx run-many -t build --parallel=3

# Affected (CI)
pnpm exec nx affected -t lint test build --parallel=3

# Project graph
pnpm exec nx graph
```

## Database

All 3 backend apps share a single **SQLite** database via `DatabaseModule` from `@my-org/be-shared`.

- ORM: **TypeORM 0.3** with `better-sqlite3` driver
- Dev DB file: `data/dev.sqlite` (auto-created on first run, git-ignored)
- Schema sync is enabled in non-production (`synchronize: true`)
- To add entities to an app, use `TypeOrmModule.forFeature([YourEntity])` in that app's module

## Tech Stack

| Layer      | Tech                                                    |
| ---------- | ------------------------------------------------------- |
| Monorepo   | Nx 22.6, pnpm 10                                        |
| Frontend   | React 19, Vite 7, React Router 6                        |
| Backend    | NestJS 11, TypeORM 0.3, SQLite (better-sqlite3)         |
| Landing    | Astro 6                                                 |
| Testing    | Vitest 4 (FE libs), Jest 30 (BE apps), Playwright (e2e) |
| Lint       | ESLint 9 (flat config), Prettier 3                      |
| TypeScript | 5.7                                                     |
| CI         | GitHub Actions (pnpm + nx affected)                     |

## CI Pipeline

The GitHub Actions workflow runs on every push to `main` and all PRs:

1. **main job** — `format:check` → `lint` → `test` → `build` (all affected, parallel=3)
2. **e2e job** — Installs Playwright, runs `nx affected -t e2e`

---

_Use this repo as the source of truth when onboarding new members, setting up AI coding assistants, or reviewing PRs._
