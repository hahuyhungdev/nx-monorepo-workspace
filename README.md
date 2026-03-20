# My Org — NX Monorepo

> Domain-driven SaaS platform monorepo powered by **Nx 22**, **pnpm**, **React 19**, **Express 4**, and **Astro 6**.

---

## Quick Start

```bash
pnpm install
pnpm exec nx serve front-office   # React SPA  → http://localhost:4200
pnpm exec nx serve backoffice     # Admin SPA  → http://localhost:4300
pnpm exec nx serve api            # Express    → http://localhost:3000
```

## Architecture

```
apps/
  front-office/        React 19 + Vite — customer-facing SPA
  backoffice/          React 19 + Vite — internal admin dashboard
  api/                 Express 4 + esbuild — REST API
  landing/             Astro 6 — marketing/SEO landing page
  front-office-e2e/    Playwright e2e tests for front-office
  backoffice-e2e/      Playwright e2e tests for backoffice

libs/
  auth/
    feature/           AuthProvider, useAuth, ProtectedRoute
    ui/                LoginForm, SignupForm (presentational)
    data-access/       auth.api — login, signup, logout, refresh
  billing/
    feature/           BillingProvider, useBilling
    ui/                PricingCard, PlanBadge, InvoiceTable
    data-access/       billing.api — plans, subscriptions, invoices
  shared/
    ui/                Button, Card (design-system primitives)
    util/              formatDate, capitalize, ApiResponse<T>

tools/
  generators/
    domain-lib/        Custom Nx generator for new domain libs
```

## Tag System

Every project gets exactly **two tags**: `scope` + `type`.

| Tag       | Values                                               |
| --------- | ---------------------------------------------------- |
| **scope** | `app`, `auth`, `billing`, `shared`                   |
| **type**  | `app`, `feature`, `ui`, `data-access`, `util`, `e2e` |

### Layer Rules (type)

```
type:app  →  feature, ui, data-access, util
type:feature  →  ui, data-access, util
type:ui  →  ui, util
type:data-access  →  data-access, util
type:util  →  util
```

### Scope Rules (domain isolation)

```
scope:app  →  auth, billing, shared
scope:auth  →  auth, shared
scope:billing  →  billing, shared
scope:shared  →  shared
```

## Path Aliases

```
@my-org/auth/feature       → libs/auth/feature/src/index.ts
@my-org/auth/ui            → libs/auth/ui/src/index.ts
@my-org/auth/data-access   → libs/auth/data-access/src/index.ts
@my-org/billing/feature    → libs/billing/feature/src/index.ts
@my-org/billing/ui         → libs/billing/ui/src/index.ts
@my-org/billing/data-access → libs/billing/data-access/src/index.ts
@my-org/shared/ui          → libs/shared/ui/src/index.ts
@my-org/shared/util        → libs/shared/util/src/index.ts
```

## Naming Conventions

| Item           | Convention      | Example                 |
| -------------- | --------------- | ----------------------- |
| Files          | dot-separated   | `auth.provider.tsx`     |
| Hooks          | `use-*.hook.ts` | `use-auth.hook.ts`      |
| Specs          | `*.spec.tsx`    | `use-auth.spec.tsx`     |
| CSS Modules    | `*.module.css`  | `login-form.module.css` |
| Barrel exports | `src/index.ts`  | single re-export point  |

## Common Commands

```bash
# Development
pnpm exec nx serve front-office
pnpm exec nx serve api

# Testing
pnpm exec nx run-many -t test --parallel=3
pnpm exec nx run-many -t test --parallel=3 --coverage
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

## Adding a New Domain

Use the custom generator:

```bash
pnpm exec nx g @my-org/tools:domain-lib --domain=payments --type=feature
pnpm exec nx g @my-org/tools:domain-lib --domain=payments --type=data-access
pnpm exec nx g @my-org/tools:domain-lib --domain=payments --type=ui
```

Then add the new scope to the ESLint boundary rules in `eslint.config.mjs`.

## Tech Stack

| Layer      | Tech                                                  |
| ---------- | ----------------------------------------------------- |
| Monorepo   | Nx 22.6, pnpm 10                                      |
| Frontend   | React 19, Vite 7, React Router 6                      |
| Backend    | Express 4, esbuild                                    |
| Landing    | Astro 6                                               |
| Testing    | Vitest 4 (libs/apps), Jest 30 (api), Playwright (e2e) |
| Lint       | ESLint 9 (flat config), Prettier 3                    |
| TypeScript | 5.7                                                   |
| CI         | GitHub Actions (pnpm + nx affected)                   |

## CI Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push to `main` and all PRs:

1. **main job** — `format:check` → `lint` → `test` → `build` (all affected, parallel=3)
2. **e2e job** — Installs Playwright, runs `nx affected -t e2e`

---

_Use this repo as the source of truth when onboarding new members, setting up AI coding assistants, or reviewing PRs._
