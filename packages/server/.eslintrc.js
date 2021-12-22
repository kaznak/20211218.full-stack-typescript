module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  env: {
    browser: false,
    es2021: true,
    jest: true,
    node: true,
  },
  rules: {
    "@typescript-eslint/no-var-requires": "warn",
  },
};
