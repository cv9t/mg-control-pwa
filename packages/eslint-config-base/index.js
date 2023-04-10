module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["simple-import-sort", "@typescript-eslint", "import", "prettier"],
  extends: [
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/no-extraneous-dependencies": "off",
    "arrow-body-style": ["error", "as-needed"],
    "@typescript-eslint/no-explicit-any": "warn",
    "object-shorthand": "error",
    "no-console": "warn",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true,
      },
    ],
    "@typescript-eslint/no-empty-function": [
      "error",
      {
        allow: ["arrowFunctions"],
      },
    ],
    "prettier/prettier": [
      "error",
      {
        printWidth: 120,
        endOfLine: "auto",
        singleQuote: false,
        tabWidth: 2,
        useTabs: false,
        trailingComma: "es5",
      },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {},
    },
  },
};
