module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
            ],
            'newlines-between': 'always',
            pathGroupsExcludedImportTypes: ["internal"],
            alphabetize: {
              order: 'asc',
              caseInsensitive: true
            },
          },
        ],
      },
    },
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'import/first': 'error',
    camelcase: 0,
    'prettier/prettier': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'jsx-quotes': ['error', 'prefer-double'],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'consistent-return': 0,
    'import/newline-after-import': 'error',
    quotes: [2, 'single', { avoidEscape: true }],
    'import/no-duplicates': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        tsx: 'never',
        json: 'never',
        json5: 'never',
      },
    ]
  },
  settings: {
    'import/extensions': ['.ts', '.js', '.tsx', '.json', '.json5'],
    "import/resolver": {
      "typescript": {}
    },
  },

};
