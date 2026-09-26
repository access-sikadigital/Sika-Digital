import { getPage } from "@/config/pages";

/**
 * HOMEPAGE CONTENT
 *
 * Kept out of the section components so copy can be edited without touching
 * animation code, and so it is obvious in one place what is confirmed and what
 * is still a guess.
 *
 * ⚠️  Anything marked TODO is my drafting, not Sika's stated position. It is
 *     written plainly rather than in agency language, but it still describes
 *     how a real business works and needs John's confirmation before launch.
 */

/* ── The hero ───────────────────────────────────────────────────────────────
   Lifted word for word from Sika's own cover artwork, so the site opens on the
   same line the brand already uses everywhere else. Three beats, one per line;
   the last is the payoff and is the one set on the lime highlight. */
export const hero = {
  lines: ["Get found.", "Get clicks."],
  highlight: "Get customers.",
  services: ["Websites", "SEO", "Paid Ads", "AI Search"],
} as const;

/* ── Service ticker ─────────────────────────────────────────────────────────
   The lime band under the hero. `label` is the name people search and say;
   `key` is the page in config/pages it links to, resolved through getPage so a
   moved URL can never leave a dead link here.

   "Meta Ads" rather than "Facebook Ads": Meta is the current name of the
   platform and the term the market uses. It links to the Facebook & Instagram
   page, which is where that service lives. */
export const serviceTicker = [
  { label: "SEO", key: "seo" },
  { label: "Google Ads", key: "google-ads" },
  { label: "Meta Ads", key: "facebook-ads" },
  { label: "Local SEO", key: "local-seo" },
  { label: "Web Design", key: "web-design" },
] as const;

/* ── Trusted by ─────────────────────────────────────────────────────────────
   The client logo band under the hero, and the grid on the results page. A
   logo here is a public claim that the business is a client. All below are
   real clients who have agreed to be listed (confirmed 24 Sep 2026).

   Every client has TWO files, and that is deliberate.

     white   Shown at rest. The client's own white version, so every logo in
             the band is the same clean white.
     src     Shown on hover, on a frosted glass tile. Real colours, in the
             version made for a DARK background, because the glass is dark.

   One file with a CSS filter cannot do this: a filter can flatten a logo to
   white, but it cannot turn a navy-on-white logo into one that reads on dark.

   How each hover file was chosen, every one checked by rendering it on glass:
     · Official "FullColor Light" (made for dark backgrounds) where supplied:
       King Electrical, Lumenx, Forefront Community Care, Demo Bros and
       Mr. Site Cleanups. Used as supplied.
     · Derived, where the client only supplied colour for LIGHT backgrounds:
       5Star, A&A, Australasian, Bathroom & Balconies, Compare, LiftX, Survaid,
       Top Spot, Weyn, True Align, Forefront Trades Co, Wells. Built the way
       the official Light versions are: dark ink (navy, charcoal, purple) goes
       white, brand accents (the reds, oranges, bright blues) are kept exactly.
       ⚠️  These are our derivations, not files the clients supplied. If any
       client has an official dark-background version, use theirs instead.
     · Formline Joinery: its original olive reads on glass, used as supplied.
     · Heartbreaker and By Willow: their real colours (maroon #501010, dark
       brown #4E2D1E) measure about 1:1 against the glass, so they are
       invisible in their exact shade. Kept at the SAME hue and saturation,
       with only the lightness raised until they reach 3.2:1: Heartbreaker
       #D73737, By Willow #AA6241. Recognisably their colour, and visible.
     · Blinds Corp: its cream B is kept; only the dark grey wordmark, which
       vanished on glass, is turned white.
     · White on hover too, for the six who supplied only White and Black:
       Aust Construct, Deslar, Grindcorp, Pititto and Rock Up.
     · Fintellect: the "F." mark supplied 26 Sep 2026, in its brand green
       #206943, sampled from their own site. (An earlier version used cream
       #FBFEEE, which is their BACKGROUND colour, not the mark's.) Used at the
       exact shade, at John's request, although it sits at 2.3:1 on the glass,
       dimmer than the rest. If it reads too dark, the same hue lifted to
       #2F9A62 is the fallback. The original SVG used currentColor, which
       renders black as an image, so the fill is set explicitly.

   ⚠️  After adding or replacing ANY file in public/media/clients, run
       `node scripts/hash-logos.mjs`. Filenames carry a content hash because
       images are cached for a year; replace a file under the same name and
       visitors keep seeing the old one. See next.config.ts.

   Each pair is trimmed and centred on an identical canvas, so the swap on
   hover is pixel-aligned and nothing shifts.

     width/height  The shared canvas size. Only the ratio is used: the band
                   sizes every logo to the same visual area.
     scale         Optical correction on top of equal area. Dense or heavy
                   marks read bigger than their box and sit below 1; compact or
                   hairline marks read smaller and sit above. Set by rendering
                   the whole set at display size and looking at it.

   TODO: the real client count for the label (e.g. "100+"). */
export type ClientLogo = {
  name: string;
  /** Hover. Real colours, made for a light background. */
  src: string;
  /** Rest. The white version. */
  white: string;
  width: number;
  height: number;
  scale?: number;
};

export const trustedBy: { count: string; logos: ClientLogo[] } = {
  count: "", // TODO
  logos: [
    { name: "King Electrical", src: "/media/clients/king-electrical.2acb0952.png", white: "/media/clients/king-electrical-white.80fb1b25.png", width: 720, height: 126 },
    { name: "Weyn Constructions", src: "/media/clients/weyn-constructions.f35da1e3.png", white: "/media/clients/weyn-constructions-white.4949bfb9.png", width: 465, height: 280 },
    { name: "Wells Roofing", src: "/media/clients/wells-roofing.b3093e7d.png", white: "/media/clients/wells-roofing-white.0f5e41c5.png", width: 718, height: 280 },
    { name: "5Star Bath & Kitchen", src: "/media/clients/5star-bath-and-kitchen.6861882a.png", white: "/media/clients/5star-bath-and-kitchen-white.204fa349.png", width: 648, height: 280 },
    { name: "Lumenx", src: "/media/clients/lumenx.c6f4fd18.png", white: "/media/clients/lumenx-white.8d38ad6d.png", width: 720, height: 135 },
    { name: "Demo Bros", src: "/media/clients/demo-bros.1e65756c.png", white: "/media/clients/demo-bros-white.e2753b0b.png", width: 284, height: 280, scale: 1.05 },
    { name: "Aust Construct", src: "/media/clients/aust-construct.b253fa24.png", white: "/media/clients/aust-construct-white.b253fa24.png", width: 628, height: 280 },
    { name: "A&A Flooring & Blinds", src: "/media/clients/a-and-a-flooring-and-blinds.1314f7cc.png", white: "/media/clients/a-and-a-flooring-and-blinds-white.5530ed1e.png", width: 516, height: 280 },
    { name: "Grindcorp", src: "/media/clients/grindcorp.ebb846b6.png", white: "/media/clients/grindcorp-white.ebb846b6.png", width: 720, height: 111, scale: 0.86 },
    { name: "Fintellect", src: "/media/clients/fintellect.32c9eaa7.svg", white: "/media/clients/fintellect-white.a44c30b8.svg", width: 677, height: 800, scale: 1.1 },
    { name: "Top Spot Blinds", src: "/media/clients/top-spot-blinds.f321ab21.png", white: "/media/clients/top-spot-blinds-white.475cc893.png", width: 563, height: 280 },
    { name: "Survaid", src: "/media/clients/survaid.77acd1ec.png", white: "/media/clients/survaid-white.8e6df2fe.png", width: 720, height: 182, scale: 0.9 },
    { name: "Forefront Trades Co", src: "/media/clients/forefront-trades-co.2358e23c.png", white: "/media/clients/forefront-trades-co-white.304e761b.png", width: 720, height: 148 },
    { name: "Kitchen & Bath Co", src: "/media/clients/kitchen-and-bath-co.67c5d8b1.png", white: "/media/clients/kitchen-and-bath-co-white.7936bd85.png", width: 720, height: 70, scale: 0.88 },
    { name: "Deslar Group", src: "/media/clients/deslar-group.050abe32.png", white: "/media/clients/deslar-group-white.050abe32.png", width: 720, height: 198, scale: 0.9 },
    { name: "LiftX", src: "/media/clients/liftx.f92c0491.png", white: "/media/clients/liftx-white.eaa5d959.png", width: 601, height: 280 },
    { name: "Formline Joinery", src: "/media/clients/formline-joinery.90c55c06.png", white: "/media/clients/formline-joinery-white.99009f85.png", width: 720, height: 129, scale: 0.9 },
    { name: "Bathroom & Balconies", src: "/media/clients/bathroom-and-balconies.b89a9f4b.png", white: "/media/clients/bathroom-and-balconies-white.4e060fbf.png", width: 720, height: 251 },
    { name: "Compare AirConditioning", src: "/media/clients/compare-airconditioning.9d5cdecc.png", white: "/media/clients/compare-airconditioning-white.4452c98d.png", width: 720, height: 133, scale: 0.88 },
    { name: "By Willow", src: "/media/clients/by-willow.af30bc8a.svg", white: "/media/clients/by-willow-white.af6d0195.svg", width: 1000, height: 170 },
    { name: "Pititto Projects", src: "/media/clients/pititto-projects.0fdf65d0.png", white: "/media/clients/pititto-projects-white.0fdf65d0.png", width: 593, height: 280, scale: 0.9 },
    { name: "Mr. Site Cleanups", src: "/media/clients/mr-site-cleanups.fb7652df.png", white: "/media/clients/mr-site-cleanups-white.d5a83e0f.png", width: 720, height: 179, scale: 0.92 },
    { name: "Blinds Corp", src: "/media/clients/blinds-corp.2e18ca7c.png", white: "/media/clients/blinds-corp-white.1502eb78.png", width: 334, height: 280, scale: 1.05 },
    { name: "Heartbreaker Ink", src: "/media/clients/heartbreaker-ink.f2d1de40.png", white: "/media/clients/heartbreaker-ink-white.54dec076.png", width: 720, height: 38, scale: 1.1 },
    { name: "Australasian Home", src: "/media/clients/australasian-home.f53dd9c9.png", white: "/media/clients/australasian-home-white.c5a53509.png", width: 720, height: 232 },
    { name: "Rock Up Group", src: "/media/clients/rock-up-group.62053168.png", white: "/media/clients/rock-up-group-white.62053168.png", width: 614, height: 280 },
    { name: "True Align", src: "/media/clients/true-align.d18abbbd.png", white: "/media/clients/true-align-white.f27abd97.png", width: 463, height: 280, scale: 1.05 },
    { name: "Forefront Community Care", src: "/media/clients/forefront-community-care.acb2d74e.png", white: "/media/clients/forefront-community-care-white.511923a2.png", width: 720, height: 209 },
  ],
};

/* ── The opening statement ──────────────────────────────────────────────────
   Four words. The section that carries this is built around a sequence, so the
   headline only has to land the idea and get out of the way.

   TODO: this is the closest thing on the page to the positioning one-liner
   (Open Question #1). Rewrite once that is settled. */
export const introStatement = "We build the whole thing.";

/* ── The chain ──────────────────────────────────────────────────────────────
   The sentence that used to be the statement, broken into its four verbs and
   laid out as a sequence. The copy becomes the layout: each verb is a service
   line, and reading left to right is the order the work actually happens in.

   Deliberately no comparison to other agencies. A "most agencies do X, we do Y"
   framing is easy to write and it puts a competitor in the reader's head at the
   exact moment you want them thinking about you.

   Each verb maps to a real service group, so this cannot advertise something
   the site has no page for. */
export type ChainLink = { n: string; verb: string; object: string };

export const introChain: ChainLink[] = [
  { n: "01", verb: "Build", object: "the website" },
  { n: "02", verb: "Rank", object: "it in search" },
  { n: "03", verb: "Fill", object: "it with traffic" },
  { n: "04", verb: "Wire", object: "the follow-up" },
];

/* ── Process ────────────────────────────────────────────────────────────────
   Four steps. Three feels thin for a considered purchase, six is more than
   anyone reads.

   TODO: confirm this is how Sika actually runs an engagement. */
export type Step = {
  n: string;
  title: string;
  copy: string;
  /** What the step covers, shown as tick chips. Short nouns, no claims. */
  tags: string[];
};

export const processSteps: Step[] = [
  {
    n: "01",
    title: "We look at what you have",
    copy: "Your website, your Google Business Profile, your ad accounts. We find where the enquiries are going missing before anyone talks about budget.",
    tags: ["Website review", "Google Business Profile", "Ad accounts", "Tracking check"],
  },
  {
    n: "02",
    title: "We tell you what we would do",
    copy: "A plan with an order to it, and the reasoning behind each piece. If the first fix is something you can do yourself, we will say so.",
    tags: ["Priority order", "Channel plan", "Budget guide", "Quick wins first"],
  },
  {
    n: "03",
    title: "We build it",
    copy: "Website, tracking, campaigns and the follow-up that catches the lead. In house, so there is one team accountable for the whole thing.",
    tags: ["Websites", "Google Ads", "Meta Ads", "Landing pages", "Call tracking", "Follow-up automation"],
  },
  {
    n: "04",
    title: "We report on what it did",
    copy: "Leads and revenue, not impressions. If something is not working we change it rather than explaining it.",
    tags: ["Lead tracking", "Cost per lead", "Revenue by source", "Monthly review"],
  },
];

/* ── Service previews ───────────────────────────────────────────────────────
   A short clip per service, shown in a panel that follows the cursor while a
   row is hovered on the homepage services list.

   Keyed by the service group's href so it cannot drift out of step with the
   nav. A group with no entry simply shows no preview, and the row still
   highlights, so the section is complete either way.

   ── What to supply ────────────────────────────────────────────────────────
   · 4 to 8 seconds, silent, seamless loop
   · 16:9, 960px wide is plenty at the size it renders
   · H.264 MP4, well compressed. These are decorative and five of them load on
     one page, so keep each under about 600KB
   · Screen recordings of real work beat stock every time here. A slow scroll
     of a site you built, an ads dashboard, a search results page. It is proof
     rather than decoration, and it is the argument the scope says this site
     has to make.

   TODO: drop files in public/media/services/ and fill these in. */
export const servicePreviews: Record<string, string> = {
  // "/web-design/": "/media/services/web.mp4",
  // "/seo/": "/media/services/seo.mp4",
  // "/google-ads/": "/media/services/ads.mp4",
  // "/facebook-ads/": "/media/services/social.mp4",
  // "/lead-generation/": "/media/services/systems.mp4",
};

/* ── Industries ─────────────────────────────────────────────────────────────
   Built from the real industry pages in the IA, so this list cannot advertise
   a vertical that has no page behind it.

   ── The image slot ────────────────────────────────────────────────────────
   `image` is optional on purpose. Leave it off and the card draws a designed
   typographic panel instead, which is a finished state rather than a hole with
   an alt tag in it. Set it and the photo takes over with no other change.

   ── What to supply ────────────────────────────────────────────────────────
   · Portrait, 4:5. 1000 x 1250 is plenty at the size these render.
   · Real work. Someone on a job, a van, a board, a site. A face is better than
     a tool, and a tool is better than a building.
   · Landscape crops do not work here. The card is a tall frame and a wide
     photo will centre-crop to somebody's midriff.
   · Under about 250KB each, JPG or WebP. Four load at once.

   ⚠️  Do NOT fill these with stock. The whole argument this site makes is that
       a generic site loses work, and four stock tradies on the homepage would
       be the site disproving itself. Replace these with real work as it
       becomes available, one at a time. */
export type Industry = {
  key: string;
  label: string;
  blurb: string;
  href: string;
  /**
   * Path under /public. Required.
   *
   * This was optional while the section drew a typographic panel for any entry
   * without a photo. The panel layout that replaced it has no such fallback:
   * a panel is a photograph with a label over it and there is nothing to show
   * if the photograph is missing.
   *
   * So the type enforces it. Commenting out a path here is a build error,
   * which is the correct outcome: the alternative is `next/image` receiving
   * `undefined` and throwing at runtime, on the homepage, in production.
   */
  image: string;
  /**
   * `object-position` for the crop.
   *
   * Every photo here is landscape going into a 4:5 portrait frame, so a large
   * part of the width is discarded and the default centre crop is wrong for
   * most of them: the middle of a work photo is usually a wall or a tool
   * rather than a face.
   *
   * ── How much is actually kept ─────────────────────────────────────────────
   * The kept fraction is (4/5) / (source aspect ratio), and it varies a lot
   * more than it looks like it should:
   *
   *   electricians  5385 x 3590  (1.50:1)  keeps 53% of the width
   *   tradies       3:2                    keeps 53%
   *   builders      3:2                    keeps 53%
   *   plumbers      5472 x 2923  (1.87:1)  keeps 43%
   *
   * So the same percentage means a different crop on each file. These were set
   * by working out where the subject lands inside the kept window, not by eye
   * on the full frame, which is why several are nowhere near 50%.
   *
   * The vertical figure does nothing at exactly 4:5 with a landscape source,
   * since the full height is used. It is here so the crops stay sane if the
   * frame aspect is ever changed.
   */
  focus?: string;
};

export const industries: Industry[] = [
  {
    key: "tradies",
    label: "Tradies",
    blurb: "Run by someone who held a licence for twelve years.",
    href: getPage("tradies").url,
    image: "/media/industries/tradies.jpg",
    /* Crew of five. The frame cannot hold all of them, so it centres on the
       man with the drawings and keeps the two either side of him. */
    focus: "52% 40%",
  },
  {
    key: "electricians",
    label: "Electricians",
    blurb: "More switchboard work, fewer callouts you do not want.",
    href: getPage("electricians").url,
    image: "/media/industries/electricians.jpg",
    /* His head sits between 61% and 99% of the width, so the crop has to run
       all the way to the right edge to hold it. Anything less clips his ear.
       Lands him at about 60% across the frame, with the switchboard and his
       hands filling the left. */
    focus: "100% 40%",
  },
  {
    key: "plumbers",
    label: "Plumbers",
    blurb: "Emergency, maintenance or renovation. Your pick.",
    href: getPage("plumbers").url,
    image: "/media/industries/plumbers.jpg",
    /* The widest source of the four, so the tightest crop: only 43% of the
       width survives. His head is at 33%, and at 26% the kept window runs
       14% to 57%, which puts him mid-frame and still catches the wrench and
       the manifold he is working on. */
    focus: "26% 45%",
  },
  {
    key: "builders",
    label: "Builders",
    blurb: "Enquiries for the projects worth quoting on.",
    href: getPage("builders").url,
    image: "/media/industries/builders.jpg",
    /* Two men sitting, heads at roughly 28% and 50%. Centred between them so
       neither gets cut. A 50% crop would have taken the left man's arm off. */
    focus: "29% 45%",
  },
];
