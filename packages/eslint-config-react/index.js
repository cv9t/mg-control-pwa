module.exports = {
  plugins: ["jsx-a11y"],
  extends: ["@mg-control/eslint-config-base", "plugin:jsx-a11y/recommended"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              ["^react"],
              ["^@?\\w"],
              ["^(@|components)(/.*|$)"],
              ["^\\u0000"],
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              ["^.+\\.?(css|scss)$"],
            ],
          },
        ],
      },
    },
  ],
};
