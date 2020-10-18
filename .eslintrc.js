module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    indent: 'off',
    'import/newline-after-import': 'off',
    'no-unused-vars': 'error',
    'react/no-unescaped-entities': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'spaced-comment': 'off',
    'import/order': 'off',
    'max-len': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-indent': 'off',
  },
};
