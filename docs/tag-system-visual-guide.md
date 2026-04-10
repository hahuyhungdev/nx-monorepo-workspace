# Tag System Visual Guide - Scope, Type, Platform

## Overview: The Three Dimensions

Every project in this monorepo **must** have exactly 3 tags:

```
tags: [
  "scope:???",     // Feature domain or application role
  "type:???",      // Project category (app, lib, e2e)
  "platform:???"   // Technology stack (fe, be, shared)
]
```

---

## 1. TYPE - Project Category

**What it is:** The role or category of the project.

### Type Values

| Type       | Meaning              | Examples                   | Entry Point               | Executable            |
| ---------- | -------------------- | -------------------------- | ------------------------- | --------------------- |
| `type:app` | Runnable Application | `api-main`, `front-office` | `main.ts`, `index.tsx`    | Yes ✓                 |
| `type:lib` | Reusable Library     | `fe-auth`, `be-shared`     | `index.ts` (exports only) | No                    |
| `type:e2e` | End-to-End Tests     | `front-office-e2e`         | `*.spec.ts`               | Yes (via test runner) |

### Visual: Type Hierarchy

```
┌─────────────────────────────────────────────────┐
│           TYPE DIMENSION                        │
├─────────────────────────────────────────────────┤
│                                                 │
│  type:app ──────┐                              │
│  (Executable)   │     Can only import from    │
│                 ├────→ type:lib                │
│                 │       (Reusable code)       │
│                 │                             │
│  type:e2e ──────┘     Tests the app           │
│  (Test runner)                                │
│                                                 │
│  ❌ Apps cannot import other apps              │
│  ❌ Libs cannot be executed directly           │
│  ❌ E2E tests cannot be imported               │
└─────────────────────────────────────────────────┘
```

### Example

```json
// ✓ Correct
"tags": ["scope:app", "type:app", "platform:be"]
        // This is an app - has entry point & runs

// ✓ Correct
"tags": ["scope:auth", "type:lib", "platform:fe"]
        // This is a library - exports code for others

// ✓ Correct
"tags": ["scope:app", "type:e2e", "platform:fe"]
        // This is an e2e test suite
```

---

## 2. PLATFORM - Technology Stack

**What it is:** The technology environment. Enforces stack isolation.

### Platform Values

| Platform          | Technology Stack                   | Examples                               | Use Case                   |
| ----------------- | ---------------------------------- | -------------------------------------- | -------------------------- |
| `platform:be`     | Node.js, NestJS, TypeORM, SQLite   | `api-main`, `api-admin`, `be-shared`   | Backend APIs & utilities   |
| `platform:fe`     | React 19, Vite, Vitest, Playwright | `front-office`, `fe-auth`, `fe-shared` | Frontend SPAs & components |
| `platform:shared` | Universal TypeScript utilities     | _(None currently)_                     | Shared across BE & FE      |

### Visual: Platform Isolation Wall

```
┌──────────────────────────────────────┐
│        PLATFORM DIMENSION            │
├──────────────────────────────────────┤
│                                      │
│  ┌─────────────────────────┐        │
│  │   platform:be           │        │
│  │   (Backend Stack)       │        │
│  │                         │        │
│  │  • NestJS               │        │
│  │  • TypeORM              │        │
│  │  • Jest                 │        │
│  │  • api-main             │        │
│  │  • api-admin            │        │
│  │  • be-shared            │        │
│  └─────────────────────────┘        │
│         ████████████████           │ Firewall
│     Cannot cross platform            │
│         ████████████████           │
│  ┌─────────────────────────┐        │
│  │   platform:fe           │        │
│  │   (Frontend Stack)      │        │
│  │                         │        │
│  │  • React 19             │        │
│  │  • Vite                 │        │
│  │  • Vitest               │        │
│  │  • front-office         │        │
│  │  • fe-auth              │        │
│  │  • fe-shared            │        │
│  └─────────────────────────┘        │
│                                      │
│  ◆ platform:shared (if used)       │
│    Can be imported by both          │
│                                      │
└──────────────────────────────────────┘
```

### Isolation Rules

| Rule                | When                                    | Effect             |
| ------------------- | --------------------------------------- | ------------------ |
| Backend → Backend   | `platform:be` imports `platform:be`     | ✓ Allowed          |
| Backend → Shared    | `platform:be` imports `platform:shared` | ✓ Allowed          |
| Backend → Frontend  | `platform:be` imports `platform:fe`     | ✗ **ESLint Error** |
| Frontend → Frontend | `platform:fe` imports `platform:fe`     | ✓ Allowed          |
| Frontend → Shared   | `platform:fe` imports `platform:shared` | ✓ Allowed          |
| Frontend → Backend  | `platform:fe` imports `platform:be`     | ✗ **ESLint Error** |

### Example: Platform Blocking

```typescript
// ❌ BLOCKED - Platform mismatch
// apps/api-main/src/main.ts (platform:be)

import { AuthProvider } from '@my-org/fe-auth';
// ✗ Error: Cannot import platform:fe into platform:be

import { React } from 'react';
// ✗ Error: Frontend dependency in backend app

// ✓ ALLOWED - Same platform
import { DatabaseModule } from '@my-org/be-shared';
// ✓ OK: platform:be → platform:be
```

---

## 3. SCOPE - Feature Domain

**What it is:** The business feature or functional domain. Enforces isolation between features.

### Scope Values

| Scope           | Domain                         | Examples                   | Purpose                                    |
| --------------- | ------------------------------ | -------------------------- | ------------------------------------------ |
| `scope:auth`    | Authentication & Authorization | `fe-auth`                  | All auth logic: login, session, user       |
| `scope:billing` | Billing & Payments             | `fe-billing`               | All billing logic: subscriptions, invoices |
| `scope:shared`  | Cross-cutting concerns         | `fe-shared`, `be-shared`   | Common utilities, helpers, components      |
| `scope:app`     | Application bootstrap          | `api-main`, `front-office` | Main apps, entry points                    |

### Visual: Scope Compartmentalization

```
┌──────────────────────────────────────────────────────┐
│           SCOPE DIMENSION                          │
│      (Feature Domain Isolation)                    │
├──────────────────────────────────────────────────────┤
│                                                      │
│   ┌──────────────┐    ┌──────────────┐             │
│   │ scope:auth   │    │ scope:billing │             │
│   │              │    │               │             │
│   │ • Login page │    │ • Pricing     │             │
│   │ • Auth hooks │    │ • Checkout    │             │
│   │ • Providers  │    │ • Invoices    │             │
│   └──────────────┘    └──────────────┘             │
│         │                    │                      │
│         │  Cannot see        │  Cannot see         │
│         │  billing code      │  auth code          │
│         │                    │                      │
│   ┌─────────────────────────────────┐             │
│   │     scope:shared                │             │
│   │                                  │             │
│   │  • UI components (Button, Card)  │             │
│   │  • Theme provider                │             │
│   │  • API client (axios)            │             │
│   │  • Utility functions             │             │
│   │                                  │             │
│   │  ✓ Visible to Auth               │             │
│   │  ✓ Visible to Billing            │             │
│   │  ✓ Visible to Apps               │             │
│   └─────────────────────────────────┘             │
│                                                      │
│  ┌─────────────────────────────────┐              │
│  │  scope:app                       │              │
│  │  (Main application)              │              │
│  │                                  │              │
│  │  ✓ Imports ALL: auth + billing  │              │
│  │    + shared                      │              │
│  │  ✓ Brings features together      │              │
│  └─────────────────────────────────┘              │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Scope Rules

| From               | To                  | Result  | Reason                  |
| ------------------ | ------------------- | ------- | ----------------------- |
| `scope:auth` lib   | `scope:auth` lib    | ✓ OK    | Same scope              |
| `scope:auth` lib   | `scope:shared` lib  | ✓ OK    | Shared is universal     |
| `scope:auth` lib   | `scope:billing` lib | ✗ Error | Cannot see other scopes |
| `scope:app` (app)  | Any scope           | ✓ OK    | Apps orchestrate all    |
| `scope:shared` lib | `scope:auth` lib    | ✗ Error | Shared is isolated      |

### Example: Scope Isolation

```typescript
// ✓ fe-auth/src/index.ts (scope:auth)
export { LoginForm } from './ui/login-form';
export { useAuth } from './hooks/use-auth';
export { AuthProvider } from './providers/auth-provider';

import { Button } from '@my-org/fe-shared'; // ✓ OK
import { useTheme } from '@my-org/fe-shared'; // ✓ OK

// ❌ fe-auth/src/pages/login.tsx (scope:auth)
import { BillingCard } from '@my-org/fe-billing';
// ✗ Error: scope:auth cannot import scope:billing

import { PricingTable } from '@my-org/fe-billing';
// ✗ Error: Different scope

// ✓ apps/front-office/src/app.tsx (scope:app)
import { LoginForm } from '@my-org/fe-auth'; // ✓ OK - auth
import { PricingTable } from '@my-org/fe-billing'; // ✓ OK - billing
import { Button } from '@my-org/fe-shared'; // ✓ OK - shared

// App can bring all features together!
```

---

## 4. Real-World Examples

### Example 1: Authentication Library

```json
{
  "name": "fe-auth",
  "tags": ["scope:auth", "type:lib", "platform:fe"]
}
```

**Location:** [libs/fe-auth/project.json](../libs/fe-auth/project.json)

**Purpose:** Authentication for frontend

**Can Import:**

- ✓ `@my-org/fe-shared` (shared utilities, components)
- ✓ `@my-org/fe-auth` (itself)

**Cannot Import:**

- ✗ `@my-org/fe-billing` (different scope)
- ✗ `@my-org/be-shared` (different platform)
- ✗ `api-main` (apps cannot be imported)

**Directory Structure:**

```
libs/fe-auth/src/
├── providers/
│   └── auth-provider.tsx     # AuthProvider component
├── hooks/
│   ├── use-auth.ts           # useAuth hook
│   └── use-session.ts        # useSession hook
├── pages/
│   ├── login.tsx             # Login page
│   └── signup.tsx            # Signup page
├── services/
│   └── auth.service.ts       # API calls
└── index.ts                  # Public API (barrel export)
```

---

### Example 2: Backend Application

```json
{
  "name": "api-main",
  "tags": ["scope:app", "type:app", "platform:be"]
}
```

**Location:** [apps/api-main/project.json](../apps/api-main/project.json)

**Purpose:** Main backend API server

**Can Import:**

- ✓ `@my-org/be-shared` (backend utilities)
- ✓ All internal modules

**Cannot Import:**

- ✗ `@my-org/fe-auth` (frontend library)
- ✗ `@my-org/fe-shared` (frontend utilities)
- ✗ Other apps like `api-admin`

**Example Code:**

```typescript
// apps/api-main/src/main.ts
import { NestFactory } from '@nestjs/core';
import { DatabaseModule } from '@my-org/be-shared';
import { HealthModule } from '@my-org/be-shared';
import { AppModule } from './app/app.module';

// ✓ Can import be-shared
// ✗ Cannot import fe-auth, fe-billing, etc.
```

---

### Example 3: Frontend Application

```json
{
  "name": "front-office",
  "tags": ["scope:app", "type:app", "platform:fe"]
}
```

**Location:** [apps/front-office/project.json](../apps/front-office/project.json)

**Purpose:** Customer-facing React SPA

**Can Import:**

- ✓ `@my-org/fe-auth` (authentication module)
- ✓ `@my-org/fe-billing` (billing module)
- ✓ `@my-org/fe-shared` (shared utilities)

**Cannot Import:**

- ✗ `@my-org/be-shared` (backend utilities)
- ✗ `api-main` (cannot import apps)

**Example Code:**

```typescript
// apps/front-office/src/app.tsx
import { AuthProvider } from "@my-org/fe-auth";
import { BillingProvider } from "@my-org/fe-billing";
import { ThemeProvider } from "@my-org/fe-shared";

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BillingProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/billing" element={<BillingPage />} />
          </Routes>
        </BillingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

// ✓ Can import all frontend libs
// ✗ Cannot import be-shared
```

---

### Example 4: Shared Library

```json
{
  "name": "be-shared",
  "tags": ["scope:shared", "type:lib", "platform:be"]
}
```

**Location:** [libs/be-shared/project.json](../libs/be-shared/project.json)

**Purpose:** Backend utilities and cross-cutting concerns

**Can Import:**

- ✓ `@my-org/be-shared` (itself only)

**Cannot Import:**

- ✗ `@my-org/fe-auth` (frontend)
- ✗ `@my-org/fe-billing` (frontend)
- ✗ Any app

**Concept:** Shared libraries are "stable" and don't import domain libraries.

**Example Code:**

```typescript
// libs/be-shared/src/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(/* config */)],
})
export class DatabaseModule {}

// ✓ Can only use NestJS/TypeORM
// ✗ Cannot import be-auth, be-billing (if they existed)
```

---

## 5. The Three Rules in Action

### Rule 1: Platform Gate (Strongest)

**ESLint enforces at [eslint.config.mjs line 18, 22](../eslint.config.mjs#L18-L22)**

```
platform:fe → Can only import [platform:fe, platform:shared]
platform:be → Can only import [platform:be, platform:shared]
```

**Prevents:** Frontend code polluting backend, or vice versa.

---

### Rule 2: Scope Gate

**ESLint enforces at [eslint.config.mjs lines 31, 35, 39](../eslint.config.mjs#L31-L39)**

```
scope:auth      → Can only import [scope:auth, scope:shared]
scope:billing   → Can only import [scope:billing, scope:shared]
scope:shared    → Can only import [scope:shared]
scope:app       → Can import [scope:auth, scope:billing, scope:shared, scope:app]
```

**Prevents:** Feature library spaghetti code.

---

### Rule 3: Type Gate

**ESLint enforces at [eslint.config.mjs line 53](../eslint.config.mjs#L53)**

```
type:e2e → Can only import [type:app, type:lib]
```

**Prevents:** E2E tests being imported like libraries.

---

## 6. Valid Import Matrix

| From               | To                 | Allowed | Reason                                     |
| ------------------ | ------------------ | ------- | ------------------------------------------ |
| `fe-auth`          | `fe-shared`        | ✓       | Same platform, shared is universal         |
| `fe-auth`          | `fe-auth`          | ✓       | Same scope & platform                      |
| `fe-auth`          | `fe-billing`       | ✗       | Different scope (auth vs billing)          |
| `fe-auth`          | `be-shared`        | ✗       | Different platform (fe vs be)              |
| `api-main`         | `be-shared`        | ✓       | Same platform, scope:app can use shared    |
| `api-main`         | `api-admin`        | ✗       | Cannot import apps                         |
| `api-main`         | `fe-auth`          | ✗       | Different platform (be vs fe)              |
| `front-office`     | `fe-auth`          | ✓       | Same platform, scope:app can use any scope |
| `front-office`     | `fe-billing`       | ✓       | Same platform, scope:app can use any scope |
| `front-office`     | `be-shared`        | ✗       | Different platform (fe vs be)              |
| `front-office-e2e` | `front-office` app | ✓       | E2E tests the app                          |
| `front-office-e2e` | `fe-auth`          | ✗       | E2E only imports apps                      |

---

## 7. Mandatory? YES - This is Hard Constraint

**All 3 tags are REQUIRED:**

```json
{
  "tags": [
    "scope:???", // ← MUST have one of: auth, billing, app, shared
    "type:???", // ← MUST have one of: app, lib, e2e
    "platform:???" // ← MUST have one of: fe, be, shared
  ]
}
```

**Why?**

- ESLint `@nx/enforce-module-boundaries` will **block imports** if tags are missing
- Missing tags = project becomes invisible = import fails with ESLint error
- This is **error level**, not warning → prevents merging to `main`

**Example Error:**

```
error: A project without tags matched the required tags: scope:*, type:*, platform:*
  at nx/enforce-module-boundaries
```

---

## 8. Creating New Projects - Where Do They Fit?

### Decision Tree

```
Q1: Is this a runnable application?
├─ YES → type:app
└─ NO → type:lib (or type:e2e if it's tests)

Q2: Frontend or Backend?
├─ React/Vite/Browser → platform:fe
├─ NestJS/Node.js → platform:be
└─ (Both?) → platform:shared

Q3: What feature/domain?
├─ Login, Sessions, Users → scope:auth
├─ Payments, Subscriptions → scope:billing
├─ Main app bootstrap → scope:app
└─ Utilities, Helper funcs → scope:shared
```

### Example: Adding `fe-billing` Library

```json
{
  "name": "fe-billing",
  "tags": ["scope:billing", "type:lib", "platform:fe"]
}
```

- **Q1:** Not runnable? → `type:lib` ✓
- **Q2:** React Vite? → `platform:fe` ✓
- **Q3:** Billing feature? → `scope:billing` ✓

---

## 9. Quick Reference Cheat Sheet

### By Type

```
type:app
├─ Entry point (main.ts, index.tsx, etc.)
├─ Can import from type:lib + type:app
└─ Cannot import from type:e2e

type:lib
├─ No entry point (exports only)
├─ Can import from type:lib (if scope allows)
└─ Cannot import from type:app or type:e2e

type:e2e
├─ Test files (*.spec.ts)
├─ Can import from type:app
└─ Cannot import from type:lib or type:e2e
```

### By Platform

```
platform:be (NestJS Backend)
├─ Node.js, TypeORM, Jest
├─ Projects: api-main, api-admin, api-worker, be-shared
└─ Can import: platform:be + platform:shared

platform:fe (React Frontend)
├─ React, Vite, Vitest
├─ Projects: front-office, backoffice, fe-auth, fe-billing, fe-shared
└─ Can import: platform:fe + platform:shared

platform:shared (Universal)
├─ Shared utilities, types, helpers
├─ Can be imported by both platform:be and platform:fe
└─ Should NOT import domain libraries (auth, billing)
```

### By Scope

```
scope:app (Application Entry Point)
├─ Bootstrap and routing
├─ Can import: ALL (auth, billing, shared)
└─ Example: front-office, api-main

scope:auth (Authentication Domain)
├─ Login, session, user management
├─ Can import: auth + shared
└─ Example: fe-auth

scope:billing (Billing Domain)
├─ Payments, subscriptions, invoices
├─ Can import: billing + shared
└─ Example: fe-billing

scope:shared (Cross-cutting)
├─ Utilities, components, helpers
├─ Can import: shared ONLY
└─ Example: fe-shared, be-shared
```

---

## 10. Common Mistakes & Fixes

### Mistake 1: Missing Tags

**Problem:**

```json
{
  "name": "new-feature-lib"
  // ❌ No tags!
}
```

**Fix:**

```json
{
  "name": "new-feature-lib",
  "tags": ["scope:auth", "type:lib", "platform:fe"]
  // ✓ Now has all 3 dimensions
}
```

---

### Mistake 2: Cross-Scope Import

**Problem:**

```typescript
// libs/fe-auth/src/index.ts (scope:auth)
import { BillingCard } from '@my-org/fe-billing'; // ❌ Error
```

**Fix:**

```typescript
// libs/fe-auth/src/index.ts (scope:auth)
import { Button } from '@my-org/fe-shared'; // ✓ Use shared instead
```

---

### Mistake 3: Cross-Platform Import

**Problem:**

```typescript
// apps/front-office/src/app.tsx (platform:fe)
import { DatabaseModule } from '@my-org/be-shared'; // ❌ Error
```

**Fix:**

```typescript
// apps/front-office/src/app.tsx (platform:fe)
import { ThemeProvider } from '@my-org/fe-shared'; // ✓ Use fe-shared
```

---

### Mistake 4: Importing Apps

**Problem:**

```typescript
// libs/fe-auth/src/index.ts
import { App } from '@my-org/front-office'; // ❌ Cannot import type:app
```

**Fix:**

```typescript
// Libs should not import apps.
// Only apps import libs.
```

---

## Summary

| Dimension    | Values                     | Purpose                  | Enforcement               |
| ------------ | -------------------------- | ------------------------ | ------------------------- |
| **Type**     | app, lib, e2e              | Project role/category    | Apps ≠ Libs, E2E isolated |
| **Platform** | fe, be, shared             | Tech stack isolation     | BE ≠ FE firewall          |
| **Scope**    | auth, billing, app, shared | Feature domain isolation | Scope silos via rules     |

**Remember:** All 3 tags are **mandatory** and **hard-enforced** via ESLint. This ensures:

- ✓ Clean separation of concerns
- ✓ Predictable dependencies
- ✓ Scalable monorepo structure
- ✓ Easy onboarding for new team members

---

**Next Steps:**

- Review your project's [project.json](../README.md) file
- Verify it has all 3 tags
- Check if your imports match the rules above
- When creating new projects, follow the decision tree (Section 8)

For questions about specific import scenarios, check Section 9 (Cheat Sheet) or Section 10 (Common Mistakes).
