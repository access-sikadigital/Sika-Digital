"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { primaryNav, serviceGroups } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { Logomark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { useLenis } from "@/components/motion/SmoothScroll";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * FULL-SCREEN MOBILE MENU.
 *
 * Four things here are easy to get wrong and all of them are load-bearing.
 *
 * ── 1. Stopping the page behind it ──────────────────────────────────────────
 * `document.body.style.overflow = "hidden"` does NOT work on this site. Lenis
 * animates a transform rather than the native scroll position, so the page
 * happily keeps scrolling underneath the overlay. `lenis.stop()` is the lever.
 * The CSS lock stays as the fallback for reduced-motion users, where Lenis is
 * never created and `useLenis()` returns null.
 *
 * ── 2. Close must be faster than open ───────────────────────────────────────
 * The open timeline runs ~0.9s — scrim, then rows stagger, then the footer.
 * Reversed at 1× that is nearly a second of waiting after you have already
 * dismissed it, which reads as the menu being stuck. Reversed at 2.6× it is
 * ~350ms: still animated, no longer in the way.
 *
 * ── 3. Nothing may run until the panel is actually gone ─────────────────────
 * Releasing the scroll lock and collapsing the accordion on the same frame the
 * button is pressed makes the page reflow *underneath a menu still fully
 * painted*. Both are deferred to `onReverseComplete`.
 *
 * ── 4. Focus has to be trapped and returned ─────────────────────────────────
 * Without a trap, Tab walks straight out of the overlay into the page behind
 * it, which is invisible but still focusable. On close, focus returns to the
 * button that opened it — otherwise it falls back to <body> and a keyboard user
 * starts from the top of the document.
 */
export function MobileMenu({
  open,
  onClose,
  returnFocusTo,
}: {
  open: boolean;
  onClose: () => void;
  returnFocusTo: React.RefObject<HTMLButtonElement | null>;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const lenis = useLenis();

  /* ── The open/close timeline ─────────────────────────────────────────────── */
  useGSAP(
    () => {
      const el = panel.current;
      if (!el) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const timeline = gsap.timeline({ paused: true });

      if (reduced) {
        timeline.set(el, { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)" });
      } else {
        timeline
          .fromTo(
            el,
            { autoAlpha: 0, clipPath: "inset(0% 0% 100% 0%)" },
            {
              autoAlpha: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.6,
              ease: EASE.expo,
            }
          )
          /* Each row sits in a `line-mask` wrapper, so it rises out of nothing
             rather than fading in place — the same device as the headline
             reveals, which keeps the site feeling like one system. */
          .fromTo(
            el.querySelectorAll("[data-row] > *"),
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 0.7,
              stagger: 0.055,
              ease: EASE.expo,
            },
            0.12
          )
          .fromTo(
            el.querySelectorAll("[data-foot]"),
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.6, ease: EASE.expo },
            "-=0.35"
          );
      }

      tl.current = timeline;
      return () => {
        tl.current = null;
      };
    },
    { scope: panel }
  );

  /* ── Play / reverse, and everything that hangs off "actually gone" ───────── */
  useEffect(() => {
    const timeline = tl.current;
    if (!timeline) return;

    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden"; // reduced-motion path
      timeline.timeScale(1).play();
      return;
    }

    timeline
      .timeScale(2.6)
      .eventCallback("onReverseComplete", () => {
        lenis?.start();
        document.documentElement.style.overflow = "";
        setServicesOpen(false);
      })
      .reverse();
  }, [open, lenis]);

  /* Never leave the page scroll-locked if this unmounts mid-close. */
  useEffect(
    () => () => {
      document.documentElement.style.overflow = "";
    },
    []
  );

  /* ── Escape to close, and a focus trap ───────────────────────────────────── */
  useEffect(() => {
    if (!open) return;
    const el = panel.current;
    if (!el) return;

    const focusables = () =>
      Array.from(
        el.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((n) => n.offsetParent !== null);

    /* Move focus in, so a screen reader lands inside the menu rather than
       staying on the trigger behind it. */
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const nodes = focusables();
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;

      /* Wrap at both ends. */
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      /* Hand focus back to the trigger. */
      returnFocusTo.current?.focus();
    };
  }, [open, onClose, returnFocusTo]);

  return (
    <div
      ref={panel}
      id="mobile-menu"
      /* A modal overlay: everything behind it is unavailable while it is open. */
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open || undefined}
      /* z-[45]: deliberately BELOW the header's z-50, so the bar — and the X
         that closes this — stays clickable above the overlay. The pt-28 clears
         the 80px bar so no content hides behind it. */
      className="theme-dark invisible fixed inset-0 z-[45] flex flex-col overflow-y-auto bg-background px-(--spacing-gutter) pt-28 pb-12 opacity-0 lg:hidden"
      style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      /* Lenis must not try to smooth-scroll this panel's own overflow. */
      data-lenis-prevent
    >
      <nav className="flex flex-col gap-2">
        {primaryNav.map((item) =>
          item.mega ? (
            <div key={item.label}>
              <div className="flex items-center justify-between gap-4">
                <span data-row className="line-mask">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex min-h-14 items-center font-display text-h2 uppercase text-foreground transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </span>

                <button
                  type="button"
                  onClick={() => setServicesOpen((v) => !v)}
                  aria-expanded={servicesOpen}
                  aria-controls="m-services"
                  aria-label={`${servicesOpen ? "Collapse" : "Expand"} services`}
                  className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-foreground transition-colors duration-base hover:border-accent hover:text-accent"
                >
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden
                    className={cn(
                      "size-4 transition-transform duration-base ease-out-quart",
                      servicesOpen && "rotate-180"
                    )}
                  >
                    <path
                      d="M2.5 4.5 6 8l3.5-3.5"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <ServicesAccordion open={servicesOpen} onNavigate={onClose} />
            </div>
          ) : (
            <span key={item.label} data-row className="line-mask">
              <Link
                href={item.href}
                onClick={onClose}
                className="flex min-h-14 items-center font-display text-h2 uppercase text-foreground transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            </span>
          )
        )}
      </nav>

      <div data-foot className="mt-auto pt-12">
        <Logomark className="size-6" decorative />
        <Button
          href={siteConfig.offer.primary.href}
          size="lg"
          arrow
          onClick={onClose}
          className="mt-6 w-full"
        >
          {siteConfig.offer.primary.label}
        </Button>

        {siteConfig.phone ? (
          <a
            href={siteConfig.phoneHref}
            className="mt-6 flex min-h-11 items-center font-display text-h3 text-foreground"
          >
            {siteConfig.phone}
          </a>
        ) : null}
      </div>
    </div>
  );
}

/**
 * The services accordion.
 *
 * Height is animated to `auto` with GSAP rather than guessed with a CSS
 * `max-height`. A max-height guess is either too small (content clips) or too
 * large (the easing curve is wrong, because most of the duration is spent
 * animating empty space). GSAP measures the real height each time.
 */
function ServicesAccordion({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = panel.current;
      if (!el) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.to(el, {
        height: open ? "auto" : 0,
        autoAlpha: open ? 1 : 0,
        duration: reduced ? 0 : 0.45,
        ease: EASE.expo,
      });
    },
    { dependencies: [open] }
  );

  return (
    /* Starts closed in the markup itself, so there is no open-then-collapse
       flash between hydration and GSAP taking over. */
    <div
      id="m-services"
      ref={panel}
      style={{ height: 0, opacity: 0, overflow: "hidden" }}
    >
      <div className="mt-3 space-y-6 border-l border-line pl-5">
        {serviceGroups.map((g) => (
          <div key={g.href}>
            <Link
              href={g.href}
              onClick={onNavigate}
              className="eyebrow flex min-h-11 items-center text-faint transition-colors hover:text-accent"
            >
              {g.label}
            </Link>
            <ul className="-my-2">
              {g.children.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    onClick={onNavigate}
                    /* Padding on the anchor, not margin on the <li>: inline
                       links with margin leave the gap between them dead, so a
                       tap that lands there hits nothing. */
                    className="block py-2.5 text-body text-muted transition-colors hover:text-accent"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
