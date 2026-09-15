import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Tailwind-aware class merging.
 *
 * `clsx` resolves conditionals; `twMerge` then drops earlier utilities that a
 * later one overrides, so a component's default can be overridden by a prop
 * without both classes landing in the DOM and the cascade deciding at random.
 *
 * ── The custom groups below are not optional ────────────────────────────────
 * tailwind-merge only knows how to resolve conflicts between classes it
 * recognises. Custom theme values create custom class names, and without being
 * registered here they are treated as unrelated — so `text-h1` and `text-h2`
 * would BOTH survive a merge, and the winner would depend on stylesheet order.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      /* Custom font-size scale from globals.css @theme. Registered under
         'font-size' so they conflict with each other and with Tailwind's own
         text-* sizes. */
      "font-size": [
        {
          text: [
            "display",
            "h1",
            "h2",
            "h3",
            "h4",
            "lead",
            "body",
            "small",
            "eyebrow",
          ],
        },
      ],
      /* Custom font families. */
      "font-family": [{ font: ["sans", "display", "mono"] }],
      /* Custom easings, so two ease-* utilities cannot both apply. */
      ease: [{ ease: ["out-quart", "out-expo", "in-out-quart"] }],
      /* Custom durations. */
      duration: [{ duration: ["fast", "base", "slow", "slower"] }],
      /* Custom radii. */
      rounded: [{ rounded: ["card", "button"] }],
    },
  },
});

/**
 * ⚠️  KNOWN LIMITATION, worth understanding before you debug a styling bug for
 *     an hour: tailwind-merge cannot drop a BREAKPOINT-PREFIXED class in favour
 *     of an unprefixed one. `cn("lg:h-16", "h-full")` keeps both, and above
 *     `lg` the fixed height wins.
 *
 *     So when a component exposes a `className` prop meant to control a
 *     property, do not also give that property a responsive default inside the
 *     component. Give it no default, or an unprefixed one.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Absolute URL against the canonical origin. Used for metadata and JSON-LD.
 *
 * Two fallbacks and no more. The configured site URL wins; on a Vercel preview
 * with no site URL set, the deployment's own host stands in; otherwise the base
 * is empty and the result is a root-relative path, which is valid.
 *
 * There used to be a third `?? ""` on the end of this chain. It could never
 * run: the ternary before it returns `""` on its false branch, so the operand
 * to its left is a string in every case. TypeScript rejects the build for it
 * (TS2881, "this expression is never nullish") rather than warning, which is
 * the right call — a fallback that cannot fire is a misreading of the code
 * above it, and this one hid the fact that the ternary was already handling
 * the empty case.
 */
export function absoluteUrl(path = "/") {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "")
  ).replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Australian formatting — the site is AU-only. */
export const formatAudCompact = (value: number) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
