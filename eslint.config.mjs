import nxPlugin from '@nx/eslint-plugin';

export default [
  ...nxPlugin.configs['flat/base'],
  {
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            // ─── Scope-based rules ───
            // Apps are thin shells — they wire together libs but contain no logic
            {
              sourceTag: 'scope:app',
              onlyDependOnLibsWithTags: [
                'scope:feature',
                'scope:ui',
                'scope:data-access',
                'scope:shared',
              ],
            },
            // Features contain business logic; depend on ui, data-access, utils
            {
              sourceTag: 'scope:feature',
              onlyDependOnLibsWithTags: [
                'scope:ui',
                'scope:data-access',
                'scope:shared',
              ],
            },
            // UI components are presentational; depend only on utils/shared
            {
              sourceTag: 'scope:ui',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            // Data-access handles API/DB; depends only on utils/shared
            {
              sourceTag: 'scope:data-access',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            // Shared/utils is the leaf — depends only on other shared libs
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },

            // ─── Platform-based rules ───
            {
              sourceTag: 'scope:client',
              onlyDependOnLibsWithTags: ['scope:client', 'scope:shared'],
            },
            {
              sourceTag: 'scope:server',
              onlyDependOnLibsWithTags: ['scope:server', 'scope:shared'],
            },

            // ─── Type-based rules (layered architecture) ───
            // type:app → type:feature → type:ui / type:data-access → type:util
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
          ],
        },
      ],
    },
  },
  {
    ignores: ['**/vite.config.*.timestamp*', '**/vitest.config.*.timestamp*'],
  },
];
