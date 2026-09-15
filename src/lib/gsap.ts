"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

/**
 * Single GSAP registration point.
 *
 * Plugins must be registered exactly once. Registering inside components means
 * doing it on every mount, and tree-shaking can drop a plugin that is only
 * referenced by string. Importing from here guarantees one registration and one
 * set of defaults across the whole site.
 *
 * `SplitText` is included with GSAP from 3.13 onward — it used to be a paid
 * Club plugin, which is why older tutorials tell you to buy it. It does not
 * need a licence any more.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

  /**
   * Project-wide animation defaults, so a tween that forgets to specify an ease
   * still looks like the rest of the site.
   */
  gsap.defaults({
    ease: "expo.out",
    duration: 1,
  });

  /**
   * `ignoreMobileResize` stops mobile browsers re-running every ScrollTrigger
   * calculation when the address bar hides on scroll. Without it, a page with
   * scrubbed animations visibly jumps the first time a user scrolls on iOS.
   */
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/**
 * Named easings, matching the CSS custom properties in globals.css.
 *
 * GSAP and CSS express easing differently, so they have to be defined twice —
 * these are the same curves, so a hover transition and a scroll reveal on the
 * same element feel like one system rather than two.
 */
export const EASE = {
  /** --ease-out-quart. Quick settle; good for UI. */
  quart: "power4.out",
  /** --ease-out-expo. Long, luxurious settle; good for large type and panels. */
  expo: "expo.out",
  /** --ease-in-out-quart. Symmetrical; good for things that leave and return. */
  inOut: "power4.inOut",
} as const;

/** Durations, in seconds, matching the CSS duration tokens. */
export const DURATION = {
  fast: 0.18,
  base: 0.32,
  slow: 0.62,
  slower: 1.0,
} as const;

export { gsap, ScrollTrigger, SplitText, useGSAP };
