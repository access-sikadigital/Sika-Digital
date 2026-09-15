import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The horizontal measure. Every section uses this so nothing on the site is
 * ever misaligned by a few pixels from the thing above it.
 *
 * The gutter is a fluid token (`--spacing-gutter`), not a set of breakpoint
 * jumps — the edge margin grows continuously from 20px on a phone to 48px on a
 * desktop rather than snapping at each breakpoint.
 */
export function Container({
  children,
  className,
  as: Tag = "div",
  /** `text` clamps to ~70ch — the readable measure for long-form copy. */
  width = "wide",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  width?: "wide" | "text";
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-(--spacing-gutter)",
        width === "wide" ? "max-w-wide" : "max-w-text",
        className
      )}
    >
      {children}
    </Tag>
  );
}
