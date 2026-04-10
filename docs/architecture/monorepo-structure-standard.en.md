# Monorepo Structure Standard

This document defines the standard repository layout and conventions for the Nx monorepo, optimized for a domain-driven organization.

## 1. Design principles

1. Thin apps, fat libs

- Applications should focus on wiring (routing, bootstrap, composition).
- Business logic and domain code should live in libraries organized by domain.

2. Domain isolation

- Each domain should have its own namespace and limited cross-domain imports.
- Shared libraries should contain only generic utilities and components with no domain logic.

3. Platform isolation

- Frontend and backend code must be separated and must not import from each other directly.

4. Explicit ownership

- Every project must include the three tags required by policy.

## 2. Workspace layout

```
apps/
  api-main/
  api-admin/
  api-worker/
  front-office/
  backoffice/
  landing/
  front-office-e2e/
  backoffice-e2e/

libs/
  fe-auth/
  fe-billing/
  fe-shared/
  be-shared/
```

## 3. Project tagging standard

Every project must have three tags:

- `scope:*`
- `type:*`
- `platform:*`

### Scope values

- `scope:app`
- `scope:auth`
- `scope:billing`
- `scope:shared`

### Type values

- `type:app`
- `type:lib`
- `type:e2e`

### Platform values

- `platform:fe`
- `platform:be`
- `platform:shared`

### Current mapping

- FE applications: `scope:app`, `type:app`, `platform:fe`
- BE applications: `scope:app`, `type:app`, `platform:be`
- FE domain libraries: `scope:auth|billing`, `type:lib`, `platform:fe`
- FE shared library: `scope:shared`, `type:lib`, `platform:fe`
- BE shared library: `scope:shared`, `type:lib`, `platform:be`
- E2E projects: `scope:app`, `type:e2e`, `platform:fe`

## 4. Per-project layering guidelines

### Frontend application

Should include:

- `src/main.tsx` for bootstrap
- `src/app/*` for routing and shell
- Avoid placing domain business logic in apps

### Frontend library

Prefer the following structure:

- `feature/`: state, providers, hooks, and use-cases
- `ui/`: presentational components
- `index.ts`: single public API (barrel)

### Backend application

Organize modules by use-case:

- `src/<feature>/<feature>.module.ts`
- `src/<feature>/<feature>.controller.ts`
- `src/<feature>/<feature>.service.ts`

### Backend shared library

Contains cross-cutting concerns:

- Database bootstrap and shared entities
- Middleware, filters, health checks

## 5. Naming and file conventions

- File names should be lower-case, kebab-case or follow the repo's dot-separated convention.
- Tests: `*.spec.ts` or `*.spec.tsx`.
- Expose a public API via `src/index.ts`.
- Avoid deep imports across projects whenever a public API exists.

## 6. Anti-patterns to avoid

1. Apps performing deep imports of another project's internal files (bypassing the barrel export).
2. Frontend importing backend code via path aliases or relative imports.
3. Shared libraries containing domain-specific logic.
4. E2E projects importing backend application code directly.

## 7. Definition of Done for a new project

1. `project.json` exists with complete tags (`scope/type/platform`).
2. The project exposes at least `lint` and `test` targets.
3. The project is covered by `@nx/enforce-module-boundaries`.
4. Documentation is updated when adding new scopes/types/platforms.
