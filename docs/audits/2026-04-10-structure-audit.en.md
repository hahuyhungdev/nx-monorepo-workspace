# Architecture and Quality Audit

- Date: 2026-04-10
- Scope: full workspace (`apps/*`, `libs/*`, root configs, CI)
- Auditor: GitHub Copilot

## 1. Executive summary

State after remediation:

- Structure quality: Good
- Boundary enforcement: Good
- CI quality gates: Good
- Test baseline: Improved
- Repository hygiene: Improved

## 2. Original issues found

1. Missing `platform` tags on 3 projects:
   - `apps/landing`
   - `apps/front-office-e2e`
   - `apps/backoffice-e2e`

2. `.gitignore` had a malformed pattern that combined entries:
   - `vitest.config.*.timestamp*data/*.sqlite`

3. Generated Astro artifacts were tracked:
   - `apps/landing/.astro/*`

4. CI e2e job was disabled (`if: false`).

5. Missing test baseline in:
   - `api-admin`
   - `api-worker`
   - `be-shared`

6. Fragile front-office e2e assertions (title-based checks).

## 3. Remediations performed

### 3.1 Tags and boundaries

- Added `platform:fe` to:
  - `apps/landing/project.json`
  - `apps/front-office-e2e/project.json`
  - `apps/backoffice-e2e/project.json`
- Added rule `type:e2e -> type:app|type:lib` in root ESLint depConstraints.

### 3.2 Repository hygiene

- Fixed `.gitignore` by separating the timestamp and sqlite patterns.
- Added ignore for `apps/landing/.astro/`.
- Untracked generated files from `apps/landing/.astro/`.

### 3.3 CI and e2e

- Updated front-office e2e assertions to prefer URL and visible content.
- Hardened backoffice e2e assertions to check the dashboard heading.
- Re-enabled the `e2e` job in `.github/workflows/ci.yml`.

### 3.4 Test baseline

Added minimal tests to provide a baseline:

- `apps/api-admin/src/user-management/user-management.controller.spec.ts`
- `apps/api-admin/src/audit-log/audit-log.controller.spec.ts`
- `apps/api-worker/src/billing-renewal/billing-renewal.service.spec.ts`
- `apps/api-worker/src/email-digest/email-digest.service.spec.ts`
- `libs/be-shared/src/health/health.controller.spec.ts`

## 4. Verification results

Commands executed successfully:

- `nx run-many -t lint --parallel=3`
- `nx run-many -t test --projects=api-admin,api-worker,be-shared --parallel=3`
- `nx run-many -t e2e --projects=front-office-e2e,backoffice-e2e --parallel=1`

Full test and build were verified post-remediation.

## 5. Residual risks and notes

1. Some lint warnings remain (e.g. `no-unused-vars`) — non-blocking.
2. Local Playwright may emit host dependency warnings; CI installs those dependencies before running E2E.
3. Baseline tests are minimal; expand to integration tests for critical modules.

## 6. Recommended next milestones

1. Define coverage thresholds per project (start with backend critical modules).
2. Add `CODEOWNERS` for `apps/*` and `libs/*` by domain ownership.
3. Add a PR template with required quality gate checklist.
4. Consider a CI script to audit new projects for required tags.
