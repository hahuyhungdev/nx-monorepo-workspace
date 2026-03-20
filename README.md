# MyOrg — SaaS Platform Monorepo

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

A production-ready Nx monorepo for SaaS applications with **React** frontend, **Express** backend, **domain-scoped feature modules** (auth, billing), and shared libraries.

## Workspace Structure

```
my-org/
├── apps/
│   ├── web/                            # React SaaS shell (Vite + Vitest)
│   └── api/                            # Express API (esbuild + Jest)
├── libs/
│   ├── feature/
│   │   ├── auth/                       # Auth domain: useAuth hook, AuthProvider
│   │   └── billing/                    # Billing domain: useBilling hook, BillingProvider
│   ├── data-access/
│   │   ├── auth/                       # Auth API: login, signup, logout, fetchCurrentUser
│   │   └── billing/                    # Billing API: fetchPlans, subscribe, cancelSubscription
│   ├── ui/
│   │   ├── auth/                       # Auth UI: LoginForm, SignupForm
│   │   └── billing/                    # Billing UI: PricingCard, PlanBadge
│   ├── feature/                        # Generic feature lib (shared business logic)
│   ├── data-access/                    # Generic data-access lib
│   ├── ui/                             # Generic UI components (Button, Card)
│   └── utils/                          # Pure helpers, types (formatDate, ApiResponse)
├── nx.json                             # Nx config (caching, parallel=3, plugins)
├── tsconfig.base.json                  # Path aliases (@my-org/*)
├── eslint.config.mjs                   # 3-dimensional module boundary enforcement
├── .prettierrc                         # Code formatting
└── .github/workflows/ci.yml            # CI pipeline (pnpm, affected commands)
```

## 12 Projects

| Project              | Type         | Domain   | Tags                                    |
| -------------------- | ------------ | -------- | --------------------------------------- |
| `web`                | App          | -        | `scope:app`, `type:app`, `scope:client` |
| `api`                | App          | -        | `scope:app`, `type:app`, `scope:server` |
| `feature-auth`       | Feature lib  | auth     | `scope:feature`, `type:feature`, `domain:auth` |
| `feature-billing`    | Feature lib  | billing  | `scope:feature`, `type:feature`, `domain:billing` |
| `data-access-auth`   | Data lib     | auth     | `scope:data-access`, `type:data-access`, `domain:auth` |
| `data-access-billing`| Data lib     | billing  | `scope:data-access`, `type:data-access`, `domain:billing` |
| `ui-auth`            | UI lib       | auth     | `scope:ui`, `type:ui`, `domain:auth`   |
| `ui-billing`         | UI lib       | billing  | `scope:ui`, `type:ui`, `domain:billing` |
| `feature`            | Feature lib  | shared   | `scope:feature`, `domain:shared`        |
| `data-access`        | Data lib     | shared   | `scope:data-access`, `domain:shared`    |
| `ui`                 | UI lib       | shared   | `scope:ui`, `domain:shared`             |
| `utils`              | Util lib     | shared   | `scope:shared`, `domain:shared`         |

## Architecture: Domain-Driven Dependencies

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                              APPS (Thin Shells)                              │
│    ┌────────────────────────────┐    ┌────────────────────────────┐          │
│    │         apps/web           │    │         apps/api           │          │
│    │  (React SaaS shell)        │    │  (Express API gateway)     │          │
│    └───────────┬────────────────┘    └───────────┬────────────────┘          │
└────────────────│─────────────────────────────────│───────────────────────────┘
                 │                                 │
┌────────────────▼─────────────────────────────────▼───────────────────────────┐
│                        DOMAIN FEATURE MODULES                                │
│  ┌─────────────────────────────┐   ┌─────────────────────────────┐           │
│  │      domain:auth            │   │      domain:billing         │           │
│  │  ┌────────────────────────┐ │   │  ┌────────────────────────┐ │           │
│  │  │  feature-auth          │ │   │  │  feature-billing       │ │           │
│  │  │  (useAuth, AuthContext)│ │   │  │  (useBilling, ctx)     │ │           │
│  │  └───────────┬────────────┘ │   │  └───────────┬────────────┘ │           │
│  │  ┌───────────┴────────────┐ │   │  ┌───────────┴────────────┐ │           │
│  │  │ ui-auth │ data-access- │ │   │  │ ui-billing│data-access-│ │           │
│  │  │(forms)  │     auth     │ │   │  │ (cards)   │  billing   │ │           │
│  │  └─────────┴──────────────┘ │   │  └───────────┴────────────┘ │           │
│  └─────────────────────────────┘   └─────────────────────────────┘           │
└──────────────────────────────────────────────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼───────────────────────────────────────┐
│                         SHARED LIBRARIES (domain:shared)                     │
│    ┌────────────┐    ┌────────────────┐    ┌──────────────┐                  │
│    │     ui     │    │  data-access   │    │    utils     │                  │
│    │(Button,   │     │ (fetchUsers)   │    │ (formatDate) │                  │
│    │  Card)    │     │                │    │              │                  │
│    └────────────┘    └────────────────┘    └──────────────┘                  │
└──────────────────────────────────────────────────────────────────────────────┘
```

## 3-Dimensional Module Boundaries

ESLint `@nx/enforce-module-boundaries` enforces:

### 1. Scope-based (vertical layers)
| Layer         | Can depend on                   | Cannot depend on     |
| ------------- | ------------------------------- | -------------------- |
| `scope:app`   | feature, ui, data-access, shared| other apps           |
| `scope:feature` | ui, data-access, shared       | apps                 |
| `scope:ui`      | shared                        | feature, data-access |
| `scope:data-access` | shared                    | feature, ui          |
| `scope:shared`  | (nothing)                     | everything else      |

### 2. Type-based (architectural roles)
| Type          | Can depend on                   |
| ------------- | ------------------------------- |
| `type:app`    | feature, ui, data-access, util  |
| `type:feature`| ui, data-access, util           |
| `type:ui`     | util                            |
| `type:data-access` | util                       |
| `type:util`   | (nothing)                       |

### 3. Domain-based (feature isolation)
- `domain:auth` → can only use auth domain + shared
- `domain:billing` → can only use billing domain + shared
- `domain:shared` → can be used by all domains

## Path Aliases

```ts
// Shared libraries
import { Button, Card } from '@my-org/ui';
import { fetchUsers } from '@my-org/data-access';
import { formatDate, ApiResponse } from '@my-org/utils';

// Auth domain
import { AuthProvider, useAuth } from '@my-org/feature-auth';
import { login, signup, AuthUser } from '@my-org/data-access-auth';
import { LoginForm, SignupForm } from '@my-org/ui-auth';

// Billing domain
import { BillingProvider, useBilling } from '@my-org/feature-billing';
import { fetchPlans, Plan, Subscription } from '@my-org/data-access-billing';
import { PricingCard, PlanBadge } from '@my-org/ui-billing';
```

## Quick Start

```sh
# Install dependencies
pnpm install

# Start frontend dev server
pnpm dev:web

# Start backend dev server
pnpm dev:api

# Start both in parallel
pnpm dev

# Build everything
pnpm build

# Run all tests
pnpm test

# Lint everything
pnpm lint

# Only affected projects (for CI)
pnpm affected:build
pnpm affected:test
pnpm affected:lint

# Visualize project graph
pnpm graph

# Format code
pnpm format
```

## Adding New Domains

```sh
# Add a new domain (e.g., "teams")
nx g @nx/react:lib feature-teams --directory=libs/feature/teams
nx g @nx/js:lib data-access-teams --directory=libs/data-access/teams
nx g @nx/react:lib ui-teams --directory=libs/ui/teams

# Update project.json tags for each lib:
# "tags": ["scope:feature", "type:feature", "domain:teams"]
# "tags": ["scope:data-access", "type:data-access", "domain:teams"]
# "tags": ["scope:ui", "type:ui", "domain:teams"]

# Add path aliases to tsconfig.base.json
# "@my-org/feature-teams": ["libs/feature/teams/src/index.ts"]
```

## Adding New Apps

```sh
# Add another React app (e.g., admin dashboard)
nx g @nx/react:app admin --directory=apps/admin

# Add another Express API
nx g @nx/node:app auth-api --directory=apps/auth-api --framework=express

# Always preview first
nx g @nx/react:app admin --directory=apps/admin --dry-run
```

## Useful Commands

```sh
nx show projects                 # List all projects
nx show project web              # Show project details
nx graph                         # Interactive dependency graph
nx graph --affected              # Show only affected projects
nx reset                         # Clear Nx cache
nx build <project> --verbose     # Verbose build output
```

## Tech Stack

| Layer    | Technology                |
| -------- | ------------------------- |
| Frontend | React 19 + Vite 7         |
| Backend  | Express 4 + esbuild       |
| Testing  | Vitest 4 / Jest 30        |
| Linting  | ESLint 9 (flat config)    |
| Format   | Prettier 3                |
| Build    | Nx 22 (parallel=3, cached)|
| Package  | pnpm 10                   |

## CI/CD Features

- **pnpm caching** via `actions/cache` + `pnpm/action-setup`
- **Nx affected** commands to only run tasks for changed projects
- **Nx Cloud** ready (add `NX_CLOUD_ACCESS_TOKEN` secret)
- **Parallel execution** (3 concurrent tasks)
- **Task caching** via `.nx/cache` directory

## Scaling Strategy

1. **Add new domains** as vertical slices (feature + data-access + ui)
2. **Keep apps thin** — business logic lives in feature libs
3. **Use affected commands** — `pnpm affected:build` only rebuilds what changed
4. **Enable Nx Cloud** for distributed caching across CI agents
5. **Split CI into parallel jobs** when projects exceed 20+
