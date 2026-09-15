import type { ReactNode } from "react";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { MarkAnchor } from "@/components/motion/MarkFlight";
import { Rule } from "@/components/motion/Rule";
import { cn } from "@/lib/utils";

/**
 * The standard section opener: mono eyebrow, display heading, optional intro.
 *
 * Every section on the site uses this, which is what stops 48 pages drifting
 * into 48 slightly different heading treatments. It also means the reveal
 * animation is defined once rather than re-implemented per section.
 *
 * ── The eyebrow is doing real work ──────────────────────────────────────────
 * Mono, uppercase, wide tracking, small. It sits against display type that is
 * up to 176px, and that contrast in scale and texture is what makes the big
 * type read as confident rather than shouty. Remove the eyebrow and a display
 * headline on its own just looks loud.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
  align = "left",
  /** `h2` for sections, `h1` only for the page's single top-level heading. */
  as = "h2",
  size = "h2",
  markAnchor = true,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  size?: "display" | "h1" | "h2" | "h3";
  /**
   * Whether the flying brand mark can dock at this heading.
   *
   * On by default, so adding a section to the site puts it on the mark's path
   * automatically. Turn it off for headings that sit inside a card or a grid
   * cell, where the mark would land somewhere cramped, or for two headings so
   * close together that the mark would flick between them.
   */
  markAnchor?: boolean;
}) {
  const sizeClass = {
    display: "text-display",
    h1: "text-h1",
    h2: "text-h2",
    h3: "text-h3",
  }[size];

  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-3xl text-center",
        className
      )}
    >
      {eyebrow ? (
        <Reveal
          y={14}
          className={cn(
            "flex items-center gap-4",
            align === "center" && "justify-center"
          )}
        >
          {/*
            A dock point for the flying brand mark. Sits beside the eyebrow
            rather than the headline: the eyebrow is small and mono, which is
            the right scale for the asterisk, and it keeps the mark clear of the
            display type as it arrives.

            Invisible placeholder only. The visible asterisk is the single fixed
            one owned by MarkFlight.
          */}
          {markAnchor ? <MarkAnchor size="w-3.5" /> : null}
          <p className="eyebrow shrink-0 text-accent">{eyebrow}</p>

          {/* Runs from the label to the right edge. This is the line that ties
              a 90px mono label to the full width of the container, which is
              what makes the block read as the top of a section rather than as
              a paragraph that happens to be large. */}
          {align === "left" ? <Rule className="flex-1" delay={0.15} /> : null}
        </Reveal>
      ) : null}

      {/* ── Headline and intro ────────────────────────────────────────────
          The headline is capped at 20 characters a line for good reason, so
          the fix for a heading that felt empty was never to widen it. It was
          to give the space beside it structure.

          Moving the intro across on its own did not do that. A small grey
          paragraph floating in the right half with nothing holding it reads as
          a gap with words in it, which is worse than the stack it replaced.
          What it needed was an edge to sit against.

          So: a full-height divider between the two columns, and a short accent
          rule directly above the copy. The divider turns the space into a
          second column instead of a void, and the accent rule gives the
          paragraph a top edge to hang from so it is anchored at both ends.

          `items-stretch` on the row is what lets the divider run the full
          height of the headline. `items-end` inside the column is what keeps
          the copy level with the headline's last line: the intro is support,
          and a footnote sits at the bottom of the thing it supports. Level
          with the first line it competes, and the eye cannot tell which to
          read first. */}
      <div
        className={cn(
          eyebrow && "mt-8",
          align === "left" && "lg:flex lg:items-stretch"
        )}
      >
        <SplitLines
          as={as}
          className={cn(
            "font-display uppercase text-foreground",
            sizeClass,
            /* Caps the line length in characters rather than pixels, so the
               headline breaks at a sensible place at every viewport size. */
            align === "left" && "max-w-[20ch] lg:shrink-0"
          )}
        >
          {title}
        </SplitLines>

        {intro ? (
          <div
            className={cn(
              align === "left" &&
                "lg:flex lg:min-w-0 lg:flex-1 lg:items-end lg:border-l lg:border-line lg:pb-2 lg:pl-12 xl:pl-16"
            )}
          >
            <Reveal delay={0.12} className={cn("mt-7 lg:mt-0", "max-w-text")}>
              {/* Short, lime, and only as wide as it needs to be to register.
                  A full-width rule here would read as a second divider and
                  the block would start to look like a table. */}
              <Rule className="mb-6 w-12 bg-accent" delay={0.3} />

              <p className="text-lead text-muted">{intro}</p>
            </Reveal>
          </div>
        ) : null}
      </div>
    </div>
  );
}
