module.exports = {
  root: true,
  env: { browser: true, es2024: true },
  extends: [
    // "eslint:recommended",
    // "plugin:@typescript-eslint/recommended",
    // "plugin:react-hooks/recommended",
    "plugin:perfectionist/recommended-line-length",
    "airbnb",
    "airbnb/hooks",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "perfectionist"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "perfectionist/sort-interfaces": "error",
    "react/jsx-filename-extension": [1, { "extensions": [".jsx", ".tsx"] }],
  },
};
