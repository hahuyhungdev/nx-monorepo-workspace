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
            // TYPE RULES  (layered architecture)
            // app → feature → ui / data-access → util
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
            // SCOPE RULES  (domain isolation)
            // Each domain may only reach its own libs + shared
            // ═══════════════════════════════════════════════
            {
              sourceTag: 'scope:auth',
              onlyDependOnLibsWithTags: ['scope:auth', 'scope:shared'],
            },
            {
              sourceTag: 'scope:billing',
              onlyDependOnLibsWithTags: ['scope:billing', 'scope:shared'],
            },
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            // Apps can depend on any scope
            {
              sourceTag: 'scope:app',
              onlyDependOnLibsWithTags: [
                'scope:auth',
                'scope:billing',
                'scope:shared',
              ],
            },
          ],
        },
      ],
    },
  },
  {
    ignores: [
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
      '**/.astro/**',
    ],
  },
  {
    files: ['**/eslint.config.mjs'],
    rules: {
      '@nx/enforce-module-boundaries': 'off',
    },
  },
];
