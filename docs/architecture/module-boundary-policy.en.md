# Module Boundary Policy

This document describes the module boundary rules enforced in the workspace and how to act on violations during development.

## 1. Enforcement source

- ESLint flat config at the repository root.
- Main rule: `@nx/enforce-module-boundaries`.

## 2. Current policy

### Platform isolation

- `platform:fe` may only depend on `platform:fe` or `platform:shared`.
- `platform:be` may only depend on `platform:be` or `platform:shared`.

### Scope isolation

- `scope:auth` → allowed dependencies: `scope:auth`, `scope:shared`
- `scope:billing` → allowed dependencies: `scope:billing`, `scope:shared`
- `scope:shared` → allowed dependencies: `scope:shared`
- `scope:app` → allowed dependencies: `scope:auth`, `scope:billing`, `scope:shared`

### Type isolation

- `type:e2e` → allowed dependencies: `type:app`, `type:lib`

## 3. Examples of valid imports

1. `apps/front-office` imports `@my-org/fe-auth`.
2. `apps/api-main` imports `@my-org/be-shared`.
3. `apps/front-office-e2e` tests the `front-office` app through the browser.

## 4. Examples of invalid imports

1. Frontend importing backend:

```ts
import { DatabaseModule } from '@my-org/be-shared'; // invalid in FE
```

2. Auth importing billing internals:

```ts
import { BillingProvider } from '@my-org/fe-billing'; // invalid inside scope:auth library
```

3. E2E depending on another E2E project:

```ts
import {...} from 'apps/backoffice-e2e/...'; // invalid
```

## 5. Remediation procedure for boundary errors

1. Identify the source project and the target project.
2. Inspect the `tags` section in both projects' `project.json` files.
3. If the import is correct for business reasons, review and propose a policy exception with a written rationale.
4. If the import is incorrect, refactor to use the library's public API or move shared code into a `scope:shared` library.

## 6. Governance for rule extensions

Only extend rules when there is a clear, reviewed use-case:

- The change is reviewed by the team.
- It does not break FE/BE isolation.
- Documentation and PR rationale are provided.

Never accept shortcuts:

- Do not add wildcard `allow` entries that bypass the rules globally.
- Do not disable rules for production code paths without review.
