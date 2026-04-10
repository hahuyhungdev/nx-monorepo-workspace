# Monorepo Documentation

**English** | [Tiếng Việt (Vietnamese)](#tiếng-việt)

This documentation pack is the authoritative source for operating and extending the Nx monorepo.

## Quick Navigation

### 🎯 Start Here (Recommended for New Team Members)

1. **[Tag System Visual Guide](./tag-system-visual-guide.md)** (15 min read) 🎨
   - Learn the **scope**, **type**, and **platform** tag system
   - Includes ASCII diagrams, real-world examples, and code samples
   - Comprehensive import rules matrix and common pitfalls

2. **[Interactive FigJam Diagrams](#interactive-diagrams)** (5 min browse)
   - Visual representations of architecture and dependency flow
   - Platform firewall, scope isolation, decision tree

### 📚 Reference Documentation

- **[Monorepo Structure Standard](./monorepo-structure-standard.md)** - API apps, web apps, domain libs, naming conventions
- **[Module Boundary Policy](./module-boundary-policy.md)** - ESLint tag system, dependency constraints, tag definitions
- **[CI/Testing & Quality Standard](./ci-testing-and-quality-standard.md)** - Testing frameworks, CI/CD pipeline, quality gates
- **[Quality Gates Runbook](./quality-gates-runbook.md)** - How to run and troubleshoot quality checks
- **[2026-04-10 Audit Report](./2026-04-10-structure-audit.md)** - Initial audit findings and remediation applied

---

## Interactive Diagrams (FigJam)

| Diagram | Purpose | Best For |
|---------|---------|----------|
| [**Tag System Architecture**](https://www.figma.com/online-whiteboard/create-diagram/ab6fb1b7-cd96-4692-9083-8a5bdf36a282) | Overview of type, platform, scope dimensions | Understanding the structure |
| [**Platform Isolation Firewall**](https://www.figma.com/online-whiteboard/create-diagram/24294205-2f22-42db-b412-e6c5c5cccf4d) | Backend vs Frontend separation | Platform dependency rules |
| [**Scope Isolation Domains**](https://www.figma.com/online-whiteboard/create-diagram/4f87ec48-ea7c-40d7-8616-ff7c6002d4a0) | Auth vs Billing feature separation | Feature scope rules |
| [**Full Dependency Flow**](https://www.figma.com/online-whiteboard/create-diagram/fb837c0e-6432-45e9-beda-9ca48cf877ab) | Current projects & valid imports | Seeing the full picture |
| [**Decision Tree**](https://www.figma.com/online-whiteboard/create-diagram/250dda49-f3a9-4f49-9586-0287ed5154f5) | How to tag new projects | Creating new apps/libs |
| [**Import Rules Matrix**](https://www.figma.com/online-whiteboard/create-diagram/6aeba7f8-9944-4a4d-aad9-4ac984eba6c9) | Valid ✓ vs Blocked ✗ scenarios | Debugging import errors |

---

## Common Tasks

### Adding a New Project

1. Review the [**Decision Tree Diagram**](https://www.figma.com/online-whiteboard/create-diagram/250dda49-f3a9-4f49-9586-0287ed5154f5)
2. Follow [Tag System Visual Guide - Section 8](./tag-system-visual-guide.md#8-creating-new-projects---where-do-they-fit)
3. Use the tag selection from the decision tree in your `project.json`

### Fixing Import Errors

1. Check [**Import Rules Matrix**](https://www.figma.com/online-whiteboard/create-diagram/6aeba7f8-9944-4a4d-aad9-4ac984eba6c9) for your specific case
2. Review [Tag System Visual Guide - Section 10](./tag-system-visual-guide.md#10-common-mistakes--fixes) for solutions
3. Consult [Module Boundary Policy](./module-boundary-policy.md) for detailed rule definitions

### Pre-PR Quality Check

Run the [Quality Gates Runbook](./quality-gates-runbook.md) to verify:
- ✅ ESLint lint pass (`nx run-many --target=lint`)
- ✅ Unit tests pass (`nx run-many --target=test`)
- ✅ Builds succeed (`nx run-many --target=build`)
- ✅ E2E tests pass (`nx run-many --target=e2e`)

---

## Document Structure

```
docs/
├── README.md (this file)
├── tag-system-visual-guide.md (★ START HERE - English with ASCII diagrams)
├── monorepo-structure-standard.md (Architecture reference)
├── module-boundary-policy.md (Tag system details)
├── ci-testing-and-quality-standard.md (Testing & CI reference)
├── quality-gates-runbook.md (Runbook for quality checks)
└── 2026-04-10-structure-audit.md (Audit report & remediation)
```

---

## Project Organization

### Backend (Node.js/NestJS)
- **apps/api-main** - Primary REST API
- **apps/api-admin** - Admin API
- **apps/api-worker** - Background jobs
- **libs/be-shared** - Backend utilities (database, logging, middleware)

### Frontend (React/Vite)
- **apps/front-office** - Customer-facing SPA
- **apps/backoffice** - Internal management SPA
- **libs/fe-auth** - Authentication module
- **libs/fe-billing** - Billing module
- **libs/fe-shared** - Frontend utilities (components, hooks, services)

### E2E Tests
- **apps/front-office-e2e** - Tests for front-office
- **apps/backoffice-e2e** - Tests for backoffice

### Other
- **apps/landing** - Astro static landing page

---

## Key Concepts

### Tags (Required for All Projects)

Every project must have exactly 3 tags in `project.json`:

```json
{
  "tags": [
    "scope:???",      // Feature domain: auth, billing, app, shared
    "type:???",       // Project type: app, lib, e2e
    "platform:???"    // Tech stack: fe, be, shared
  ]
}
```

### ESLint Boundary Enforcement

The [eslint-plugin-nx](https://nx.dev/nx-plugins/nx/plugins/eslint-plugin-nx) enforces module boundaries:
- **Platform Gate**: Backend cannot import frontend libs
- **Scope Gate**: Auth lib cannot import billing lib
- **Type Gate**: E2E tests cannot be imported as libraries

All violations raise ESLint **errors** (blocking CI).

### Three Dimensions

| Dimension | Values | Purpose |
|-----------|--------|---------|
| **Type** | app, lib, e2e | Project role/category |
| **Platform** | fe, be, shared | Technology stack isolation |
| **Scope** | auth, billing, app, shared | Feature domain isolation |

---

## Maintenance

- **Review Frequency**: Quarterly (Q1, Q2, Q3, Q4)
- **Update Trigger**: When architectural rules or CI policies change
- **Owner**: Engineering Team
- **Last Updated**: 2026-04-10

---

---

# Tiếng Việt

**Bo tai lieu nay la nguon chuan de van hanh va mo rong monorepo Nx cua du an.**

## Muc tieu

- Dong bo cach to chuc apps/libs theo domain.
- Chuan hoa module boundary va quy tac import.
- Chuan hoa gate chat luong trong CI.
- Luu audit chi tiet de on-board va review PR.

## Danh muc tai lieu

1. **[Tag System Visual Guide](./tag-system-visual-guide.md)** - Huong dan chi tiet ve scope/type/platform (NEN DOC TRUOC)
2. [Monorepo Structure Standard](./monorepo-structure-standard.md) - Kien truc, to chuc apps/libs, quy tac dat ten
3. [Module Boundary Policy](./module-boundary-policy.md) - He thong tag va quy tac phu thuoc
4. [CI/Testing & Quality Standard](./ci-testing-and-quality-standard.md) - Chien luoc test, pipeline CI/CD
5. [Quality Gates Runbook](./quality-gates-runbook.md) - Huong dan tao va troubleshoot quality gate
6. [2026-04-10 Audit Report](./2026-04-10-structure-audit.md) - Ket qua audit va remediation

## Dieu huong tang suc

- Doc `tag-system-visual-guide.md` truoc tien (co cac diagram va vi du rõ rang)
- Xem cac interactive FigJam diagram o tren
- Doc `monorepo-structure-standard` khi tao app/lib moi
- Dung `quality-gates-runbook` truoc khi tao PR

## Owner

- Engineering team
- Cap nhat toi thieu moi quy hoac khi co thay doi policy kien truc/CI
