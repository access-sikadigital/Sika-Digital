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
export type Step = { n: string; title: string; copy: string };

export const processSteps: Step[] = [
  {
    n: "01",
    title: "We look at what you have",
    copy: "Your website, your Google Business Profile, your ad accounts. We find where the enquiries are going missing before anyone talks about budget.",
  },
  {
    n: "02",
    title: "We tell you what we would do",
    copy: "A plan with an order to it, and the reasoning behind each piece. If the first fix is something you can do yourself, we will say so.",
  },
  {
    n: "03",
    title: "We build it",
    copy: "Website, tracking, campaigns and the follow-up that catches the lead. In house, so there is one team accountable for the whole thing.",
  },
  {
    n: "04",
    title: "We report on what it did",
    copy: "Leads and revenue, not impressions. If something is not working we change it rather than explaining it.",
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
