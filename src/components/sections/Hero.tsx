"use client";

import { siteConfig } from "@/config/site";
import { Logomark } from "@/components/brand/Logo";
import { HeroVideo } from "@/components/media/HeroVideo";
import { Reveal } from "@/components/motion/Reveal";
import { KineticWordmark } from "@/components/motion/KineticWordmark";

/**
 * HOMEPAGE HERO.
 *
 * Structure follows the reference the client chose: full-bleed looping video,
 * centred display wordmark, a mono caps credential block underneath, and a
 * floating offer card anchored bottom right.
 *
 * ── Why the video needs a real scrim and not just low opacity ───────────────
 * Abstract footage changes brightness as it loops. Text that passes contrast
 * against frame 1 can fail badly against frame 300, and there is no way to
 * test every frame. The fix is a fixed gradient scrim that guarantees a floor
 * of darkness behind the text regardless of what the video is doing. Two
 * layers: a vertical gradient for the centre column, and a flat wash for
 * mobile where the copy runs edge to edge.
 *
 * ── The wordmark is set as text, not as the logo SVG ────────────────────────
 * Deliberate. At display size this is the page's H1 and has to be a real
 * heading for search and for screen readers. The logo lockup already appears
 * in the header; repeating it here as an image would give the page no H1 at
 * all, which on the site of an agency that sells SEO would be a bad look.
 */
export function Hero({
  /** Optional video. Until footage is chosen the hero renders on the poster
      alone, which is a complete and correct state, not a broken one. */
  video,
  poster = "/media/hero-poster.jpg",
}: {
  video?: string;
  poster?: string;
}) {
  return (
    <section className="grain relative flex min-h-dvh flex-col justify-center overflow-hidden">
      {/* Media */}
      {video ? (
        /* Was 55 percent, which buried the footage. The wordmark is enormous
           Archivo Black in white and holds its contrast against almost
           anything, so the media can carry far more of the frame than body
           copy would allow. */
        <HeroVideo src={video} poster={poster} opacity="opacity-80" />
      ) : (
        <div
          aria-hidden
          className="glow-accent absolute inset-0"
        />
      )}

      {/*
        Scrim, lightened so the footage actually reads.

        Two layers doing different jobs:

        1. A VERTICAL gradient, dark at the top so the header stays legible and
           dark at the bottom so the section resolves rather than being cut off
           mid-frame. The middle is close to clear, which is where most of the
           picture lives.

        2. A soft RADIAL pool behind the centre, because the mono credential
           block under the wordmark is small text and needs far more protection
           than the display type does. Darkening it locally is better than
           darkening the whole frame to protect two short lines.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgb(11 11 11 / 0.72) 0%, rgb(11 11 11 / 0.12) 32%, rgb(11 11 11 / 0.18) 62%, rgb(11 11 11 / 0.8) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 38% at 50% 58%, rgb(11 11 11 / 0.55) 0%, transparent 75%)",
        }}
      />
      {/* Mobile keeps a flat wash on top: the copy runs edge to edge at that
          width, so it crosses far more of the picture. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[rgb(11_11_11/0.28)] sm:hidden"
      />

      {/*
        The cursor-tracked glow that sat here has been removed at the client's
        request. `PointerSpotlight` is still in the motion library and can be
        dropped into any `relative` container if it is wanted elsewhere.
      */}

      {/* Centre column */}
      <div className="relative z-10 flex flex-col items-center px-(--spacing-gutter) text-center">
        {/*
          Real text, real <h1>. The two words converge from opposite edges,
          then the letters scatter away from the cursor.

          ── On the size ──────────────────────────────────────────────────
          This does NOT use the `text-display` token. That token is the top of
          the shared type scale and caps at 11rem, which leaves the wordmark
          sitting at roughly three quarters of the viewport with dead air down
          both sides.

          A hero wordmark is a different job from a headline: it should run to
          the edges. The value below is tuned to the twelve characters of
          "SIKA DIGITAL" in Archivo Black, where the average advance is close
          to 0.62em, so 12.4vw lands it at about 92 percent of the viewport.
          Change the company name and this needs retuning.

          Tracking is pulled tighter than the scale default because letterspacing
          that reads as confident at 4rem reads as loose at 15rem.
        */}
        {/*
          ── On the size ──────────────────────────────────────────────────
          One line, deliberately not filling the full viewport. Archivo Black
          caps average close to 0.62em of advance, so twelve characters at
          -0.035em tracking is about 7.1em. At 10.5vw that puts the wordmark
          plus the asterisk at roughly 78 percent of the viewport, which leaves
          air down both sides rather than running to the edges.

          Change the company name and this needs retuning by eye.
        */}
        <KineticWordmark
          words={["Sika", "Digital"]}
          className="font-display text-[clamp(2.25rem,10.5vw,13rem)] leading-[0.9] tracking-[-0.035em] uppercase text-foreground"
        />

        {/* Credential block. Mono caps against the display type is the contrast
            that makes big type read as considered rather than loud. Lines are
            rendered only when the underlying fact exists, so an unset founding
            year leaves no empty row. */}
        <Reveal delay={0.25} className="mt-7">
          {/* Was text-muted. Small mono over moving footage needs the full
              foreground weight: a grey that passes contrast on one frame will
              fail on another. */}
          <div className="flex flex-col items-center gap-1.5 font-mono text-eyebrow uppercase tracking-[0.2em] text-foreground/85">
            <p>{siteConfig.descriptor}</p>
            {siteConfig.established ? <p>Est. {siteConfig.established}</p> : null}
            <p>
              {siteConfig.address.suburb}, Australia
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.35} className="mt-10">
          <Logomark className="size-7" color="lime" decorative />
        </Reveal>
      </div>

      {/*
        The floating offer card that used to sit bottom right has been removed.

        The hero is now a single centred statement with nothing competing for
        attention, which is how the reference actually reads. The primary CTA
        still lives in the header, fixed and visible on every scroll position,
        so the conversion path is not lost by taking the card out.
      */}
    </section>
  );
}
