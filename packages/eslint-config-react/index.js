module.exports = {
  plugins: ["jsx-a11y", "effector"],
  extends: ["@mg-control/eslint-config-base", "plugin:jsx-a11y/recommended", "plugin:effector/recommended", "plugin:effector/react"],
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
