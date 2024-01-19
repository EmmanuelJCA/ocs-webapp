module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // Make sure this is always the last element in the array.
  ],
  plugins: ['react-refresh', 'perfectionist', 'prettier'],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'perfectionist/sort-named-imports': [
      1,
      {
        order: 'asc',
        type: 'line-length',
      },
    ],
    'perfectionist/sort-named-exports': [
      1,
      {
        order: 'asc',
        type: 'line-length',
      },
    ],
    'perfectionist/sort-exports': [
      1,
      {
        order: 'asc',
        type: 'line-length',
      },
    ],
    'perfectionist/sort-imports': [
      1,
      {
        order: 'asc',
        type: 'line-length',
        'newlines-between': 'always',
        groups: [
          ['builtin', 'external'],
          [
            'custom-redux',
            'custom-router',
            'custom-hooks',
            'custom-utils',
            'custom-components',
            'custom-types',
            'internal',
          ],
          ['parent', 'sibling', 'index'],
          'object',
          'unknown',
        ],
        'custom-groups': {
          value: {
            'custom-redux': '@/redux/**',
            'custom-router': '@/router/**',
            'custom-hooks': '@/hooks/**',
            'custom-components': '@/components/**',
            'custom-utils': '@/utils/**',
            'custom-types': '@/types/**',
          },
        },
        'internal-pattern': ['@/**'],
      },
    ],
  },
};
