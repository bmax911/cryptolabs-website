module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "quotes": ["error", "double"],
    "indent": ["error", 2],
    "linebreak-style": 0,
    "object-curly-spacing": 0,
    "no-unused-vars": 0,
    "comma-dangle": 0,
  },
};
