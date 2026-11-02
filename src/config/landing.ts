import { trustedBy, type ClientLogo } from "@/config/home";

/**
 * PAID LANDING PAGE CONTENT (/lp/)
 *
 * The copy for the Google Ads / Meta Ads landing page, kept out of the
 * components so it can be edited without touching layout or animation code.
 *
 * Research, reasoning and the list of claims that still need John's sign-off
 * are in docs/landing-page/. Anything below marked CONFIRM is a statement about
 * how Sika works that has not been confirmed yet. Do not run paid traffic to
 * the page until each one is either confirmed or rewritten.
 *
 * ── Rules this copy follows ─────────────────────────────────────────────────
 *   · No invented proof. No numbers, testimonials or case studies that cannot
 *     be traced to a real client who has agreed to be named.
 *   · Plain words. A roofer reading this on a phone between jobs should never
 *     hit a word they would not use themselves.
 *   · One action. Every button on the page goes to the same form.
 */

/* ── Message match ──────────────────────────────────────────────────────────
   `?trade=roofing` on the ad's final URL swaps the trade name into the
   headings below the hero and pre-selects it in the form, so a roofing ad
   lands on a page that says roofing. Unknown or missing values fall back to
   the generic label. The hero itself is never changed by this.

   `label` reads inside a sentence ("more roofing enquiries"); `option` is the
   form value. Keep the keys lowercase and URL-safe. */
export const trades = {
  renovations: { label: "renovation", option: "Renovations" },
  roofing: { label: "roofing", option: "Roofing" },
  solar: { label: "solar", option: "Solar" },
  demolition: { label: "demolition", option: "Demolition" },
  joinery: { label: "joinery", option: "Joinery & cabinetry" },
  building: { label: "building", option: "Building & construction" },
  builders: { label: "building", option: "Building & construction" },
  bathrooms: { label: "bathroom", option: "Kitchens & bathrooms" },
  kitchens: { label: "kitchen", option: "Kitchens & bathrooms" },
  electrical: { label: "electrical", option: "Electrical" },
  plumbing: { label: "plumbing", option: "Plumbing" },
  hvac: { label: "air conditioning", option: "Air conditioning" },
  flooring: { label: "flooring", option: "Flooring & blinds" },
  blinds: { label: "blinds", option: "Flooring & blinds" },
  landscaping: { label: "landscaping", option: "Landscaping" },
} as const;

export type TradeKey = keyof typeof trades;

/** Used when no `?trade=` is set. Reads inside a sentence. */
export const defaultTradeLabel = "home services";

/** Form options, de-duplicated, in the order a home services owner scans. */
export const tradeOptions = [
  ...new Set(Object.values(trades).map((t) => t.option)),
  "Other home services",
];

/* ── Budget qualifier ───────────────────────────────────────────────────────
   Asked so the first call can be pitched at the right package, and so the
   GHL pipeline can sort leads before anyone picks up the phone. Bands are
   built around Tier 2 sitting at roughly $3–5k a month including ad spend. */
export const budgetOptions = [
  "Under $1,500 a month",
  "$1,500 – $3,000 a month",
  "$3,000 – $5,000 a month",
  "$5,000+ a month",
  "Not sure yet",
];

/* ── Hero CTA ───────────────────────────────────────────────────────────────
   The hero itself is the approved homepage hero, unchanged. This is the only
   thing added to it: one button and one line, under the service line. */
export const heroCta = {
  /* Names the deliverable, so the button reads as something you get rather
     than a sales call. The homepage keeps "Find my missing leads" until this
     has been tested on paid traffic. */
  label: "Get my lead audit",
  note: "For Australian home services businesses. Renovations, roofing, solar, building and the trades around them.",
};

/* ── Logos ──────────────────────────────────────────────────────────────────
   Home services clients only. The homepage band also shows finance, care and
   beauty clients; on a page selling to roofers and builders those dilute the
   one thing the band is there to say.

   CONFIRM: that each of these is a home services client. */
const homeServicesClients = [
  "King Electrical",
  "Weyn Constructions",
  "Wells Roofing",
  "5Star Bath & Kitchen",
  "Demo Bros",
  "Aust Construct",
  "A&A Flooring & Blinds",
  "Formline Joinery",
  "Top Spot Blinds",
  "Forefront Trades Co",
  "Kitchen & Bath Co",
  "Deslar Group",
  "Bathroom & Balconies",
  "Compare AirConditioning",
  "Pititto Projects",
  "Mr. Site Cleanups",
  "Blinds Corp",
  "Australasian Home",
  "Rock Up Group",
  "True Align",
  "Grindcorp",
  "Lumenx",
];

export const landingLogos: ClientLogo[] = trustedBy.logos.filter((l) =>
  homeServicesClients.includes(l.name)
);

/* ── 1. The problem (PAS) ───────────────────────────────────────────────────
   Three leaks, in the order a customer meets them: search, click, follow-up.
   Each one is something the owner has felt but not measured. */
export const problem = {
  eyebrow: "Where the work goes",
  /* `{trade}` is replaced with the trade label from the URL. */
  title: "The work is out there. It goes to whoever shows up first.",
  intro:
    "Most {trade} businesses aren't short of demand. They lose it in three places, and none of them show up on an invoice.",
  leaks: [
    {
      n: "01",
      title: "Customers can't find you",
      copy: "They search, check the map and call one of the first three businesses they see. If your Google Business Profile is thin or your site is slow on a phone, you aren't one of the three.",
    },
    {
      n: "02",
      title: "Ad spend goes on the wrong clicks",
      copy: "Broad keywords, no negatives and every click sent to the homepage. You pay for people after DIY tips, jobs you don't do and suburbs you don't service.",
    },
    {
      n: "03",
      title: "Enquiries come in and go cold",
      copy: "You're on the tools when the phone rings. By the time you call back at six, they've booked whoever answered. Most leads never get a second follow-up.",
    },
  ],
  close: "Each one is a quote you never got the chance to give.",
};

/* ── 2. What we fix ─────────────────────────────────────────────────────────
   Services written as the outcome first, the service name second. The owner
   is buying the outcome; the service name is there so they know what it is
   called when they compare quotes. */
export const fixes = {
  eyebrow: "What we fix",
  title: "One team for the whole path, from search to quote.",
  intro:
    "Ranking, ads, the website and the follow-up all affect each other. When one business runs all four, a lead can't fall through the gap between two suppliers.",
  items: [
    {
      n: "01",
      outcome: "Get found on Google",
      service: "Local SEO & Google Business Profile",
      copy: "Show up in the map results and local searches for the jobs and suburbs you actually want.",
      points: [
        "Google Business Profile set up properly",
        "Service and suburb pages",
        "A plan for getting more reviews",
        "Local listings cleaned up",
      ],
    },
    {
      n: "02",
      outcome: "Pay for the right clicks",
      service: "Google Ads & Meta Ads",
      copy: "Campaigns built around the jobs you want, with the searches you don't want blocked before they cost you.",
      points: [
        "Campaigns split by job type",
        "Negative keyword lists",
        "Call and form tracking",
        "Meta ads for bigger, planned projects",
      ],
    },
    {
      n: "03",
      outcome: "Turn visits into enquiries",
      service: "Websites & landing pages",
      copy: "Pages that say what you do, where you do it and how to get a quote, on the first screen of a phone.",
      points: [
        "A landing page per service",
        "Quote forms that work on mobile",
        "Tap-to-call",
        "Fast loading, tracking built in",
      ],
    },
    {
      n: "04",
      outcome: "Catch every lead",
      service: "GoHighLevel CRM & automation",
      copy: "Every enquiry lands in one place and gets a reply straight away, even when you're up a ladder.",
      points: [
        "Missed-call text back",
        "Instant reply to every enquiry",
        "Follow-up until they answer",
        "One pipeline from enquiry to quote",
      ],
    },
  ],
};

/* ── 3. Why Sika ────────────────────────────────────────────────────────────
   Differentiators, each one checkable. Nothing here is "passionate",
   "results-driven" or "award-winning". */
export const why = {
  eyebrow: "Why Sika",
  title: "Run by someone who has quoted the jobs.",
  items: [
    {
      title: "We know how trade businesses run",
      copy: "Our founder, John Sikalias, spent 12 years as a licensed electrician before starting the agency. Quoting, callouts, chasing invoices. We market for the work that pays, not the work that's easy to rank for.",
    },
    {
      title: "Home services is our focus",
      copy: "Renovations, roofing, solar, demolition, joinery, building and the trades around them. We aren't learning your industry on your budget.",
    },
    {
      title: "Everything is in your name",
      copy: "Ad accounts, Google Business Profile and tracking are set up under your business. Every number we report, you can check yourself.",
    },
    {
      title: "We report enquiries, not impressions",
      copy: "Qualified enquiries, cost per enquiry and which job types came in. A bad month gets reported in the same detail as a good one.",
    },
    {
      /* CONFIRM: packages and pricing are still being finalised. */
      title: "A set scope, in writing",
      copy: "You know what's being done each month and what it costs before anything starts. No hourly billing, no surprise invoices.",
    },
  ],
};

/* ── 4. Proof ───────────────────────────────────────────────────────────────
   Real, client-approved testimonials only. Empty means the block does not
   render at all: no placeholder, no "coming soon".

   To add one: the client's own words, unedited apart from length, their name,
   their business, and written permission to publish. */
export type Testimonial = {
  quote: string;
  name: string;
  business: string;
  trade?: string;
};

export const testimonials: Testimonial[] = [];

/* ── 5. Fit ─────────────────────────────────────────────────────────────────
   Saying who this is NOT for is the cheapest lead-quality filter there is. It
   costs a few enquiries from people who were never going to be clients. */
export const fit = {
  eyebrow: "Is this for you",
  title: "Who this works for.",
  good: [
    "You run a home services business in Australia",
    "A single extra job a month is worth real money to you",
    "You can take on more work, or want better work",
    "You're ready to invest in ads, SEO or both",
  ],
  bad: [
    "You want the cheapest clicks you can get",
    "You're booked out and can't take on more work",
    "You're after a logo or a few social posts",
    "Your business isn't in home services",
  ],
};

/* ── 6. FAQ ─────────────────────────────────────────────────────────────────
   The questions an owner asks on the first call, answered before they have
   to ask. Several of these state terms, so several need confirming. */
export const faqs: { q: string; a: string; confirm?: boolean }[] = [
  {
    q: "What do I get from the audit?",
    a: "We look at your website, Google Business Profile, ad accounts and how enquiries get followed up. Then we walk you through where leads are going missing and what we would fix first, in order. It's yours to keep whether or not you work with us.",
  },
  {
    q: "Do you work with my trade?",
    a: "If you're in home services, most likely yes. Renovations, roofing, solar, demolition, joinery, building, bathrooms, electrical and similar. We don't market for finance, healthcare or beauty businesses.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on what you need. We run set packages, from local SEO with basic follow-up automation through to a full website, SEO, ads and CRM setup. Ad spend is separate and paid straight to Google or Meta. You get a fixed price in writing before anything starts.",
    confirm: true,
  },
  {
    q: "How much should I spend on ads?",
    a: "It depends on your area, your trade and what a job is worth. Our ads management is built for businesses investing roughly $3,000 to $5,000 a month, including ad spend. If that's more than makes sense right now, local SEO and lead follow-up is usually the better place to start.",
    confirm: true,
  },
  {
    q: "How long until I see enquiries?",
    a: "Ads can start bringing enquiries in within weeks, once tracking is set up properly. SEO is slower: months, not weeks. We'll tell you what's realistic for your area and trade before you start, not after.",
  },
  {
    q: "Am I locked into a long contract?",
    a: "The minimum term is set out in writing before you sign, along with the reason for it. Ads and SEO both need a few months of data before they can be judged fairly, and we would rather say that upfront.",
    confirm: true,
  },
  {
    q: "Who actually does the work?",
    a: "Our team, working to a documented process for every service, managed from Melbourne. You'll always know who to contact and what's been done.",
    confirm: true,
  },
  {
    q: "Do I own my accounts?",
    a: "Yes. Ad accounts, Google Business Profile and tracking are set up in your business's name. If you ever leave, they stay with you.",
  },
];

/* ── 7. The enquiry section ─────────────────────────────────────────────── */
export const enquire = {
  eyebrow: "Start here",
  title: "Find out where your enquiries are going.",
  intro:
    "Tell us about your business. We'll check your website, Google listing, ads and follow-up before we call, so the first conversation is about what we found.",
  checks: [
    "Where you show up on Google, and where you don't",
    "Ad spend going on searches that won't become jobs",
    "Gaps in your website and quote form on a phone",
    "Enquiries being missed or followed up too slowly",
    "What we'd fix first, in order",
  ],
  steps: [
    {
      n: "01",
      t: "We look",
      c: "At your site, listing, ads and follow-up. Before we call, not during.",
    },
    {
      n: "02",
      t: "We show you",
      c: "A short call, in plain language, with the order we'd fix things in.",
    },
    {
      n: "03",
      t: "You decide",
      c: "What we found is yours to keep, whether or not you hire us.",
    },
  ],
  submit: "Get my lead audit",
  /* CONFIRM: the response time. */
  reassurance:
    "We usually reply within one business day. No newsletter, no sales sequence.",
  success: {
    title: "Got it.",
    copy: "We'll look at your website, Google listing and ads before we get in touch, so the first conversation is worth having. We usually reply within one business day.",
  },
};
