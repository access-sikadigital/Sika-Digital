import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

/** @type {import("eslint").Linter.Config[]} */
const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [".next/**", "node_modules/**", "out/**", "next-env.d.ts"],
  },
  {
    rules: {
      /* Unused vars are errors, but an underscore prefix opts out — useful for
         deliberately-ignored callback args. */
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      /* next/image is not always right — a full-bleed background or an inline
         SVG sprite is better as a plain tag. Warn rather than error so the
         exception is a conscious one-line disable, not a fight. */
      "@next/next/no-img-element": "warn",
    },
  },
];

export default config;
