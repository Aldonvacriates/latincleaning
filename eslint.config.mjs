import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import nextPlugin from '@next/eslint-plugin-next';
import globals from 'globals';

export default [
  // Ignore patterns (replaces .eslintignore)
  { ignores: ['node_modules/**', '.next/**', 'dist/**', 'public/**', 'coverage/**'] },

  // Global environments (browser + node)
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // Base JS recommended
  js.configs.recommended,

  // TypeScript rules (flat config)
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { project: false, ecmaVersion: 'latest', sourceType: 'module' },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      // Start from the plugin's recommended
      ...tsPlugin.configs.recommended.rules,
      // Project tweaks
      // Use TypeScript for undefined checks
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },

  // Next.js core-web-vitals
  {
    name: 'next/core-web-vitals',
    plugins: { '@next/next': nextPlugin },
    rules: {
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  // Allow Next's generated triple-slash in next-env.d.ts
  {
    files: ['next-env.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },

  // Node scripts (allow require in JS)
  {
    files: ['scripts/**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
];
