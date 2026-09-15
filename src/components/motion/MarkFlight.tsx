"use client";

import { Logomark } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

/**
 * BRAND MARK — static.
 *
 * ── The flying version was removed ──────────────────────────────────────────
 * This file previously exported a `MarkFlight` component: a single fixed
 * asterisk that travelled down the document on scroll, landing on each section
 * heading in turn. Removed at the client's request. The mark now simply sits
 * where it is placed.
 *
 * Keeping the note because the hard part is not obvious, and anyone rebuilding
 * it will hit the same wall I did. The intuitive approach is to track whichever
 * anchor is "active" and ease the fixed mark toward its live viewport position
 * each frame. That cannot work: while the page is scrolling, the anchor's
 * viewport position is moving too, so the mark stays glued to the active anchor
 * and snaps across when the active one changes. You get teleporting.
 *
 * The working approach is to measure every anchor in DOCUMENT space, assign
 * each the scroll position at which the mark should be sitting on it, and
 * interpolate the mark's document position by how far the scroll has travelled
 * between two of them. Subtracting current scroll converts that to viewport
 * coordinates for the fixed element. Position then becomes a pure function of
 * scroll: stop and it stops mid-flight, scrub back and it retraces exactly.
 *
 * Two further traps if it ever returns:
 *   · Never put an anchor inside a `position: sticky` container. Sticky changes
 *     an element's document position as it sticks, so the measurement goes
 *     stale and the mark lands where the anchor no longer is.
 *   · `gsap.quickSetter(el, "scale")` throws. `scale` is shorthand that expands
 *     to `scaleX,scaleY`, which a per-property setter cannot resolve, so it
 *     falls through to `setAttribute`. Use the `"css"` form with an object.
 *
 * The component name is kept so the four call sites do not need changing.
 */
export function MarkAnchor({
  className,
  /** Tailwind width utility. */
  size = "w-8",
  /** Slow continuous rotation. See the `mark-turn` note in globals.css. */
  turn = true,
}: {
  className?: string;
  size?: string;
  turn?: boolean;
}) {
  return (
    /* The wrapper owns layout: sizing, and any positional transform the caller
       passes, such as the superscript nudge on the hero asterisk. */
    <span className={cn("block shrink-0", size, className)} aria-hidden>
      {/* The rotation lives on the SVG. Two transform animations on one element
          cannot compose, so keeping them on separate elements is what lets the
          mark be both nudged into place and turning. */}
      <Logomark
        className={cn(turn && "mark-turn")}
        color="lime"
        decorative
      />
    </span>
  );
}
