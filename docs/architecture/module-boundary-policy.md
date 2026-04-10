# Module Boundary Policy

Tai lieu nay mo ta rule boundaries dang enforce trong workspace va cach ap dung khi phat trien.

## 1. Nguon enforce

- ESLint flat config o workspace root.
- Rule chinh: `@nx/enforce-module-boundaries`.

## 2. Policy hien tai

### Platform isolation

- `platform:fe` chi duoc phu thuoc `platform:fe` hoac `platform:shared`.
- `platform:be` chi duoc phu thuoc `platform:be` hoac `platform:shared`.

### Scope isolation

- `scope:auth` -> `scope:auth`, `scope:shared`
- `scope:billing` -> `scope:billing`, `scope:shared`
- `scope:shared` -> `scope:shared`
- `scope:app` -> `scope:auth`, `scope:billing`, `scope:shared`

### Type isolation

- `type:e2e` -> `type:app`, `type:lib`

## 3. Vi du import hop le

1. `apps/front-office` import `@my-org/fe-auth`.
2. `apps/api-main` import `@my-org/be-shared`.
3. `apps/front-office-e2e` test UI cua `front-office` qua browser.

## 4. Vi du import khong hop le

1. FE import BE:

```ts
import { DatabaseModule } from '@my-org/be-shared'; // invalid trong FE
```

2. Auth import Billing internals:

```ts
import { BillingProvider } from '@my-org/fe-billing'; // invalid trong scope:auth lib
```

3. E2E phu thuoc vao e2e project khac:

```ts
import {...} from 'apps/backoffice-e2e/...'; // invalid
```

## 5. Quy trinh xu ly khi bi boundary error

1. Xac dinh project nguon va dich.
2. Kiem tra tags cua ca 2 project trong `project.json`.
3. Neu import dung ve nghiep vu, xem lai boundary rule.
4. Neu import sai nghiep vu, tach code ra shared hoac dung public API dung chuan.

## 6. Governance khi mo rong rule

Chi mo rong khi co ly do ro rang:

- Co use-case duoc review boi team.
- Khong pha vo isolation FE/BE.
- Co update docs va PR rationale.

Khong chap nhan shortcut:

- Khong them `allow` wildcard de bypass toan bo.
- Khong tat rule cho source files san xuat.
