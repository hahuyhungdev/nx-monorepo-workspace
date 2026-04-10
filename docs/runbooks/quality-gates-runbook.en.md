# Quality Gates Runbook

This runbook explains how to run and diagnose the repository's quality gates before merging.

## 1. Full local verification

Run the complete set of checks locally to reproduce CI:

```bash
pnpm exec nx format:check
CI=1 pnpm exec nx run-many -t lint --parallel=3 --outputStyle=static
CI=1 pnpm exec nx run-many -t test --parallel=3 --outputStyle=static
CI=1 pnpm exec nx run-many -t build --parallel=3 --outputStyle=static
CI=1 pnpm exec nx run-many -t e2e --projects=front-office-e2e,backoffice-e2e --parallel=1 --outputStyle=static
```

## 2. Fast verification for affected scope

Use affected commands to run only impacted projects:

```bash
pnpm exec nx affected -t lint --parallel=3
pnpm exec nx affected -t test --parallel=3
pnpm exec nx affected -t build --parallel=3
pnpm exec nx affected -t e2e --parallel=1
```

## 3. Diagnosing boundary errors

1. Locate the importing file that triggered the error.
2. Open the `project.json` files for both source and target projects and compare `tags`.
3. Compare against the policy in `docs/architecture/module-boundary-policy.md`.
4. Fix the import by using the library's public barrel or extracting shared code into a `scope:shared` library.

## 4. Diagnosing e2e failures

1. Run the failing E2E project locally:

```bash
CI=1 pnpm exec nx run front-office-e2e:e2e --outputStyle=static
```

2. Inspect traces:

```bash
pnpm exec playwright show-trace <path-to-trace.zip>
```

3. If failures are due to fragile assertions:

- Prefer asserting `URL`, ARIA roles and visible content.
- Avoid brittle `title` assertions unless the title is part of a business contract.

## 5. Diagnosing "No tests found"

1. Verify the project contains `*.spec.ts` files.
2. Add minimal baseline tests for a controller/service if missing.
3. Ensure `nx run <project>:test` passes locally.

## 6. CI reproducibility notes

- CI installs Playwright system dependencies via `playwright install-deps`.
- Local Playwright host warnings are expected when system packages are missing.
- CI is configured to install these dependencies before running E2E tests.
