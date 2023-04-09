module.exports = {
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  plugins: ["simple-import-sort", "@typescript-eslint", "import", "prettier", "jsx-a11y"],
  extends: [
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              ["^react", "^@?\\w"],
              ["^\\u0000"],
              ["^~/"],
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              ["^.+\\.?(css)$"],
            ],
          },
        ],
      },
    },
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
    react: {
      version: "18.x",
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {},
    },
  },
};
