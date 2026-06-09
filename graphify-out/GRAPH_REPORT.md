# Graph Report - nx-monorepo-workspace  (2026-06-09)

## Corpus Check
- 141 files · ~16,175 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1025 nodes · 1109 edges · 78 communities (72 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3644e6fc`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]

## God Nodes (most connected - your core abstractions)
1. `scripts` - 19 edges
2. `compilerOptions` - 15 edges
3. `Tag System Visual Guide - Scope, Type, Platform` - 13 edges
4. `compilerOptions` - 11 edges
5. `compilerOptions` - 11 edges
6. `compilerOptions` - 11 edges
7. `compilerOptions` - 11 edges
8. `My Org — NX Monorepo` - 11 edges
9. `options` - 10 edges
10. `options` - 10 edges

## Surprising Connections (you probably didn't know these)
- `DashboardPage()` --calls--> `formatDate()`  [INFERRED]
  apps/front-office/src/app/app.tsx → libs/fe-shared/src/util/lib/format-date.ts
- `DashboardPage()` --calls--> `formatDate()`  [EXTRACTED]
  apps/backoffice/src/app/app.tsx → libs/fe-shared/src/util/lib/format-date.ts
- `SignupPage()` --calls--> `useAuth()`  [EXTRACTED]
  apps/front-office/src/app/app.tsx → libs/fe-auth/src/feature/auth.provider.tsx
- `BillingPage()` --calls--> `useBilling()`  [INFERRED]
  apps/front-office/src/app/app.tsx → libs/fe-billing/src/feature/billing.provider.tsx
- `DashboardPage()` --calls--> `useAuth()`  [INFERRED]
  apps/front-office/src/app/app.tsx → libs/fe-auth/src/feature/auth.provider.tsx

## Import Cycles
- None detected.

## Communities (78 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.03
Nodes (60): devDependencies, astro, @astrojs/react, @babel/core, @babel/preset-react, esbuild, eslint, eslint-plugin-import (+52 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (16): AppModule, AppModule, AuditLogController, AuditLogModule, BillingRenewalModule, BillingRenewalService, DatabaseModule, User (+8 more)

### Community 2 - "Community 2"
Cohesion: 0.04
Nodes (47): analytics, babel, bundler, linter, style, cache, dependsOn, inputs (+39 more)

### Community 3 - "Community 3"
Cohesion: 0.05
Nodes (40): 10. Common Mistakes & Fixes, 1. TYPE - Project Category, 2. PLATFORM - Technology Stack, 3. SCOPE - Feature Domain, 4. Real-World Examples, 5. The Three Rules in Action, 6. Valid Import Matrix, 7. Mandatory? YES - This is Hard Constraint (+32 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (38): dependencies, better-sqlite3, express, @nestjs/common, @nestjs/core, @nestjs/platform-express, @nestjs/typeorm, react (+30 more)

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (37): configurations, defaultConfiguration, executor, options, outputs, development, production, buildTarget (+29 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (37): configurations, defaultConfiguration, executor, options, outputs, development, production, buildTarget (+29 more)

### Community 7 - "Community 7"
Cohesion: 0.06
Nodes (37): configurations, defaultConfiguration, executor, options, outputs, development, production, buildTarget (+29 more)

### Community 8 - "Community 8"
Cohesion: 0.12
Nodes (24): SignupPage(), DashboardPage(), fetchCurrentUser(), login(), logout(), signup(), AuthActions, AuthContext (+16 more)

### Community 9 - "Community 9"
Cohesion: 0.08
Nodes (7): AppModule, AuthController, AuthModule, AuthService, BillingController, BillingModule, BillingService

### Community 10 - "Community 10"
Cohesion: 0.14
Nodes (25): BillingPage(), cancelSubscription(), fetchInvoices(), fetchPlans(), fetchSubscription(), subscribeToPlan(), BillingActions, BillingContext (+17 more)

### Community 11 - "Community 11"
Cohesion: 0.09
Nodes (21): index, $source, $default, description, type, x-prompt, $id, properties (+13 more)

### Community 12 - "Community 12"
Cohesion: 0.09
Nodes (21): compileOnSave, compilerOptions, baseUrl, declaration, emitDecoratorMetadata, experimentalDecorators, importHelpers, lib (+13 more)

### Community 13 - "Community 13"
Cohesion: 0.17
Nodes (8): DashboardPage(), ApiResponse, Button(), ButtonProps, capitalize(), Card(), CardProps, formatDate()

### Community 14 - "Community 14"
Cohesion: 0.11
Nodes (18): Adding a New Project, Backend (Node.js/NestJS), Common Tasks, Document Structure, E2E Tests, ESLint Boundary Enforcement, Fixing Import Errors, Frontend (React/Vite) (+10 more)

### Community 15 - "Community 15"
Cohesion: 0.12
Nodes (17): command, options, outputs, name, cwd, command, options, projectType (+9 more)

### Community 16 - "Community 16"
Cohesion: 0.12
Nodes (16): 1. Design principles, 2. Workspace layout, 3. Project tagging standard, 4. Per-project layering guidelines, 5. Naming and file conventions, 6. Anti-patterns to avoid, 7. Definition of Done for a new project, Backend application (+8 more)

### Community 17 - "Community 17"
Cohesion: 0.12
Nodes (15): compilerOptions, emitDecoratorMetadata, experimentalDecorators, forceConsistentCasingInFileNames, lib, module, noFallthroughCasesInSwitch, noImplicitOverride (+7 more)

### Community 18 - "Community 18"
Cohesion: 0.12
Nodes (15): compilerOptions, emitDecoratorMetadata, experimentalDecorators, forceConsistentCasingInFileNames, lib, module, noFallthroughCasesInSwitch, noImplicitOverride (+7 more)

### Community 19 - "Community 19"
Cohesion: 0.12
Nodes (15): compilerOptions, emitDecoratorMetadata, experimentalDecorators, forceConsistentCasingInFileNames, lib, module, noFallthroughCasesInSwitch, noImplicitOverride (+7 more)

### Community 20 - "Community 20"
Cohesion: 0.12
Nodes (15): compilerOptions, emitDecoratorMetadata, experimentalDecorators, forceConsistentCasingInFileNames, lib, module, noFallthroughCasesInSwitch, noImplicitOverride (+7 more)

### Community 21 - "Community 21"
Cohesion: 0.14
Nodes (13): compilerOptions, forceConsistentCasingInFileNames, jsx, module, noFallthroughCasesInSwitch, noImplicitOverride, noImplicitReturns, noPropertyAccessFromIndexSignature (+5 more)

### Community 22 - "Community 22"
Cohesion: 0.14
Nodes (13): compilerOptions, forceConsistentCasingInFileNames, jsx, module, noFallthroughCasesInSwitch, noImplicitOverride, noImplicitReturns, noPropertyAccessFromIndexSignature (+5 more)

### Community 23 - "Community 23"
Cohesion: 0.14
Nodes (13): compilerOptions, forceConsistentCasingInFileNames, jsx, module, noFallthroughCasesInSwitch, noImplicitOverride, noImplicitReturns, noPropertyAccessFromIndexSignature (+5 more)

### Community 24 - "Community 24"
Cohesion: 0.14
Nodes (13): Architecture, CI Pipeline, Common Commands, Database, Engineering Docs, My Org — NX Monorepo, Naming Conventions, Path Aliases (+5 more)

### Community 25 - "Community 25"
Cohesion: 0.15
Nodes (12): executor, options, outputs, implicitDependencies, name, config, projectType, $schema (+4 more)

### Community 26 - "Community 26"
Cohesion: 0.15
Nodes (12): executor, options, outputs, implicitDependencies, name, config, projectType, $schema (+4 more)

### Community 27 - "Community 27"
Cohesion: 0.15
Nodes (12): 1. Quality gate objectives, 2. CI pipeline design, 3. Minimum quality thresholds, 4. Testing strategy by layer, 5. Build and caching, 6. Hygiene rules, 7. Pre-merge checklist, 8. Deviation policy (+4 more)

### Community 28 - "Community 28"
Cohesion: 0.17
Nodes (11): 1. Executive summary, 2. Original issues found, 3.1 Tags and boundaries, 3.2 Repository hygiene, 3.3 CI and e2e, 3.4 Test baseline, 3. Remediations performed, 4. Verification results (+3 more)

### Community 29 - "Community 29"
Cohesion: 0.17
Nodes (11): compilerOptions, allowJs, allowSyntheticDefaultImports, esModuleInterop, jsx, strict, types, extends (+3 more)

### Community 30 - "Community 30"
Cohesion: 0.17
Nodes (11): compilerOptions, allowJs, allowSyntheticDefaultImports, esModuleInterop, jsx, strict, types, extends (+3 more)

### Community 31 - "Community 31"
Cohesion: 0.18
Nodes (10): 1. Enforcement source, 2. Current policy, 3. Examples of valid imports, 4. Examples of invalid imports, 5. Remediation procedure for boundary errors, 6. Governance for rule extensions, Module Boundary Policy, Platform isolation (+2 more)

### Community 33 - "Community 33"
Cohesion: 0.20
Nodes (9): compilerOptions, emitDecoratorMetadata, experimentalDecorators, module, outDir, types, exclude, extends (+1 more)

### Community 34 - "Community 34"
Cohesion: 0.20
Nodes (9): compilerOptions, emitDecoratorMetadata, experimentalDecorators, module, outDir, types, exclude, extends (+1 more)

### Community 35 - "Community 35"
Cohesion: 0.20
Nodes (9): compilerOptions, emitDecoratorMetadata, experimentalDecorators, module, outDir, types, exclude, extends (+1 more)

### Community 36 - "Community 36"
Cohesion: 0.25
Nodes (7): compilerOptions, allowJs, module, outDir, sourceMap, extends, include

### Community 37 - "Community 37"
Cohesion: 0.25
Nodes (7): compilerOptions, declaration, outDir, types, exclude, extends, include

### Community 38 - "Community 38"
Cohesion: 0.25
Nodes (7): compilerOptions, declaration, outDir, types, exclude, extends, include

### Community 39 - "Community 39"
Cohesion: 0.25
Nodes (7): compilerOptions, declaration, outDir, types, exclude, extends, include

### Community 40 - "Community 40"
Cohesion: 0.25
Nodes (7): compilerOptions, declaration, outDir, types, exclude, extends, include

### Community 41 - "Community 41"
Cohesion: 0.25
Nodes (7): compilerOptions, allowJs, module, outDir, sourceMap, extends, include

### Community 42 - "Community 42"
Cohesion: 0.25
Nodes (7): 1. Full local verification, 2. Fast verification for affected scope, 3. Diagnosing boundary errors, 4. Diagnosing e2e failures, 5. Diagnosing "No tests found", 6. CI reproducibility notes, Quality Gates Runbook

### Community 43 - "Community 43"
Cohesion: 0.29
Nodes (6): compilerOptions, module, outDir, types, extends, include

### Community 44 - "Community 44"
Cohesion: 0.29
Nodes (6): compilerOptions, module, outDir, types, extends, include

### Community 45 - "Community 45"
Cohesion: 0.29
Nodes (6): compilerOptions, module, outDir, types, extends, include

### Community 46 - "Community 46"
Cohesion: 0.29
Nodes (6): name, projectType, $schema, sourceRoot, tags, // targets

### Community 47 - "Community 47"
Cohesion: 0.29
Nodes (6): compilerOptions, outDir, types, exclude, extends, include

### Community 48 - "Community 48"
Cohesion: 0.29
Nodes (6): name, projectType, $schema, sourceRoot, tags, targets

### Community 49 - "Community 49"
Cohesion: 0.29
Nodes (6): compilerOptions, module, outDir, types, extends, include

### Community 50 - "Community 50"
Cohesion: 0.29
Nodes (6): name, projectType, $schema, sourceRoot, tags, targets

### Community 51 - "Community 51"
Cohesion: 0.29
Nodes (6): name, projectType, $schema, sourceRoot, tags, targets

### Community 52 - "Community 52"
Cohesion: 0.29
Nodes (6): name, projectType, $schema, sourceRoot, tags, targets

### Community 53 - "Community 53"
Cohesion: 0.29
Nodes (6): name, projectType, $schema, sourceRoot, tags, // targets

### Community 54 - "Community 54"
Cohesion: 0.29
Nodes (6): compilerOptions, outDir, types, exclude, extends, include

### Community 55 - "Community 55"
Cohesion: 0.33
Nodes (5): compilerOptions, outDir, types, extends, include

### Community 56 - "Community 56"
Cohesion: 0.33
Nodes (5): compilerOptions, outDir, types, extends, include

### Community 57 - "Community 57"
Cohesion: 0.33
Nodes (5): compilerOptions, outDir, types, extends, include

### Community 58 - "Community 58"
Cohesion: 0.33
Nodes (5): compilerOptions, outDir, types, extends, include

### Community 59 - "Community 59"
Cohesion: 0.33
Nodes (5): compilerOptions, outDir, types, extends, include

### Community 60 - "Community 60"
Cohesion: 0.40
Nodes (4): compilerOptions, jsx, jsxImportSource, extends

## Knowledge Gaps
- **635 isolated node(s):** `recommendations`, `version`, `configurations`, `name`, `$schema` (+630 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Community 0` to `Community 2`, `Community 4`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `nx` connect `Community 2` to `Community 0`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `recommendations`, `version`, `configurations` to the rest of the system?**
  _635 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.03333333333333333 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.057329462989840346 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.041666666666666664 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._