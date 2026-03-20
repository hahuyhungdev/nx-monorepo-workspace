import nxPlugin from '@nx/eslint-plugin';

export default [
  ...nxPlugin.configs['flat/base'],
  ...nxPlugin.configs['flat/typescript'],
  {
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            // ═══════════════════════════════════════════════
            // LAYER RULES (scope-based)
            // Enforces: app → feature → ui / data-access → shared
            // ═══════════════════════════════════════════════

            // Apps are thin shells — compose features, ui, and shared
            {
              sourceTag: 'scope:app',
              onlyDependOnLibsWithTags: [
                'scope:feature',
                'scope:ui',
                'scope:data-access',
                'scope:shared',
              ],
            },
            // Features = business logic; use ui + data-access + shared
            {
              sourceTag: 'scope:feature',
              onlyDependOnLibsWithTags: [
                'scope:ui',
                'scope:data-access',
                'scope:shared',
              ],
            },
            // UI = presentational only; depends on shared/utils
            {
              sourceTag: 'scope:ui',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            // Data-access = API/DB layer; depends on shared/utils
            {
              sourceTag: 'scope:data-access',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            // Shared = leaf layer (utils, types, constants)
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },

            // ═══════════════════════════════════════════════
            // PLATFORM RULES
            // Prevent client ↔ server cross-imports
            // ═══════════════════════════════════════════════
            {
              sourceTag: 'scope:client',
              notDependOnLibsWithTags: ['scope:server'],
            },
            {
              sourceTag: 'scope:server',
              notDependOnLibsWithTags: ['scope:client'],
            },

            // ═══════════════════════════════════════════════
            // TYPE RULES (layered architecture)
            // type:app → type:feature → type:ui / type:data-access → type:util
            // ═══════════════════════════════════════════════
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: [
                'type:feature',
                'type:ui',
                'type:data-access',
                'type:util',
              ],
            },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: [
                'type:ui',
                'type:data-access',
                'type:util',
              ],
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['type:ui', 'type:util'],
            },
            {
              sourceTag: 'type:data-access',
              onlyDependOnLibsWithTags: ['type:data-access', 'type:util'],
            },
            {
              sourceTag: 'type:util',
              onlyDependOnLibsWithTags: ['type:util'],
            },

            // ═══════════════════════════════════════════════
            // DOMAIN RULES
            // Each domain can use its own libs + shared (no domain)
            // Prevents: billing importing from auth internals, etc.
            // ═══════════════════════════════════════════════
            {
              sourceTag: 'domain:auth',
              onlyDependOnLibsWithTags: ['domain:auth', 'domain:shared'],
            },
            {
              sourceTag: 'domain:billing',
              onlyDependOnLibsWithTags: ['domain:billing', 'domain:shared'],
            },
          ],
        },
      ],
    },
  },
  {
    ignores: ['**/vite.config.*.timestamp*', '**/vitest.config.*.timestamp*'],
  },
  {
    files: ['**/eslint.config.mjs'],
    rules: {
      '@nx/enforce-module-boundaries': 'off',
    },
  },
];
