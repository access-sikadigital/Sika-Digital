/**
 * GUIDE CONTENT
 *
 * ── What these are for ──────────────────────────────────────────────────────
 * Every one of these targets a question people type before they are ready to
 * buy anything. That makes them the top of the funnel, and it makes the honest
 * answer the competitive advantage: almost every competing page on "how much
 * does SEO cost" avoids giving a number, which is exactly why the one that
 * gives a number gets read, linked to and remembered.
 *
 * ── The shape, and why ──────────────────────────────────────────────────────
 * `shortAnswer` comes first on the page, before anything else. Two reasons.
 * Someone searching a question wants the answer, not four paragraphs of
 * context first, and a direct answer near the top of the page is what gets
 * pulled into a featured snippet. Burying it below an introduction costs both.
 *
 * ── ⚠️  PRICES ──────────────────────────────────────────────────────────────
 * The ranges in the cost guides are general Australian market figures, not
 * Sika's rates and not drawn from Sika's client data. They are the single
 * highest-risk content on this site: wrong numbers on a page about pricing
 * will be spotted by exactly the audience it is written for.
 *
 * John must confirm every figure before launch, and they need a review at
 * least annually. `reviewed` on each entry is there to make a stale page
 * obvious rather than invisible.
 *
 * ── ⚠️  Nothing here is a claim about Sika's results ───────────────────────
 * No page in this file says "our clients see X". When there are case studies,
 * they get linked from these guides rather than summarised inside them.
 */

export type Guide = {
  /** Matches the page key in config/pages. */
  key: string;
  /** Short label for the eyebrow and the hub card. */
  label: string;
  /** One line on the hub card. */
  summary: string;
  /** The direct answer. Rendered first, before any preamble. */
  shortAnswer: string[];
  /** Body. Each section is a heading and one or more paragraphs. */
  sections: { h: string; p: string[]; list?: string[] }[];
  faqs: { q: string; a: string }[];
  /** When the facts in this guide were last checked. ISO date. */
  reviewed: string;
  /** Pages worth reading next. Keys from config/pages. */
  related: string[];
};

export const guides: Guide[] = [
  {
    key: "guide-seo-cost",
    label: "What SEO costs",
    summary:
      "Real Australian ranges, what moves the number, and the pricing models to avoid.",
    shortAnswer: [
      "Most Australian small businesses pay between about $1,000 and $3,500 a month for ongoing SEO. Under roughly $800 a month there is rarely enough time in the budget to do anything that moves, and above about $5,000 you are usually buying a larger team rather than a better outcome.",
      "One-off work is priced differently. A genuine audit is commonly $1,500 to $4,000, and a technical fix-up is often a few thousand as a project rather than a retainer.",
    ],
    sections: [
      {
        h: "What you are actually paying for",
        p: [
          "SEO pricing confuses people because the deliverable is invisible. You are buying hours, and the honest question is how many hours and what they are spent on.",
          "At $1,000 a month you are buying roughly a day of skilled work. That is enough to fix a site properly over a few months, or to write and publish real content steadily, but not both at once. Most disappointment with SEO comes from expecting a full programme out of a one-day-a-month budget.",
        ],
      },
      {
        h: "What moves the number",
        p: [
          "Four things, and none of them are the agency's overheads.",
        ],
        list: [
          "Competition. Ranking a plumber in a regional town and ranking one in inner Sydney are different amounts of work for the same words.",
          "The state of the site. A fast, well-built site needs far less technical time than a page builder site with six years of plugins on it.",
          "How many services and areas you want to cover. Each one is its own page and its own ongoing work.",
          "Whether content is included. Writing is the most time-consuming part, and a cheap retainer usually excludes it or outsources it badly.",
        ],
      },
      {
        h: "The pricing models, ranked",
        p: [
          "A fixed monthly fee for a defined scope is the most honest arrangement. You know what you pay and what gets done, and the agency has no incentive to inflate anything.",
          "Project pricing works well for one-off technical work or a content push, and it suits businesses who want a result rather than a relationship.",
          "Pay-on-results sounds fair and rarely is. It pushes the agency toward easy terms nobody searches, because the contract pays for a ranking rather than for a customer, and a first place finish for a phrase with no volume satisfies it perfectly.",
        ],
      },
      {
        h: "What should make you walk away",
        p: [
          "Guaranteed rankings. Nobody controls Google's results, and anyone promising a position is either misunderstanding their own product or counting on you not checking.",
          "A twelve month lock-in with no exit. There are reasons for a minimum term, because nothing happens in month one, but a contract you cannot leave after six months of nothing is protecting the agency rather than the work.",
          "Reports that never mention enquiries. If six months of reporting is impressions and rankings with no line about how many people got in touch, the arrangement has stopped being about your business.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is cheap SEO worth it?",
        a: "Below about $800 a month you are typically buying a few hours, which is enough to send a report and not much else. At that budget you will usually get more from doing your Google Business Profile and reviews yourself.",
      },
      {
        q: "How long before it works?",
        a: "Technical fixes can show within weeks. Content and authority usually take several months, and competitive terms take longer. Anyone giving you a date is guessing.",
      },
      {
        q: "Should I pay for an audit first?",
        a: "Often yes, if it is a real audit by a person and you keep it whether or not you hire them. An automated score out of a hundred is not an audit.",
      },
    ],
    reviewed: "2026-09-20",
    related: ["seo", "small-business-seo", "seo-audit"],
  },

  {
    key: "guide-ads-cost",
    label: "What Google Ads cost",
    summary:
      "What a click costs in Australia, what management should cost, and why the second number is usually the wrong shape.",
    shortAnswer: [
      "Two separate costs. The ad spend goes to Google, and for most Australian trade and service businesses a click costs roughly $2 to $15, with competitive emergency terms running higher. Management is paid to whoever runs the account, commonly $500 to $2,000 a month or 10 to 20 percent of spend.",
      "A workable starting budget for a local service business is usually around $1,000 to $3,000 a month in ad spend. Below about $500 there is not enough data for the bidding to learn anything.",
    ],
    sections: [
      {
        h: "Why click prices vary so much",
        p: [
          "You are in an auction, so the price is set by whoever else wants the same search. An emergency trade term in a capital city is expensive because several businesses will happily pay for a job worth a few hundred dollars. A planned-work term in the same trade is often a fraction of the price, because almost nobody is bidding on it.",
          "This is the most useful thing to know about Google Ads: the expensive searches are expensive because everyone chases them, and the cheap ones are frequently worth more per enquiry.",
        ],
      },
      {
        h: "What the management fee should buy",
        p: [
          "At a minimum, a weekly look at the search terms report and negatives added from it. If that is not happening, the account is not being managed regardless of what the invoice says.",
          "It should also cover conversion tracking that reflects reality, landing pages matched to the searches, and budgets moved between campaigns as the data changes.",
        ],
      },
      {
        h: "Why a percentage of spend is the wrong model",
        p: [
          "Under percentage pricing, the agency earns more when you spend more. Most of the work that helps you reduces spend, so the model pays them less for doing the right thing.",
          "It rarely makes anyone dishonest. It just means that when the obvious move is to cut a campaign, nobody is in a hurry to suggest it. A flat fee removes the question entirely.",
        ],
      },
      {
        h: "The number that actually matters",
        p: [
          "Not cost per click, and not cost per lead. Cost per qualified enquiry: what you pay for someone who wanted the kind of work you want.",
          "Most accounts report a flattering cost per lead that includes wrong numbers, job seekers and people who were never going to book. The real figure is always worse and it is the only one you can make decisions with.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the minimum budget?",
        a: "Around $500 a month in ad spend is the practical floor, and $1,000 or more is where most local service accounts start to behave predictably.",
      },
      {
        q: "Do I need a landing page?",
        a: "Not always, but sending every ad to the homepage is the most common reason an account underperforms. A page about the thing the ad promised lifts conversion and lowers the click price at the same time.",
      },
      {
        q: "Can I run it myself?",
        a: "Yes, and plenty of businesses should. The hard part is not setting it up, it is the weekly discipline of reading the search terms and cutting waste. If you will do that, you can run your own account.",
      },
    ],
    reviewed: "2026-09-20",
    related: ["google-ads", "ppc-management", "cro"],
  },

  {
    key: "guide-website-cost",
    label: "What a website costs",
    summary:
      "Honest Australian ranges for a small business site, and what actually drives the price.",
    shortAnswer: [
      "For an Australian small business, a professionally built website typically runs about $3,000 to $15,000. A simple brochure site for a sole trader sits at the lower end, a multi-service site with proper content and tracking sits in the middle, and an ecommerce build or something custom goes above it.",
      "Template and DIY builders cost $20 to $50 a month and are a reasonable option if you will build it yourself and your site is not a significant source of work.",
    ],
    sections: [
      {
        h: "What makes one site cost four times another",
        p: [
          "Mostly the number of pages that need real thought and real words, and whether anyone is doing that work or handing you a form to fill in.",
        ],
        list: [
          "How many pages need writing, rather than a heading and a paragraph.",
          "Whether the content is written for you or supplied by you. This is often the largest single variable and the one clients underestimate.",
          "Custom design versus an adapted template.",
          "Functionality. A booking system, a quote calculator or a payment flow are each their own project.",
          "Whether tracking and analytics are set up properly, which is small work that is frequently skipped.",
        ],
      },
      {
        h: "The ongoing costs nobody mentions in the quote",
        p: [
          "A domain is typically $15 to $40 a year. Hosting runs from about $10 a month for something basic to $50 or more for a managed service. If the site is WordPress, plugins and maintenance add up, and somebody has to apply updates.",
          "Budget for it up front. The most common way a small business site dies is not a redesign, it is going three years with no updates until something breaks and the person who built it has moved on.",
        ],
      },
      {
        h: "Cheap is not always wrong",
        p: [
          "If your website is a place people check that you exist after a recommendation, a modest site done well is completely adequate and spending more is a waste.",
          "If your website is where most of your work comes from, it is a sales channel and pricing it like a brochure is the actual mistake. The question is not what a website costs, it is what this website has to do.",
        ],
      },
      {
        h: "What to ask before you sign anything",
        p: [
          "Who owns the domain, the hosting and the site when it is finished. The answer should be you, in your name, with your logins.",
          "What happens if you want to change a heading in a year. If the answer involves a support ticket and a fee, factor that in for the life of the site.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is WordPress cheaper?",
        a: "Usually cheaper to build and not always cheaper to own. It needs updating, and plugins have licence fees. A static site costs less to run and cannot be edited as easily.",
      },
      {
        q: "How long does it take?",
        a: "Four to ten weeks is typical for a small business site. The delay is almost always content rather than build, and the projects that run long are the ones waiting on words and photographs.",
      },
      {
        q: "Do I need to rebuild, or can the current one be fixed?",
        a: "Frequently it can be fixed. If the structure is sound and the problem is speed, content or the enquiry form, a fix costs a fraction of a rebuild.",
      },
    ],
    reviewed: "2026-09-20",
    related: ["web-design", "wordpress-web-design", "cro"],
  },

  {
    key: "guide-seo-vs-ads",
    label: "SEO or Google Ads",
    summary:
      "Which one first, when the answer is both, and the situations where one of them is simply wrong.",
    shortAnswer: [
      "Google Ads if you need work in the next month, if you are testing whether a service sells, or if your business is seasonal and you need to be visible in a specific window. SEO if you want enquiries that keep arriving after you stop paying, and can wait several months for them to build.",
      "Most established businesses should do both. If the budget only covers one, ads first for cash flow, then SEO alongside it once the work is steady.",
    ],
    sections: [
      {
        h: "The real difference",
        p: [
          "Ads are rented and SEO is owned. Stop paying for ads and the enquiries stop the same day. Stop paying for SEO and the rankings decay slowly over months, and in some cases hold for years.",
          "That makes ads a tap and SEO an asset. Neither is better. They answer different questions about what you need and when.",
        ],
      },
      {
        h: "When ads are clearly right",
        p: [
          "You need enquiries now. You are launching something and do not know whether anyone wants it. Your work is emergency or urgent, where people search and book within the hour and nobody is reading a guide first. Or the search you want is so competitive that ranking is a two year project and you would rather buy the traffic in the meantime.",
        ],
      },
      {
        h: "When SEO is clearly right",
        p: [
          "Your customers research before they buy. Your margins cannot absorb a click price in a competitive auction. You sell something with a long consideration period, like a building project, where the person is reading for months before contacting anyone.",
          "Also when your ad account has already been optimised properly and cost per enquiry has stopped improving. At that point more spend buys more of the same and the cheaper next enquiry is an organic one.",
        ],
      },
      {
        h: "Why they work better together",
        p: [
          "Ads tell you within weeks which searches convert, and that is the most valuable input an SEO plan can have. Rather than guessing which terms are worth pursuing, you have paid data on which ones produced actual jobs.",
          "It runs the other way too. Good content improves the landing pages your ads point at, which lifts conversion and lowers click costs. The overlap is real and it is the argument for doing both in one place rather than at two agencies.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I stop ads once SEO is working?",
        a: "Many businesses reduce them rather than stop. Even with strong rankings, ads hold the top of the page for your most valuable searches, and for emergency work that position is worth paying for.",
      },
      {
        q: "Which is cheaper?",
        a: "Ads cost less to start and more to continue. SEO costs more before it does anything and less per enquiry once established. Compare them over a year or two, not over a month.",
      },
      {
        q: "What about being top of the map pack?",
        a: "That is a third thing, and for most local service businesses it is worth more than either. It is also the cheapest of the three to compete in.",
      },
    ],
    reviewed: "2026-09-20",
    related: ["seo", "google-ads", "local-seo"],
  },

  {
    key: "guide-maps-seo",
    label: "Ranking in the map pack",
    summary:
      "What actually moves those three results, and the part nobody can sell you.",
    shortAnswer: [
      "Three things decide the map pack: how close you are to the person searching, how complete and active your Google Business Profile is, and your reviews, especially how recently they arrived. Proximity cannot be bought or optimised, which is why the honest work starts with a realistic radius.",
      "Inside that radius, a complete profile with the right categories and a steady flow of reviews will out-rank a better-known competitor with a neglected listing.",
    ],
    sections: [
      {
        h: "Proximity, and why nobody advertises it",
        p: [
          "A large share of map pack ranking is distance between you and the searcher. Someone forty minutes away is unlikely to see you regardless of what you spend, and no agency can change that.",
          "You will not find this on many local SEO pages because it limits what can be sold. It is also the first thing worth establishing, because it tells you which suburbs are winnable and which are a waste of money.",
        ],
      },
      {
        h: "The profile itself",
        p: [
          "Most profiles are perhaps half filled in, and the half that is missing is doing nothing. The primary category is the single most important field and it is frequently wrong: an electrician listed under Contractor rather than Electrician is competing in the wrong set entirely.",
        ],
        list: [
          "Primary category exactly right, secondary categories added.",
          "Services listed individually rather than as one description.",
          "Service areas set to where you actually go.",
          "Real photographs of real jobs, added regularly rather than once.",
          "Hours correct, including public holidays.",
        ],
      },
      {
        h: "Reviews, and why recency beats total",
        p: [
          "Volume matters, but a steady arrival matters more. Thirty reviews still coming in read better to both Google and a person than ninety that stopped two years ago.",
          "The mechanism that produces them is a habit, not a campaign: asked the same day the job finishes, every job, with a direct link. Businesses with hundreds of reviews are almost never luckier, they just ask every time.",
        ],
      },
      {
        h: "Consistency everywhere else",
        p: [
          "Your business name, address and phone number as they appear across directories and your own site. When they disagree, which is common after a move or a phone change, it undermines the confidence Google has in the listing.",
          "It is tedious work with no visible output, and it is regularly the thing holding back a business that should already be ranking.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does posting to Google Business Profile help ranking?",
        a: "The direct ranking effect is small at best. Posts do affect whether someone who has found you chooses to call, which is a different and still worthwhile reason to do it.",
      },
      {
        q: "Can I rank in a suburb I am not in?",
        a: "Sometimes, at a distance, if the profile and reviews are strong and competition there is weak. The further out, the harder, and beyond a certain range it stops being realistic.",
      },
      {
        q: "Do I need a physical address?",
        a: "A service area business can hide its address and still rank. What you cannot do is list an address you do not operate from, which is the fastest way to have a profile suspended.",
      },
    ],
    reviewed: "2026-09-20",
    related: ["local-seo", "reputation-management", "seo"],
  },

  {
    key: "guide-what-is-local-seo",
    label: "What local SEO is",
    summary:
      "The plain version, and how it differs from the SEO most people mean.",
    shortAnswer: [
      "Local SEO is the work of being found by people searching near you, and it is mostly about your Google Business Profile, your reviews and your consistency across the web rather than about your website.",
      "Regular SEO is about ranking pages. Local SEO is about ranking a business in a place. They overlap, but the highest-return work in local SEO often happens without touching your site at all.",
    ],
    sections: [
      {
        h: "The two sets of results",
        p: [
          "Search for a service with a location attached and you get two things: a map with three businesses on it, and the normal list of pages below. They are ranked by different signals and won by different work.",
          "For most local service businesses, the map is where the enquiries are. A significant share of searchers choose from those three and never scroll.",
        ],
      },
      {
        h: "What it actually involves",
        p: [
          "Four areas, in rough order of return.",
        ],
        list: [
          "The Google Business Profile: categories, services, areas, photos, hours, all complete and kept current.",
          "Reviews: a system that asks every customer the same day, so they arrive steadily.",
          "Consistency: name, address and phone matching everywhere you appear online.",
          "Location pages: a real page per area you serve, written rather than duplicated.",
        ],
      },
      {
        h: "Who it is for",
        p: [
          "Any business that serves customers in a geographic area. Trades, clinics, restaurants, gyms, professional services with an office.",
          "Not for you if you sell nationally online with no local element. In that case ordinary SEO is the work and the map pack is irrelevant.",
        ],
      },
      {
        h: "Why it is usually the first thing to do",
        p: [
          "It is cheaper than competing for broad search terms, it works faster, and the competition is generally weaker because most local businesses have never filled the profile in.",
          "It is also the part you can largely do yourself, which makes it an unusual recommendation for an agency to lead with and the correct one for most small businesses.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is it different from Google Business Profile optimisation?",
        a: "The profile is the biggest single part of it, but local SEO also covers citations, reviews, location pages and the local signals on your website.",
      },
      {
        q: "How long does it take?",
        a: "Profile changes can show within days to weeks, which is unusually fast for search. Reviews and citations build over months.",
      },
      {
        q: "Can I do it myself?",
        a: "Most of it, yes, and if budget is tight you should. Completing the profile properly and asking every customer for a review are the two highest-return actions and neither needs an agency.",
      },
    ],
    reviewed: "2026-09-20",
    related: ["local-seo", "reputation-management", "seo"],
  },

  {
    key: "guide-tradies",
    label: "Marketing for tradies",
    summary:
      "What actually gets a trade business more of the right jobs, and what is a waste of money.",
    shortAnswer: [
      "In rough order of return for most trades: your Google Business Profile and reviews, then a website that asks for the job, then Google Ads for the work you want more of, then content and social. Lead-generation services that sell the same enquiry to several trades are usually last and often not worth it at all.",
      "The bigger point is that more leads is rarely the problem. Which leads is.",
    ],
    sections: [
      {
        h: "Start with the profile, not the website",
        p: [
          "For a trade, the map pack does more work than the website underneath it. A complete Google Business Profile with steady reviews will bring more enquiries than a new site will, and it costs nothing but attention.",
          "If you only do one thing after reading this, fill in every field of your profile and start asking every customer for a review the day you finish. That is the whole of the cheapest advice anyone can give you.",
        ],
      },
      {
        h: "Then a website that asks for the job",
        p: [
          "Most trade sites list services and give a phone number. A site that works answers the questions people ask before booking: what it costs, how soon you can come, what happens if it turns out worse than expected.",
          "It also needs to load fast on a phone on mobile data, because that is where it will be read, frequently by someone standing next to the problem.",
        ],
      },
      {
        h: "Ads, pointed at the right work",
        p: [
          "Emergency terms are expensive and competitive because every trade chases them. Planned work, the switchboard upgrades, the hot water replacements, the extensions, is searched by people who are researching, costs less per click and is worth more per job.",
          "Most trade ad accounts spend the whole budget on the first kind by default, and nobody has ever checked.",
        ],
      },
      {
        h: "What to be careful with",
        p: [
          "Lead-generation platforms that sell the same enquiry to several trades put you into a price auction with three competitors before you have spoken to anyone. Some businesses make them work. Most find the margin is gone by the time they win.",
          "Directory listings that charge a monthly fee for a profile page are usually worth what the free version of the same thing is worth.",
        ],
      },
      {
        h: "The thing worth measuring",
        p: [
          "Not leads. Which jobs arrived, and what was left after the drive, the parts and the hours. A month of twenty small callouts and a month of four planned jobs can produce identical lead counts and completely different bank balances.",
          "Once you count that way, most marketing decisions answer themselves.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need a website if I have good reviews?",
        a: "Yes, but it can be simple. People who find you on the map still check the site before ringing, and a bad one costs you the enquiry the profile earned.",
      },
      {
        q: "Are lead generation services worth it?",
        a: "Sometimes, when you are starting out and need volume. The economics get worse as you grow, because you are paying for enquiries you would otherwise get directly.",
      },
      {
        q: "How much should a trade business spend?",
        a: "There is no single answer, but start by working out what a good job is worth to you after costs. Everything else follows from that number and most trades have never calculated it.",
      },
    ],
    reviewed: "2026-09-20",
    related: ["tradies", "local-seo", "google-ads"],
  },

  {
    key: "guide-more-leads",
    label: "How to get more leads",
    summary:
      "The order to fix things in, because more traffic to a page that does not convert just costs more.",
    shortAnswer: [
      "Fix them in this order: what happens to the enquiries you already get, then how many visitors turn into enquiries, then how many visitors you have. Almost everyone starts with the last one, which is the most expensive and the slowest.",
      "Doubling your conversion rate and answering the phone faster are both free and both usually beat doubling traffic.",
    ],
    sections: [
      {
        h: "First: stop losing the ones you have",
        p: [
          "Before spending anything on more traffic, find out what happens to an enquiry now. How long until someone replies. Whether missed calls get followed up. Whether a quote that goes quiet ever gets chased.",
          "In most small businesses this is where the largest and cheapest gain sits. A quote follow-up that goes out automatically two days later recovers work that was already paid for once.",
        ],
      },
      {
        h: "Second: convert more of the visitors you already have",
        p: [
          "If one in fifty visitors enquires and you lift it to one in twenty-five, you have doubled your leads with no extra spend and made every future marketing dollar worth twice as much.",
          "The work is unglamorous: a form with fewer fields, a phone number that is visible on a phone, answering the price question instead of hiding from it, and a page that loads before someone gives up.",
        ],
      },
      {
        h: "Third: more traffic, in the right order",
        p: [
          "Now it is worth buying attention, because the thing it lands on works. For a local business that usually means the map pack first, then search ads for the jobs you want, then organic content.",
        ],
      },
      {
        h: "The mistake almost everyone makes",
        p: [
          "Deciding the problem is visibility, buying more of it, and getting the same conversion rate applied to a bigger number. It works, in the sense that leads go up, and it is the most expensive way to get there.",
          "It also hides the underlying issue, so the business ends up with a larger marketing bill permanently attached to a funnel that still leaks.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is a good conversion rate?",
        a: "For a local service site, somewhere between two and five percent of visitors making contact is common. Well above that usually means strong intent traffic; well below usually means the page or the form.",
      },
      {
        q: "How fast should I respond?",
        a: "Inside five minutes if you can. The difference between five minutes and the next morning is frequently the difference between a job and a quote nobody replied to.",
      },
      {
        q: "Is more traffic ever the right first move?",
        a: "Yes, if you have almost none. Below a few hundred visits a month there is not enough happening to optimise, and getting traffic is the only sensible thing to do.",
      },
    ],
    reviewed: "2026-09-20",
    related: ["cro", "lead-generation", "google-ads"],
  },
];

export const getGuide = (key: string) => {
  const found = guides.find((g) => g.key === key);
  if (!found) throw new Error(`Unknown guide: ${key}`);
  return found;
};
