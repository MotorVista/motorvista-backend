module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  env: {
    node: 1
  },
  rules: {
    quotes: [2, "double", { avoidEscape: true }],
    semi: [2, "always"]
  }
};
