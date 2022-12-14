module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'standard-with-typescript',
    'prettier',
  ],
  overrides: [
    {
      files: ['src/**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        'preferred-import/ts-imports': 'error',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'preferred-import', 'prettier', 'react-hooks'],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/consistent-type-definitions': 'warn',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],

    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'unknown',
        ],
        pathGroups: [
          {
            pattern: '{react*, react*/**, react-dom/*}',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: './App',
            group: 'internal',
          },
          {
            pattern: '@pages/*',
            group: 'internal',
          },
          {
            pattern: '@components/*',
            group: 'internal',
          },
          {
            pattern: './Spinner',
            group: 'internal',
          },
          {
            pattern: '@ant-design/*',
            group: 'unknown',
          },
          {
            pattern: '*.styles',
            group: 'unknown',
            position: 'after',
          },
          {
            pattern: '@*/**/*.styles',
            group: 'unknown',
            position: 'after',
          },
          {
            pattern: './**/*.styles',
            group: 'unknown',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', 'unknown'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },

        'newlines-between': 'ignore',
      },
    ],
  },
}
