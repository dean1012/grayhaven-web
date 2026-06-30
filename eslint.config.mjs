import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["*.config.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.node,
      sourceType: "commonjs",
    },
    rules: js.configs.recommended.rules,
  },
  {
    files: ["*.config.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.node,
      sourceType: "module",
    },
    rules: js.configs.recommended.rules,
  },
  {
    files: ["site/frontend/js/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      sourceType: "script",
    },
    rules: js.configs.recommended.rules,
  },
];
