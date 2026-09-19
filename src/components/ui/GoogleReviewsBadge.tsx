import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * GOOGLE REVIEWS BADGE — the small pill above the homepage H1.
 *
 * Google "G", a single star, and the review line. One star rather than a row
 * of five: the label already says five-star, and one mark reads as a badge
 * where five reads as a rating widget.
 *
 * Reads from `siteConfig.googleReviews`. With no count set it drops the number
 * rather than inventing one; with a `url` set it becomes a link to the profile.
 */
export function GoogleReviewsBadge({ className }: { className?: string }) {
  const { count, url } = siteConfig.googleReviews;
  const label = count ? `${count} 5-Star Google Reviews` : "5-Star Google Reviews";

  const body = (
    <>
      {/* Glint. Clipped by the pill's overflow-hidden; see `.badge-sheen`. */}
      <span
        aria-hidden
        className="badge-sheen pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
      <GoogleG className="relative size-4 shrink-0" />
      <Star className="badge-star relative size-3.5 shrink-0 text-[#FBBC04] drop-shadow-[0_0_6px_rgb(251_188_4/0.6)]" />
      <span className="relative text-small text-foreground/85">
        {count ? (
          <strong className="font-semibold text-foreground">{count} </strong>
        ) : null}
        5-Star Google Reviews
      </span>
    </>
  );

  const classes = cn(
    "relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-line-strong bg-white/[0.06] px-4 py-2 backdrop-blur-md",
    url &&
      "transition-colors duration-(--duration-base) hover:border-foreground/50 hover:bg-white/10",
    className
  );

  return url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens Google)`}
      className={classes}
    >
      {body}
    </a>
  ) : (
    <p className={classes}>{body}</p>
  );
}

/* The four-colour Google "G". Brand colours are fixed, not themed. */
function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <path
        fill="#FFC107"
        d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"
      />
    </svg>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden fill="currentColor" className={className}>
      <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.8z" />
    </svg>
  );
}
