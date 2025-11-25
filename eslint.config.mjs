import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

const eslintConfig = defineConfig([
  // Next.js rules
  ...nextVitals,
  ...nextTs,

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),

  // Prettier integration
  {
    plugins: {
      prettier: prettierPlugin,
    },
    extends: [...prettierConfig],
    rules: {
      ...prettierConfig.rules, // disable formatting rules that conflict with Pretiier
      'prettier/prettier': 'error', // show Prettier issues as ESLint errors
    },
  },
]);

export default eslintConfig;
