import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { siteConfig } from "@/config/site";

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
 * ── One source for the origin ───────────────────────────────────────────────
 * This used to read the environment itself, which meant the site had two
 * separate pieces of logic deciding what its own address was: this one, and
 * `siteConfig.url`. They could disagree, and when the env var was blank they
 * did — `siteConfig.url` fell back to the domain while this returned a
 * root-relative path, so canonical tags and JSON-LD could end up disagreeing
 * on the same page.
 *
 * `siteConfig.url` is now the only place that decision is made, and it
 * guarantees a valid absolute URL. Safe to import: config/site imports nothing,
 * so there is no cycle.
 */
export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
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
