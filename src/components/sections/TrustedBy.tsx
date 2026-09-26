import Image from "next/image";
import { trustedBy, type ClientLogo } from "@/config/home";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/* Every logo gets the same visual AREA rather than the same height. Equal
   heights make a wide wordmark enormous and a square badge tiny; equal area
   gives each the same weight. Square px at desktop, scaled down on phones via
   --logo-scale. The height cap keeps a square badge from towering. */
const LOGO_AREA = 4400;
const MAX_HEIGHT = 58;

/**
 * Exported because the results page shows the same set as a grid, and two
 * sizing rules for the same logos would drift until one of them looked wrong.
 *
 * `scale` is the per-logo optical correction from config. Equal area gets most
 * of the way; a dense wordmark still reads heavier than a hairline one at the
 * same area, and that difference is set by eye rather than by formula.
 */
export function logoWidth(width: number, height: number, scale = 1) {
  const ratio = width / height;
  const h = Math.min(Math.sqrt(LOGO_AREA / ratio), MAX_HEIGHT);
  return Math.round(h * ratio * scale);
}

/**
 * One client logo: white at rest, real colours on a white tile on hover.
 *
 * Shared by the homepage band and the results grid, so a client looks the same
 * in both places and the hover behaves identically.
 *
 * ── Two images, stacked ─────────────────────────────────────────────────────
 * Both files occupy the same grid cell, and hover crossfades between them. The
 * pair was exported onto an identical canvas, so the swap is pixel-aligned and
 * nothing shifts. The hover file is `aria-hidden`: it is the same logo again,
 * and a screen reader should hear the name once.
 *
 * ── The tile is glass, not white ────────────────────────────────────────────
 * A solid white tile was tried and it was a flat bright block punched into a
 * dark page, thirty times over. Frosted glass keeps the band in the page's own
 * colour: a faint top-lit gradient, a hairline edge, an inner highlight along
 * the top, and a blur of whatever is behind it.
 *
 * `backdrop-blur` is applied only on hover. The tile sits at opacity 0 the rest
 * of the time, but a backdrop filter is still computed at opacity 0, and thirty
 * of them moving in a marquee would cost every frame for nothing visible.
 *
 * Because the tile is dark, the hover files are the logos' DARK-BACKGROUND
 * versions. See `trustedBy` in config/home.ts for how those were chosen.
 *
 * Padding on the wrapper rather than on the tile, so the tile has room around
 * the mark and the band's spacing does not change on hover.
 *
 * Needs a `group/logo` ancestor. The band and the grid each supply one.
 */
export function ClientMark({
  logo,
  width,
}: {
  logo: ClientLogo;
  /** CSS width. A number, or a calc() string for the band's phone scaling. */
  width: number | string;
}) {
  const svg = logo.src.endsWith(".svg");

  return (
    <span className="relative flex items-center justify-center px-6 py-4">
      <span
        aria-hidden
        className="absolute inset-0 rounded-card border border-white/15 bg-linear-to-b from-white/[0.14] to-white/[0.04] opacity-0 shadow-[inset_0_1px_0_rgb(255_255_255/0.2),0_10px_30px_-12px_rgb(0_0_0/0.7)] transition-opacity duration-(--duration-base) ease-out-quart group-hover/logo:opacity-100 group-hover/logo:backdrop-blur-md"
      />
      <span className="relative grid">
        <Image
          src={logo.white}
          alt={logo.name}
          width={logo.width}
          height={logo.height}
          unoptimized={svg}
          style={{ width }}
          className="col-start-1 row-start-1 h-auto max-w-none opacity-90 transition-opacity duration-(--duration-base) ease-out-quart group-hover/logo:opacity-0"
        />
        <Image
          src={logo.src}
          alt=""
          aria-hidden
          width={logo.width}
          height={logo.height}
          unoptimized={svg}
          style={{ width }}
          className="col-start-1 row-start-1 h-auto max-w-none opacity-0 transition-opacity duration-(--duration-base) ease-out-quart group-hover/logo:opacity-100"
        />
      </span>
    </span>
  );
}

/**
 * TRUSTED BY — client logo band under the hero.
 *
 * Every logo sits in the band as its own white version, so thirty different
 * brands read as one calm row. Hovering one brings up a glass tile and the
 * client's real colours. The band slows to a stop under the cursor
 * (`pauseOnHover`) so a logo can actually be hovered rather than chased.
 *
 * Why each client has two files rather than one file and a filter is written
 * at `trustedBy` in config/home.ts.
 *
 * ── Speed ───────────────────────────────────────────────────────────────────
 * 57 seconds per cycle, about 115px a second at desktop. Set from the band's
 * length, not picked: 40s read as busy, 60s as stalled, 48s was then asked to
 * be 20% slower. The loop time is per full cycle, so it scales with how many
 * logos there are. If logos are added or removed, recompute from px/s rather
 * than leaving this number alone, or the band quietly speeds up or slows down.

 * ── Empty until real logos exist ────────────────────────────────────────────
 * With no logos the section renders nothing in production and labelled empty
 * slots in development.
 */
export function TrustedBy() {
  const { count, logos } = trustedBy;
  const preview = logos.length === 0;

  if (preview && process.env.NODE_ENV === "production") return null;

  return (
    <section aria-label="Clients" className="relative overflow-hidden border-b border-line py-12 sm:py-16">
      {/* Picks up the blue glow from the bottom of the hero and lets it fade
          out through this band. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 90% at 50% 0%, color-mix(in oklab, var(--color-blue) 38%, transparent) 0%, transparent 75%)",
        }}
      />
      <Reveal className="relative">
        <p className="eyebrow text-center text-faint">
          Trusted by{" "}
          {count ? <span className="text-foreground">{count} </span> : null}
          service businesses
        </p>
      </Reveal>

      {/* Edge fade, so logos drift in and out of nothing rather than being
          cut off by the viewport. */}
      <div className="relative mt-10 [--logo-scale:0.75] sm:[--logo-scale:1] [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <Marquee speed={57} gap="clamp(1.5rem, 4vw, 4rem)" pauseOnHover>
          {preview
            ? Array.from({ length: 6 }, (_, i) => (
                <span
                  key={i}
                  className="eyebrow flex h-12 w-44 items-center justify-center rounded-button border border-dashed border-line-strong text-faint"
                >
                  Client logo
                </span>
              ))
            : logos.map((logo) => (
                <span key={logo.name} className="group/logo flex shrink-0">
                  <ClientMark
                    logo={logo}
                    width={`calc(${logoWidth(logo.width, logo.height, logo.scale)}px * var(--logo-scale))`}
                  />
                </span>
              ))}
        </Marquee>
      </div>
    </section>
  );
}
