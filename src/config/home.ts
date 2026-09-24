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

/* ── Trusted by ─────────────────────────────────────────────────────────────
   The client logo band under the hero. A logo here is a public claim that the
   business is a client, so it is never filled with stand-ins.

   Files live in public/media/clients/, full colour. The band greys them out
   and restores the real colours on hover.

     width/height  The file's intrinsic size. Only the ratio is used: the band
                   sizes every logo to the same visual area, so a wide wordmark
                   and a square badge carry the same weight.
     tone          What the logo's real colours need behind them. "dark" logos
                   (dark ink) get a light tile on hover, or they would vanish
                   into the page; "light" logos stay on the dark page.
     idle          "silhouette" flattens to white at rest. "grayscale" is for
                   illustrated marks, which flatten into a solid blob.

   TODO: the real client count for the label (e.g. "100+"). */
export type ClientLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
  tone: "dark" | "light";
  idle?: "silhouette" | "grayscale";
  /**
   * Optical correction on top of the equal-area sizing. Equal area gets most
   * of the way; the rest is how heavy a mark reads. Dense or heavy wordmarks
   * (Grindcorp, Survaid) read bigger than their box and sit below 1; hairline
   * or compact marks (Lucent Epoxy, Forefront Trades) read smaller and sit
   * above. Set by rendering the whole set at display size and looking at it.
   */
  scale?: number;
};

export const trustedBy: { count: string; logos: ClientLogo[] } = {
  count: "", // TODO
  logos: [
    { name: "Wells Roofing", src: "/media/clients/wells-roofing.avif", width: 1080, height: 415, tone: "dark" },
    { name: "Demo Bros", src: "/media/clients/demo-bros.svg", width: 334, height: 330, tone: "light", idle: "grayscale" },
    { name: "Formline Joinery", src: "/media/clients/formline-joinery.svg", width: 600, height: 107, tone: "dark" },
    { name: "Fintellect", src: "/media/clients/fintellect.svg", width: 800, height: 687, tone: "light" },
    { name: "By Willow", src: "/media/clients/by-willow.svg", width: 1000, height: 170, tone: "dark" },
    { name: "Heartbreaker", src: "/media/clients/heartbreaker.svg", width: 830, height: 53, tone: "light" },

    /* ── From the CLIENT LOGOS 2.0 pack, 24 Sep 2026 ────────────────────────
       Trimmed to the ink and fitted inside 720x280. The originals were mostly
       a 5906px square with the mark in a fraction of it, which renders as a
       small logo floating in a large empty box.

       Colour file chosen per client: "FullColor Light" where it exists (made
       for dark backgrounds), then "Full Color", then White for clients who
       supplied no colour version. Two exceptions, both checked by rendering
       the hover state: Blinds Corp uses White because its colour version is
       cream and grey and its wordmark went dim on hover; True Align uses its
       dark-ink file on a light tile because its light file has navy figures
       that vanished against the page.

       Demo Bros, Formline Joinery, Heartbreaker and Wells Roofing were already
       above with hand-made files and are not duplicated. */
    { name: "King Electrical", src: "/media/clients/king-electrical.png", width: 720, height: 126, tone: "light" },
    { name: "Weyn Constructions", src: "/media/clients/weyn-constructions.png", width: 465, height: 280, tone: "dark" },
    { name: "5Star Bath & Kitchen", src: "/media/clients/5star-bath-and-kitchen.png", width: 648, height: 280, tone: "dark" },
    { name: "Lumenx", src: "/media/clients/lumenx.png", width: 720, height: 135, tone: "light" },
    { name: "Aust Construct", src: "/media/clients/aust-construct.png", width: 628, height: 280, tone: "light" },
    { name: "Mr. Tile Removal", src: "/media/clients/mr-tile-removal.png", width: 720, height: 191, tone: "light", idle: "grayscale", scale: 0.92 },
    { name: "A&A Flooring & Blinds", src: "/media/clients/a-and-a-flooring-and-blinds.png", width: 516, height: 280, tone: "dark" },
    { name: "Grindcorp", src: "/media/clients/grindcorp.png", width: 720, height: 111, tone: "light", scale: 0.86 },
    { name: "Top Spot Blinds", src: "/media/clients/top-spot-blinds.png", width: 563, height: 280, tone: "dark" },
    { name: "Survaid", src: "/media/clients/survaid.png", width: 720, height: 182, tone: "dark", scale: 0.9 },
    { name: "Forefront Trades Co", src: "/media/clients/forefront-trades-co.png", width: 344, height: 280, tone: "light", scale: 1.15 },
    { name: "Kitchen & Bath Co", src: "/media/clients/kitchen-and-bath-co.png", width: 720, height: 70, tone: "light", scale: 0.88 },
    { name: "Deslar Group", src: "/media/clients/deslar-group.png", width: 720, height: 198, tone: "light", scale: 0.9 },
    { name: "LiftX", src: "/media/clients/liftx.png", width: 601, height: 280, tone: "dark" },
    { name: "Bathroom & Balconies", src: "/media/clients/bathroom-and-balconies.png", width: 720, height: 251, tone: "dark" },
    { name: "Compare AirConditioning", src: "/media/clients/compare-airconditioning.png", width: 720, height: 133, tone: "dark", scale: 0.88 },
    { name: "Pititto Projects", src: "/media/clients/pititto-projects.png", width: 593, height: 280, tone: "light", scale: 0.9 },
    { name: "Mr. Site Cleanups", src: "/media/clients/mr-site-cleanups.png", width: 720, height: 179, tone: "light", idle: "grayscale", scale: 0.92 },
    { name: "Blinds Corp", src: "/media/clients/blinds-corp.png", width: 334, height: 280, tone: "light", scale: 1.05 },
    { name: "Australasian Home", src: "/media/clients/australasian-home.png", width: 720, height: 232, tone: "dark" },
    { name: "Lucent Epoxy", src: "/media/clients/lucent-epoxy.png", width: 240, height: 280, tone: "light", scale: 1.22 },
    { name: "Rock Up Group", src: "/media/clients/rock-up-group.png", width: 614, height: 280, tone: "light" },
    { name: "True Align", src: "/media/clients/true-align.png", width: 463, height: 280, tone: "dark", scale: 1.05 },
    { name: "Forefront Community Care", src: "/media/clients/forefront-community-care.png", width: 720, height: 209, tone: "light" },
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
