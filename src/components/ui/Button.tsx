import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "accent" | "solid" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

/**
 * THE BUTTON.
 *
 * Renders a <Link> when given `href` and a <button> otherwise, so a call to
 * action is always the right element. This matters more than it looks: a <div>
 * styled as a link cannot be opened in a new tab, is absent from the tab order,
 * and never appears in a screen reader's list of links.
 *
 * ── What this replaced, and why ─────────────────────────────────────────────
 * A fully rounded pill with the arrow inside a translucent disc. Two faults.
 *
 * The shape was the only soft thing in a system built on hard-edged display
 * type, 1px schematic strokes, square rule ends and 16px card corners. A pill
 * beside any of that reads as borrowed from another site.
 *
 * The disc was worse, and it was a real mistake rather than a taste call.
 * `bg-current/12` on an accent button is ink at 12% over lime, which resolves
 * to a muddy olive: not a tint of the button, not a tint of the text, just a
 * dirty patch. A translucent fill only works when what is behind it is neutral.
 *
 * ── The shape now ───────────────────────────────────────────────────────────
 * A block split into two cells by a hairline: the label, then the arrow. The
 * divider is the same device as the section heading and the schematics, so the
 * button belongs to the same drawing as everything else on the page. It also
 * gives the arrow a reason to sit apart from the text, which the disc was
 * trying and failing to do.
 *
 * `items-stretch` is what lets the divider run the full height of the button
 * rather than floating as a short dash beside the label.
 *
 * ── The hover choreography ──────────────────────────────────────────────────
 * Kept from the old button, because it was the part that worked. Three things
 * move together, all on transforms so the whole thing composites:
 *
 *   1. A FILL wipes up from the bottom edge. Not a colour transition, a real
 *      layer with a direction, which is what gives it physicality.
 *   2. The LABEL swaps vertically. Two stacked copies in one grid cell: the
 *      first rises out, the second rises in behind it. The cell sizes itself to
 *      the text, so the button needs no fixed width.
 *   3. The ARROW exits right and a second one enters from the left, so the
 *      motion reads as continuous travel rather than a bounce.
 *
 * The duplicated label and arrow are `aria-hidden` — they are the same content
 * twice, and assistive tech should hear it once.
 *
 * ── Why the fill is `bg-foreground` ─────────────────────────────────────────
 * It inverts correctly in BOTH themes without a second rule. On dark: lime
 * fill → white fill, ink text throughout. On light: blue fill → ink fill, white
 * text throughout. Contrast holds at every point of the transition, which a
 * hard-coded hover colour would not.
 */

/**
 * Square caps, not round. The site's rules, ticks and schematic strokes all
 * terminate square, and a rounded arrow head beside them looks like an icon
 * font that got imported by accident.
 *
 * Drawn rather than typed. The `→` character is whatever weight the display
 * face decided on, which is a hairline in Archivo and does not survive next to
 * a heavy uppercase label.
 */
function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cn("size-[1.1em]", className)}
      fill="none"
      aria-hidden
    >
      <path
        d="M1.5 8h12M9 3.5L13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="square"
      />
    </svg>
  );
}

const variants: Record<Variant, string> = {
  accent: "bg-accent text-on-accent",
  solid: "bg-foreground text-background",
  outline: "border border-line-strong text-foreground hover:border-foreground",
  ghost: "text-foreground",
};

/** Variants where the fill layer is used. Outline and ghost stay quiet. */
const filled: Record<Variant, boolean> = {
  accent: true,
  solid: false,
  outline: false,
  ghost: false,
};

/**
 * The divider colour per variant.
 *
 * On the filled variants it is drawn from `currentColor`, which is the label
 * colour and therefore always legible against whatever the button is filled
 * with, including mid-wipe. On the quiet variants it uses the line token so it
 * matches the button's own border rather than out-weighing it.
 */
const dividers: Record<Variant, string> = {
  accent: "border-current/30",
  solid: "border-current/30",
  outline: "border-line-strong",
  ghost: "border-line",
};

/* min-h-11 and up: 44px is the WCAG 2.2 target-size minimum, and this is a site
   whose entire purpose is getting people to press these. */
const sizes: Record<Size, { root: string; label: string; arrow: string }> = {
  sm: { root: "min-h-11 text-eyebrow", label: "px-4", arrow: "px-3" },
  md: { root: "min-h-12 text-small", label: "px-6", arrow: "px-4" },
  lg: { root: "min-h-14 text-body", label: "px-8", arrow: "px-5" },
};

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
  /** Trailing arrow cell with the travel animation. */
  arrow?: boolean;
};

export function Button({
  children,
  className,
  variant = "accent",
  size = "md",
  arrow = true,
  href,
  ...rest
}: BaseProps & { href?: string } & Omit<
    ComponentProps<"button">,
    keyof BaseProps | "href"
  >) {
  const s = sizes[size];

  const classes = cn(
    "group relative isolate inline-flex items-stretch overflow-hidden rounded-button",
    "font-display text-nowrap uppercase tracking-wide",
    "transition-colors duration-base ease-out-quart",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    s.root,
    className
  );

  const content = (
    <>
      {/* 1 — the fill. -z-10 keeps it behind the label without a stacking
          context fight; `isolate` on the button scopes that z-index locally. */}
      {filled[variant] && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 translate-y-full bg-foreground transition-transform duration-slow ease-out-quart group-hover:translate-y-0"
        />
      )}

      {/* 2 — the label swap.

          TWO elements, and both are load-bearing. The outer one is the cell: it
          stretches to the full height of the button and centres its contents.
          The inner one is the clip, and it must hug the text exactly.

          Collapsing them into one is the bug this comment exists to prevent.
          A single stretched element with `overflow-hidden` clips at the button
          edge, not at the text edge, so `translate-y-140%` of a 16px line is
          22px and lands comfortably inside a 56px box. The result is both
          copies of the label visible at once, stacked, at rest. */}
      <span
        className={cn("flex flex-1 items-center justify-center", s.label)}
      >
        <span className="relative grid overflow-hidden leading-none">
          <span className="col-start-1 row-start-1 transition-transform duration-slow ease-out-quart group-hover:-translate-y-[140%]">
            {children}
          </span>
          <span
            aria-hidden
            className="col-start-1 row-start-1 translate-y-[140%] transition-transform duration-slow ease-out-quart group-hover:translate-y-0"
          >
            {children}
          </span>
        </span>
      </span>

      {/* 3 — the arrow cell. Same two-copy trick on the horizontal axis, behind
          its own divider rather than inside a disc, and the same two-element
          split for the same reason. */}
      {arrow && (
        <span
          aria-hidden
          className={cn(
            "flex shrink-0 items-center justify-center border-l",
            dividers[variant],
            s.arrow
          )}
        >
          <span className="relative grid overflow-hidden">
            <Arrow className="col-start-1 row-start-1 transition-transform duration-slow ease-out-quart group-hover:translate-x-[220%]" />
            <Arrow className="col-start-1 row-start-1 -translate-x-[220%] transition-transform duration-slow ease-out-quart group-hover:translate-x-0" />
          </span>
        </span>
      )}
    </>
  );

  if (href) {
    /* Anything not starting with "/" leaves the site. `noreferrer` alongside
       `noopener` because older browsers only honour the former, and a referrer
       leak from a lead-gen site is worth avoiding. */
    const external = !href.startsWith("/");
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
