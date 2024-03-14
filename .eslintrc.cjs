module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'plugin:react-hooks/recommended'],
  plugins: ['react-hooks'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}', 'vite.config.js'],
      parserOptions: {
        sourceType: 'module',
      },
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    quotes: ['error', 'single'],
    'no-console': 'off',
    'no-unused-vars': ['error', { varsIgnorePattern: '^React$' }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'test.{ts,tsx,js,jsx}',
          'test-*.{ts,tsx,js,jsx}',
          '**/*{.,_}{test,spec}.{ts,tsx,js,jsx}',
          '**/jest.config.{ts,js}',
          '**/jest.setup.{ts,js}',
          '**/*.stories.*',
          '**/.storybook/**/*.*',
        ],
      },
    ],
  },
};
