// Simple ESLint flat config for basic JavaScript linting only
export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '**/*.d.ts',
      'coverage/**',
      '.turbo/**',
      'playground/dist/**',
      'packages/*/node_modules/**',
      '**/*.ts',
      '**/*.tsx', 
      '**/*.vue',
    ],
  },
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'no-debugger': 'warn',
      'prefer-const': 'warn',
      'no-var': 'error',
    },
  },
];