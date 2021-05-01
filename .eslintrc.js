module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'airbnb-typescript',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  
  plugins: ['react'],
  rules: {
    "dot-notation": "off",
    "@typescript-eslint/dot-notation": ["off"],
    '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
    "@typescript-eslint/camelcase": "off",
    "import/no-extraneous-dependencies": [
      "error", {
         "devDependencies": false, 
         "optionalDependencies": false, 
         "peerDependencies": false, 
         "packageDir": "./"
      }
  ]
  },
  
};
