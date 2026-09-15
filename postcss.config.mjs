/**
 * Tailwind CSS v4 ships as a PostCSS plugin and needs no JS config file —
 * the design system lives in CSS, in the `@theme` block in src/app/globals.css.
 * That is the single source of truth for colour, type and spacing tokens.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
