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
            // PLATFORM ISOLATION — FE cannot import BE code
            // ═══════════════════════════════════════════════
            {
              sourceTag: 'platform:fe',
              onlyDependOnLibsWithTags: ['platform:fe', 'platform:shared'],
            },
            {
              sourceTag: 'platform:be',
              onlyDependOnLibsWithTags: ['platform:be', 'platform:shared'],
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
