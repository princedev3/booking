module.exports = {
  extends: [
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "next/typescript",
  ],
  rules: {
    "@typescript-eslint/no-require-imports": "off",
  },
};
