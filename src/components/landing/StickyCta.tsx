"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { heroCta } from "@/config/landing";
import { FORM_ID } from "@/components/landing/LandingBehaviour";
import { cn } from "@/lib/utils";

/**
 * Mobile-only CTA bar, pinned to the bottom of the screen.
 *
 * Appears once the hero has scrolled away and hides again while the form is on
 * screen, so it never sits on top of the thing it points to. Phones only: on
 * desktop the header CTA is always one flick away.
 */
export function StickyCta() {
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setPastHero(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const form = document.getElementById(FORM_ID);
    const io = form
      ? new IntersectionObserver(([e]) => setFormVisible(!!e?.isIntersecting), {
          threshold: 0.05,
        })
      : null;
    if (form && io) io.observe(form);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const show = pastHero && !formVisible;

  return (
    <div
      data-cta-location="sticky_mobile"
      aria-hidden={!show}
      className={cn(
        "duration-base fixed inset-x-0 bottom-0 z-40 border-t border-line bg-background/90 px-(--spacing-gutter) pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl transition-transform ease-out-quart sm:hidden",
        show ? "translate-y-0" : "pointer-events-none translate-y-full"
      )}
    >
      <Button
        href="/contact/"
        size="md"
        className="w-full"
        tabIndex={show ? 0 : -1}
      >
        {heroCta.label}
      </Button>
    </div>
  );
}
