import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  // --- GLOBAL IGNORES (applies to ALL configs below) ---
  {
    ignores: [
      '**/.astro/**',
      '**/dist/**',
      '**/build/**',
      '**/node_modules/**',
      '**/.git/**',
      '**/.vscode/**',
    ],
  },

  // --- YOUR CUSTOM RULES (only for these file types) ---
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      semi: ['error', 'always'],
      'no-unused-vars': 'off', // Turn off base rule
      '@typescript-eslint/no-unused-vars': 'error',
      'no-console': 'error',
    },
  },

  // --- TYPESCRIPT RECOMMENDED RULES ---
  ...tseslint.configs.recommended,
  prettier,
]);
