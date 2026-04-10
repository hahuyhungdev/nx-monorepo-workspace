# CI Testing and Quality Standard

Tai lieu nay chuan hoa gate chat luong cho workspace Nx.

## 1. Muc tieu quality gate

1. Ngan regression som nhat co the.
2. Dam bao cau truc monorepo luon enforce boundary.
3. Cho phep mo rong domains khong vo tinh pha kien truc.

## 2. Pipeline CI chuan

Workflow gom 2 jobs:

1. `main` job:

- format check
- affected lint
- affected test
- affected build

2. `e2e` job:

- cai Playwright browser + system deps
- affected e2e

## 3. Nguong chat luong toi thieu

- Lint: 0 errors (warning duoc phep trong giai doan chuyen doi, nhung nen giam dan).
- Unit tests: project co target test khong duoc de `No tests found` lau dai.
- Build: tat ca affected projects phai build pass.
- E2E: smoke tests phai pass tren CI.

## 4. Testing strategy theo tang

### Frontend libs/apps

- Vitest + RTL.
- Test theo use-case UI quan trong (route, state, interaction).

### Backend apps/libs

- Jest.
- Bat dau voi baseline unit tests cho controller/service contract.
- Mo rong dan sang integration tests cho module nghiep vu quan trong.

### E2E

- Playwright.
- Uu tien assertions theo URL + visible content.
- Tranh assertion mong manh theo title neu khong co gia tri nghiep vu.

## 5. Build and caching

- Su dung `targetDefaults` + `namedInputs` de cache hop ly.
- `build`, `test`, `lint`, `e2e` deu cacheable.
- Affected commands duoc uu tien trong CI.

## 6. Hygiene rules

- Khong commit generated artifacts theo may local.
- Khong commit database local (`data/*.sqlite`).
- Tru generated outputs can thiet cho runtime/deploy.

## 7. Checklist truoc khi merge PR

1. `pnpm exec nx format:check`
2. `pnpm exec nx run-many -t lint --parallel=3`
3. `pnpm exec nx run-many -t test --parallel=3`
4. `pnpm exec nx run-many -t build --parallel=3`
5. Neu co anh huong UI: `pnpm exec nx run-many -t e2e --parallel=1`

## 8. Deviation policy

Neu can tam thoi disable quality gate:

- Phai co issue lien ket.
- Phai co comment ly do va ngay du kien bat lai.
- Khong de trang thai tam thoi ton tai vo thoi han.
