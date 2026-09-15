"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { primaryNav } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { ServicesMega } from "@/components/layout/ServicesMega";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useMagnetic } from "@/lib/useMagnetic";
import { cn } from "@/lib/utils";

/* How long the cursor must rest on the trigger before the mega-menu opens.
   Short enough to feel instant, long enough that a cursor crossing the nav on
   its way somewhere else never fires it. */
const OPEN_DELAY = 90;
/* Longer on the way out, so the diagonal journey from the trigger down to a
   far-right item in the panel is forgiving. This gap is where naive hover
   menus flicker and close on you. */
const CLOSE_DELAY = 220;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const megaTriggerId = useId();

  const ctaRef = useMagnetic<HTMLDivElement>({ strength: 0.25, padding: 18 });

  /* ── Hover intent ────────────────────────────────────────────────────────── */
  const openMega = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    openTimer.current = window.setTimeout(() => setMegaOpen(true), OPEN_DELAY);
  }, []);

  const closeMega = useCallback(() => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(
      () => setMegaOpen(false),
      CLOSE_DELAY
    );
  }, []);

  useEffect(
    () => () => {
      if (openTimer.current) window.clearTimeout(openTimer.current);
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    },
    []
  );

  /* Close both menus on navigation. Without this the mega-menu stays open over
     the new page, because nothing about a client-side route change unmounts it. */
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  /* ── Scroll behaviour: chrome, auto-hide, progress ───────────────────────── */
  useGSAP(
    () => {
      const el = headerRef.current;
      if (!el) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      /*
        AUTO-HIDE. The bar slides away on scroll down and returns on scroll up.
        It buys back 80px of vertical space on a phone — meaningful on a long
        service page — while keeping the CTA one upward flick away.

        `quickTo` rather than `gsap.to`: this is driven by a scroll handler that
        fires far more often than the screen refreshes, and building a new tween
        per event churns garbage. One reusable tween, retargeted.
      */
      const yTo = gsap.quickTo(el, "yPercent", {
        duration: 0.45,
        ease: "power3.out",
      });

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          setScrolled(y > 32);

          if (reduced) return;

          /*
            Do NOT hide while a menu is open — sliding the bar out from under an
            open mega-menu detaches the panel from its trigger and looks broken.
            Also never hide in the first 200px: at the top of the page the header
            is part of the hero composition.
          */
          const menuOpen = megaOpen || mobileOpen;
          if (menuOpen || y < 200) {
            yTo(0);
            return;
          }

          yTo(self.direction === 1 ? -100 : 0);
        },
      });

      /*
        SCROLL PROGRESS. A 2px lime rule along the bottom edge.

        `scaleX` on a pre-rendered full-width element, not an animated `width` —
        transform is composited, width forces layout on every frame. This is the
        single most common way a "cheap" progress bar ends up costing more than
        every other animation on the page combined.
      */
      const bar = progressRef.current;
      if (bar && !reduced) {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: {
              start: 0,
              end: "max",
              scrub: 0.25,
            },
          }
        );
      }
    },
    { dependencies: [megaOpen, mobileOpen] }
  );

  const onDark = !scrolled && !mobileOpen;

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-base ease-out-quart",
          /* When the mega-menu is open the bar goes SOLID and matches the
             panel's surface, so the two read as one sheet. Leaving it
             translucent made the bar and the panel look like two separate
             layers with a seam between them. */
          megaOpen
            ? "border-b border-line bg-surface"
            : scrolled
              ? "border-b border-line bg-background/85 backdrop-blur-xl"
              : "border-b border-transparent"
        )}
      >
        {/* z-20 keeps the bar above the mega-menu's full-viewport scrim (z-0)
            and the panel itself (z-10), so the logo and the trigger stay
            visible and clickable while the menu is open. */}
        <div className="relative z-20 mx-auto flex h-20 w-full max-w-wide items-center justify-between gap-6 px-(--spacing-gutter)">
          {/* Logo. `blend-invert` (mix-blend-mode: difference) makes the mark
              flip itself over whatever is behind it — one CSS declaration
              instead of a scroll observer watching section backgrounds. Only
              while transparent: over the blurred panel it would invert against
              the panel instead of the page. */}
          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className="shrink-0"
          >
            <Logo
              className={cn(
                "h-5 transition-opacity duration-base",
                onDark && "blend-invert"
              )}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              if (item.mega) {
                return (
                  <div
                    key={item.label}
                    onMouseEnter={openMega}
                    onMouseLeave={closeMega}
                  >
                    <Link
                      href={item.href}
                      id={megaTriggerId}
                      aria-expanded={megaOpen}
                      aria-controls="services-mega"
                      /* Keyboard users get the panel on focus — without this
                         the menu is mouse-only, which fails 2.1.1. */
                      onFocus={openMega}
                      className={cn(
                        "flex items-center gap-1.5 rounded-button px-4 py-2.5 text-small font-medium transition-colors duration-base",
                        megaOpen || isActive
                          ? "text-accent"
                          : "text-muted hover:text-foreground"
                      )}
                    >
                      {item.label}
                      <svg
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden
                        className={cn(
                          "size-3 transition-transform duration-base",
                          megaOpen && "rotate-180"
                        )}
                      >
                        <path
                          d="M2.5 4.5 6 8l3.5-3.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group relative rounded-button px-4 py-2.5 text-small font-medium transition-colors duration-base",
                    isActive ? "text-accent" : "text-muted hover:text-foreground"
                  )}
                >
                  {item.label}
                  {/* Underline that wipes in from the left on hover, and stays
                      put on the current page. Uses scaleX so it composites. */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-4 bottom-1.5 h-px origin-left bg-accent transition-transform duration-base ease-out-quart",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Magnetic wrapper. The element that moves is the div, so the
                button keeps its own hover and focus styles untouched. */}
            <div ref={ctaRef} className="hidden sm:block">
              <Button href={siteConfig.offer.primary.href} variant="accent" arrow>
                {siteConfig.offer.primary.label}
              </Button>
            </div>

            {/* Burger → X. Two bars that rotate and converge; the middle bar
                most implementations use is unnecessary and makes the morph
                harder to time. */}
            <button
              ref={burgerRef}
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className={cn(
                "-mr-2 flex size-11 flex-col items-center justify-center gap-1.5 lg:hidden",
                onDark ? "text-white" : "text-foreground"
              )}
            >
              <span
                className={cn(
                  "h-0.5 w-6 origin-center bg-current transition-transform duration-base ease-out-quart",
                  mobileOpen && "translate-y-[4px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-6 origin-center bg-current transition-transform duration-base ease-out-quart",
                  mobileOpen && "-translate-y-[4px] -rotate-45"
                )}
              />
            </button>
          </div>
        </div>

        {/* Scroll progress. Pre-rendered full width, scaled — see the note
            in the GSAP block above. */}
        <span
          ref={progressRef}
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent"
        />

        <ServicesMega
          open={megaOpen}
          onOpen={openMega}
          onClose={() => setMegaOpen(false)}
          triggerId={megaTriggerId}
        />
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        returnFocusTo={burgerRef}
      />
    </>
  );
}
