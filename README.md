# MyOrg — Nx Fullstack Monorepo

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

A scalable, well-architected Nx monorepo with **React** frontend, **Express** backend, and shared libraries.

## Workspace Structure

```
my-org/
├── apps/
│   ├── web/                    # React frontend (Vite + Vitest)
│   └── api/                    # Express backend (esbuild + Jest)
├── libs/
│   ├── ui/                     # Presentational React components
│   ├── feature/                # Business logic & data transformation
│   ├── data-access/            # API clients & data fetching
│   └── utils/                  # Pure helpers, types, constants
├── nx.json                     # Nx workspace config (caching, plugins, pipelines)
├── tsconfig.base.json          # Path aliases (@my-org/*)
├── eslint.config.mjs           # Module boundary enforcement
├── .prettierrc                 # Code formatting
└── .github/workflows/ci.yml   # CI pipeline (affected commands)
```

## Architecture: Clean Dependency Direction

```
  ┌─────────────┐     ┌─────────────┐
  │  apps/web   │     │  apps/api   │    ← Thin shells (no business logic)
  └──────┬──────┘     └──────┬──────┘
         │                   │
    ┌────▼────┐              │
    │ feature │              │    ← Business logic, data transformation
    └──┬───┬──┘              │
       │   │                 │
  ┌────▼┐ ┌▼──────────┐     │
  │  ui │ │data-access │     │    ← Components / API layer
  └──┬──┘ └─────┬──────┘     │
     │          │             │
     └────┬─────┘       ┌────▼────┐
          │              │  utils  │    ← Shared types, helpers (leaf layer)
          └──────────────┴─────────┘
```

**Rules enforced by ESLint `@nx/enforce-module-boundaries`:**

| Layer         | Can depend on                   | Cannot depend on     |
|---------------|----------------------------------|----------------------|
| `apps/*`      | feature, ui, data-access, utils  | other apps           |
| `feature`     | ui, data-access, utils           | apps                 |
| `ui`          | utils                            | feature, data-access |
| `data-access` | utils                            | feature, ui          |
| `utils`       | (nothing)                        | everything else      |

## Path Aliases

```ts
import { Button, Card } from '@my-org/ui';
import { getUsers } from '@my-org/feature';
import { fetchUsers } from '@my-org/data-access';
import { formatDate, capitalize } from '@my-org/utils';
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

## Adding New Projects

```sh
# Add another React app
nx g @nx/react:app admin --directory=apps/admin

# Add another Express API
nx g @nx/node:app auth-api --directory=apps/auth-api --framework=express

# Add a new library
nx g @nx/js:lib <name> --directory=libs/<name>
nx g @nx/react:lib <name> --directory=libs/<name>  # React-specific lib

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

| Layer    | Technology        |
|----------|-------------------|
| Frontend | React 19 + Vite   |
| Backend  | Express + esbuild |
| Testing  | Vitest / Jest     |
| Linting  | ESLint 9 (flat)   |
| Format   | Prettier          |
| Build    | Nx 22             |
| Package  | pnpm              |
