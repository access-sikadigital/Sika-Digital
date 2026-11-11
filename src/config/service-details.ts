/**
 * SERVICE PAGE CONTENT
 *
 * One entry per service page below the five hubs. The five hubs are bespoke
 * pages; these thirteen share a template, for the same reason the four trade
 * pages do: nobody reads two of them back to back, and the thing that has to
 * differ between them is the substance, not the frame.
 *
 * ── The rule every entry here follows ───────────────────────────────────────
 * Each one has to contain at least one thing an agency would rather not say.
 * That is what `honest` is for, and it is not a formatting convention, it is
 * the only reliable defence against thirteen near-identical pages.
 *
 * A page that says "we do X and we are great at it" is interchangeable with
 * every competitor's. A page that says "X is the wrong tool if Y" cannot be,
 * because almost nobody is willing to write it. It also does the commercial
 * job: the scope names lead quality as the thing to protect, and the cheapest
 * way to protect it is to tell the wrong-fit enquiries not to come.
 *
 * ⚠️  Nothing in here is a claim about results. No percentages, no timeframes
 *     presented as promises, no client outcomes. When real case studies exist
 *     they go on the pages, not in this file.
 */

export type ServiceDetail = {
  /** Matches the page key in config/pages. */
  key: string;
  /** Short label for the eyebrow. */
  eyebrow: string;
  /** One sentence under the H1. */
  intro: string;
  /** The heading for this page's distinct argument. */
  angleHeading: string;
  /** Two paragraphs making it. */
  angle: string[];
  /** What the work actually consists of. */
  includes: { t: string; c: string }[];
  /** The thing a competitor would not put on the page. */
  honestHeading: string;
  honest: string[];
  /** First three moves. */
  first: { t: string; c: string }[];
};

export const serviceDetails: ServiceDetail[] = [
  /* ── SEO cluster ──────────────────────────────────────────────────────── */
  {
    key: "local-seo",
    eyebrow: "Local SEO",
    intro:
      "For a trade, the three results on the map do more work than the whole website underneath them.",
    angleHeading: "Most of your customers never scroll past the map.",
    angle: [
      "Search for a trade with a suburb attached and the top of the page is a map with three businesses on it. Most people pick from those three. The organic results everyone obsesses over are below that, and a good share of searchers never reach them.",
      "Getting into those three is a different job from ranking a website. It runs on where you are, how complete your listing is, how many reviews you have and how recently, and whether the rest of the internet agrees about your name, address and phone number. Very little of it happens on your site.",
    ],
    includes: [
      {
        t: "The Google Business Profile, filled in completely",
        c: "Every field, the right categories, service areas, real job photos. Most profiles we open are about forty percent complete and that forty percent is doing all the work.",
      },
      {
        t: "Consistent details everywhere else",
        c: "Your name, address and phone the same across every directory that has you listed. Inconsistency is the most common reason a business that should rank does not.",
      },
      {
        t: "A review habit, not a review campaign",
        c: "Asked the same day the job finishes, every job. Velocity matters more than total, which is why a business with forty steady reviews beats one with ninety from two years ago.",
      },
      {
        t: "A page per place you actually work",
        c: "Real pages about real suburbs. Not one template with the suburb name swapped, which Google has been discounting for years.",
      },
    ],
    honestHeading: "Proximity is the part nobody can sell you.",
    honest: [
      "A large share of map pack ranking is how close you are to the person searching. If your workshop is forty minutes from the suburb you want, no amount of optimisation makes you the nearest result, and any agency that promises otherwise is charging you for the weather.",
      "What can be moved is everything else, and in most cases everything else has never been touched. But you deserve to know which part of the job is winnable before you pay for it.",
    ],
    first: [
      {
        t: "Audit the listing against the categories that rank",
        c: "Usually the single highest-return hour in local SEO, and it is free to do.",
      },
      {
        t: "Fix the citations that disagree",
        c: "Old addresses, a previous business name, a mobile that changed. Tedious, and it removes the thing holding you back.",
      },
      {
        t: "Start the review habit properly",
        c: "A system that asks automatically, the same day, every time. Not a push once a quarter when someone remembers.",
      },
    ],
  },

  {
    key: "ecommerce-seo",
    eyebrow: "Ecommerce SEO",
    intro:
      "Traffic to a product page that was never going to convert is the most expensive kind of success.",
    angleHeading: "Rankings are not the product. Margin is.",
    angle: [
      "An online store can rank for thousands of terms and lose money doing it. Category pages that attract browsers, product pages for lines with nothing left in them, and blog traffic that never buys anything all look identical on a traffic graph.",
      "So the work starts with which products actually make you money, and it stays there. Sometimes the answer is to deliberately not chase a high-volume term because the margin on that line does not survive the returns.",
    ],
    includes: [
      {
        t: "Category pages built to rank",
        c: "Where most ecommerce search volume actually lives, and where most stores have a headline and a grid of products.",
      },
      {
        t: "Product pages that answer the buying question",
        c: "Sizing, compatibility, delivery, returns. The things people leave to find out, and the reason they leave.",
      },
      {
        t: "The technical work stores always need",
        c: "Faceted navigation generating thousands of junk URLs, duplicate variants, pagination. Unglamorous and usually the thing capping the whole site.",
      },
      {
        t: "Structured data that earns the extra line",
        c: "Price, availability and review stars in the result itself. It does not lift rankings. It lifts the share of clicks that go to you instead of the result above.",
      },
    ],
    honestHeading: "If your margin is thin, this is the wrong first move.",
    honest: [
      "SEO takes months and compounds. If you are competing with a marketplace on price and making very little per order, that runway is money you may not have, and paid search or email will usually pay back faster.",
      "We would rather say that at the start than take a twelve month retainer and explain it in month nine.",
    ],
    first: [
      {
        t: "Rank your products by what they actually earn",
        c: "Not by revenue. After returns, shipping and the cost of the item. The list is usually a surprise.",
      },
      {
        t: "Fix what is generating junk URLs",
        c: "Filters and variants quietly producing thousands of near-identical pages is the most common ceiling on a store.",
      },
      {
        t: "Rewrite the top five category pages",
        c: "The highest-leverage writing on any store, and almost always the thinnest.",
      },
    ],
  },

  {
    key: "small-business-seo",
    eyebrow: "Small business SEO",
    intro:
      "A small budget is not a reason to do a worse version of the same thing. It is a reason to do fewer things.",
    angleHeading: "The problem with small business SEO is usually the scope.",
    angle: [
      "Sold to a small business, SEO is often a shrunken version of an enterprise package: a bit of everything, spread thin, reported monthly, and never enough of any one thing to move.",
      "With a real budget you do three things properly and ignore the rest until they matter. Which three depends on the business, and working that out is most of the value. It is also why there is no package on this page.",
    ],
    includes: [
      {
        t: "One clear target, not forty keywords",
        c: "The searches that bring the work you want, ranked by what they are worth, and the rest left alone until those are won.",
      },
      {
        t: "The technical fixes that are actually blocking you",
        c: "Usually four or five things, done once. Not an ongoing line item on an invoice.",
      },
      {
        t: "Pages that answer real questions",
        c: "Written properly, at a pace you can sustain, rather than four thin posts a month because the contract says four.",
      },
      {
        t: "Reporting you can read in five minutes",
        c: "Enquiries and where they came from. Not a forty page export.",
      },
    ],
    honestHeading: "Some of this you can do yourself.",
    honest: [
      "Filling in your Google listing, asking every customer for a review, and writing a proper page about your main service are the three highest-return things a small business can do in search, and none of them need an agency.",
      "If that is where you are, we will tell you to go and do them and come back in three months. It is a worse quarter for us and a better one for you.",
    ],
    first: [
      {
        t: "Find out what you already rank for",
        c: "Most businesses are already visible for something that surprises them, and building on it beats starting somewhere new.",
      },
      {
        t: "Pick three targets and ignore everything else",
        c: "Focus is the entire advantage a small budget has.",
      },
      {
        t: "Fix the site once, properly",
        c: "Speed, structure and the main service pages. Then leave it alone and write.",
      },
    ],
  },

  /* ── Google Ads ───────────────────────────────────────────────────────── */
  {
    key: "ppc-management",
    eyebrow: "PPC management",
    intro:
      "Management is not logging in monthly to change a bid. It is deciding, every week, what to stop paying for.",
    angleHeading: "Most managed accounts are not being managed.",
    angle: [
      "The tell is the search terms report. If nobody has exported it in six months, nothing is being managed, whatever the monthly report says. Google will keep spending the budget and the numbers will keep looking reasonable.",
      "Real management is unglamorous and mostly subtractive: negatives added weekly, landing pages matched to intent, budgets moved out of things that look busy, and conversion data that reflects which enquiries became jobs rather than which forms were submitted.",
    ],
    includes: [
      {
        t: "Weekly search terms review",
        c: "The single highest-return recurring task in paid search, and the one most often skipped.",
      },
      {
        t: "Negative lists that keep growing",
        c: "Shared across the account and added to every week. A negative list that stopped growing is an account that stopped being managed.",
      },
      {
        t: "Conversion tracking that reflects reality",
        c: "Qualified enquiries fed back, so the bidding optimises toward work rather than toward form fills.",
      },
      {
        t: "Landing pages matched to the search",
        c: "The cheapest way to lower cost per click is to raise relevance, which means the ad and the page agreeing.",
      },
    ],
    honestHeading: "A percentage of spend is a bad way to pay for this.",
    honest: [
      "The most common pricing model in the industry pays the agency more when you spend more. Most of the work that helps you is work that reduces spend, and being paid a percentage means being paid less for doing it.",
      "It is not that percentage-based agencies are dishonest. It is that the incentive points the wrong way and everyone involved is human.",
    ],
    first: [
      {
        t: "Export the search terms and read them",
        c: "Before touching a single setting. It tells you more about an account in ten minutes than the dashboard does in a month.",
      },
      {
        t: "Check what a conversion is set to",
        c: "Very often it counts page views, phone number clicks that lasted two seconds, and the same person twice.",
      },
      {
        t: "Cut before adding",
        c: "The first month is almost always about spending less on the same result, which gives everything after it room to work.",
      },
    ],
  },

  /* ── Social ───────────────────────────────────────────────────────────── */
  {
    key: "social-media-marketing",
    eyebrow: "Organic social",
    intro:
      "Posting consistently is the easy part and it is not the part that works.",
    angleHeading: "For a trade, social is a portfolio, not a broadcast.",
    angle: [
      "Nobody follows a plumber for the content. They look you up after a neighbour mentioned you, and what they find decides whether they ring. That is the actual job of your social presence, and it is closer to a shopfront than to a magazine.",
      "Which means the posting schedule matters far less than whether the last nine squares show real work done well. Most trade accounts have it backwards: posting three times a week, and nothing on the grid that shows what a finished job looks like.",
    ],
    includes: [
      {
        t: "A grid that answers the look-up",
        c: "Recent work, clearly photographed. The first nine tiles are the only part most people will ever see.",
      },
      {
        t: "A realistic rhythm",
        c: "Whatever you can sustain forever, which for most trades is one or two posts a week of real jobs rather than five of filler.",
      },
      {
        t: "Content you already have",
        c: "Before and after, the awkward fix, the finished room. You take these anyway. The work is a habit for capturing them, not a production.",
      },
      {
        t: "Reusable for ads",
        c: "The posts that do well organically are the starting point for paid, which is most of the reason it is worth doing at all.",
      },
    ],
    honestHeading: "This is the slowest thing we sell.",
    honest: [
      "Organic social compounds over a long time and cannot be turned on. If you need work this quarter, it is the wrong place to put the money and search or paid social will do more.",
      "It is worth starting anyway, because the version of this that works is the version that has been running for two years. That is an argument for beginning, not for expecting anything soon.",
    ],
    first: [
      {
        t: "Fix the profile before posting anything",
        c: "Bio, service area, a way to contact you, and a pinned post that shows the work. An hour, and it is worth more than a month of posting.",
      },
      {
        t: "Build the habit of photographing jobs",
        c: "Same angle before and after. This is the whole input and it is free.",
      },
      {
        t: "Post the real work first",
        c: "Nine tiles of finished jobs beats any content calendar.",
      },
    ],
  },

  /* ── Web ──────────────────────────────────────────────────────────────── */
  {
    key: "ecommerce-web-design",
    eyebrow: "Ecommerce",
    intro:
      "Most store redesigns change how it looks. The money is almost always in the four screens between wanting it and paying for it.",
    angleHeading: "The checkout is the design.",
    angle: [
      "A store can be beautiful and still lose most of its buyers between the cart and the confirmation. Surprise shipping costs, a forced account, a form that clears itself on one bad field, a payment method they do not use.",
      "None of that is visible in a design review, because everyone reviewing it already knows how the site works and nobody reviewing it is on a train with one bar of signal.",
    ],
    includes: [
      {
        t: "Product pages that remove the reason to leave",
        c: "Sizing, delivery, returns, stock. Answered on the page rather than somewhere they have to go and find.",
      },
      {
        t: "A checkout with nothing optional in it",
        c: "Guest checkout, shipping shown early, the payment methods your customers actually use, and no field that is not needed to send the parcel.",
      },
      {
        t: "Speed on a phone on mobile data",
        c: "The test that matters, and the one most store themes fail badly.",
      },
      {
        t: "Tracking that shows where they left",
        c: "Which step lost them, not just that the rate went down.",
      },
    ],
    honestHeading: "A rebuild is often not the answer.",
    honest: [
      "If your store converts poorly, a new one will usually convert poorly in a nicer font. The reasons are normally in the pricing, the shipping terms, the product photography or the checkout, and three of those four can be fixed without touching the design.",
      "We will tell you if that is the case, which is a smaller job and a worse quote.",
    ],
    first: [
      {
        t: "Watch ten real sessions",
        c: "Recordings of actual people failing to buy something. More useful than any audit including ours.",
      },
      {
        t: "Buy something from your own store on a phone",
        c: "On mobile data, not wifi. Most owners have never done this.",
      },
      {
        t: "Fix the checkout before anything else",
        c: "It is the shortest path to more revenue from the same traffic.",
      },
    ],
  },

  {
    key: "wordpress-web-design",
    eyebrow: "WordPress",
    intro:
      "WordPress is not slow. Twenty plugins doing the job of four are slow.",
    angleHeading: "The problem is almost never WordPress.",
    angle: [
      "Most slow, fragile WordPress sites got that way the same route: a bought theme with a page builder in it, then a plugin each time something was missing, and now a homepage loads two font libraries, three icon sets and a slider nobody uses.",
      "Built properly, WordPress is fast, and it has the one advantage that matters for most businesses: you can edit your own content without a developer and without breaking the layout.",
    ],
    includes: [
      {
        t: "Built without a page builder",
        c: "The single biggest cause of slow WordPress sites, and the hardest thing to remove later.",
      },
      {
        t: "As few plugins as the job needs",
        c: "Every plugin is code you did not write, running on every page load, maintained by someone who may stop.",
      },
      {
        t: "Editing that cannot break the design",
        c: "You change the words and the pictures. The structure is not something you can accidentally drag.",
      },
      {
        t: "Updates, backups and security handled",
        c: "The part people forget until the morning it matters.",
      },
    ],
    honestHeading: "If you never edit it, WordPress may be the wrong choice.",
    honest: [
      "The main reason to use WordPress is that you will update the site yourself. If you never will, you are taking on maintenance, plugin updates and a security surface in exchange for a benefit you do not use.",
      "A static build is faster, cheaper to run and has almost nothing to maintain. We build both and will say which one your situation actually calls for.",
    ],
    first: [
      {
        t: "List every active plugin and what it is for",
        c: "Most sites have several nobody can account for.",
      },
      {
        t: "Test the homepage on a phone on mobile data",
        c: "The number is usually much worse than anyone expects.",
      },
      {
        t: "Decide whether you will really edit it",
        c: "Honestly. The answer changes what should be built.",
      },
    ],
  },

  {
    key: "cro",
    eyebrow: "Conversion rate optimisation",
    intro:
      "The cheapest traffic you will ever buy is the traffic already arriving and leaving.",
    angleHeading: "Doubling enquiries without spending another dollar on ads.",
    angle: [
      "Every business with traffic has a conversion rate, and almost none of them know what theirs is. Lifting it from one in fifty to one in twenty-five doubles the enquiries from exactly the same spend, and the work is usually a handful of specific changes rather than a redesign.",
      "It is also the only marketing work that makes every other channel cheaper at the same time. Ads, SEO and social all get better when the page they land on converts, which is why it goes first and almost never does.",
    ],
    includes: [
      {
        t: "Watching real people use the site",
        c: "Session recordings and heatmaps. Not opinions in a meeting about where the button should go.",
      },
      {
        t: "Finding where the form loses them",
        c: "Which field, which step. Usually one specific thing, and usually a surprise.",
      },
      {
        t: "Changes that get measured",
        c: "One at a time, with enough traffic to know whether it did anything.",
      },
      {
        t: "Fixing the things that are obviously broken first",
        c: "Before any testing. Half of what we find does not need an experiment, it needs correcting.",
      },
    ],
    honestHeading: "Without traffic, this does not work.",
    honest: [
      "Proper testing needs volume. On a few hundred visits a month, the difference between two versions is noise, and anyone running split tests at that level is reading tea leaves and invoicing for it.",
      "Below that threshold the honest service is the obvious fixes and better tracking, then come back to testing when there is enough traffic to learn from. That is a smaller engagement and we would rather scope it that way.",
    ],
    first: [
      {
        t: "Work out your actual conversion rate",
        c: "Per page, per source. Most businesses have never seen this number.",
      },
      {
        t: "Watch twenty recordings",
        c: "Ten minutes, and it usually produces the whole list of what to fix.",
      },
      {
        t: "Fix what is plainly broken",
        c: "Before testing anything. Testing a broken form only tells you which version is broken.",
      },
    ],
  },

  /* ── Systems ──────────────────────────────────────────────────────────── */
  {
    key: "ai-automation",
    eyebrow: "AI automation",
    intro:
      "Most of what gets sold as AI is a scheduled task with better marketing. Some of it is genuinely useful.",
    angleHeading: "Start with what you retype, not with what is impressive.",
    angle: [
      "The useful version of this is boring. An enquiry arriving and being sorted, a quote request turning into a draft, a call being summarised into the notes field, a review request going out without anyone remembering. Hours a week, permanently, from something nobody will ever demo.",
      "The impressive version is a chatbot on the homepage answering questions your customers were not asking. It costs more, it is more fragile, and it is what most of this industry is selling.",
    ],
    includes: [
      {
        t: "Enquiries sorted and routed on arrival",
        c: "By job type, by urgency, to the right person, with the context attached.",
      },
      {
        t: "Follow-up that runs whether or not anyone remembers",
        c: "The highest-return automation there is, and it predates AI entirely.",
      },
      {
        t: "The admin nobody should be doing",
        c: "Calls turned into notes, quotes drafted from a template, data copied between two systems that do not talk.",
      },
      {
        t: "A person still in the loop where it matters",
        c: "Nothing that talks to a customer goes out unreviewed until it has earned it.",
      },
    ],
    honestHeading: "Automating a broken process makes it worse, faster.",
    honest: [
      "If enquiries are being lost because nobody owns following up, automation will reliably lose them at greater speed and with a better audit trail. The process has to be right before it is made fast.",
      "Also worth saying plainly: a lot of what we would set up is not AI at all. It is a form, a rule and a reminder. We are not going to call it something else because the other word sells better.",
    ],
    first: [
      {
        t: "Write down what you retype each week",
        c: "The list is the project. It takes twenty minutes and it is more useful than any tool comparison.",
      },
      {
        t: "Fix the process on paper",
        c: "Who does what, when. Automating comes after that, not instead of it.",
      },
      {
        t: "Automate one thing and live with it",
        c: "Usually the follow-up. Prove it works before building anything else on top.",
      },
    ],
  },

  {
    key: "email-marketing",
    eyebrow: "Email marketing",
    intro:
      "The list you already have is the cheapest audience you will ever reach, and most businesses email it twice a year.",
    angleHeading: "Past customers are the most under-used asset in a trade business.",
    angle: [
      "Every quote you sent, every job you finished, every enquiry that went quiet. Hundreds of people who already know you, already trust you, and are not hearing from you.",
      "This is not a newsletter. It is a handful of messages that go out on a trigger: a quote that went cold, a job that finished, a service that is due again. Written once, running forever.",
    ],
    includes: [
      {
        t: "The sequences that earn their place",
        c: "Quote follow-up, review request, reactivation, and the reminder for anything on a cycle.",
      },
      {
        t: "Writing that does not sound like marketing",
        c: "Short, from a person, about the specific thing. Everything else gets ignored or reported.",
      },
      {
        t: "Deliverability set up properly",
        c: "The authentication records that decide whether any of this reaches an inbox. Almost always missing.",
      },
      {
        t: "Segments that mean something",
        c: "Past customers, cold quotes and new enquiries want different messages. One list gets all three ignored.",
      },
    ],
    honestHeading: "Do not send a newsletter.",
    honest: [
      "Almost no trade or service business should be sending a monthly newsletter. It takes real effort, it is read by very few people, and it slowly trains the rest to ignore your address, which then costs you the messages that actually mattered.",
      "Four triggered sequences will out-earn two years of newsletters and take a fraction of the work. If someone is selling you a content calendar for email, ask what it is for.",
    ],
    first: [
      {
        t: "Find out how many people you can already email",
        c: "Quotes, invoices, past jobs. The number is usually much bigger than expected.",
      },
      {
        t: "Set up the authentication records",
        c: "Unglamorous, and it decides whether anything else in this list works at all.",
      },
      {
        t: "Write the quote follow-up first",
        c: "Two messages. It is the one with the shortest path to a job.",
      },
    ],
  },

  {
    key: "content-marketing",
    eyebrow: "Content marketing",
    intro:
      "Publishing weekly is not a strategy. Answering the questions you get asked on every quote is.",
    angleHeading: "The best content you can write is your own FAQ.",
    angle: [
      "You already know what people ask before they book: what it costs, how long it takes, whether they need to be home, what happens if it turns out to be worse than expected. You answer them all day and then the website says nothing about any of it.",
      "Those answers are also, almost word for word, what people type into Google. Which makes the highest-ranking content you could possibly write the same content that shortens your sales conversations. That coincidence is the whole discipline and most content plans ignore it.",
    ],
    includes: [
      {
        t: "The questions, answered properly",
        c: "One page each, specific, with actual numbers where you can give them.",
      },
      {
        t: "Written to be useful, not to hit a word count",
        c: "A page that answers the question in four hundred words beats one that takes two thousand to avoid it.",
      },
      {
        t: "A pace you will sustain",
        c: "One good page a month for two years beats eight thin ones in a quarter and then nothing.",
      },
      {
        t: "Connected to the pages that sell",
        c: "Content that never points anywhere is traffic you rented.",
      },
    ],
    honestHeading: "Most of it will not be read.",
    honest: [
      "A small number of pages will do nearly all the work. The rest exist so the ones that matter have something around them, and there is no reliable way to know in advance which is which.",
      "That means content is a slow, uneven investment where a lot of the output looks wasted right up until it is not. Anyone presenting it as a predictable monthly return has not run it for long.",
    ],
    first: [
      {
        t: "Write down every question you answered this week",
        c: "That is the content plan. It costs nothing and it is better than one we would build from a keyword tool.",
      },
      {
        t: "Start with the cost question",
        c: "Everyone searches it, almost nobody answers it, and the page that does gets remembered.",
      },
      {
        t: "Publish one properly before planning ten",
        c: "The first one tells you how long this actually takes you.",
      },
    ],
  },

  {
    key: "reputation-management",
    eyebrow: "Reputation",
    intro:
      "Reviews are not something that happens to you. They are a habit, and the businesses with hundreds are not luckier.",
    angleHeading: "The gap between forty reviews and four is a system.",
    angle: [
      "Two businesses doing identical work end up with wildly different review counts, and the difference is almost never the quality. It is that one of them asks every single time, the same day, and the other asks when someone remembers.",
      "It matters twice over: reviews are a ranking factor in the map pack, and they are what a person reads before deciding between you and the next result. Very few things affect both sides of that at once.",
    ],
    includes: [
      {
        t: "An ask that happens automatically",
        c: "Same day, every job, with a direct link. The delay between finishing and asking is the single biggest variable.",
      },
      {
        t: "Responses to all of them",
        c: "Good and bad. Public replies are written for the person reading them later, not for the reviewer.",
      },
      {
        t: "A process for a bad one",
        c: "Agreed in advance, while nobody is upset. Most reputation damage is done in the reply, not the review.",
      },
      {
        t: "Steady volume, not a push",
        c: "Recency counts. Ninety reviews that stopped two years ago read worse than thirty that are still arriving.",
      },
    ],
    honestHeading: "We will not remove a bad review, and neither will anyone else.",
    honest: [
      "Services that offer to are either filing bulk removal requests that mostly fail, or burying it with fake reviews, which breaches Google's terms and risks the whole profile. On a business that depends on the map pack, that is betting the main channel to hide one paragraph.",
      "A genuine bad review with a calm, specific reply underneath does very little damage. A perfect five star record with no negatives at all is the thing people find suspicious.",
    ],
    first: [
      {
        t: "Count your reviews from the last ninety days",
        c: "Not the total. The recent number is the one that is doing anything.",
      },
      {
        t: "Put the asking on a trigger",
        c: "So it does not depend on anyone remembering at the end of a long day.",
      },
      {
        t: "Reply to everything already there",
        c: "Including the old ones. It takes an afternoon and it is visible to everyone who looks.",
      },
    ],
  },
];

export const getServiceDetail = (key: string) => {
  const found = serviceDetails.find((s) => s.key === key);
  if (!found) throw new Error(`Unknown service detail: ${key}`);
  return found;
};
