/**
 * Custom Nx generator: domain-lib
 *
 * Scaffolds a new library inside a domain folder following
 * the workspace convention:
 *   libs/<domain>/<type>/
 *
 * Usage:
 *   nx g @my-org/tools:domain-lib --domain=payments --type=feature
 *
 * Creates:
 *   libs/payments/feature/
 *     project.json   (tags: scope:payments, type:feature)
 *     src/
 *       index.ts     (barrel)
 *       lib/         (source code)
 *
 * Register this generator in tools/generators/domain-lib/schema.json
 * and reference it from the workspace generators config.
 */
import {
  Tree,
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
  updateJson,
} from '@nx/devkit';

interface DomainLibGeneratorSchema {
  domain: string;
  type: 'feature' | 'ui' | 'data-access' | 'util';
}

export default async function domainLibGenerator(
  tree: Tree,
  schema: DomainLibGeneratorSchema
) {
  const { domain, type } = schema;
  const projectRoot = joinPathFragments('libs', domain, type);
  const projectName = `${domain}-${type}`;

  // Generate project.json
  tree.write(
    joinPathFragments(projectRoot, 'project.json'),
    JSON.stringify(
      {
        name: projectName,
        $schema: '../../../node_modules/nx/schemas/project-schema.json',
        sourceRoot: `${projectRoot}/src`,
        projectType: 'library',
        tags: [`scope:${domain}`, `type:${type}`],
        targets: {},
      },
      null,
      2
    )
  );

  // Generate barrel
  tree.write(
    joinPathFragments(projectRoot, 'src', 'index.ts'),
    `// Public API for ${domain}/${type}\nexport {};\n`
  );

  // Generate tsconfig.json
  tree.write(
    joinPathFragments(projectRoot, 'tsconfig.json'),
    JSON.stringify(
      {
        extends: '../../../tsconfig.base.json',
        compilerOptions: {
          module: 'commonjs',
          forceConsistentCasingInFileNames: true,
          strict: true,
          noImplicitOverride: true,
          noPropertyAccessFromIndexSignature: true,
          noImplicitReturns: true,
          noFallthroughCasesInSwitch: true,
        },
        files: [],
        include: [],
        references: [
          { path: './tsconfig.lib.json' },
          { path: './tsconfig.spec.json' },
        ],
      },
      null,
      2
    )
  );

  // Add path alias to tsconfig.base.json
  updateJson(tree, 'tsconfig.base.json', (json) => {
    json.compilerOptions.paths = json.compilerOptions.paths ?? {};
    json.compilerOptions.paths[`@my-org/${domain}/${type}`] = [
      `${projectRoot}/src/index.ts`,
    ];
    return json;
  });

  await formatFiles(tree);

  return () => {
    console.log(`✅ Created libs/${domain}/${type}`);
    console.log(`   Tags: scope:${domain}, type:${type}`);
    console.log(`   Alias: @my-org/${domain}/${type}`);
  };
}
