Safe migration path to Next.js 15 + ESLint 9 (flat config)

This guide lets you upgrade without breaking your current build. Keep your existing Next 14 + ESLint 8 setup until the last step. Do the changes on a branch and flip the switch when you’re ready.

Prereqs
- Node 18+ (you already have it)
- A clean working tree (commit your work first)

1) Create a branch

  git checkout -b chore/next15-eslint9

2) Bump packages (Next 15 + ESLint 9 + typescript‑eslint 8)

Update package.json dependencies to the following (do not change other fields):

  {
    "dependencies": {
      "next": "^15.0.0",
      "react": "^18.3.1",
      "react-dom": "^18.3.1"
    },
    "devDependencies": {
      "eslint": "^9.11.1",
      "@eslint/js": "^9.11.1",
      "@typescript-eslint/parser": "^8.8.1",
      "@typescript-eslint/eslint-plugin": "^8.8.1",
      "@next/eslint-plugin-next": "^15.0.0",
      "typescript": "^5.6.3",
      "@types/node": "24.x",
      "@types/react": "19.x"
    }
  }

Notes:
- ESLint 9 uses the flat config format. We add @eslint/js and typescript‑eslint v8 which are designed for ESLint 9.
- We switch from eslint-config-next to the new plugin package @next/eslint-plugin-next for the flat config.

3) Replace .eslintrc.json with flat config

Delete .eslintrc.json and .eslintignore. Add a new file at the project root: eslint.config.mjs

  import js from '@eslint/js';
  import tseslint from 'typescript-eslint';
  import next from '@next/eslint-plugin-next';

  export default [
    // Ignore patterns (replaces .eslintignore)
    { ignores: ['node_modules/**', '.next/**', 'dist/**', 'public/**', 'coverage/**'] },

    // Base JS recommended
    js.configs.recommended,

    // TypeScript recommended configs
    ...tseslint.configs.recommended,

    // Next.js core-web-vitals rules
    {
      name: 'next/core-web-vitals',
      plugins: { '@next/next': next },
      rules: {
        ...next.configs['core-web-vitals'].rules,
      },
    },

    // Project rules & file-based overrides
    {
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: { project: false },
      },
      rules: {
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      },
    },

    // Node scripts (allow require in JS)
    {
      files: ['scripts/**/*.js'],
      languageOptions: { sourceType: 'commonjs' },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ];

4) Optional: mute lint during the very first CI build

If you want CI to pass while you tune rules, set this in next.config.mjs:

  export default {
    reactStrictMode: true,
    eslint: { ignoreDuringBuilds: true },
  };

5) Install and try locally

  npm install
  npm run lint     # uses ESLint 9 + flat config now
  npm run dev
  npm run build

6) Push and verify on Vercel

  git push -u origin chore/next15-eslint9

Set Vercel env (Project Settings → Environment Variables) if you haven’t already:
- NEXT_TELEMETRY_DISABLED = 1 (optional)
- NEXT_PUBLIC_GA_ID or NEXT_PUBLIC_PLAUSIBLE_DOMAIN (optional analytics)
- QUOTE_WEBHOOK_URL (optional quote forwarding)

7) Roll out

Open a PR, review, and merge when satisfied. You can tighten rules later by elevating warnings to errors in eslint.config.mjs.

Rollback plan
- If anything blocks deploys, simply keep using Next 14 + ESLint 8 (current main). The migration sits on its branch until you’re ready.

