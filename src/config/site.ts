/**
 * SITE CONSTANTS
 *
 * Anything that appears in more than one place lives here. The rule is that a
 * phone number, an address or a legal name should exist exactly once in the
 * codebase — a site that shows two different phone numbers because one was
 * updated and the other missed is a lead-generation bug, not a typo.
 *
 * ⚠️  PLACEHOLDERS BELOW ARE MARKED `TODO`. They are deliberately obvious
 *     rather than plausible: a wrong-but-believable phone number can ship
 *     unnoticed, whereas "TODO" cannot.
 */

export const siteConfig = {
  name: "Sika Digital",
  legalName: "Sika Digital Pty Ltd", // TODO — confirm registered entity
  abn: "", // TODO — confirm ABN

  /**
   * One line. Used in metadata fallbacks and the footer.
   *
   * Plain statement of what Sika does and who for. No "systems-led growth
   * partner" and no "solutions". If a sentence could sit on any agency site in
   * Melbourne, it is not doing any work.
   */
  tagline:
    "Web and SEO first, paid and AI to make it move faster. Built for Australian service and trade businesses.",

  /**
   * The positioning one-liner — Open Question #1 in the scope workbook.
   *
   * Deliberately EMPTY rather than guessed. The scope calls this the sentence
   * that "sets the tone of every page", and it is John's to write. A component
   * reading this should render nothing rather than invent a line, so the gap
   * stays visible instead of quietly filling itself with agency boilerplate.
   */
  positioningLine: "", // TODO — Open Question #1

  /**
   * The mono caps line under the hero wordmark. Short, factual, no adjectives.
   * This is the one place the business is categorised, so it needs to be right
   * before launch. Currently written broad because the positioning is still
   * open: "digital marketing agency" would be too narrow if IT and digital
   * services are core.
   */
  descriptor: "Digital & IT Services", // TODO: confirm

  /** Founding year. Renders only when set, so an unknown year leaves no gap. */
  established: "", // TODO

  /**
   * The canonical origin. Guaranteed to be a valid absolute URL.
   *
   * ── `||`, not `??` ────────────────────────────────────────────────────────
   * This was `??`, which only falls through on null or undefined. An
   * environment variable that exists but is set to an empty string is a string,
   * so `??` kept it, and `new URL("")` in app/layout threw at build time with
   * `ERR_INVALID_URL`. That is the normal state of an env var added in a
   * dashboard and left blank, so it has to be handled rather than assumed away.
   *
   * ── Why VERCEL_URL is gated on the preview environment ────────────────────
   * `VERCEL_URL` is set on every deployment including production, where it is
   * the deployment-specific `*.vercel.app` host rather than the custom domain.
   * Used unconditionally it would point production canonicals and Open Graph
   * URLs at an address nobody should be indexing. On previews it is exactly
   * what is wanted, so it is used there and only there.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "") ||
    "https://sikadigital.com",
  locale: "en_AU",

  /* ── Contact ─────────────────────────────────────────────────────────────── */
  phone: "", // TODO
  phoneHref: "", // TODO — tel: form, digits only
  email: "hello@sikadigital.com", // TODO — confirm
  address: {
    street: "", // TODO
    suburb: "Melbourne",
    state: "VIC",
    postcode: "", // TODO
    country: "AU",
  },

  /* ── Founder ─────────────────────────────────────────────────────────────── */
  /**
   * The trade background is finding #2 in the scope and the differentiator the
   * whole trades wedge rests on. It is a factual claim about a real person, so
   * it is stated once, here, in the form it can be defended in.
   */
  founder: {
    name: "John Sikalias",
    role: "Founder",
    credential: "12 years as a licensed electrician before founding the agency",
  },

  /* ── Social ──────────────────────────────────────────────────────────────── */
  social: {
    linkedin: "", // TODO
    instagram: "", // TODO
    facebook: "", // TODO
  },

  /**
   * Google reviews badge, shown above the homepage H1.
   *
   * `count` is empty rather than guessed: a review count is a public claim and
   * has to match the Google Business Profile. Until it is set the badge reads
   * "5-Star Google Reviews" with no number. `url` links the badge to the
   * profile's reviews when set.
   */
  googleReviews: {
    count: "", // TODO — e.g. "53+", from the Google Business Profile
    url: "", // TODO — Google Business Profile reviews link
  },

  /**
   * Primary first-step offer — Open Question #2.
   *
   * The scope recommends the free growth/"leak" audit with a 15-minute call as
   * the fallback. Encoded here so every CTA on the site reads from one place
   * and the offer can be changed in a single edit rather than across 47 pages.
   */
  offer: {
    primary: {
      /*
        First person, not imperative. "Find my..." mirrors the visitor's own
        internal voice, which reads better than "Get your...". The button
        finishes their thought instead of issuing an instruction.

        ⚠️  DO NOT go back to "Show me what's leaking". It came from the scope
        doc, where the offer is described as a leak report, and it works inside
        a sentence that explains it. On a button by itself it reads literally,
        which is a problem when a large slice of the target market are plumbers
        and roofers. A CTA has to survive being read with zero context.

        Deliberately does not say "free". That word lifts clicks and fills the
        pipeline with browsers, and the scope names lead quality as the thing
        to protect.
      */
      label: "Find my missing leads",
      href: "/contact/",
      /* Shown under the button. Says what actually happens next, which
         converts better than a bare "submit". */
      note: "We check your website, Google Business Profile and ad accounts, then show you where the enquiries are going missing.",
    },
    fallback: {
      label: "Book a 15-minute call",
      href: "/contact/",
    },
  },

  /* ── Service areas ───────────────────────────────────────────────────────── */
  homeCity: "Melbourne",
  cities: ["Melbourne", "Sydney", "Brisbane", "Adelaide", "Perth"] as const,
} as const;

export type SiteConfig = typeof siteConfig;
