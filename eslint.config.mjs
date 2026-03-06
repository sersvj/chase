import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "sanity/**",
  ]),
  {
    rules: {
      // Enforce no `any` types per AGENTS.md
      "@typescript-eslint/no-explicit-any": "error",
      // Warn on unused vars (except those prefixed with _)
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      // Enforce using const assertions
      "prefer-const": "error",
    },
  },
]);

export default eslintConfig;

