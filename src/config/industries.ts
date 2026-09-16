/**
 * INDUSTRY PAGE CONTENT
 *
 * One entry per trade. The page template reads from here, so adding a
 * carpenter or a roofer later is a config entry rather than a new page.
 *
 * ── Why these pages exist at all ────────────────────────────────────────────
 * The scope's keyword research puts this cluster at KD 6 to 17, the lowest
 * difficulty anywhere in the map, and names trade credibility as the thing no
 * generalist agency can copy. This is the cheapest ground Sika has.
 *
 * ── The content has to be different, even though the layout is not ──────────
 * Four pages targeting four near-identical phrases is exactly the shape Google
 * treats as doorway pages, and the way you avoid that is not a different
 * layout. It is different substance. So every entry below names real job
 * types, real searches and a real objection for that trade, and the `angle`
 * on each is a genuinely different argument:
 *
 *   tradies       job-type control, the umbrella case
 *   electricians  planned work versus callouts
 *   plumbers      the emergency trap
 *   builders      the long decision
 *
 * If a fifth trade is added and its angle is "we get you more leads", it does
 * not need a page.
 *
 * ⚠️  Nothing in here is a claim about results. Prices, volumes and timeframes
 *     are deliberately absent. The `wanted` and `unwanted` lists describe job
 *     types, not outcomes Sika has produced.
 *
 * ⚠️  TODO before launch: John should read every `unwanted` list. They are
 *     written from how these trades generally talk about their work, and if
 *     one of them is wrong for his actual clients it will be obvious to a
 *     reader in the trade and it will cost more credibility than it buys.
 */

export type Industry = {
  /** Matches the page key in config/pages. */
  key: string;
  label: string;
  /** Path under /public. */
  image: string;
  /** `object-position` for the crop. See the note in config/home. */
  focus: string;
  /** The one-line argument, under the H1. */
  intro: string;
  /** The section heading for this page's central idea. */
  angleHeading: string;
  /** Two or three paragraphs making that argument. */
  angle: string[];
  /** Job types worth chasing. */
  wanted: string[];
  /** Job types that fill a diary without filling a bank account. */
  unwanted: string[];
  /** What someone types. Written as real queries, lowercase, unpunctuated. */
  searches: { q: string; read: string }[];
  /** The first three things we would do. */
  first: { t: string; c: string }[];
};

export const industries: Industry[] = [
  {
    key: "tradies",
    label: "Tradies",
    image: "/media/industries/tradies.jpg",
    focus: "52% 40%",
    intro:
      "Most trade marketing is sold on how many leads it brings. The number was never the problem.",
    angleHeading: "A full diary and a bad month are the same week.",
    angle: [
      "You can be flat out and still finish the month behind, because half the work was small jobs that took a morning each, and the drive between them took longer than the job.",
      "Nobody sells against that. Every agency pitch is about volume, because volume is easy to show on a graph and easy to charge for. Which jobs arrived is harder to measure and it is the only thing that changes what you take home.",
      "So the work here starts with which jobs you want more of and which you would rather stop getting, and then everything is pointed at that. Sometimes that means spending less.",
    ],
    wanted: [
      "Work that takes more than a day",
      "Jobs where you are the only one quoting",
      "Repeat commercial and maintenance work",
      "Anything with a planned start date",
    ],
    unwanted: [
      "Twenty minute call-outs an hour away",
      "Quotes against five other trades",
      "Price shoppers who found you on a directory",
      "Jobs that pay in sixty days",
    ],
    searches: [
      {
        q: "electrician near me",
        read: "Needs someone now. Whoever is closest and answers.",
      },
      {
        q: "switchboard upgrade cost",
        read: "Planning. Weeks out. Worth far more and almost nobody targets it.",
      },
      {
        q: "cheapest tradie melbourne",
        read: "Will leave over fifty dollars. Not a customer.",
      },
    ],
    first: [
      {
        t: "Work out what a good job is worth to you",
        c: "Not revenue. What is left after the drive, the parts and the day it took. Most trades have never put a number on this and it changes every decision after it.",
      },
      {
        t: "Look at what is arriving now",
        c: "Your last fifty enquiries, sorted by what they actually were. The pattern is usually obvious within twenty and it is usually not what anyone expected.",
      },
      {
        t: "Point the spend at the gap",
        c: "More of the work you want, and an active effort to stop attracting the rest. Usually the same budget.",
      },
    ],
  },

  {
    key: "electricians",
    label: "Electricians",
    image: "/media/industries/electricians.jpg",
    focus: "100% 40%",
    intro:
      "Callouts keep the lights on. Planned work is where the year is actually made, and almost nobody markets for it.",
    angleHeading: "Two businesses, and most sparkies only market one.",
    angle: [
      "Emergency work finds you. Someone has no power, they search, they ring the first three. You compete on being found and on answering, and the margin is whatever you can charge at nine at night.",
      "Switchboard upgrades, rewires, solar, EV chargers, a maintenance contract with a body corporate. None of that is urgent. Nobody searches for it at midnight. It gets thought about for a year and booked in a week, and it is worth several times a callout.",
      "The marketing for those two things is not the same, and running only the first is why a lot of electricians are busy and tired. This is the part where having held a licence for twelve years is not a marketing line: it is the reason we know which jobs you would rather have.",
    ],
    wanted: [
      "Switchboard and meter box upgrades",
      "Full and partial rewires",
      "Solar, battery and EV charger installs",
      "Commercial maintenance and test-and-tag contracts",
    ],
    unwanted: [
      "One powerpoint, half an hour away",
      "Real estate call-outs at agency rates",
      "Quotes for someone who is getting six",
      "After-hours jobs that turn out to be a tripped RCD",
    ],
    searches: [
      {
        q: "emergency electrician near me",
        read: "Urgent and low margin. Worth being visible for, not worth building a strategy on.",
      },
      {
        q: "switchboard upgrade cost melbourne",
        read: "Researching a real job. This is the search worth owning and it is barely contested.",
      },
      {
        q: "ev charger installation at home",
        read: "Growing fast, high value, and most of your competition has no page for it.",
      },
      {
        q: "do i need to rewire my house",
        read: "Six months early. Answer it well and you are the one they call.",
      },
    ],
    first: [
      {
        t: "Build the pages the planned work searches for",
        c: "One page per job type, written properly. Most electrical sites have a services list with four words under each heading, which ranks for nothing and answers nobody.",
      },
      {
        t: "Split the ads by urgency",
        c: "Emergency terms and planned-work terms want different budgets, different hours and different landing pages. Run together, the urgent ones eat the budget by Tuesday.",
      },
      {
        t: "Fix the Google listing",
        c: "For a trade, the listing does more work than the website. Hours, service areas, job photos, and a habit of asking for reviews the same day you finish.",
      },
    ],
  },

  {
    key: "plumbers",
    label: "Plumbers",
    image: "/media/industries/plumbers.jpg",
    focus: "26% 45%",
    intro:
      "Emergency work is the easiest to get and the hardest to build on. It is also what most plumbing marketing sells you more of.",
    angleHeading: "The blocked drain trap.",
    angle: [
      "Emergency plumbing is the highest-volume search there is. It is also the most competitive, the most expensive per click, and the least loyal: nobody who found you at eleven at night remembers your name in March.",
      "Meanwhile hot water replacements, bathroom renovations, gas fitting and backflow testing are planned, higher value, repeatable, and searched for by people who will read a page before they ring.",
      "You need both. What you do not need is an agency quietly spending the whole budget on the first one because the lead count looks better, which is the single most common thing we find in a plumbing account.",
    ],
    wanted: [
      "Hot water system replacements",
      "Bathroom and kitchen renovations",
      "Gas fitting and appliance installs",
      "Backflow testing and compliance contracts",
    ],
    unwanted: [
      "Blocked drains at eleven at night for a flat fee",
      "Tenant call-outs an agent will dispute",
      "Jobs quoted against a call-centre franchise",
      "Anything that ends with a tap washer",
    ],
    searches: [
      {
        q: "emergency plumber near me",
        read: "The most expensive click in the trade. Be there, but cap it.",
      },
      {
        q: "hot water system replacement cost",
        read: "Planned, high value, and they are comparing before they ring.",
      },
      {
        q: "how long do hot water systems last",
        read: "A year out. The page that answers this is the page they come back to.",
      },
      {
        q: "gas fitter [suburb]",
        read: "Licensed work, less competition, and most sites bury it in a list.",
      },
    ],
    first: [
      {
        t: "Cap the emergency spend before anything else",
        c: "It will consume whatever it is given. A ceiling on it is usually the first time the planned-work side has ever had budget.",
      },
      {
        t: "Give the big jobs their own pages",
        c: "Hot water, bathrooms, gas. Each one is a different search, a different price and a different worry, and one services page cannot answer all three.",
      },
      {
        t: "Answer the questions they ask first",
        c: "What it costs, how long it takes, whether the floor comes up. The trade that answers those plainly gets the call, because everyone else made them ring to find out.",
      },
    ],
  },

  {
    key: "builders",
    label: "Builders",
    image: "/media/industries/builders.jpg",
    focus: "29% 45%",
    intro:
      "Nobody books a hundred thousand dollar extension off an ad. They spend a year deciding, and you either exist during that year or you do not.",
    angleHeading: "You are being chosen months before anyone contacts you.",
    angle: [
      "A trade with a two-hundred dollar job gets found and booked in the same hour. You do not. Somebody starts thinking about an extension in autumn, talks to their partner about it all winter, looks at twenty builders' work, and contacts three in spring.",
      "Which three is decided by what they saw while they were only looking. That is the entire job and it is why urgency-based marketing does nothing for builders and why lead-generation services sell you people who are shopping six quotes.",
      "So this is the one trade where the work is mostly proof. Finished jobs, photographed properly, on pages that say what they cost and how long they took. Then being findable for the specific thing they are searching, which is usually not the word builder.",
    ],
    wanted: [
      "Extensions and second storeys",
      "Knockdown rebuilds",
      "Full home renovations",
      "Repeat work through architects and designers",
    ],
    unwanted: [
      "Small repairs and maintenance",
      "Quoting sixth against five others",
      "Clients shopping purely on square metre rate",
      "Anyone who wants a price before a plan",
    ],
    searches: [
      {
        q: "home extension builder [suburb]",
        read: "Specific and ready. The main term worth owning locally.",
      },
      {
        q: "knockdown rebuild vs renovate",
        read: "A year out, and whoever answers it honestly is on the shortlist.",
      },
      {
        q: "how much does a second storey addition cost",
        read: "Everyone hides from this search. That is exactly why it is winnable.",
      },
      {
        q: "builders near me",
        read: "Broad, and mostly people who have not decided what they want yet.",
      },
    ],
    first: [
      {
        t: "Photograph the last five jobs properly",
        c: "Not phone snaps at handover. This is the single highest-return thing a builder can spend money on and it is almost always missing.",
      },
      {
        t: "Write the cost pages nobody else will",
        c: "Ranges, what moves them, what is excluded. It feels exposing and it is the most reliable way to be on a shortlist you were never going to be asked to quote for.",
      },
      {
        t: "Be present during the year they are thinking",
        c: "Search for the research questions, social for the finished work. Neither is asking for the job. Both are why you get the call.",
      },
    ],
  },
];

export const getIndustry = (key: string) => {
  const found = industries.find((i) => i.key === key);
  if (!found) throw new Error(`Unknown industry: ${key}`);
  return found;
};
