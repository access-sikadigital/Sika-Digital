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
  /* The outcome the owner wants, in the words they use. "Leads", "audit" and
     "funnel" are agency words; a roofer wants more jobs. The homepage keeps
     its own CTA until this has been tested on paid traffic. */
  label: "Get more jobs",
  note: "Marketing for Australian builders, roofers, renovators, solar installers and home service businesses.",
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
   Opens on the feeling every owner knows (feast or famine), then names four
   causes in the owner's own words. The first is the shared-lead marketplace,
   because it is the one most home services owners are already paying for and
   resent. It is described, not named: no competitor names on this page. */
export const problem = {
  eyebrow: "Sound familiar?",
  title: "Flat out one month. Dead quiet the next.",
  /* `{trade}` is replaced with the trade label from the URL. */
  intro:
    "Most {trade} businesses run on word of mouth and whatever the lead sites send. It works until it doesn't, and there's no way to turn it up when the diary empties.",
  leaks: [
    {
      n: "01",
      title: "You're quoting against four others",
      copy: "Lead sites sell the same job to several businesses. By the time you call back, someone has already quoted cheaper. You pay for the lead either way.",
    },
    {
      n: "02",
      title: "Google sends the job to someone else",
      copy: "A homeowner searches, checks the map and rings one of the top three. If that isn't you, you never knew the job existed.",
    },
    {
      n: "03",
      title: "The ads are quietly burning money",
      copy: "Someone set up Google Ads once. Since then they've paid for DIY searches, jobs you don't do and suburbs you won't drive to, and the report still says it's going well.",
    },
    {
      n: "04",
      title: "Calls missed on the tools",
      copy: "You're up a ladder when the phone rings. They don't leave a message. They ring the next number on the list.",
    },
  ],
  close:
    "None of that is a shortage of work. It's a gap in how the work finds you, and that can be fixed.",
};

/* ── 2. What we fix ─────────────────────────────────────────────────────────
   The answer to the problem section, point for point. The frame is ownership:
   enquiries from the business's own Google listing, ads and website, coming
   to them only. That is the clearest contrast with shared leads, and it is
   true of how every Sika package works. */
export const fixes = {
  eyebrow: "What we build",
  title: "More enquiries that come straight to you.",
  intro:
    "We look after the four things that bring work in: showing up on Google, ads, your website and following up every enquiry. Each enquiry comes to you only, not to four other businesses.",
  items: [
    {
      n: "01",
      outcome: "Be on the map when they search",
      service: "Local SEO & Google Business Profile",
      copy: "Be one of the businesses people see when someone nearby searches for what you do, for the jobs and suburbs you actually want.",
      points: [
        "Google Business Profile set up properly",
        "Service and suburb pages",
        "A plan for getting more reviews",
        "Local listings cleaned up",
      ],
    },
    {
      n: "02",
      outcome: "Ads that bring in real jobs",
      service: "Google Ads & Facebook / Instagram ads",
      copy: "Ads aimed at the work worth quoting, in the areas you want to work. Searches that will never turn into a job get blocked before they cost you.",
      points: [
        "Campaigns split by job type",
        "Blocking searches that waste your money",
        "Every call and form tracked",
        "Facebook and Instagram ads for bigger projects",
      ],
    },
    {
      n: "03",
      outcome: "A website that gets the phone ringing",
      service: "Websites & landing pages",
      copy: "Someone on their phone should know in five seconds what you do, where you work and how to get a quote. Then it should take one tap to ask.",
      points: [
        "A landing page per service",
        "Quote forms that work on mobile",
        "Tap-to-call on every page",
        "Fast loading, tracking built in",
      ],
    },
    {
      n: "04",
      outcome: "Never lose a job to voicemail",
      service: "Lead follow-up & automation",
      copy: "Miss a call and they get a text straight back with your business name on it. Every enquiry gets an instant reply and a follow-up until they answer.",
      points: [
        "Missed-call text back",
        "Instant reply to every enquiry",
        "Follow-up until they respond",
        "Every enquiry tracked, from first call to quote",
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
      title: "We've been on the tools",
      copy: "John Sikalias held an electrical licence for 12 years before he started Sika. He knows what a callout costs, which jobs are worth chasing, and why more leads mean nothing if they're the wrong ones.",
    },
    {
      title: "Home services is our focus",
      copy: "Renovations, roofing, solar, demolition, joinery, building and the trades around them. We aren't learning your industry on your budget.",
    },
    {
      title: "Your accounts, your enquiries",
      copy: "Ad accounts, Google Business Profile and tracking are set up in your name. Your enquiries are never shared or sold on. If you leave, everything stays with you.",
    },
    {
      title: "Reports in jobs, not jargon",
      copy: "Each month: how many enquiries came in, what they cost and which jobs they were for. If something isn't working, you hear it from us first.",
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
   to ask. The lead-site question goes second because it is the comparison
   most owners are already making. Several answers state terms, so several
   need confirming. */
export const faqs: { q: string; a: string; confirm?: boolean }[] = [
  {
    q: "What do I get from the free marketing check?",
    a: "Before we call, we go through your Google listing, website, ad accounts and how enquiries get followed up. On a short call we show you where work is slipping through and what we'd fix first, in order. It's yours to keep whether or not you work with us.",
  },
  {
    q: "How is this different from lead sites?",
    a: "Lead sites sell the same enquiry to several businesses, so you're quoting against three or four others before you've said hello. We build your own Google presence, ads and website, so the enquiry comes to you only. And what we build keeps working for your business, not for a platform.",
  },
  {
    q: "What if you don't find much?",
    a: "Then we'll tell you that. You'll have spent a short call confirming your marketing is in good shape, which is worth knowing too.",
  },
  {
    q: "Do you work with my trade?",
    a: "If you're in home services, most likely yes. Renovations, roofing, solar, demolition, joinery, building, bathrooms, electrical and similar. We don't market for finance, healthcare or beauty businesses.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on what you need. We run set packages, from local SEO with basic follow-up automation through to a full website, SEO, ads and follow-up system. Ad spend is separate and paid straight to Google or Facebook. You get a fixed price in writing before anything starts.",
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
    a: "The minimum term is set out in writing before you sign, along with the reason for it. Ads and SEO both need a few months of data before they can be judged fairly, and we'd rather say that upfront.",
    confirm: true,
  },
  {
    q: "Who actually does the work?",
    a: "Our team, working to a documented process for every service, managed from Melbourne. You'll always know who to contact and what's been done.",
    confirm: true,
  },
];

/* ── 7. The enquiry section ─────────────────────────────────────────────── */
export const enquire = {
  eyebrow: "Free marketing check",
  title: "Find out why the phone isn't ringing more.",
  intro:
    "Tell us about your business. Before we call, we'll go through your Google listing, website, ads and follow-up, then show you where enquiries are slipping through, in plain English and in the order we'd fix them.",
  checks: [
    "Whether you show up on the map for the jobs you want",
    "Money spent on ads that will never turn into jobs",
    "What a homeowner sees on your site on their phone",
    "How fast enquiries get a reply, and how many never do",
    "What we'd fix first, and what you can fix yourself",
  ],
  steps: [
    {
      n: "01",
      t: "We look",
      c: "At your listing, site, ads and follow-up. Before we call, not during.",
    },
    {
      n: "02",
      t: "We show you",
      c: "A short call, in plain English, with the order we'd fix things in.",
    },
    {
      n: "03",
      t: "You decide",
      c: "What we found is yours to keep, whether or not you hire us.",
    },
  ],
  submit: "Get more jobs",
  reassurance:
    "Takes about a minute. Yours to keep, whether or not you hire us. No newsletter, no sales sequence.",
  success: {
    title: "Got it.",
    copy: "We'll go through your Google listing, website and ads before we call, so the first conversation is about what we found, not a sales pitch.",
  },
};
