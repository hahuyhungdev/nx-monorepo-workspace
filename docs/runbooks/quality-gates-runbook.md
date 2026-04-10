# Quality Gates Runbook

Runbook nay dung de chay va chan doan quality gates truoc khi merge.

## 1. Full local verification

```bash
pnpm exec nx format:check
CI=1 pnpm exec nx run-many -t lint --parallel=3 --outputStyle=static
CI=1 pnpm exec nx run-many -t test --parallel=3 --outputStyle=static
CI=1 pnpm exec nx run-many -t build --parallel=3 --outputStyle=static
CI=1 pnpm exec nx run-many -t e2e --projects=front-office-e2e,backoffice-e2e --parallel=1 --outputStyle=static
```

## 2. Fast verification theo pham vi thay doi

```bash
pnpm exec nx affected -t lint --parallel=3
pnpm exec nx affected -t test --parallel=3
pnpm exec nx affected -t build --parallel=3
pnpm exec nx affected -t e2e --parallel=1
```

## 3. Chan doan boundary errors

1. Xac dinh file import loi.
2. Mo `project.json` cua source va target de doi chieu tags.
3. So sanh voi policy o `docs/architecture/module-boundary-policy.md`.
4. Sua import theo public API hoac tach code qua shared lib.

## 4. Chan doan e2e fail

1. Chay rieng project e2e:

```bash
CI=1 pnpm exec nx run front-office-e2e:e2e --outputStyle=static
```

2. Mo trace:

```bash
pnpm exec playwright show-trace <path-to-trace.zip>
```

3. Neu fail do assertion mong manh:

- Uu tien assert URL, heading, role-based selectors.
- Han che assert title neu title khong la business contract.

## 5. Chan doan test "No tests found"

1. Kiem tra project co file `*.spec.ts` hay khong.
2. Them baseline test toi thieu cho controller/service.
3. Dam bao command `nx run <project>:test` pass.

## 6. CI reproducibility notes

- CI can Playwright system deps (`playwright install-deps`).
- Neu local hien warning host deps cua Playwright, do la expected neu may local thieu packages he thong.
- CI workflow da co buoc install deps cho Playwright.
