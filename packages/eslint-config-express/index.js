module.exports = {
  extends: ["@mg-control/eslint-config-base"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [["^express"], ["^@?\\w"], ["^@?\\w"], ["^\\./"], ["^\\.\\./"]],
          },
        ],
      },
    },
  ],
};
