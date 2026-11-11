/**
 * LOCATION PAGE CONTENT
 *
 * ── The risk these pages carry ──────────────────────────────────────────────
 * Twelve pages whose only difference is a city name is the textbook definition
 * of a doorway page, and Google has been demoting that pattern for over a
 * decade. It is also the single most common thing agencies build for
 * themselves, which means the competing pages are usually thin too.
 *
 * The defence is that each page has to say something only true of that city.
 * So every entry below carries `local`, which is a real observation about the
 * market there, and `suburbs`, which are real places. If a new city is added
 * and nobody can write a `local` paragraph for it, that city does not get a
 * page. A template with the name swapped is worse than no page: it puts the
 * whole domain's quality signal at risk to chase one term.
 *
 * ⚠️  TODO before launch: John should check every `local` paragraph. These are
 *     written from general knowledge of Australian capital city markets, not
 *     from Sika's client data. If one is wrong, it is wrong in front of exactly
 *     the people who would know.
 *
 * ⚠️  No page here claims Sika has an office in that city, and none should.
 *     The business is Melbourne based and works Australia wide, which is what
 *     `remote` says on every page. Implying a local office would be a false
 *     claim, and for local SEO specifically it is the one that gets a Google
 *     Business Profile suspended.
 */

export type LocationDetail = {
  /** Matches the page key in config/pages. */
  key: string;
  /** City name as written in copy. */
  city: string;
  /** The service this page is about, as an eyebrow. */
  eyebrow: string;
  /** One sentence under the H1. */
  intro: string;
  /** What is genuinely different about this market. Two paragraphs. */
  localHeading: string;
  local: string[];
  /** Real areas. Used to show the page knows the city. */
  suburbs: string[];
  /** Which service pages this one supports. Keys from config/pages. */
  related: string[];
};

export const locations: LocationDetail[] = [
  /* ── Sydney ───────────────────────────────────────────────────────────── */
  {
    key: "seo-sydney",
    city: "Sydney",
    eyebrow: "SEO in Sydney",
    intro:
      "The most contested search market in the country, and the one where a suburb in the query changes everything.",
    localHeading: "Sydney is not one market. It is about forty.",
    local: [
      "Chasing a city-wide term in Sydney means competing with agencies and franchises spending more than most trades turn over. Chasing the same service across the North Shore, the Inner West and the Sutherland Shire separately is a different and far winnable job, because each of those behaves like its own town with its own price expectations.",
      "Geography does the rest. The harbour and the distances mean people genuinely will not cross the city for a trade, which makes proximity a bigger ranking factor here than almost anywhere, and makes a page per real area worth more than a page about Sydney.",
    ],
    suburbs: [
      "Inner West",
      "North Shore",
      "Eastern Suburbs",
      "Northern Beaches",
      "Sutherland Shire",
      "Hills District",
      "Parramatta",
    ],
    related: ["seo", "local-seo", "web-design"],
  },
  {
    key: "local-seo-sydney",
    city: "Sydney",
    eyebrow: "Local SEO in Sydney",
    intro:
      "In a city this spread out, the map pack is the search result, and proximity decides most of it.",
    localHeading: "Where you are based matters more here than anywhere.",
    local: [
      "Google weights distance heavily in the map pack, and Sydney's geography exaggerates it. A business in Chatswood is not appearing in Cronulla results, and no amount of optimisation changes that, so the honest version of local SEO in Sydney starts with drawing a realistic radius.",
      "Inside that radius there is normally a lot to win, because most competitors have an incomplete profile, inconsistent details across directories, and reviews that stopped arriving two years ago.",
    ],
    suburbs: [
      "Inner West",
      "North Shore",
      "Eastern Suburbs",
      "Northern Beaches",
      "Sutherland Shire",
      "Hills District",
    ],
    related: ["local-seo", "seo", "reputation-management"],
  },
  {
    key: "google-ads-sydney",
    city: "Sydney",
    eyebrow: "Google Ads in Sydney",
    intro:
      "The highest click costs in Australia, which makes the wasted half of them the most expensive waste in the country.",
    localHeading: "Expensive clicks make the boring work worth more.",
    local: [
      "Sydney has the most competed auctions in the country, and the same junk searches everyone else is buying cost more here. That flips the economics of management: cutting waste in an expensive market returns more than adding budget in a cheap one.",
      "Radius targeting matters more here too. A default state-wide setting in Sydney means paying premium prices for enquiries two hours from anywhere you would actually drive.",
    ],
    suburbs: [
      "Inner West",
      "North Shore",
      "Eastern Suburbs",
      "Northern Beaches",
      "Parramatta",
      "Sutherland Shire",
    ],
    related: ["google-ads", "ppc-management", "cro"],
  },
  {
    key: "web-design-sydney",
    city: "Sydney",
    eyebrow: "Web design in Sydney",
    intro:
      "A market where everyone's site looks expensive, which makes the ones that load quickly and ask for the job stand out more, not less.",
    localHeading: "Looking the part is table stakes here.",
    local: [
      "Sydney businesses generally spend more on design than the rest of the country, so a good-looking site is the baseline rather than the advantage. The gap that is still open is between sites that look good and sites that convert, and it is a wide one.",
      "It is also a market with a lot of agency churn, which means many sites carry three generations of half-finished work: an old blog nobody removed, tracking from two agencies ago, and a page builder underneath it all.",
    ],
    suburbs: [
      "CBD",
      "Surry Hills",
      "North Sydney",
      "Parramatta",
      "Inner West",
      "Eastern Suburbs",
    ],
    related: ["web-design", "cro", "seo"],
  },
  {
    key: "dma-sydney",
    city: "Sydney",
    eyebrow: "Digital marketing in Sydney",
    intro:
      "More agencies per square kilometre than anywhere in the country, and the same three problems in most accounts we are shown.",
    localHeading: "The most agency-saturated market in Australia.",
    local: [
      "Sydney businesses have usually been through several agencies before they look for another, which means they arrive knowing exactly what they do not want: monthly reports full of impressions, a contract they cannot leave, and an account manager relaying questions.",
      "It also means the accounts have layers. Old conversion tags nobody turned off, three tracking systems disagreeing, and campaigns built by someone who left in 2023. Untangling that is usually the first month's work and it is where most of the early gains are.",
    ],
    suburbs: [
      "CBD",
      "North Sydney",
      "Parramatta",
      "Inner West",
      "Eastern Suburbs",
      "Northern Beaches",
    ],
    related: ["services", "seo", "google-ads"],
  },

  /* ── Brisbane ─────────────────────────────────────────────────────────── */
  {
    key: "seo-brisbane",
    city: "Brisbane",
    eyebrow: "SEO in Brisbane",
    intro:
      "A market growing faster than the number of businesses competing properly in it.",
    localHeading: "Less contested than the southern capitals, and it will not stay that way.",
    local: [
      "Brisbane search is genuinely easier to win than Sydney or Melbourne for most service terms, because population has grown faster than the number of local businesses doing search well. Terms that would be out of reach down south are realistic here.",
      "That window is closing rather than opening. The businesses that establish now are the ones that will be difficult to displace once the market catches up, which makes timing more of an argument here than anywhere else in the country.",
    ],
    suburbs: [
      "Brisbane CBD",
      "Northside",
      "Southside",
      "Ipswich",
      "Logan",
      "Redlands",
      "Moreton Bay",
    ],
    related: ["seo", "local-seo", "web-design"],
  },
  {
    key: "local-seo-brisbane",
    city: "Brisbane",
    eyebrow: "Local SEO in Brisbane",
    intro:
      "A city that sprawls into several others, which makes where you say you work more important than where you are.",
    localHeading: "The boundaries are blurrier here.",
    local: [
      "Brisbane runs into Ipswich, Logan, Moreton Bay and the Redlands with no obvious edge, and customers do not think in council boundaries. Service areas set to Brisbane alone miss a large share of the people who consider themselves local to you.",
      "Review volume is also generally lower here than in Sydney or Melbourne, which cuts both ways: less to catch up on, and a steady review habit moves you further, faster.",
    ],
    suburbs: [
      "Northside",
      "Southside",
      "Ipswich",
      "Logan",
      "Redlands",
      "Moreton Bay",
    ],
    related: ["local-seo", "reputation-management", "seo"],
  },
  {
    key: "google-ads-brisbane",
    city: "Brisbane",
    eyebrow: "Google Ads in Brisbane",
    intro:
      "Cheaper clicks than the southern capitals, which is exactly why accounts here get left alone for longer.",
    localHeading: "Cheap clicks hide waste for longer.",
    local: [
      "Because a click costs less here, an account can waste a large share of its budget for a long time without anyone noticing. The percentage of spend going nowhere is often the same as Sydney; it just takes longer to feel it.",
      "The upside is that the fixes go further. The same negative keyword work that recovers a modest amount in an expensive market recovers a larger share of the traffic here, because the budget buys more clicks to begin with.",
    ],
    suburbs: [
      "Brisbane CBD",
      "Northside",
      "Southside",
      "Ipswich",
      "Logan",
      "Moreton Bay",
    ],
    related: ["google-ads", "ppc-management", "lead-generation"],
  },
  {
    key: "web-design-brisbane",
    city: "Brisbane",
    eyebrow: "Web design in Brisbane",
    intro:
      "A lot of good local businesses with sites built once, five years ago, by someone who has since stopped answering.",
    localHeading: "The most common brief here is a rescue.",
    local: [
      "Brisbane has a lot of established trade and service businesses whose websites were built once and then left. The business grew, the site did not, and nobody has the login for the hosting.",
      "That makes the first job an unglamorous one: finding out who actually owns the domain, the hosting and the analytics, and getting all three into the client's name before anything else happens. It is worth doing even if nothing else is.",
    ],
    suburbs: [
      "Brisbane CBD",
      "Northside",
      "Southside",
      "Ipswich",
      "Logan",
      "Redlands",
    ],
    related: ["web-design", "wordpress-web-design", "cro"],
  },

  /* ── Adelaide ─────────────────────────────────────────────────────────── */
  {
    key: "seo-adelaide",
    city: "Adelaide",
    eyebrow: "SEO in Adelaide",
    intro:
      "A small enough market that word of mouth still decides a lot, and search decides who gets checked first.",
    localHeading: "Reputation travels faster in a smaller city.",
    local: [
      "Adelaide is small enough that a lot of work still arrives by recommendation. What search changes is the step after: someone is given your name, looks you up, and decides in about twenty seconds whether to ring.",
      "That makes the shape of the work different here. Ranking for broad terms matters less than being findable and credible for your own name, and having a listing and a site that survive being checked by somebody who was already inclined to call.",
    ],
    suburbs: [
      "Adelaide CBD",
      "Eastern Suburbs",
      "Western Suburbs",
      "Northern Suburbs",
      "Southern Suburbs",
      "Adelaide Hills",
    ],
    related: ["seo", "local-seo", "reputation-management"],
  },

  /* ── Perth ────────────────────────────────────────────────────────────── */
  {
    key: "seo-perth",
    city: "Perth",
    eyebrow: "SEO in Perth",
    intro:
      "The most isolated capital in the world, which turns out to matter for search.",
    localHeading: "Distance shapes the whole market.",
    local: [
      "Perth's isolation means less competition from eastern states businesses and a market that behaves more like its own country than a state capital. Local terms are frequently winnable at a difficulty that would be unthinkable in Sydney.",
      "The city is also long and thin, running north to south along the coast, which makes service area a real constraint. A business in Joondalup and one in Rockingham are ninety minutes apart and are not competing with each other, whatever a keyword tool says.",
    ],
    suburbs: [
      "Perth CBD",
      "Northern Suburbs",
      "Southern Suburbs",
      "Eastern Suburbs",
      "Fremantle",
      "Joondalup",
      "Rockingham",
    ],
    related: ["seo", "local-seo", "web-design"],
  },
  {
    key: "web-design-perth",
    city: "Perth",
    eyebrow: "Web design in Perth",
    intro:
      "A market where a lot of the work is tied to resources and construction cycles, and the sites rarely reflect that.",
    localHeading: "The buying cycle here is not the retail one.",
    local: [
      "A lot of Perth service businesses sell into construction, mining services and trades that work on project timelines. The decision is slower, the value is higher, and the person doing the research is often not the one who signs.",
      "Which means a site that works here looks different: capability rather than offers, evidence rather than urgency, and something a person can send internally to someone else. Most templates are built for the opposite.",
    ],
    suburbs: [
      "Perth CBD",
      "Northern Suburbs",
      "Southern Suburbs",
      "Fremantle",
      "Joondalup",
    ],
    related: ["web-design", "seo", "content-marketing"],
  },
];

export const getLocation = (key: string) => {
  const found = locations.find((l) => l.key === key);
  if (!found) throw new Error(`Unknown location: ${key}`);
  return found;
};
