/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  printWidth: 80,
  tabWidth: 2,

  /**
   * Sorts Tailwind class strings into Tailwind's own canonical order.
   *
   * Worth having on a project this size: it removes "where does this class go"
   * from every code review, and it makes duplicate or contradictory utilities
   * (`p-4 p-6`) line up next to each other where they are obvious.
   *
   * MUST be last in the plugin list — it rewrites what other plugins produce.
   */
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/app/globals.css",
  tailwindFunctions: ["cn", "clsx", "cva"],
};

export default config;
