/**
 * INFORMATION ARCHITECTURE
 * ========================
 * Encoded from "Sika Digital — Website SEO & Build Scope" (13 Sep 2026),
 * Sitemap and Keyword Map tabs. Keyword data: Semrush AU, Sep 2026.
 *
 * This is the single source of truth for every route on the site. Page files
 * read their URL, title, description, H1 and keyword focus from here — nothing
 * is hardcoded in a page component. That is what keeps 47 pages consistent and
 * makes a URL change one edit rather than a search-and-replace.
 *
 * ── Tier ────────────────────────────────────────────────────────────────────
 *   1 = build first   2 = build in this project   3 = after launch
 *
 * ── Two corrections applied to the workbook ─────────────────────────────────
 * 1. `/industries/` and `/guides/` were Tier 2 while Tier 1 children sat
 *    beneath them. A hub that ships after its children means every breadcrumb
 *    on those children points at a 404 and anyone trimming the URL hits a dead
 *    end. Both promoted to Tier 1 — they are cheap pages, and the trades wedge
 *    is the cheapest ground Sika has.
 * 2. `/seo/seo-audit/` targets "seo audit" at KD 73. It will not rank in year
 *    one and should not be counted as an SEO miss when it doesn't — marked
 *    `conversionOnly` so reporting treats it as a lead magnet.
 */

export type Tier = 1 | 2 | 3;
export type Section =
  | "Core"
  | "SEO"
  | "Google Ads"
  | "Meta Ads"
  | "Social"
  | "Lead Gen"
  | "Web"
  | "AI"
  | "Other"
  | "Industries"
  | "Location"
  | "Content";

export type Template =
  | "home"
  | "about"
  | "proof"
  | "contact"
  | "service-hub"
  | "service"
  | "industry-hub"
  | "industry"
  | "location"
  | "blog-hub"
  | "guide"
  | "tool";

export type PageSpec = {
  /** Stable lookup key. */
  key: string;
  /** Nav / internal link label. */
  label: string;
  /** Route. Trailing slash matches next.config's trailingSlash: true. */
  url: string;
  section: Section;
  template: Template;
  tier: Tier;
  /** The one keyword this page owns. Pages never compete with each other. */
  primaryKeyword: string;
  /** Monthly AU searches (Semrush, Sep 2026). */
  volume?: number;
  /** Keyword difficulty 0–100. Under 30 is realistically winnable in a year. */
  kd?: number;
  /** ~55–60 chars. */
  title: string;
  /** ~150–155 chars. */
  description: string;
  h1: string;
  /** Ranks via paid/lead-gen rather than organic — excluded from SEO reporting. */
  conversionOnly?: boolean;
  /** Built but not indexed. */
  noindex?: boolean;
  /**
   * A route file exists for this page.
   *
   * ⚠️  Set this when you create `src/app/<slug>/page.tsx`, and not before.
   *
   * The sitemap is generated from this config, and its own header comment
   * claims it "can never fall out of step with the routes that actually
   * exist". That was untrue: the config describes 49 planned pages and five of
   * them are built, so the sitemap was offering Google 44 URLs that return 404.
   *
   * Submitting 404s in a sitemap is not a neutral mistake. It wastes crawl
   * budget on a new domain that has very little, and it is a quality signal
   * against the site. On a site selling SEO it is also the kind of thing a
   * prospect might check.
   *
   * This flag is deliberately manual rather than derived from the filesystem.
   * A build-time `fs` check would be silently wrong the moment the sitemap is
   * rendered anywhere other than a full build, and an explicit boolean is
   * something a person can audit in one pass down the file.
   */
  built?: boolean;
};

export const pages: PageSpec[] = [
  /* ── Core ─────────────────────────────────────────────────────────────── */
  {
    key: "home",
    built: true,
    label: "Home",
    url: "/",
    section: "Core",
    template: "home",
    tier: 1,
    primaryKeyword: "digital marketing agency melbourne",
    volume: 4400,
    kd: 55,
    title: "Digital Marketing Agency Melbourne | Sika Digital",
    description:
      "Melbourne agency for trade and service businesses. SEO, Google Ads, Meta, websites. We show you where your leads are leaking before you pay us anything.",
    h1: "", // TODO: depends on Open Question #1 (positioning one-liner)
  },
  {
    key: "about",
    built: true,
    label: "About",
    url: "/about/",
    section: "Core",
    template: "about",
    tier: 1,
    primaryKeyword: "sika digital",
    title: "About Sika Digital | Melbourne Growth Agency",
    description:
      "Founded by a licensed electrician turned marketer. Meet the in-house team behind Sika Digital's SEO, Google Ads and web work.",
    h1: "Built by people who have run a trade business.",
  },
  {
    key: "results",
    built: true,
    label: "Results",
    url: "/results/",
    section: "Core",
    template: "proof",
    tier: 1,
    primaryKeyword: "case studies",
    title: "Results & Case Studies | Sika Digital",
    /*
      ⚠️  This description must match the state of the page.

      It previously read "Leads, rankings and revenue from real Australian
      businesses ... with the numbers." That was written for the page as
      planned, and the page as built has no case studies on it, because none
      are signed off. A meta description is the snippet in the search result,
      so shipping that version would have promised figures the page does not
      contain: a bait-and-switch performed on the one page arguing against
      exactly that.

      Put the original back the day the first three case studies go live, and
      not before.
    */
    description:
      "What we measure, what we report, and the standard we think any agency should be held to. Case studies go up here as clients approve them.",
    /* Was "The numbers, not the adjectives." Clever, and clever is the thing to
       avoid. This says the same in plain words. */
    h1: "What the work actually did.",
  },
  {
    key: "contact",
    built: true,
    label: "Contact",
    url: "/contact/",
    section: "Core",
    template: "contact",
    tier: 1,
    primaryKeyword: "digital marketing agency near me",
    title: "Contact Sika Digital | Melbourne",
    description:
      "Tell us what you are trying to fix and we will check your website, Google Business Profile and ads. Melbourne based, working Australia wide.",
    h1: "Tell us what you are trying to fix.",
  },

  /**
   * SERVICES HUB.
   *
   * Not in the original workbook sitemap — added for the same reason
   * `/industries/` and `/guides/` were promoted to Tier 1. The nav's "Services"
   * item has to point somewhere, and a section of a site should have something
   * at its own root: anyone trimming a URL back to /services/ would otherwise
   * hit a 404, and every service page's breadcrumb would be missing a rung.
   *
   * It also catches broad "digital marketing services" intent and passes
   * authority down to the clusters, which the individual hubs cannot do for
   * each other.
   */
  {
    key: "services",
    built: true,
    label: "Services",
    url: "/services/",
    section: "Core",
    template: "service-hub",
    tier: 1,
    primaryKeyword: "digital marketing services",
    volume: 5400,
    kd: 63,
    title: "Digital Marketing Services | Sika Digital",
    description:
      "SEO, Google Ads, Meta ads, web design, lead generation and AI automation, built for Australian service and trade businesses.",
    h1: "Everything we do, in one place.",
  },

  /* ── SEO cluster ──────────────────────────────────────────────────────── */
  {
    key: "seo",
    built: true,
    label: "SEO",
    url: "/seo/",
    section: "SEO",
    template: "service-hub",
    tier: 1,
    primaryKeyword: "seo agency melbourne",
    volume: 6600,
    kd: 35,
    title: "SEO Agency Melbourne | Sika Digital",
    description:
      "SEO that brings qualified enquiries, not vanity rankings. Technical, on-page, local and content SEO for Australian service businesses.",
    h1: "SEO that brings enquiries, not just rankings.",
  },
  {
    key: "local-seo",
    label: "Local SEO",
    url: "/seo/local-seo/",
    section: "SEO",
    template: "service",
    tier: 1,
    primaryKeyword: "local seo services",
    volume: 4400,
    kd: 37,
    title: "Local SEO Services Australia | Sika Digital",
    description:
      "Rank in the map pack where your customers actually search. Google Business Profile, local citations and location pages that convert.",
    h1: "Get found in the map pack.",
  },
  {
    key: "ecommerce-seo",
    label: "Ecommerce SEO",
    url: "/seo/ecommerce-seo/",
    section: "SEO",
    template: "service",
    tier: 1,
    primaryKeyword: "ecommerce seo",
    volume: 2400,
    kd: 18,
    title: "Ecommerce SEO Agency Australia | Sika Digital",
    description:
      "Product, category and technical SEO for Australian online stores. Built around revenue, not traffic.",
    h1: "Ecommerce SEO built around revenue.",
  },
  {
    key: "small-business-seo",
    label: "Small Business SEO",
    url: "/seo/small-business-seo/",
    section: "SEO",
    template: "service",
    tier: 2,
    primaryKeyword: "small business seo",
    volume: 1300,
    kd: 24,
    title: "Small Business SEO Australia | Sika Digital",
    description:
      "Affordable, honest SEO for small Australian businesses. Clear scope, clear price, and reporting you can actually read.",
    h1: "SEO for small businesses, without the lock-in.",
  },
  {
    key: "seo-audit",
    label: "SEO Audit",
    url: "/seo/seo-audit/",
    section: "SEO",
    template: "tool",
    tier: 2,
    primaryKeyword: "seo audit",
    volume: 2400,
    kd: 73,
    conversionOnly: true,
    title: "Free SEO Audit | Sika Digital",
    description:
      "A real audit by a human, not an automated score out of 100. We show you what is costing you rankings and what to fix first.",
    h1: "A free SEO audit, done by a person.",
  },

  /* ── Google Ads cluster — the priority commercial win ──────────────────── */
  {
    key: "google-ads",
    built: true,
    label: "Google Ads",
    url: "/google-ads/",
    section: "Google Ads",
    template: "service-hub",
    tier: 1,
    primaryKeyword: "google ads agency",
    volume: 8100,
    kd: 27,
    title: "Google Ads Agency Melbourne | Sika Digital",
    description:
      "Google Ads management that optimises for qualified leads, not cheap clicks. Transparent reporting, no lock-in contracts.",
    h1: "Google Ads that bring the right enquiries.",
  },
  {
    key: "ppc-management",
    label: "PPC Management",
    url: "/google-ads/ppc-management/",
    section: "Google Ads",
    template: "service",
    tier: 2,
    primaryKeyword: "ppc management",
    volume: 2400,
    kd: 26,
    title: "PPC Management Services Australia | Sika Digital",
    description:
      "Ongoing PPC management across Google and Microsoft Ads. Search terms mined weekly, budget moved to what converts.",
    h1: "PPC management, managed properly.",
  },

  /* ── Meta / Social ────────────────────────────────────────────────────── */
  {
    key: "facebook-ads",
    built: true,
    label: "Facebook & Instagram Ads",
    url: "/facebook-ads/",
    section: "Meta Ads",
    template: "service-hub",
    tier: 1,
    primaryKeyword: "facebook ads agency",
    volume: 2400,
    kd: 17,
    title: "Facebook & Instagram Ads Agency | Sika Digital",
    description:
      "Meta ads for Australian service businesses. Creative, targeting and Conversions API tracking that actually attributes leads.",
    h1: "Meta ads that generate real enquiries.",
  },
  {
    key: "social-media-marketing",
    label: "Social Media Marketing",
    url: "/social-media-marketing/",
    section: "Social",
    template: "service",
    tier: 2,
    primaryKeyword: "social media marketing agency",
    volume: 4400,
    kd: 36,
    title: "Social Media Marketing Agency | Sika Digital",
    description:
      "Organic social that supports the paid work. Content, scheduling and community management for Australian service brands.",
    h1: "Social that earns attention.",
  },

  /* ── Lead generation ──────────────────────────────────────────────────── */
  {
    key: "lead-generation",
    built: true,
    label: "Lead Generation",
    url: "/lead-generation/",
    section: "Lead Gen",
    template: "service-hub",
    tier: 1,
    primaryKeyword: "lead generation agency",
    volume: 1600,
    kd: 20,
    title: "Lead Generation Agency Australia | Sika Digital",
    description:
      "End-to-end lead generation. Traffic, landing pages, qualifying forms and CRM follow-up wired together so nothing leaks.",
    h1: "Leads, followed all the way to the sale.",
  },

  /* ── Web ──────────────────────────────────────────────────────────────── */
  {
    key: "web-design",
    built: true,
    label: "Web Design",
    url: "/web-design/",
    section: "Web",
    template: "service-hub",
    tier: 1,
    primaryKeyword: "web design agency",
    volume: 4400,
    kd: 39,
    title: "Web Design Agency Melbourne | Sika Digital",
    description:
      "Fast, conversion-focused websites built to rank. In-house design and development, no templates.",
    h1: "Websites built to convert and to rank.",
  },
  {
    key: "ecommerce-web-design",
    label: "Ecommerce Web Design",
    url: "/web-design/ecommerce/",
    section: "Web",
    template: "service",
    tier: 2,
    primaryKeyword: "ecommerce web design",
    volume: 2400,
    kd: 41,
    title: "Ecommerce Web Design Australia | Sika Digital",
    description:
      "Online stores built for speed and conversion. Shopify and custom builds for Australian retailers.",
    h1: "Online stores that sell.",
  },
  {
    key: "wordpress-web-design",
    label: "WordPress Web Design",
    url: "/web-design/wordpress/",
    section: "Web",
    template: "service",
    tier: 3,
    primaryKeyword: "wordpress web design",
    volume: 2400,
    kd: 51,
    title: "WordPress Web Design Australia | Sika Digital",
    description:
      "Custom WordPress themes built properly. Fast, secure and easy for your team to update.",
    h1: "WordPress, built properly.",
  },
  {
    key: "cro",
    label: "Conversion Rate Optimisation",
    url: "/conversion-rate-optimisation/",
    section: "Web",
    template: "service",
    tier: 3,
    primaryKeyword: "conversion rate optimisation",
    volume: 1600,
    kd: 49,
    title: "Conversion Rate Optimisation | Sika Digital",
    description:
      "Turn the traffic you already have into more enquiries. Heatmaps, testing and evidence-led page changes.",
    h1: "More leads from the traffic you already have.",
  },

  /* ── AI & other services ──────────────────────────────────────────────── */
  {
    key: "ai-automation",
    label: "AI Automation",
    url: "/ai-automation/",
    section: "AI",
    template: "service-hub",
    tier: 2,
    primaryKeyword: "ai automation agency",
    volume: 590,
    kd: 21,
    title: "AI Automation Agency Australia | Sika Digital",
    description:
      "Automate the follow-up, the admin and the reporting. Practical AI workflows wired into your CRM.",
    h1: "Automate the work that eats your week.",
  },
  {
    key: "email-marketing",
    label: "Email Marketing",
    url: "/email-marketing/",
    section: "Other",
    template: "service",
    tier: 2,
    primaryKeyword: "email marketing agency",
    volume: 1600,
    kd: 21,
    title: "Email Marketing Agency Australia | Sika Digital",
    description:
      "Email and SMS flows that turn enquiries into customers. Nurture, reactivation and review requests.",
    h1: "Email that earns its place in the inbox.",
  },
  {
    key: "content-marketing",
    label: "Content Marketing",
    url: "/content-marketing/",
    section: "Other",
    template: "service",
    tier: 2,
    primaryKeyword: "content marketing agency",
    volume: 2900,
    kd: 20,
    title: "Content Marketing Agency Australia | Sika Digital",
    description:
      "Content built from validated search demand, not guesswork. Written to rank and to answer the question properly.",
    h1: "Content that answers what people search.",
  },
  {
    key: "reputation-management",
    label: "Reputation Management",
    url: "/reputation-management/",
    section: "Other",
    template: "service",
    tier: 3,
    primaryKeyword: "reputation management services",
    volume: 590,
    kd: 39,
    title: "Reputation Management Services | Sika Digital",
    description:
      "Get more reviews, respond to the ones you have, and make your star rating an asset rather than a liability.",
    h1: "Reviews are a system, not luck.",
  },

  /* ── Industries — the trades wedge (finding #2, cheapest ground) ──────── */
  {
    key: "industries",
    built: true,
    label: "Industries",
    url: "/industries/",
    section: "Industries",
    template: "industry-hub",
    tier: 1, // promoted from Tier 2 — see header note
    primaryKeyword: "marketing for tradies",
    volume: 1000,
    kd: 17,
    title: "Marketing for Tradies & Service Businesses | Sika Digital",
    description:
      "Marketing built for trades and service businesses by someone who ran one. Electricians, plumbers, builders and more.",
    h1: "Marketing for people who work for a living.",
  },
  {
    key: "tradies",
    built: true,
    label: "Tradies",
    url: "/industries/tradies/",
    section: "Industries",
    template: "industry",
    tier: 1,
    primaryKeyword: "digital marketing for tradies",
    volume: 880,
    kd: 7,
    title: "Digital Marketing for Tradies | Sika Digital",
    description:
      "Run by a former licensed electrician. Get more of the jobs you want, not tyre-kickers and price-shoppers.",
    h1: "Digital marketing for tradies, by an ex-sparky.",
  },
  {
    key: "electricians",
    built: true,
    label: "Electricians",
    url: "/industries/electricians/",
    section: "Industries",
    template: "industry",
    tier: 2,
    primaryKeyword: "marketing for electricians",
    volume: 110,
    kd: 7,
    title: "Marketing for Electricians | Sika Digital",
    description:
      "Get more switchboard upgrades and fewer callouts you don't want. Marketing for Australian electrical contractors.",
    h1: "Marketing for electricians.",
  },
  {
    key: "plumbers",
    built: true,
    label: "Plumbers",
    url: "/industries/plumbers/",
    section: "Industries",
    template: "industry",
    tier: 2,
    primaryKeyword: "marketing for plumbers",
    volume: 140,
    kd: 6,
    title: "Marketing for Plumbers | Sika Digital",
    description:
      "Emergency work, maintenance contracts or renovations. Marketing that brings the plumbing jobs you actually want.",
    h1: "Marketing for plumbers.",
  },
  {
    key: "builders",
    built: true,
    label: "Builders",
    url: "/industries/builders/",
    section: "Industries",
    template: "industry",
    tier: 2,
    primaryKeyword: "marketing for builders",
    volume: 170,
    kd: 7,
    title: "Marketing for Builders | Sika Digital",
    description:
      "Marketing for Australian builders and renovators. Qualified enquiries for the projects worth quoting.",
    h1: "Marketing for builders.",
  },

  /* ── Locations ────────────────────────────────────────────────────────── */
  {
    key: "google-ads-brisbane",
    label: "Google Ads Brisbane",
    url: "/google-ads-agency-brisbane/",
    section: "Location",
    template: "location",
    tier: 1,
    primaryKeyword: "google ads agency brisbane",
    volume: 1300,
    kd: 16,
    title: "Google Ads Agency Brisbane | Sika Digital",
    description:
      "Google Ads management for Brisbane businesses. Qualified leads, transparent reporting, no lock-in.",
    h1: "Google Ads agency, Brisbane.",
  },
  {
    key: "seo-sydney",
    label: "SEO Sydney",
    url: "/seo-agency-sydney/",
    section: "Location",
    template: "location",
    tier: 2,
    primaryKeyword: "seo agency sydney",
    volume: 6600,
    kd: 35,
    title: "SEO Agency Sydney | Sika Digital",
    description:
      "SEO for Sydney service businesses. Technical, local and content SEO built around enquiries.",
    h1: "SEO agency, Sydney.",
  },
  {
    key: "seo-brisbane",
    label: "SEO Brisbane",
    url: "/seo-agency-brisbane/",
    section: "Location",
    template: "location",
    tier: 2,
    primaryKeyword: "seo agency brisbane",
    volume: 5400,
    kd: 33,
    title: "SEO Agency Brisbane | Sika Digital",
    description:
      "SEO for Brisbane businesses that turns search traffic into qualified enquiries.",
    h1: "SEO agency, Brisbane.",
  },
  {
    key: "seo-adelaide",
    label: "SEO Adelaide",
    url: "/seo-agency-adelaide/",
    section: "Location",
    template: "location",
    tier: 2,
    primaryKeyword: "seo adelaide",
    volume: 3600,
    kd: 25,
    title: "SEO Agency Adelaide | Sika Digital",
    description:
      "SEO for Adelaide businesses. Local rankings, technical fixes and content that converts.",
    h1: "SEO agency, Adelaide.",
  },
  {
    key: "seo-perth",
    label: "SEO Perth",
    url: "/seo-agency-perth/",
    section: "Location",
    template: "location",
    tier: 3,
    primaryKeyword: "seo agency perth",
    volume: 3600,
    kd: 37,
    title: "SEO Agency Perth | Sika Digital",
    description:
      "SEO for Perth businesses, built around qualified enquiries rather than vanity rankings.",
    h1: "SEO agency, Perth.",
  },
  {
    key: "google-ads-sydney",
    label: "Google Ads Sydney",
    url: "/google-ads-agency-sydney/",
    section: "Location",
    template: "location",
    tier: 2,
    primaryKeyword: "google ads agency sydney",
    volume: 2400,
    kd: 32,
    title: "Google Ads Agency Sydney | Sika Digital",
    description:
      "Google Ads management for Sydney businesses, built for lead quality, not click volume.",
    h1: "Google Ads agency, Sydney.",
  },
  {
    key: "local-seo-sydney",
    label: "Local SEO Sydney",
    url: "/local-seo-sydney/",
    section: "Location",
    template: "location",
    tier: 2,
    primaryKeyword: "local seo sydney",
    volume: 2400,
    kd: 20,
    title: "Local SEO Sydney | Sika Digital",
    description:
      "Rank in the Sydney map pack. Google Business Profile optimisation, citations and local content.",
    h1: "Local SEO, Sydney.",
  },
  {
    key: "local-seo-brisbane",
    label: "Local SEO Brisbane",
    url: "/local-seo-brisbane/",
    section: "Location",
    template: "location",
    tier: 2,
    primaryKeyword: "local seo brisbane",
    volume: 2400,
    kd: 19,
    title: "Local SEO Brisbane | Sika Digital",
    description:
      "Get found in the Brisbane map pack with a properly optimised Google Business Profile and local pages.",
    h1: "Local SEO, Brisbane.",
  },
  {
    key: "web-design-brisbane",
    label: "Web Design Brisbane",
    url: "/web-design-brisbane/",
    section: "Location",
    template: "location",
    tier: 2,
    primaryKeyword: "web design brisbane",
    volume: 3600,
    kd: 33,
    title: "Web Design Brisbane | Sika Digital",
    description:
      "Fast, conversion-focused websites for Brisbane businesses. Built in-house, built to rank.",
    h1: "Web design, Brisbane.",
  },
  {
    key: "web-design-sydney",
    label: "Web Design Sydney",
    url: "/web-design-sydney/",
    section: "Location",
    template: "location",
    tier: 3,
    primaryKeyword: "web design sydney",
    volume: 4400,
    kd: 58,
    title: "Web Design Sydney | Sika Digital",
    description:
      "Conversion-focused web design for Sydney businesses, built for speed and search.",
    h1: "Web design, Sydney.",
  },
  {
    key: "web-design-perth",
    label: "Web Design Perth",
    url: "/web-design-perth/",
    section: "Location",
    template: "location",
    tier: 3,
    primaryKeyword: "web design perth",
    volume: 3600,
    kd: 60,
    title: "Web Design Perth | Sika Digital",
    description:
      "Websites for Perth businesses that load fast and turn visitors into enquiries.",
    h1: "Web design, Perth.",
  },
  {
    key: "dma-sydney",
    label: "Digital Marketing Sydney",
    url: "/digital-marketing-agency-sydney/",
    section: "Location",
    template: "location",
    tier: 2,
    primaryKeyword: "digital marketing agency sydney",
    volume: 4400,
    kd: 39,
    title: "Digital Marketing Agency Sydney | Sika Digital",
    description:
      "Full-service digital marketing for Sydney service businesses. SEO, Google Ads, Meta and web.",
    h1: "Digital marketing agency, Sydney.",
  },

  /* ── Guides ───────────────────────────────────────────────────────────── */
  {
    key: "guides",
    label: "Guides",
    url: "/guides/",
    section: "Content",
    template: "blog-hub",
    tier: 1, // promoted from Tier 2 — see header note
    primaryKeyword: "digital marketing guides",
    title: "Guides | Sika Digital",
    description:
      "Straight answers on what marketing costs, what works and what to do first. Written for Australian business owners.",
    h1: "Straight answers, no jargon.",
  },
  {
    key: "guide-seo-cost",
    label: "How much does SEO cost in Australia?",
    url: "/guides/how-much-does-seo-cost-australia/",
    section: "Content",
    template: "guide",
    tier: 1,
    primaryKeyword: "how much does seo cost",
    volume: 260,
    kd: 14,
    title: "How Much Does SEO Cost in Australia? (2026)",
    description:
      "Real Australian SEO pricing. What you get at each level, what drives the number, and the pricing models to avoid.",
    h1: "How much does SEO cost in Australia?",
  },
  {
    key: "guide-seo-vs-ads",
    label: "SEO vs Google Ads",
    url: "/guides/seo-vs-google-ads/",
    section: "Content",
    template: "guide",
    tier: 1,
    primaryKeyword: "seo vs google ads",
    volume: 70,
    kd: 17,
    title: "SEO vs Google Ads: Which Is Right for You?",
    description:
      "Which channel to start with, when to run both, and how the maths changes depending on your margin and timeframe.",
    h1: "SEO vs Google Ads: which is right for you?",
  },
  {
    key: "guide-maps-seo",
    label: "Google Maps SEO",
    url: "/guides/google-maps-seo/",
    section: "Content",
    template: "guide",
    tier: 1,
    primaryKeyword: "google maps seo",
    volume: 260,
    kd: 26,
    title: "Google Maps SEO: How to Rank in the Map Pack",
    description:
      "What actually moves map pack rankings in 2026. Proximity, prominence, reviews and the Google Business Profile fields that matter.",
    h1: "How to rank in the Google map pack.",
  },
  {
    key: "guide-tradies",
    label: "Digital marketing for tradies",
    url: "/guides/digital-marketing-for-tradies/",
    section: "Content",
    template: "guide",
    tier: 1,
    primaryKeyword: "marketing for tradies",
    volume: 1000,
    kd: 17,
    title: "Digital Marketing for Tradies: The Honest Guide",
    description:
      "What actually gets a trade business more of the right jobs, and what is a waste of money. Written by a former sparky.",
    h1: "Digital marketing for tradies: the honest guide.",
  },
  {
    key: "guide-what-is-local-seo",
    label: "What is local SEO?",
    url: "/guides/what-is-local-seo/",
    section: "Content",
    template: "guide",
    tier: 2,
    primaryKeyword: "what is local seo",
    volume: 390,
    kd: 50,
    title: "What Is Local SEO (And Do You Need It)?",
    description:
      "Local SEO explained plainly, plus how to tell whether your business actually needs it.",
    h1: "What is local SEO?",
  },
  {
    key: "guide-website-cost",
    label: "How much does a website cost?",
    url: "/guides/how-much-does-a-website-cost/",
    section: "Content",
    template: "guide",
    tier: 2,
    primaryKeyword: "how much does a website cost",
    volume: 320,
    kd: 43,
    title: "How Much Does a Website Cost in Australia? (2026)",
    description:
      "Honest Australian website pricing by type and scope, and what makes the number go up.",
    h1: "How much does a website cost in Australia?",
  },
  {
    key: "guide-ads-cost",
    label: "How much do Google Ads cost?",
    url: "/guides/how-much-do-google-ads-cost/",
    section: "Content",
    template: "guide",
    tier: 2,
    primaryKeyword: "how much do google ads cost",
    volume: 260,
    kd: 39,
    title: "How Much Do Google Ads Cost in Australia?",
    description:
      "Real Australian CPCs by industry, what a sensible starting budget looks like, and where the money usually leaks.",
    h1: "How much do Google Ads cost?",
  },
  {
    key: "guide-more-leads",
    label: "How to get more leads",
    url: "/guides/how-to-get-more-leads/",
    section: "Content",
    template: "guide",
    tier: 2,
    primaryKeyword: "how to get more leads",
    volume: 70,
    kd: 25,
    title: "How to Get More Leads for Your Business",
    description:
      "The order to fix things in, because more traffic on a page that does not convert just costs more.",
    h1: "How to get more leads.",
  },
];

/* ── Lookups ────────────────────────────────────────────────────────────── */

const byKey = new Map(pages.map((p) => [p.key, p]));

/**
 * Throws on an unknown key rather than returning undefined.
 *
 * Deliberate: a typo'd key should break the build, not silently render a link
 * to `undefined` that nobody notices until a customer reports a 404.
 */
export function getPage(key: string): PageSpec {
  const page = byKey.get(key);
  if (!page) throw new Error(`Unknown page key: "${key}"`);
  return page;
}

export const pagesInSection = (section: Section) =>
  pages.filter((p) => p.section === section);

export const pagesInTier = (tier: Tier) => pages.filter((p) => p.tier === tier);

/**
 * Pages that belong in the sitemap.
 *
 * `built` as well as `noindex`, because a page that does not exist cannot be
 * indexed and should never be offered to a crawler. See the note on `built` in
 * `PageSpec` for why that matters more than it sounds.
 */
export const indexablePages = () => pages.filter((p) => p.built && !p.noindex);

/* ── Navigation ─────────────────────────────────────────────────────────── */

export type NavGroup = {
  label: string;
  href: string;
  blurb: string;
  children: { label: string; href: string }[];
};

/**
 * The services mega-menu.
 *
 * ── Ordering ────────────────────────────────────────────────────────────────
 * Web first, then SEO, then paid. This follows the scope's OWN summary line,
 * "web and SEO first, paid and AI to accelerate", which the workbook's priority
 * table contradicted by ranking Google Ads at 1 and web design at 2. John
 * confirmed the summary line is correct and that the business is broader than
 * a marketing agency: IT and digital services, with websites as a core product.
 *
 * ⚠️  INCOMPLETE. The IT service lines are not represented here yet because
 *     they have not been confirmed, and inventing service pages for a real
 *     business is how a site ends up advertising work nobody can deliver.
 *     Once the list exists, it becomes a sixth group and a set of page specs
 *     above. Do not guess at it.
 */
export const serviceGroups: NavGroup[] = [
  {
    label: "Websites",
    href: getPage("web-design").url,
    blurb: "Sites built to load fast, rank, and turn visits into enquiries.",
    children: [
      { label: "Web Design", href: getPage("web-design").url },
      { label: "Ecommerce", href: getPage("ecommerce-web-design").url },
      { label: "WordPress", href: getPage("wordpress-web-design").url },
      { label: "Conversion Rate Optimisation", href: getPage("cro").url },
    ],
  },
  {
    label: "SEO",
    href: getPage("seo").url,
    blurb: "Local, ecommerce and small business search.",
    children: [
      { label: "SEO", href: getPage("seo").url },
      { label: "Local SEO", href: getPage("local-seo").url },
      { label: "Ecommerce SEO", href: getPage("ecommerce-seo").url },
      { label: "Small Business SEO", href: getPage("small-business-seo").url },
      { label: "Free SEO Audit", href: getPage("seo-audit").url },
    ],
  },
  {
    label: "Google Ads",
    href: getPage("google-ads").url,
    blurb: "The fastest route to qualified enquiries.",
    children: [
      { label: "Google Ads", href: getPage("google-ads").url },
      { label: "PPC Management", href: getPage("ppc-management").url },
    ],
  },
  {
    label: "Paid Social",
    href: getPage("facebook-ads").url,
    blurb: "Meta ads, and the organic social that supports them.",
    children: [
      { label: "Facebook & Instagram Ads", href: getPage("facebook-ads").url },
      {
        label: "Social Media Marketing",
        href: getPage("social-media-marketing").url,
      },
    ],
  },
  {
    label: "Systems & Automation",
    href: getPage("lead-generation").url,
    blurb: "Lead capture, follow-up and the software that runs it.",
    children: [
      { label: "Lead Generation", href: getPage("lead-generation").url },
      { label: "AI Automation", href: getPage("ai-automation").url },
      { label: "Email Marketing", href: getPage("email-marketing").url },
      { label: "Content Marketing", href: getPage("content-marketing").url },
    ],
  },
];

export type NavItem = {
  label: string;
  href: string;
  mega?: boolean;
};

export const primaryNav: NavItem[] = [
  { label: "Services", href: getPage("services").url, mega: true },
  { label: "Industries", href: getPage("industries").url },
  { label: "Results", href: getPage("results").url },
  { label: "Guides", href: getPage("guides").url },
  { label: "About", href: getPage("about").url },
  { label: "Contact", href: getPage("contact").url },
];
