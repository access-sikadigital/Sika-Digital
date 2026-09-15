import { cn } from "@/lib/utils";

/**
 * IMAGE PLACEHOLDER.
 *
 * Stands in for a photograph or screenshot that does not exist yet.
 *
 * ── Why this is drawn rather than a file ────────────────────────────────────
 * A grey box with a broken-image icon makes a site look unfinished, and worse,
 * it makes everyone wait for assets before anything can ship. A designed panel
 * is a state a page can live in: it can go to a client, be reviewed, and be
 * signed off while the photography is still being organised.
 *
 * Drawn in CSS and SVG, so there is nothing to download, nothing to remember to
 * delete, and no 404 if a path is mistyped.
 *
 * ── How to replace one ──────────────────────────────────────────────────────
 * Swap `<Placeholder ratio="16/10" label="..." />` for a `next/image` with the
 * same wrapper classes. The component owns no layout of its own beyond the
 * aspect ratio, so nothing around it moves.
 *
 * ── The label is for the person supplying the photo ─────────────────────────
 * It describes the shot that belongs there, not the section it sits in. "Site
 * on a phone, held in one hand" is a brief; "Web design image" is not. These
 * ship to a live page though, so keep them short and inoffensive: a visitor
 * seeing one should read it as a caption, not as a note left behind.
 */
export function Placeholder({
  ratio = "16/10",
  label,
  index,
  className,
}: {
  /** Tailwind aspect-ratio value, e.g. "16/10", "4/5", "1/1". */
  ratio?: string;
  /** The shot that belongs here. Written as a brief. */
  label?: string;
  /** Optional two-digit marker, for sets. */
  index?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex overflow-hidden rounded-card border border-line bg-surface",
        className
      )}
      style={{ aspectRatio: ratio }}
    >
      {/* Hatch. The same device the industry frames used before they had
          photos, so a page part-way through being filled in still looks like
          one system rather than two. */}
      <span
        aria-hidden
        className="absolute inset-0 block opacity-[0.14]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(34deg, var(--color-lime) 0px, var(--color-lime) 1px, transparent 1px, transparent 16px)",
        }}
      />

      {/* Crop marks. Four corners, lime, thin. They say "a picture goes here"
          faster than any wording can, and they read as a printer's guide
          rather than as an error state. */}
      {[
        "left-4 top-4 border-l border-t",
        "right-4 top-4 border-r border-t",
        "left-4 bottom-4 border-b border-l",
        "right-4 bottom-4 border-b border-r",
      ].map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={cn("absolute size-5 border-accent/70", pos)}
        />
      ))}

      <span className="relative flex w-full flex-col justify-between p-6">
        <span className="font-mono text-eyebrow tabular-nums text-faint">
          {index ?? ""}
        </span>

        {label ? (
          <span className="max-w-xs font-mono text-eyebrow uppercase leading-relaxed tracking-wider text-muted">
            {label}
          </span>
        ) : null}
      </span>
    </div>
  );
}
