# Monorepo Structure Standard

Tai lieu nay mo ta cau truc chuan cho workspace Nx hien tai, duoc optimize cho domain-driven monorepo.

## 1. Nguyen tac thiet ke

1. Thin apps, fat libs:

- App chi dung de wiring (routing, bootstrap, composition).
- Business logic dat trong libs theo domain.

2. Domain isolation:

- Moi domain co namespace rieng, han che import cheo domain.
- Shared chi chua thanh phan dung chung va utility khong mang domain.

3. Platform isolation:

- FE va BE tach biet, khong import truc tiep qua lai.

4. Explicit ownership:

- Moi project phai co du bo tags de enforce policy.

## 2. Workspace layout

```text
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

Moi project bat buoc co 3 nhom tag:

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

### Mapping hien tai

- FE apps: `scope:app`, `type:app`, `platform:fe`
- BE apps: `scope:app`, `type:app`, `platform:be`
- FE libs domain: `scope:auth|billing`, `type:lib`, `platform:fe`
- FE shared lib: `scope:shared`, `type:lib`, `platform:fe`
- BE shared lib: `scope:shared`, `type:lib`, `platform:be`
- E2E apps: `scope:app`, `type:e2e`, `platform:fe`

## 4. Layering guideline trong tung project

### Frontend app

Nen co:

- `src/main.tsx`: bootstrap.
- `src/app/*`: routing va shell.
- Khong dat business logic domain o app.

### Frontend lib

Nen tach:

- `feature/`: state, provider, hooks, use-case.
- `ui/`: presentational components.
- `index.ts`: public API duy nhat.

### Backend app

Nen tach module theo use-case:

- `src/<feature>/<feature>.module.ts`
- `src/<feature>/<feature>.controller.ts`
- `src/<feature>/<feature>.service.ts`

### Shared backend lib

Chua nhung thanh phan cross-cutting:

- database bootstrap va entities dung chung
- middleware, filters, health

## 5. Naming and file conventions

- File ten chu thuong, kebab-case hoac dot-separated theo convention hien co.
- Test: `*.spec.ts` hoac `*.spec.tsx`.
- Public API qua `src/index.ts`.
- Khong import deep-path giua projects neu da co public API.

## 6. Anti-pattern can tranh

1. App import truc tiep file noi bo cua lib khac (bo qua barrel export).
2. FE import BE code qua path alias hoac relative path.
3. Shared lib chua business logic theo domain.
4. E2E import truc tiep BE app code.

## 7. Definition of Done cho project moi

1. Co `project.json` + tags day du (`scope/type/platform`).
2. Co it nhat lint + test target hoat dong.
3. Duoc enforce boi `@nx/enforce-module-boundaries`.
4. Co docs cap nhat neu them scope/type/platform moi.
