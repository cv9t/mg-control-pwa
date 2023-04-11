module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["simple-import-sort", "@typescript-eslint", "import", "prettier"],
  extends: ["airbnb-typescript/base", "plugin:@typescript-eslint/recommended", "plugin:import/typescript", "prettier"],
  rules: {
    "@typescript-eslint/explicit-member-accessibility": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/no-extraneous-dependencies": "off",
    "arrow-body-style": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "object-shorthand": "error",
    "no-console": "warn",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-empty-function": "error",
    "prettier/prettier": [
      "error",
      {
        printWidth: 140,
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
