module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: "detect" },
  },
  ignorePatterns: ["dist/**", "node_modules/**"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/anchor-is-valid": "warn",
  },
};


