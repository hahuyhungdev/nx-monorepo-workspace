# CI Testing and Quality Standard

This document standardizes the workspace quality gates and CI expectations for the Nx monorepo.

## 1. Quality gate objectives

1. Prevent regressions as early as possible.
2. Ensure repository structure and boundaries are enforced.
3. Allow controlled expansion of domains without breaking architecture.

## 2. CI pipeline design

The GitHub Actions workflow contains two primary jobs:

1. `main` job:
   - format check
   - affected lint
   - affected test
   - affected build

2. `e2e` job:
   - install Playwright and system dependencies
   - run affected E2E projects

## 3. Minimum quality thresholds

- Lint: 0 ESLint errors (warnings are allowed during migration but should be reduced).
- Unit tests: projects must not remain in the "No tests found" state for long.
- Build: all affected projects must build successfully.
- E2E: smoke E2E tests must pass on CI.

## 4. Testing strategy by layer

### Frontend libs/apps

- Test with Vitest + React Testing Library.
- Focus tests on important UI use-cases: routing, state, interactions.

### Backend apps/libs

- Test with Jest.
- Start with minimal unit tests for controllers/services (contract tests).
- Expand to integration tests for critical modules later.

### E2E

- Use Playwright.
- Prefer assertions against URL, ARIA roles and stable visible content.
- Avoid brittle assertions based solely on page title unless that is a business contract.

## 5. Build and caching

- Use `targetDefaults` and `namedInputs` to enable effective caching.
- `build`, `test`, `lint`, `e2e` should be cacheable wherever possible.
- Prefer `nx affected` commands in CI to minimize run time.

## 6. Hygiene rules

- Do not commit generated local artifacts.
- Do not commit local database files (`data/*.sqlite`).
- Only commit generated outputs that are required for runtime/deploy.

## 7. Pre-merge checklist

1. `pnpm exec nx format:check`
2. `pnpm exec nx run-many -t lint --parallel=3`
3. `pnpm exec nx run-many -t test --parallel=3`
4. `pnpm exec nx run-many -t build --parallel=3`
5. If UI-related changes: `pnpm exec nx run-many -t e2e --parallel=1`

## 8. Deviation policy

Temporary quality gate relaxations must meet these conditions:

- An issue tracking the change exists.
- PR description includes the rationale and expected re-enable date.
- Do not leave temporary relaxations open indefinitely.
