/**
 * WEBSITE COPY, VERSION 1
 *
 * Generated from "SIKA-Digital-Website-Copy-V1.md" (the 49 V1 copy docs
 * linked from the SIKA Website Copy - Version 1 workbook). One entry per
 * staging route. Homepage, About and the Guides hub are implemented in their
 * own page files; every other route renders this copy through CopyPage.
 *
 * The text is word for word from the docs. To change a page, change the doc
 * first, then the matching entry here, so the two never disagree.
 */

export type CopyItem = { h3: string; paras: string[] };
export type CopySection = {
  h2: string;
  paras: string[];
  items: CopyItem[];
  /** Text after the H3 items, usually the cross-links to related pages. */
  after: string[];
  /** Set on the closing section only. */
  cta?: string;
};
export type CopyPageData = {
  name: string;
  /** Approval status from the V1 workbook. Not rendered. */
  status: string;
  eyebrow: string;
  h1: string;
  intro: string[];
  cta: string;
  sections: CopySection[];
};

export const copyV1: Record<string, CopyPageData> = {
  "/results/": {
    name: "Results",
    status: "Draft for review",
    eyebrow: "Results and project stories",
    h1: "Understand the work behind the result.",
    intro: [
      "A result means more when you know the starting point, the decisions made and what changed. That is how we approach a useful project story.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "The context matters.",
        paras: [
          "A new website, an advertising campaign and an SEO plan each have different goals. The questions begin with the business: what did it need, what was already in place and what was the work intended to improve?",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What makes a result useful to you",
        paras: [],
        items: [
          {
            h3: "A clear starting point",
            paras: [
              "Understand the original situation and the goal, so you can judge whether the example relates to your own business.",
            ],
          },
          {
            h3: "An explanation of the work",
            paras: [],
          },
          {
            h3: "Evidence with its limits explained",
            paras: [
              "Time periods, measurement and business context affect how a result should be read. Enquiries, completed sales and website activity each tell a different part of the story.",
            ],
          },
        ],
        after: [
          "See which changes were made and why. The decisions and scope help explain what was involved beyond the final number or screenshot.",
        ],
      },
      {
        h2: "Your business needs its own plan.",
        paras: [
          "An example can help you ask better questions, but it cannot tell you exactly what your project will achieve. We’ll discuss your starting point and the information needed to plan the work.",
          "Explore our services or read about SIKA Digital to understand the wider approach.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What would progress look like for your business?",
        paras: [
          "Tell us what you want to improve and how you measure it today.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/contact/": {
    name: "Contact",
    status: "Draft for review",
    eyebrow: "Contact SIKA Digital",
    h1: "Tell us what you want to work on.",
    intro: [
      "Whether you have a clear brief or a question about where to start, we’d like to hear about your business. Get in touch about SEO, advertising, websites, content or AI consulting.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "A little context helps us start the right conversation.",
        paras: [
          "Share what your business does, your website if you have one and what you would like to improve. If there is a particular deadline or budget in mind, you can include that too.",
          "You do not need a finished plan before contacting us. A short explanation of the problem is a useful place to begin.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Prefer to email?",
        paras: [
          "You can reach us at hello@sikadigital.com.",
          "SIKA Digital is based in Melbourne and works with businesses across Australia.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What we can talk through",
        paras: [],
        items: [
          {
            h3: "The starting point",
            paras: [
              "What is happening today, what you have already tried and which parts need attention.",
            ],
          },
          {
            h3: "The work you have in mind",
            paras: [
              "A specific service, a new project or a few connected priorities you want help making sense of.",
            ],
          },
          {
            h3: "A practical next step",
            paras: [
              "The information we need to review and how to decide whether our services are a fit for your business.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Looking for service information first?",
        paras: [
          "Explore our services, read about SIKA Digital or browse the guides for answers to common planning questions.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Let’s start with your business.",
        paras: ["Use the enquiry form to tell us what you need help with."],
        items: [],
        after: [],
        cta: "Send Enquiry",
      },
    ],
  },
  "/services/": {
    name: "Services",
    status: "Draft for review",
    eyebrow: "Digital marketing services",
    h1: "Choose the help your business needs next.",
    intro: [
      "SIKA Digital brings together search, advertising, websites, content and AI consulting. We’re based in Melbourne and work with businesses across Australia, starting with your priorities and the work that can support them.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Get found and give people a reason to enquire.",
        paras: [],
        items: [
          {
            h3: "SEO and AI search",
            paras: [
              "Help people find useful information about your business through search, local results and AI-generated answers. Explore SEO, including local and ecommerce search.",
            ],
          },
          {
            h3: "Paid advertising",
            paras: [
              "Put a clear offer in front of relevant people and review what happens next. Explore Google Ads, PPC Management and Facebook and Instagram Ads.",
            ],
          },
          {
            h3: "Lead generation",
            paras: [
              "Connect your offer, marketing and follow-up around the enquiries you want to receive. Explore Lead Generation.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Make the website useful.",
        paras: [
          "Plan clear pages and practical functionality with Web Design and Development, including online stores and WordPress. Improve an existing customer journey with Conversion Rate Optimisation.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Stay useful to your audience.",
        paras: [
          "Content Marketing answers customer questions. Social Media Marketing gives people a reason to follow. Email Marketing helps you communicate with your existing audience, while Reputation Management puts a process around customer feedback.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Improve how the work gets done.",
        paras: [
          "AI Consulting and Automation explores practical ways to handle repetitive tasks, connect information and support your team.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "You can begin with one priority.",
        paras: [
          "We’ll review where you are now and explain a focused starting point. You’ll understand the scope and costs before deciding what to take on.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/industries/": {
    name: "Industries",
    status: "Draft for review",
    eyebrow: "Industries",
    h1: "Marketing should make sense for the work you do.",
    intro: [
      "A customer booking a repair needs different information from someone planning a build. We shape your website and marketing around the services you offer, the people choosing them and how the work is booked.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Explore your industry",
        paras: [],
        items: [
          {
            h3: "Tradies",
            paras: [
              "Make your services and service area clear, then connect customer enquiries with a practical follow-up process. Explore digital marketing for tradies.",
            ],
          },
          {
            h3: "Electricians",
            paras: [
              "Explain the electrical work you want to take on, from everyday enquiries to larger projects, with useful details for customers deciding who to contact. Explore marketing for electricians.",
            ],
          },
          {
            h3: "Plumbers",
            paras: [
              "Help customers distinguish urgent problems, planned work and specialist services, with a clear way to explain what they need. Explore marketing for plumbers.",
            ],
          },
          {
            h3: "Builders",
            paras: [
              "Show the kinds of projects you take on and help potential clients understand your process before making an enquiry. Explore marketing for builders.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Start with the jobs you actually want.",
        paras: [
          "We discuss your service mix, areas, capacity and how customers choose you. Those details help decide which pages, search activity or advertising deserve attention first.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Keep the enquiry journey connected.",
        paras: [
          "Your website should help people decide whether you are a fit. The contact step should also give your team enough information to respond usefully. We consider both when planning the work.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Work in another industry?",
        paras: [
          "These pages are a starting point. Our wider digital marketing services support Australian businesses with SEO, advertising, websites, content and AI consulting.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Tell us about the work you want to be known for.",
        paras: [
          "We’ll talk through your business and where our services may fit.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/seo/": {
    name: "SEO and AI search",
    status: "Draft for review",
    eyebrow: "SEO, AEO and GEO services",
    h1: "SEO that helps customers find you on Google and ChatGPT.",
    intro: [
      "SIKA Digital is a Melbourne SEO agency working with Australian businesses. We improve your website and content to support visibility in search results and AI-generated answers.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Start with the searches that matter.",
        paras: [
          "Search engine optimisation starts with the products, services and locations you want to be found for.",
        ],
        items: [
          {
            h3: "Keyword research",
            paras: [
              "Find the words and questions customers use, then match them to the right pages.",
            ],
          },
          {
            h3: "Technical SEO",
            paras: [
              "Fix issues that stop search engines finding and reading your pages, and make your website easier to use.",
            ],
          },
          {
            h3: "On-page SEO and content",
            paras: [
              "Improve titles, headings and copy so each page explains your offer and answers useful customer questions.",
            ],
          },
          {
            h3: "Links and business information",
            paras: [
              "Earn relevant mentions and links, and keep your business details consistent across the web.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "AI search optimisation with AEO and GEO",
        paras: [
          "AEO (Answer Engine Optimisation) and GEO (Generative Engine Optimisation) focus on helping your business appear in AI-generated answers. We review visibility across ChatGPT, Google AI Overviews and AI Mode, Gemini and Perplexity.",
        ],
        items: [
          {
            h3: "Content built around real questions",
            paras: [
              "Write useful answers, explanations and comparisons grounded in your expertise, with clear information about what you do.",
            ],
          },
          {
            h3: "AI brand mentions and citations",
            paras: [
              "Check selected customer questions to see whether AI answers name your business or cite your website.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Know what’s changing",
        paras: [
          "We review search traffic, enquiries and observed AI mentions together, so you can follow the work and decide what comes next.",
          "Explore Local SEO, Ecommerce SEO and Small Business SEO for more specific help.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "A few things worth knowing",
        paras: [],
        items: [
          {
            h3: "How long does SEO take?",
            paras: [
              "Timing depends on your website, competition and the work involved. We’ll explain the priorities and what to expect after reviewing your site.",
            ],
          },
          {
            h3: "What will the work cost?",
            paras: [
              "We’ll agree on the scope and budget before starting, including any AI visibility work.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Tell us where you want to be found.",
        paras: [
          "Share your website and the customers you want to reach. We’ll talk through where SEO and AI search could help.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/seo/local-seo/": {
    name: "Local SEO",
    status: "Draft for review",
    eyebrow: "Local SEO",
    h1: "Make it easier for nearby customers to find you.",
    intro: [
      "Local SEO connects your website and Google Business Profile with the places you actually serve. SIKA Digital helps Australian businesses present useful, accurate information when nearby customers look for them.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Show people what you do and where you do it.",
        paras: [
          "A customer should be able to check your services, opening hours and contact details without piecing them together. We look at that experience across your website and local listings.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "The work behind local visibility",
        paras: [],
        items: [
          {
            h3: "Google Business Profile",
            paras: [
              "Review your business information, categories, services and photos so the profile represents what customers can expect.",
            ],
          },
          {
            h3: "Local website content",
            paras: [
              "Build useful pages around the services and areas you genuinely cover, with clear ways to call or enquire.",
            ],
          },
          {
            h3: "Reviews and business details",
            paras: [
              "Make it easier for customers to leave honest feedback, and keep important details consistent where your business appears.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Follow what local interest becomes.",
        paras: [
          "We review the information available from search, your profile and your website alongside enquiries. The aim is to understand which services and areas deserve attention next.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Before we begin",
        paras: [],
        items: [
          {
            h3: "Can you work with an existing listing?",
            paras: [
              "Yes. We can review the profile you already use and discuss the access and changes needed.",
            ],
          },
          {
            h3: "What if we cover several suburbs?",
            paras: [
              "We start with your actual service area and prioritise the locations that matter to your business. Each page should give that customer something useful.",
            ],
          },
        ],
        after: [
          "Read about our wider SEO services or explore the Google Maps SEO guide.",
        ],
      },
      {
        h2: "Tell us where your customers are.",
        paras: [
          "Share your website, the services you offer and the areas you want to reach.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/seo/ecommerce-seo/": {
    name: "Ecommerce SEO",
    status: "Draft for review",
    eyebrow: "Ecommerce SEO",
    h1: "Help shoppers find the products you sell.",
    intro: [
      "Someone might search for a product by name, compare a few options or look for a solution before they know what to buy. Our ecommerce SEO work helps your store answer those different needs.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Make your range easier to explore.",
        paras: [
          "We look at how people find products and move through your store. The plan connects search opportunities with your catalogue, priorities and the information shoppers need to decide.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Where we focus",
        paras: [],
        items: [
          {
            h3: "Category pages",
            paras: [
              "Organise related products into useful collections, with descriptions that help customers narrow their choices.",
            ],
          },
          {
            h3: "Product information",
            paras: [
              "Improve titles, descriptions and supporting details so customers can understand what makes an item suitable for them.",
            ],
          },
          {
            h3: "Store structure",
            paras: [
              "Review navigation and page structure so customers and search engines can reach the important parts of your catalogue.",
            ],
          },
          {
            h3: "Buying guides and comparisons",
            paras: [
              "Answer the questions that come before a purchase, using accurate information and your own product knowledge.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Connect search interest with store performance.",
        paras: [
          "We review visibility and visits alongside the sales information available. That helps prioritise the categories, products and content worth improving next. Relevant product questions can also inform the wider AI search work.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Start with the store you have.",
        paras: [
          "We’ll review your existing platform and catalogue before recommending changes. Any development, content production or migration work is scoped separately so you understand what is involved.",
          "Explore Ecommerce Website Development or our broader SEO and AI search services.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Let’s look at how customers find your range.",
        paras: [
          "Share your store and the products you want to focus on. We’ll help you identify a sensible starting point.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/seo/small-business-seo/": {
    name: "Small Business SEO",
    status: "Draft for review",
    eyebrow: "Small business SEO",
    h1: "Put your SEO effort where it can be most useful.",
    intro: [
      "When you run a small business, time and budget need to be used carefully. We help you choose the SEO work that fits what you sell, who you want to reach and the website you already have.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Begin with a manageable plan.",
        paras: [
          "We review your website and discuss which services or products matter most. You’ll get a clear order of priorities and an explanation of the work involved before deciding how to proceed.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What that can include",
        paras: [],
        items: [
          {
            h3: "Pages that explain your offer",
            paras: [
              "Give each important service or product a useful place on your website, with answers to the questions customers ask.",
            ],
          },
          {
            h3: "Visibility in your area",
            paras: [
              "Review local search information and your Google Business Profile where they are relevant to how customers find you.",
            ],
          },
          {
            h3: "Website improvements",
            paras: [
              "Identify issues that make important pages hard to find, read or use, and decide which fixes deserve attention first.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Understand what progress looks like.",
        paras: [
          "We review relevant searches, website visits and the enquiries or sales that can be measured. Those observations help shape the next round of work and keep the plan connected to your business.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Work at the right scale.",
        paras: [
          "Some businesses need help with a specific issue. Others want ongoing support. We’ll discuss what is realistic for your starting point and budget, including what you can look after yourself.",
          "Explore Local SEO or our wider SEO and AI search services.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Let’s work out your first priorities.",
        paras: [
          "Tell us about your business, your website and what you would like to improve.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/seo/seo-audit/": {
    name: "SEO Audit",
    status: "Draft for review",
    eyebrow: "SEO audit",
    h1: "Know what your website needs before planning the next changes.",
    intro: [
      "An SEO audit gives you a clearer starting point. We review how your website can be found, what its pages explain and which issues deserve attention first.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "A review with your business in mind.",
        paras: [
          "We begin with the products, services and customers you want to focus on. The review looks at the website through that lens, so the findings connect with what you want to achieve.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What we can examine",
        paras: [],
        items: [
          {
            h3: "Technical access and structure",
            paras: [
              "Check whether important pages can be found and read by search engines, and identify structural issues worth investigating.",
            ],
          },
          {
            h3: "Content and search relevance",
            paras: [
              "Review titles, headings and page information against the questions your customers ask.",
            ],
          },
          {
            h3: "Local and AI search visibility",
            paras: [
              "Look at relevant business information and whether key pages clearly explain your expertise, services and locations.",
            ],
          },
          {
            h3: "Measurement",
            paras: [
              "Review the available search and website data, including whether useful customer actions can be followed.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Findings you can use.",
        paras: [
          "We explain the issues, their likely significance and the work involved in addressing them. You’ll be able to distinguish the first priorities from improvements that can wait.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What happens next?",
        paras: [
          "We talk through which tasks your team can manage and where you may need support. Any implementation is agreed separately from the audit, including the scope and cost.",
          "The review can inform SEO services, Local SEO or Ecommerce SEO.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Let’s look at your starting point.",
        paras: [
          "Share your website and what you would like the review to help you understand. We’ll confirm the audit scope and any fee before proceeding.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/google-ads/": {
    name: "Google Ads",
    status: "Draft for review",
    eyebrow: "Google Ads management",
    h1: "Google Ads that put your offer in front of the right people.",
    intro: [
      "Reach people searching for the products and services you want to sell. SIKA Digital is a Melbourne Google Ads agency helping Australian businesses plan, run and improve their campaigns.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Start with what you want the campaign to do.",
        paras: [
          "More quote requests, online orders or bookings each need a different approach. We agree on the goal, the audience and the budget before building the campaign around them.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What we look after",
        paras: [],
        items: [
          {
            h3: "Searches and service areas",
            paras: [
              "Choose relevant keywords and locations, then review the searches that actually bring people to your ads.",
            ],
          },
          {
            h3: "Ads and landing pages",
            paras: [
              "Give people a clear reason to click and a page that follows through on the offer.",
            ],
          },
          {
            h3: "Budget and bidding",
            paras: [
              "Review where spend is going and adjust the campaign as evidence develops.",
            ],
          },
          {
            h3: "Conversion tracking",
            paras: [
              "Agree on which actions matter, check how they are recorded and review the quality of the enquiries or sales they represent.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "You should understand where the money goes.",
        paras: [
          "We explain the work, the advertising spend and the results we can measure. Campaign reviews connect those numbers with what is happening in your business.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "A few things worth knowing",
        paras: [],
        items: [
          {
            h3: "What if I already have an account?",
            paras: [
              "We can start by reviewing its structure, search terms, ads and tracking, then explain the changes worth considering.",
            ],
          },
          {
            h3: "How much should I spend?",
            paras: [
              "That depends on your market, offer and goals. We’ll discuss a starting budget and explain management costs separately from the money paid to Google.",
            ],
          },
        ],
        after: ["Explore PPC Management or Website Design for related help."],
      },
      {
        h2: "Tell us what you want your ads to achieve.",
        paras: [
          "Share your website and what you want to promote. We’ll talk through where Google Ads could fit.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/google-ads/ppc-management/": {
    name: "PPC Management",
    status: "Draft for review",
    eyebrow: "PPC management",
    h1: "Keep your paid campaigns working towards the right goals.",
    intro: [
      "Your offer, customers and priorities change. Your advertising needs attention as they do. SIKA Digital provides PPC management for Australian businesses that want a clear view of their campaigns and the decisions behind them.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Ongoing management starts with a useful baseline.",
        paras: [
          "We review the account, agree on what a worthwhile enquiry or sale looks like, and check what the tracking can tell us. That gives us something practical to work from.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What we keep reviewing",
        paras: [],
        items: [
          {
            h3: "Where the budget goes",
            paras: [
              "Look at spending across campaigns and the opportunities that justify further investment.",
            ],
          },
          {
            h3: "What people respond to",
            paras: [
              "Test ad messages and offers, and review the searches or audiences bringing people to your website.",
            ],
          },
          {
            h3: "What happens after the click",
            paras: [
              "Check that the landing page matches the ad and makes the next action clear.",
            ],
          },
          {
            h3: "Which actions become business",
            paras: [
              "Review recorded conversions alongside enquiry quality and sales information where it is available.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Changes should come with an explanation.",
        paras: [
          "You’ll know what we’ve adjusted, why it matters and what we want to learn next. We agree on the work and management costs before taking it on.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Before we begin",
        paras: [],
        items: [
          {
            h3: "Can you manage an existing account?",
            paras: [
              "We can review what is already running and discuss whether to improve the current structure or rebuild parts of it.",
            ],
          },
          {
            h3: "Are advertising costs included?",
            paras: [
              "The campaign budget and our management scope are discussed separately so the total commitment is clear.",
            ],
          },
        ],
        after: [
          "Read about Google Ads or Meta Advertising for channel-specific help.",
        ],
      },
      {
        h2: "Let’s review what your campaigns need next.",
        paras: [
          "Tell us what you advertise, what you spend and what you want to improve.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/facebook-ads/": {
    name: "Meta Ads",
    status: "Draft for review",
    eyebrow: "Facebook and Instagram advertising",
    h1: "Give people a clear reason to stop and look.",
    intro: [
      "On Facebook and Instagram, your ad needs to make sense quickly. We help Australian businesses put a useful offer and clear message in front of people who may be interested.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Begin with the offer, then build the campaign.",
        paras: [
          "What are you asking someone to consider? Why would it matter to them? We work through those questions before planning the audience, creative and next step.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What the campaign needs",
        paras: [],
        items: [
          {
            h3: "An audience with a reason to care",
            paras: [
              "Plan who the campaign is for and review the audience options available for your account and offer.",
            ],
          },
          {
            h3: "Creative that explains the value",
            paras: [
              "Use images, video and copy to show what you provide and why someone might take a closer look. Creative production is agreed in the scope.",
            ],
          },
          {
            h3: "A useful destination",
            paras: [
              "Make the page or enquiry step follow through on the ad, with enough information to help someone decide.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Review more than clicks and reactions.",
        paras: [
          "We agree on the customer actions to measure, check the tracking available and look at results alongside enquiry or order quality. That informs changes to the message, creative and spending.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Know what is included.",
        paras: [
          "Advertising spend, campaign management and content production are discussed separately. If you already run Meta ads, we can start with the current account and identify the work worth considering.",
          "Need ongoing posts and community content? Explore Social Media Marketing. For people actively searching, read about Google Ads.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Let’s talk about what you want to promote.",
        paras: [
          "Share your offer, your audience and what you want the campaign to achieve.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/social-media-marketing/": {
    name: "Social Media Marketing",
    status: "Draft for review",
    eyebrow: "Social media marketing",
    h1: "Give people something useful to follow.",
    intro: [
      "Your social pages can show how you work, answer common questions and help people get to know your business. We help you turn that knowledge into content you can publish consistently.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Build the plan around your customers.",
        paras: [
          "We discuss who you want to reach, which channels make sense and what people need to know. The plan gives each post a purpose and sets a rhythm your business can support.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Content with a job to do",
        paras: [],
        items: [
          {
            h3: "Explain what you offer",
            paras: [
              "Make services, products and useful details easier to understand, including what someone should do if they are interested.",
            ],
          },
          {
            h3: "Show the work behind the business",
            paras: [
              "Use genuine projects, people and everyday knowledge to give your audience a clearer picture of how you work.",
            ],
          },
          {
            h3: "Answer the questions you hear",
            paras: [
              "Turn recurring customer conversations into practical tips, explanations and timely updates.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Make approvals part of the process.",
        paras: [
          "We agree on content responsibilities and review points before publishing. Photos, video, writing, scheduling and customer responses need a clear scope so your team knows what to provide and what we look after.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Learn from what people find useful.",
        paras: [
          "We review the available responses, website visits and enquiries alongside your feedback. That helps shape the next content plan without making follower count the only measure of progress.",
          "Looking for paid promotion? Explore Facebook and Instagram Ads. For website articles and service content, see Content Marketing.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Let’s find the stories your business can tell.",
        paras: [
          "Share your social pages and what you would like people to understand about your business.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/lead-generation/": {
    name: "Lead Generation",
    status: "Draft for review",
    eyebrow: "Lead generation",
    h1: "Bring the right enquiries closer to becoming customers.",
    intro: [
      "An enquiry is useful when it fits what you do and your team can act on it. We help connect your marketing, website and follow-up around the kinds of customers you want to work with.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "First, agree on what a good enquiry looks like.",
        paras: [
          "That might mean the right service, location, project size or buying stage. We use those details to shape the offer and decide how to reach the people most likely to need it.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Connect the steps in the enquiry journey",
        paras: [],
        items: [
          {
            h3: "Get found by relevant people",
            paras: [
              "Choose search, advertising or content based on your audience, priorities and budget. The channel should have a clear role in the plan.",
            ],
          },
          {
            h3: "Help them decide to contact you",
            paras: [
              "Explain your offer, answer useful questions and make the contact step easy to find and complete.",
            ],
          },
          {
            h3: "Give your team what they need",
            paras: [
              "Plan the information to collect, where enquiries should go and who follows them up. Connections to business systems are agreed separately.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Review quality alongside quantity.",
        paras: [
          "We look at recorded enquiries and ask what happened next. Your team’s feedback on suitability, quotes and sales helps explain which activity deserves more attention.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Improve the weak point first.",
        paras: [
          "Sometimes you need more relevant visitors. Sometimes the page is unclear or enquiries are being missed. We review the current process before recommending more spending or additional tools.",
          "Explore Google Ads, SEO or AI Automation for specific parts of the work.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Tell us which customers you want more of.",
        paras: [
          "Share how enquiries arrive today and where you think the process could work better.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/web-design/": {
    name: "Web Design",
    status: "Draft for review",
    eyebrow: "Web design and development",
    h1: "A website that makes your business easy to understand.",
    intro: [
      "Your website should explain what you offer and make the next step clear. SIKA Digital provides web design and development for Australian businesses, from service websites to online stores.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Start with what the website needs to do.",
        paras: [
          "We talk through your audience, your offer and the actions you want visitors to take. That shapes the pages, content and features before design begins.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What goes into the build",
        paras: [],
        items: [
          {
            h3: "Clear pages and content",
            paras: [
              "Organise the information customers need, with straightforward navigation and writing that sounds like your business.",
            ],
          },
          {
            h3: "Design for everyday use",
            paras: [
              "Make the site comfortable to browse on a phone or computer, with readable text and easy-to-use controls.",
            ],
          },
          {
            h3: "Useful functionality",
            paras: [
              "Plan the forms, booking steps, checkout or connections your website needs, and agree on what is included.",
            ],
          },
          {
            h3: "Search and measurement",
            paras: [
              "Build a sensible page structure and agree on the customer actions that should be measured.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "See the website take shape.",
        paras: [
          "We agree on the scope and review points, so you can give feedback as the work develops. Content, approvals and technical requirements are part of the plan from the start.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Think beyond launch.",
        paras: [
          "Before handover, we confirm how content will be updated and what ongoing support you need. If you already have a website, we can review what is worth keeping and what needs changing.",
          "Explore Ecommerce Websites, WordPress Development or Conversion Rate Optimisation.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Show us what your website needs to do.",
        paras: [
          "Bring your plans or your current website. We’ll discuss a practical way forward.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/web-design/ecommerce/": {
    name: "Ecommerce Websites",
    status: "Draft for review",
    eyebrow: "Ecommerce website development",
    h1: "Make shopping with you straightforward.",
    intro: [
      "Customers need to find the right product, understand what they are buying and complete an order with confidence. We plan and build online stores around that journey and the team managing it.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Plan the store around your range.",
        paras: [
          "We start with your products, how you sell them and what happens after an order. That helps determine the platform, page structure and features worth including.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "The parts that need to work together",
        paras: [],
        items: [
          {
            h3: "Catalogue and product pages",
            paras: [
              "Organise your range with useful categories, clear descriptions, product options and images that help customers choose.",
            ],
          },
          {
            h3: "Checkout and delivery",
            paras: [
              "Make payment options, delivery information and the final order steps easy to follow.",
            ],
          },
          {
            h3: "Day-to-day management",
            paras: [
              "Plan how your team will update products, manage content and deal with orders once the store is live.",
            ],
          },
          {
            h3: "The connections you need",
            paras: [
              "Agree on links to inventory, email or other business systems and include the integration work in the scope.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Check the buying journey before launch.",
        paras: [
          "We review the experience across devices and test the agreed order flows. Content, payment configuration and responsibilities for fulfilment are part of launch planning.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Rebuilding an existing store?",
        paras: [
          "We’ll discuss what needs to move, what should be kept and how to manage the transition. Changes to product information, customer data and website addresses need a clear plan.",
          "Explore Ecommerce SEO or Conversion Rate Optimisation for the next stage of improvement.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Tell us how you want to sell online.",
        paras: [
          "Share your range, current store or plans. We’ll work through the requirements with you.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/web-design/wordpress/": {
    name: "WordPress",
    status: "Draft for review",
    eyebrow: "WordPress website development",
    h1: "A WordPress website your team can work with.",
    intro: [
      "You need a website that presents your business clearly and is practical to keep up to date. We plan WordPress websites around your content, the people using them and the team looking after them.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Decide what your website needs before choosing the extras.",
        paras: [
          "We start with the pages, features and editing tasks that matter. That gives the build a clear purpose and helps you understand what is included.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What we plan with you",
        paras: [],
        items: [
          {
            h3: "Pages that make sense",
            paras: [
              "Arrange services, products and supporting information so visitors can find what they need and choose a next step.",
            ],
          },
          {
            h3: "Content you can update",
            paras: [
              "Agree on which parts your team needs to edit, from everyday text changes to adding new pages.",
            ],
          },
          {
            h3: "Features with a purpose",
            paras: [
              "Choose forms and other functionality around the job they need to do. Any additional tools, licences and connections are discussed as part of the scope.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Rebuilding an existing WordPress site?",
        paras: [
          "We review its content, structure and useful features before deciding what to keep. Moving pages, changing website addresses and transferring information need a plan alongside the new design.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Know who looks after it after launch.",
        paras: [
          "Hosting, software updates, backups and support each need an owner. We’ll discuss those responsibilities before handover, along with the guidance your team needs to manage content.",
          "Explore Web Design for the wider process or Ecommerce Websites if you need an online store.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Tell us what you want to change.",
        paras: [
          "Show us your current website or explain what you have in mind. We’ll work through a suitable WordPress scope with you.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/conversion-rate-optimisation/": {
    name: "Conversion Rate Optimisation",
    status: "Draft for review",
    eyebrow: "Conversion rate optimisation",
    h1: "Make the next step easier for your website visitors.",
    intro: [
      "People may be interested in your offer and still leave before enquiring or buying. Conversion rate optimisation looks at that journey and the changes that could help them move forward.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Start by understanding where people stop.",
        paras: [
          "We review the pages, actions and information available. Before recommending changes, we check what counts as a useful conversion and whether it is being recorded properly.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Questions we work through",
        paras: [],
        items: [
          {
            h3: "Does the page deliver what brought them here?",
            paras: [
              "The message should follow through on the search, ad or link a visitor clicked, with an offer they can understand.",
            ],
          },
          {
            h3: "Can they find what they need to decide?",
            paras: [
              "Look at service details, product information, genuine proof and common questions that may affect their choice.",
            ],
          },
          {
            h3: "Is the action straightforward?",
            paras: [
              "Review buttons, forms and checkout steps on the devices people use. Every field and instruction should have a reason to be there.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Choose improvements we can learn from.",
        paras: [
          "We prioritise changes using the evidence available. Where traffic and measurement support a useful test, we can compare options. Smaller websites may need a focused review and staged improvements first.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Look beyond the conversion count.",
        paras: [
          "A form submission only tells part of the story. Enquiry quality, completed orders and your team’s feedback help us understand whether the change is useful to your business.",
          "This work can support Google Ads, Ecommerce Websites or an existing business website.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Let’s look at the journey your customers take.",
        paras: [
          "Share the page you want to improve and what you want visitors to do there.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/ai-automation/": {
    name: "AI Automation",
    status: "Draft for review",
    eyebrow: "AI consulting and automation",
    h1: "Find a useful place for AI in the work you already do.",
    intro: [
      "You may have a repetitive task in mind, or simply want to understand where AI could help. We work through your process, consider the options and plan a focused starting point.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Begin with the task and the people doing it.",
        paras: [
          "We look at what happens today, where information comes from and which steps take effort. Sometimes a straightforward automation is enough. Other tasks may benefit from AI, with the right checks around it.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Where we can explore improvements",
        paras: [],
        items: [
          {
            h3: "Enquiry handling",
            paras: [
              "Consider how information is collected, passed to the right person and made ready for follow-up.",
            ],
          },
          {
            h3: "Repetitive administration",
            paras: [
              "Review tasks such as moving information between systems or preparing routine updates, then assess what can be connected reliably.",
            ],
          },
          {
            h3: "Working with business information",
            paras: [],
          },
        ],
        after: [
          "Explore ways to find, summarise or draft from approved information, with people responsible for checking important outputs.",
        ],
      },
      {
        h2: "Agree on the boundaries before building.",
        paras: [
          "The scope should explain what the system can access, what it can do and when a person needs to step in. We discuss data handling, tool costs and the systems involved before implementation.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Try it on a manageable piece of work.",
        paras: [
          "A focused trial helps you see whether the approach is useful in practice. We agree on how to test it, handle exceptions and decide what needs to change before expanding it.",
          "If your priority is appearing in AI-generated search answers, explore SEO and AI search. For the enquiry journey, see Lead Generation.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Bring us one task you would like to improve.",
        paras: [
          "Tell us how it works today. We’ll help you work out a practical next step.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/email-marketing/": {
    name: "Email Marketing",
    status: "Draft for review",
    eyebrow: "Email marketing",
    h1: "Send something your customers have a reason to read.",
    intro: [
      "A useful email can answer a question, introduce an offer or help someone take the next step. We help you plan messages around your customers and the relationship they already have with your business.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Give each email a clear purpose.",
        paras: [
          "We start with who should receive the message, why it matters to them and what you want them to do. That guides the content, timing and way you review the result.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Where email can fit",
        paras: [],
        items: [
          {
            h3: "Regular campaigns",
            paras: [
              "Share useful news, advice or offers with people who have agreed to hear from you, using a schedule you can sustain.",
            ],
          },
          {
            h3: "Welcome and follow-up messages",
            paras: [
              "Help new subscribers or customers understand what comes next, with a sequence built around the information they need.",
            ],
          },
          {
            h3: "Relevant customer groups",
            paras: [
              "Use suitable information you already hold to make messages more relevant, rather than sending every person the same thing.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Plan the list and the sending process.",
        paras: [
          "We review your platform and how people join your list. Consent, clear sender details and an easy unsubscribe process need to be part of the setup. Any connections to other systems are agreed before implementation.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Learn what happens after the email.",
        paras: [
          "We review the available campaign information alongside website actions, enquiries or orders. That helps shape future messages and gives the numbers a business context.",
          "For supporting articles and website pages, explore Content Marketing. For wider process changes, see AI Automation.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What would your customers find useful to hear?",
        paras: [
          "Tell us about your audience, current emails and what you want to improve.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/content-marketing/": {
    name: "Content Marketing",
    status: "Draft for review",
    eyebrow: "Content marketing",
    h1: "Answer the questions that help people choose you.",
    intro: [
      "Your customers want to know what you offer, how it works and whether it suits them. We help turn your knowledge into clear content they can use, from website pages to practical articles.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Find the useful topics before filling a calendar.",
        paras: [
          "We look at your offer, customer questions and relevant searches. Then we decide which pages or topics deserve attention and how they connect with the rest of your website.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Content we can plan and write",
        paras: [],
        items: [
          {
            h3: "Website and service pages",
            paras: [
              "Explain what you do in everyday language, with the details someone needs before getting in touch.",
            ],
          },
          {
            h3: "Guides and articles",
            paras: [
              "Help readers understand a problem, compare their options or prepare for a decision. Each piece should have a clear purpose.",
            ],
          },
          {
            h3: "Proof from your own work",
            paras: [
              "Turn approved project information and genuine customer feedback into examples that show how you approach the work.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "It should sound like your business.",
        paras: [
          "We ask for your knowledge, examples and point of view. Drafts go through an agreed review process so the facts are right and the language feels natural to your customers.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Publish with a plan to keep it useful.",
        paras: [
          "Titles, headings and internal links help people find their way around. After publishing, the available search and website information can show which topics need updating or further explanation.",
          "For wider search work, explore SEO and AI search. To take useful content to your existing audience, see Email Marketing or Social Media Marketing.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What do your customers keep asking?",
        paras: [
          "Share the pages you want to improve or the questions you would like your content to answer.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/reputation-management/": {
    name: "Reputation Management",
    status: "Draft for review",
    eyebrow: "Online reputation management",
    h1: "Give customer feedback the attention it deserves.",
    intro: [
      "Reviews help people understand what working with your business might be like. We help you plan how to request honest feedback, keep track of it and respond with care.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Start with the experience your customers have.",
        paras: [
          "We review where people leave feedback and how your team handles it today. That helps identify the practical gaps, from making a review link easier to find to deciding who should answer a concern.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Put a clear process around reviews",
        paras: [],
        items: [
          {
            h3: "Ask at a sensible point",
            paras: [
              "Invite genuine feedback after a customer experience, using a straightforward request. Invitations should welcome honest responses without incentives or selecting only happy customers.",
            ],
          },
          {
            h3: "Respond in your business’s voice",
            paras: [
              "Plan helpful responses to praise, questions and complaints, with an approval process for sensitive situations.",
            ],
          },
          {
            h3: "Use the feedback inside the business",
            paras: [
              "Look for recurring questions or issues your team can act on. A review process is more useful when it also helps improve the customer experience.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "What about an unfair review?",
        paras: [
          "We can help review whether a post appears to break the platform’s rules and discuss the reporting process. A negative opinion alone does not make a review eligible for removal, and removal cannot be guaranteed.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Know who handles what.",
        paras: [
          "We agree on the platforms, notifications, responses and any automation involved. Your team should know when feedback needs their attention and how it reaches them.",
          "Explore Local SEO for business profile information or AI Automation for related workflow planning.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Let’s look at your current review process.",
        paras: [
          "Tell us where feedback appears and what your team would like to manage more easily.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/industries/tradies/": {
    name: "Tradies",
    status: "Draft for review",
    eyebrow: "Digital marketing for tradies",
    h1: "Be found for the jobs you want to take on.",
    intro: [
      "Your marketing should make it clear what you do, where you work and how someone can get in touch. We help trade businesses connect that information with useful pages, search visibility and advertising.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Start with your services and your capacity.",
        paras: [
          "You may want more of one type of job, work in a particular area or a better mix of enquiries. We plan around those priorities and how your team handles the work once it comes in.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Give customers the details they need",
        paras: [],
        items: [
          {
            h3: "Services they can recognise",
            paras: [
              "Describe the jobs you do in the language customers use, with clear boundaries around what you offer.",
            ],
          },
          {
            h3: "Areas you actually cover",
            paras: [
              "Show where you work and keep that information consistent across the website and relevant business listings.",
            ],
          },
          {
            h3: "Reasons to feel confident",
            paras: [
              "Use genuine work photos, approved reviews and accurate business details to help people understand who they are contacting.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Choose a channel that fits the job.",
        paras: [
          "Local SEO can support local discovery. Google Ads can promote selected services. A clear website helps people check the details before calling or enquiring.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Make enquiries easier to handle.",
        paras: [
          "The contact step should collect enough information to help your team respond, without making it hard for a customer to begin. We can also review where enquiries go and who follows them up.",
          "Explore the digital marketing guide for tradies for a practical starting point.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Tell us which jobs you want more of.",
        paras: [
          "Share your trade, service area and how customers currently find you. We’ll discuss where to focus first.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/industries/electricians/": {
    name: "Electricians",
    status: "Draft for review",
    eyebrow: "Digital marketing for electricians",
    h1: "Make your electrical services easier to find and understand.",
    intro: [
      "The person planning an installation has different questions from someone arranging ongoing commercial work. We help electrical businesses explain their services and reach customers looking for the jobs they want to take on.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Plan around your actual service mix.",
        paras: [
          "We discuss your residential or commercial focus, service area and capacity. Those details help decide which work to promote and what a suitable enquiry needs to include.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Help customers make an informed enquiry",
        paras: [],
        items: [
          {
            h3: "Give important services their own space",
            paras: [
              "Explain the work you offer on useful pages, with customer questions answered in straightforward language.",
            ],
          },
          {
            h3: "Make business details easy to check",
            paras: [
              "Show accurate licensing and contact information, genuine project photos and approved reviews where they are available.",
            ],
          },
          {
            h3: "Ask for useful job details",
            paras: [
              "Make it easy to describe the service, location and timing without turning the first contact into a long questionnaire.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Match the marketing to the work.",
        paras: [
          "Local SEO can support discovery in the areas you serve. Google Ads can focus on selected electrical services, with a landing page that matches the offer. Web Design brings the information together.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Review which enquiries fit your business.",
        paras: [
          "Calls and forms are a starting point. Your feedback about service type, location and booked work helps explain whether the activity is reaching suitable customers.",
          "See our wider trade marketing approach for how the enquiry process fits together.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Which electrical work do you want to be known for?",
        paras: [
          "Tell us about your business and the services you want to prioritise. We’ll discuss a focused starting point.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/industries/plumbers/": {
    name: "Plumbers",
    status: "Draft for review",
    eyebrow: "Digital marketing for plumbers",
    h1: "Help customers find the right plumbing service to ask for.",
    intro: [
      "Some customers need to explain a problem quickly. Others are planning a replacement, renovation or larger job. We help plumbing businesses make those services clear and give each customer a sensible way to get in touch.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Promote the work your team is set up to handle.",
        paras: [
          "We start with the services you provide, the areas you cover and your capacity. Urgent enquiries and planned projects may need different pages, messages and contact steps.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Make the information useful at the point of need",
        paras: [],
        items: [
          {
            h3: "Clear service pages",
            paras: [
              "Explain the work you offer and the details customers commonly ask about, without assuming they know the trade terms.",
            ],
          },
          {
            h3: "Accurate availability and coverage",
            paras: [
              "Make service areas and contact hours easy to check. Any emergency or specialist claim needs to match what your business actually provides.",
            ],
          },
          {
            h3: "A straightforward enquiry",
            paras: [
              "Help people share the location, type of issue and timing, so your team has a useful starting point for the conversation.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Bring search and the website together.",
        paras: [
          "Local SEO supports your presence in relevant local searches. Google Ads can focus on particular services, while Web Design helps customers find the information and contact options they need.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Keep track of the enquiries that fit.",
        paras: [
          "Reviewing calls and forms alongside your team’s feedback helps distinguish suitable jobs from enquiries outside your services or area. That informs the next marketing decisions.",
          "Explore our wider trade marketing approach.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Tell us what your plumbing business wants to focus on.",
        paras: [
          "We’ll talk through the current website, service mix and how enquiries are handled.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/industries/builders/": {
    name: "Builders",
    status: "Draft for review",
    eyebrow: "Digital marketing for builders",
    h1: "Help the right clients picture working with you.",
    intro: [
      "Choosing a builder is a considered decision. Your website needs to show the work you take on, explain your approach and help potential clients understand whether their project is a fit.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Build the marketing around your project focus.",
        paras: [
          "New homes, renovations and commercial projects call for different information. We start with the work you offer, the areas you serve and the conversations you want your marketing to begin.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Give potential clients something useful to consider",
        paras: [],
        items: [
          {
            h3: "Projects with context",
            paras: [
              "Use approved photos and accurate project details to explain the brief, the scope and your part in the work. A useful story gives the images meaning.",
            ],
          },
          {
            h3: "A clear explanation of your process",
            paras: [
              "Show what happens from the first enquiry through the stages you manage. Help people understand what they need to prepare before contacting you.",
            ],
          },
          {
            h3: "An enquiry suited to the project",
            paras: [
              "Make room for useful details such as project type, location, stage and expected timing, without asking someone to complete the whole brief at once.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Connect discovery with a useful website.",
        paras: [
          "SEO can help people find relevant services and project information. Content Marketing can explain common planning questions. Web Design brings the portfolio, process and contact journey together.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Review suitability as well as interest.",
        paras: [
          "Your team’s feedback about project fit and the conversations that progress helps assess the marketing beyond a count of form submissions.",
          "See the wider industry overview for related services.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What kinds of projects do you want to show more of?",
        paras: [
          "Share your current website and project focus. We’ll discuss the information and work needed next.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/google-ads-agency-brisbane/": {
    name: "Google Ads Brisbane",
    status: "Draft for review",
    eyebrow: "Google Ads for Brisbane businesses",
    h1: "Focus your Brisbane advertising on the work you want.",
    intro: [
      "If you want enquiries for particular services or areas, the campaign needs to reflect those choices. We help Brisbane businesses plan Google Ads around the offer, budget and customers they want to reach.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Begin with the work you can take on.",
        paras: [
          "We discuss your service mix, capacity and coverage before planning the campaign. Advertising a job or area your team cannot support creates the wrong kind of interest.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Make the campaign specific",
        paras: [],
        items: [
          {
            h3: "Services and searches",
            paras: [
              "Choose a focused starting point and review the searches that bring people to your ads. The aim is to understand which interest is relevant to your offer.",
            ],
          },
          {
            h3: "Areas and availability",
            paras: [
              "Plan the locations you want to reach around where your business actually works. Review the account settings alongside the information on the landing page.",
            ],
          },
          {
            h3: "A clear enquiry step",
            paras: [
              "Help customers understand the service and share enough detail for your team to respond usefully.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Use enquiry feedback to guide decisions.",
        paras: [
          "Recorded calls and forms need context. Your feedback about service suitability, location and booked work helps explain what the campaign is producing and what to review next.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Keep the commitment clear.",
        paras: [
          "We discuss advertising spend, management and any landing-page work separately. If an account already exists, we can review it before recommending changes.",
          "Explore our wider Google Ads service or Web Design for Brisbane businesses.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What do you want to promote in Brisbane?",
        paras: [
          "Share your website, offer and service area. We’ll discuss a suitable starting point.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/seo-agency-sydney/": {
    name: "SEO Sydney",
    status: "Draft for review",
    eyebrow: "SEO for Sydney businesses",
    h1: "Make your Sydney business easier to find through search.",
    intro: [
      "If your website covers several services, customers need a clear route to the one they are looking for. We help Sydney businesses plan SEO around useful pages and the questions people ask before contacting them.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Give each important service a clear place.",
        paras: [
          "We review how the website explains your offer and how its pages connect. That helps identify gaps, overlapping content and information that is difficult to find.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Build a useful search plan",
        paras: [],
        items: [
          {
            h3: "Match pages with customer needs",
            paras: [
              "Choose relevant topics and searches, then decide which existing or new pages can answer them properly.",
            ],
          },
          {
            h3: "Make the structure easier to follow",
            paras: [
              "Review navigation, titles, headings and internal links so visitors and search engines can understand the important parts of the site.",
            ],
          },
          {
            h3: "Bring your knowledge into the content",
            paras: [
              "Use accurate service details, practical answers and genuine examples to explain what your business offers.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Include AI search in the wider picture.",
        paras: [
          "Clear, useful information supports the wider work of making your business understandable in search. Our SEO service includes AEO and GEO considerations, with no promise of a particular ranking or AI mention.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Review progress against your priorities.",
        paras: [
          "We consider search visibility and visits alongside the enquiries or sales that can be measured. Your business goals guide which pages deserve attention next.",
          "If nearby customers are your main focus, explore Local SEO for Sydney. For a new website, see Web Design for Sydney.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Which services should your website be found for?",
        paras: [
          "Share your website and priorities. We’ll discuss a practical starting point.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/seo-agency-brisbane/": {
    name: "SEO Brisbane",
    status: "Draft for review",
    eyebrow: "SEO for Brisbane businesses",
    h1: "Give your existing website a clearer SEO plan.",
    intro: [
      "You may already have a website and still be unsure which improvements matter. We help Brisbane businesses review their search presence and decide where the next round of SEO work should begin.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Start with what is already there.",
        paras: [
          "We look at your service pages, structure and available search information. You’ll understand which parts are useful, where information is missing and which issues need a closer look.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Put the work in a sensible order",
        paras: [],
        items: [
          {
            h3: "Important pages first",
            paras: [
              "Prioritise the services or products that matter to your business. Improve the information customers need before expanding into more topics.",
            ],
          },
          {
            h3: "Access and usability",
            paras: [
              "Review whether important content can be found and read, and whether visitors can move through the site comfortably.",
            ],
          },
          {
            h3: "Better answers to customer questions",
            paras: [
              "Bring your knowledge into the pages so people can understand the offer, the process and what to do next.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Plan for search as it changes.",
        paras: [
          "Our broader SEO service considers traditional results and AI search, including AEO and GEO. Clear information and useful content remain part of the work; specific rankings or AI citations cannot be promised.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Know why each task is in the plan.",
        paras: [
          "We explain the recommended work and review progress using the information available. Search visibility, visits and relevant customer actions help shape the next priorities.",
          "For a defined starting review, see SEO Audit. For nearby customer discovery, explore Local SEO for Brisbane.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What would you like your website to do better?",
        paras: [
          "Share the site and the services you want to focus on. We’ll talk through the next step.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/seo-agency-adelaide/": {
    name: "SEO Adelaide",
    status: "Draft for review",
    eyebrow: "SEO for Adelaide businesses",
    h1: "Put your business knowledge to work on your website.",
    intro: [
      "You explain your services to customers every day. The website should answer those questions too. We help Adelaide businesses turn useful knowledge into clearer pages and a focused SEO plan.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Start with the questions that affect a decision.",
        paras: [
          "What do people need to know before asking for a quote, choosing a product or booking a service? We connect those questions with relevant searches and the information already on your website.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Give useful information a clear home",
        paras: [],
        items: [
          {
            h3: "Explain your services properly",
            paras: [
              "Show what each service includes, who it suits and what the next step involves. Details from your own business make the page more useful.",
            ],
          },
          {
            h3: "Bring examples into the explanation",
            paras: [
              "Genuine project information, product knowledge and approved customer feedback can help people understand your approach.",
            ],
          },
          {
            h3: "Connect the important pages",
            paras: [
              "Use a sensible structure and internal links so readers can move from a question to the service or product that answers it.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Content is one part of the SEO work.",
        paras: [
          "We also review how important pages can be accessed and what the available search information shows. Technical issues and measurement need attention alongside the writing.",
          "Our wider SEO service includes AEO and GEO considerations for AI search, without promising rankings or mentions.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Keep the plan manageable.",
        paras: [
          "We agree on the priorities and explain the scope before work begins. Your knowledge and feedback are part of making the content accurate.",
          "Explore Content Marketing or Small Business SEO for related support.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What should customers understand before they contact you?",
        paras: ["Share your website and the questions you hear most often."],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/seo-agency-perth/": {
    name: "SEO Perth",
    status: "Draft for review",
    eyebrow: "SEO for Perth businesses",
    h1: "Build your search plan around where your customers buy.",
    intro: [
      "A Perth business may serve nearby customers, sell products across Australia or do both. We help you plan SEO around that real market, so the website explains the right offer to the right reader.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Decide who each part of the website is for.",
        paras: [
          "We discuss your services, products and coverage before choosing priorities. Local enquiries, product comparisons and online orders call for different kinds of information.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Connect search needs with useful pages",
        paras: [],
        items: [
          {
            h3: "Local services",
            paras: [
              "Explain what you do and where you actually work, with accurate business information and a clear contact step.",
            ],
          },
          {
            h3: "Products and categories",
            paras: [
              "Help shoppers explore the range, compare suitable options and find the details they need before buying.",
            ],
          },
          {
            h3: "Questions before a decision",
            paras: [
              "Use your knowledge to answer practical questions and connect the explanation to a relevant service or product page.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Check the foundation as well as the content.",
        paras: [
          "The page structure, technical access and information available from search all help shape the work. We explain what needs attention and why it belongs in the plan.",
          "Our broader SEO and AI search service includes AEO and GEO considerations. Rankings, traffic and AI mentions still depend on factors beyond any single change.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Follow the actions that matter.",
        paras: [
          "We review relevant search activity alongside measurable enquiries or sales. That helps distinguish interest from the outcomes your business is trying to improve.",
          "Explore Ecommerce SEO, Local SEO or Web Design for Perth.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Where do you want your next customers to come from?",
        paras: ["Tell us about your website and the market you serve."],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/google-ads-agency-sydney/": {
    name: "Google Ads Sydney",
    status: "Draft for review",
    eyebrow: "Google Ads for Sydney businesses",
    h1: "Give the click a useful next step.",
    intro: [
      "Your ad makes a promise. The page someone reaches needs to follow through. We help Sydney businesses connect Google Ads with clear offers, useful landing pages and measurement that relates to their goals.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Review the whole journey.",
        paras: [
          "We look at what you want to promote, who it is for and what happens after someone clicks. That helps identify whether the next priority is the campaign, the page or the contact process.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Bring the key decisions together",
        paras: [],
        items: [
          {
            h3: "A focused campaign",
            paras: [
              "Choose relevant searches and a suitable geographic focus, with a budget that reflects the work you want to explore.",
            ],
          },
          {
            h3: "An offer people can understand",
            paras: [
              "Use straightforward ad messages and landing-page information to explain the value and the action you are asking someone to take.",
            ],
          },
          {
            h3: "Measurement you can interpret",
            paras: [
              "Agree on which actions matter, check how they are recorded and review the information alongside enquiry quality or completed orders.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Existing account? Begin with the evidence.",
        paras: [
          "We can review current spending, search terms, messages and tracking before recommending changes. You should understand the findings and what the next piece of work involves.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Keep costs and decisions visible.",
        paras: [
          "We discuss management fees, advertising spend and any website work separately. Ongoing reviews explain the changes and the questions they are intended to answer.",
          "Explore PPC Management, Conversion Rate Optimisation or the Google Ads cost guide.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What happens after people click your ads?",
        paras: [
          "Share your account goals and website. We’ll talk through what to review first.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/local-seo-sydney/": {
    name: "Local SEO Sydney",
    status: "Draft for review",
    eyebrow: "Local SEO for Sydney businesses",
    h1: "Help nearby customers check the details that matter.",
    intro: [
      "Can someone quickly see what you do, when you are available and how to contact you? We help Sydney businesses connect their local search information with a useful website and a clear next step.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Make your business information reliable.",
        paras: [
          "We review the details customers encounter across your website and relevant listings. The plan starts with the real business, including whether customers visit you, you travel to them or both.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Bring the main pieces together",
        paras: [],
        items: [
          {
            h3: "Your Google Business Profile",
            paras: [
              "Review categories, services, hours, contact details and photos so the profile accurately represents what the customer can expect.",
            ],
          },
          {
            h3: "The page a customer reaches",
            paras: [
              "Help them understand the relevant service or location, find practical information and choose how to get in touch.",
            ],
          },
          {
            h3: "Genuine customer feedback",
            paras: [
              "Plan a straightforward way to request honest reviews and handle responses, without incentives or filtering for positive feedback.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "More than one genuine location?",
        paras: [
          "We can discuss how eligible business locations and their website information should be organised. Each needs accurate details; an extra page or profile is not a substitute for a real location.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Review useful local interest.",
        paras: [
          "We consider the available profile and search information alongside website actions and enquiries. Local visibility is affected by relevance, distance and prominence, so a particular map position cannot be promised.",
          "Explore SEO for Sydney businesses or the Google Maps SEO guide.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What do nearby customers need to know about you?",
        paras: [
          "Share your website and business profile. We’ll discuss what to review first.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/local-seo-brisbane/": {
    name: "Local SEO Brisbane",
    status: "Draft for review",
    eyebrow: "Local SEO for Brisbane businesses",
    h1: "Make your service area clear to nearby customers.",
    intro: [
      "If your team travels to customers, people need to know whether you cover their area and provide the work they need. We help Brisbane businesses bring those details together across local search and the website.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Work from your real coverage.",
        paras: [
          "We discuss where your team goes, which services are available and the areas that matter most. That becomes the basis for a useful local plan rather than a long list of place names.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Give local searches a useful answer",
        paras: [],
        items: [
          {
            h3: "Accurate profile information",
            paras: [
              "Review your Google Business Profile details, service area and relevant services so the listing represents how your business operates.",
            ],
          },
          {
            h3: "Pages with a reason to exist",
            paras: [
              "Explain the service and practical information a customer in that area needs. Additional location pages should offer useful detail rather than repeat the same copy.",
            ],
          },
          {
            h3: "A clear contact route",
            paras: [
              "Make it easy to share the job and location, with contact information that matches the website and business listings.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Keep customer feedback honest.",
        paras: [
          "Genuine reviews can help people understand the experience you provide. We can discuss a review-request process that welcomes balanced feedback and gives your team a way to respond.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Understand the limits of local visibility.",
        paras: [
          "Google considers relevance, distance and prominence in local results. We can improve the accuracy and usefulness of your information; a profile change cannot guarantee a particular map position.",
          "Explore SEO for Brisbane businesses or What is local SEO?.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Where do you want to be found for the work you do?",
        paras: [
          "Tell us about your services and actual coverage. We’ll discuss the first priorities.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/web-design-brisbane/": {
    name: "Web Design Brisbane",
    status: "Draft for review",
    eyebrow: "Web design for Brisbane businesses",
    h1: "Give your business a website customers can make sense of.",
    intro: [
      "People should be able to understand your services, check the important details and get in touch without working hard. We help Brisbane businesses plan and build websites around that everyday experience.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Work out the pages before drawing the design.",
        paras: [
          "We start with your offer and the questions customers ask. That helps decide what belongs on the site, how the pages connect and which information should be easy to find.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Plan for the people using it",
        paras: [],
        items: [
          {
            h3: "Customers looking for a service",
            paras: [
              "Explain what you provide, who it suits and the information needed before an enquiry. Clear navigation helps visitors reach the right page.",
            ],
          },
          {
            h3: "Visitors on a phone",
            paras: [
              "Keep text readable, controls easy to use and contact options straightforward across the devices customers use.",
            ],
          },
          {
            h3: "Your team making updates",
            paras: [
              "Agree on what you need to edit and how the website will be managed after launch. The right setup should fit your everyday tasks.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Know what is included in the build.",
        paras: [
          "Content, forms, system connections and ongoing support need a clear scope. We agree on the review stages and responsibilities before the work begins.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Already have a website?",
        paras: [
          "We can review what is worth keeping and where the current structure or experience needs attention. A rebuild should include a plan for important content and existing page addresses.",
          "Explore Web Design and Development, WordPress or Ecommerce Websites.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What should your website help people do?",
        paras: [
          "Show us your current site or explain the project you have in mind.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/web-design-sydney/": {
    name: "Web Design Sydney",
    status: "Draft for review",
    eyebrow: "Web design for Sydney businesses",
    h1: "Help visitors decide what to do next.",
    intro: [
      "A website needs to do more than introduce your business. It should help people understand the offer, answer their questions and move towards an enquiry or purchase. We help Sydney businesses plan that journey before building the pages.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Follow the customer’s decision.",
        paras: [
          "We work through what someone needs when they first arrive and what they need before acting. Those questions shape the content, navigation and features, alongside the visual design.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Give the important steps proper attention",
        paras: [],
        items: [
          {
            h3: "Understand the offer",
            paras: [
              "Use clear service or product information, with enough detail to help visitors decide whether it suits them.",
            ],
          },
          {
            h3: "Check the evidence",
            paras: [
              "Present genuine project examples and approved customer feedback where available. Make the context easy to understand.",
            ],
          },
          {
            h3: "Complete the action",
            paras: [
              "Plan forms, contact options or checkout around the information needed and the people using them, including on a phone.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "See the decisions as the project develops.",
        paras: [
          "We agree on the scope and review stages so you can assess the content and design before launch. Responsibilities for copy, images and technical connections are part of that plan.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Prepare for life after handover.",
        paras: [
          "Your team should know how everyday content changes will be managed and who handles support. Hosting, software and ongoing work are discussed before the project is handed over.",
          "Explore Ecommerce Websites, WordPress or Conversion Rate Optimisation.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Which step should your website make easier?",
        paras: [
          "Share your plans or current website. We’ll discuss how the project could take shape.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/web-design-perth/": {
    name: "Web Design Perth",
    status: "Draft for review",
    eyebrow: "Web design for Perth businesses",
    h1: "Plan the next version of your website properly.",
    intro: [
      "When a website needs to change, the design is only part of the decision. We help Perth businesses work through the content, features and handover, whether the project is a new site or a rebuild.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Begin with what needs to work better.",
        paras: [
          "We discuss your offer, your customers and the tasks the website needs to support. For an existing site, we also look at the pages and features worth keeping.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Make the important decisions before launch",
        paras: [],
        items: [
          {
            h3: "Content and structure",
            paras: [
              "Decide what to retain, rewrite or add, with a clear place for each important service, product or customer question.",
            ],
          },
          {
            h3: "Features and everyday use",
            paras: [
              "Plan the forms, store functions or connections you need. Agree on what your team should be able to update after handover.",
            ],
          },
          {
            h3: "Moving from the current site",
            paras: [
              "Review existing page addresses and content so changes can be planned. A rebuild needs coordination between the old website, the new one and the people approving them.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Review the site as it takes shape.",
        paras: [
          "We agree on the scope and feedback stages, then check the agreed journeys across devices before launch. Any external tools and licences should be clear in the project plan.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Know the ongoing responsibilities.",
        paras: [
          "Hosting, updates, backups and support need an agreed owner. We discuss the setup and handover guidance before the build is complete.",
          "Explore WordPress Development, Ecommerce Websites or SEO for Perth businesses.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What should change in your next website?",
        paras: [
          "Bring your current site or your brief. We’ll help work through the project requirements.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/digital-marketing-agency-sydney/": {
    name: "Digital Marketing Sydney",
    status: "Draft for review",
    eyebrow: "Digital marketing for Sydney businesses",
    h1: "Work out what your marketing needs next.",
    intro: [
      "When several things could be improved, choosing the first one matters. SIKA Digital helps Sydney businesses plan SEO, advertising, websites and AI consulting around a clear business priority.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Start with the problem you want to solve.",
        paras: [
          "You might need more relevant search visibility, a website that explains your offer or a better way to manage enquiries. We review the current situation before recommending channels or extra tools.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Find the right place to begin",
        paras: [],
        items: [
          {
            h3: "Help customers discover you",
            paras: [
              "SEO for Sydney businesses supports useful search content. Local SEO focuses on nearby customer information, while Google Ads can promote selected offers.",
            ],
          },
          {
            h3: "Make the website clearer",
            paras: [
              "Web Design for Sydney businesses brings content, design and customer actions together. Conversion Rate Optimisation reviews an existing journey and the changes worth considering.",
            ],
          },
          {
            h3: "Support the work around the marketing",
            paras: [
              "Content Marketing helps answer customer questions. AI Consulting and Automation explores practical improvements to repetitive tasks and the flow of business information.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "A focused scope makes the work easier to judge.",
        paras: [
          "We explain the recommendation, responsibilities and costs before starting. If several services are involved, each should have a clear role and a reason to be part of the plan.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Review what it means for your business.",
        paras: [
          "Website activity and campaign numbers need context. We use the information available alongside your feedback about enquiries, sales and everyday work to shape the next decisions.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Which priority should come first?",
        paras: [
          "Share your website and what you want to improve. We’ll help you work through the options.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/guides/how-much-does-seo-cost-australia/": {
    name: "SEO Cost Australia",
    status: "Draft for review",
    eyebrow: "SEO cost guide",
    h1: "How much does SEO cost in Australia?",
    intro: [
      "SEO is priced around the work required, so a monthly fee alone does not tell you what you are buying. Your website, market and priorities all affect the scope.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "A price reference, with context",
        paras: [
          "StudioHawk’s published pricing guide puts its growth-focused reference tier at A$1,500–A$3,000 a month. That is one agency’s guidance, checked in November 2026, rather than a national average or a SIKA quote. Confirm inclusions and GST before comparing any figures.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What changes the quote?",
        paras: [],
        items: [
          {
            h3: "The starting condition of the website",
            paras: [
              "A site needing structural fixes and new service pages requires different work from one with a sound foundation and content ready to improve.",
            ],
          },
          {
            h3: "The market you want to reach",
            paras: [
              "The services, products, locations and competing websites affect the research and work involved. A focused local offer differs from a large online catalogue.",
            ],
          },
          {
            h3: "What is actually included",
            paras: [
              "Research, technical work, writing, development and reporting need to be defined. Ask who carries out each task and which costs sit outside the fee.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Monthly support or a defined project?",
        paras: [
          "Ongoing SEO is usually scoped differently from an audit, migration or a specific content project. Compare the deliverables, review points and commitment as well as the payment schedule.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What should you ask before agreeing?",
        paras: [
          "Ask what happens first, how progress will be reviewed, what access is needed and what your team must provide. Check whether development and AEO or GEO work are included rather than assumed.",
          "Explore SEO services or an SEO Audit to discuss the work your website needs.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Want a scope for your own business?",
        paras: [
          "Share your website and priorities. We’ll confirm the work and costs before proceeding.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/guides/seo-vs-google-ads/": {
    name: "SEO vs Google Ads",
    status: "Draft for review",
    eyebrow: "SEO and Google Ads guide",
    h1: "SEO vs Google Ads: where should you start?",
    intro: [
      "Both can help people discover your business through search. They do it differently, and the right starting point depends on what you need, how your website is working and the budget available.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "What does SEO do?",
        paras: [
          "SEO improves how your website can be found and understood in unpaid search results. The work can include technical fixes, useful content and a clearer page structure. It takes ongoing effort, and rankings are not guaranteed.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What do Google Ads do?",
        paras: [
          "Google Ads lets you run paid campaigns for an agreed offer and audience. Search ads can reach people looking for relevant products or services, subject to the campaign setup, approval and ad auction. Advertising spend is separate from management costs.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Questions that help you choose",
        paras: [],
        items: [
          {
            h3: "Do you need to promote a specific offer?",
            paras: [
              "Ads can give a defined offer its own campaign and budget. The landing page and measurement still need to be ready before it runs.",
            ],
          },
          {
            h3: "Does your website explain the important services?",
            paras: [
              "If useful pages are missing or difficult to find, SEO and content work may be part of the foundation you need.",
            ],
          },
          {
            h3: "What can you support over time?",
            paras: [
              "SEO needs resources even though there is no charge for an organic click. Ads need media spend while running, alongside campaign management and any supporting work.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Can you use both?",
        paras: [
          "Yes, where each has a clear role. You might use advertising for a selected offer while improving search content for broader customer questions. Paying for ads does not improve organic rankings.",
          "Explore SEO, Google Ads or the SEO cost guide.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Let’s choose a starting point for your situation.",
        paras: [
          "Tell us what you want to achieve and what is already in place.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/guides/google-maps-seo/": {
    name: "Google Maps SEO",
    status: "Draft for review",
    eyebrow: "Google Maps SEO guide",
    h1: "Google Maps SEO: start with accurate business information.",
    intro: [
      "Google Maps SEO is a common name for work that helps a business present itself in local results. Your Google Business Profile matters, alongside the website and other information Google has about your business.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "What affects local results?",
        paras: [
          "Google describes three main factors: relevance to the search, distance from the searcher and prominence. You cannot choose the searcher’s location or pay for a better organic local position.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What can you work on?",
        paras: [],
        items: [
          {
            h3: "Review your business profile",
            paras: [
              "Check the business name, relevant categories, services, hours, contact details and address or service area. Use accurate information that follows the profile rules, then complete verification where required.",
            ],
          },
          {
            h3: "Make the website match the business",
            paras: [
              "Explain the services you actually offer and the areas you cover. Give customers useful information and an obvious way to contact you. Extra suburb pages need more purpose than changing a place name.",
            ],
          },
          {
            h3: "Build a genuine review process",
            paras: [
              "Ask customers for honest feedback without rewards or selecting only positive experiences. Read and respond to reviews with care, and use feedback to address recurring issues.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Keep it current.",
        paras: [
          "Changes to hours, services or contact details should be reflected where customers find you. Genuine recent photos can also help people understand what to expect.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "How should you review progress?",
        paras: [
          "Look at available profile activity, website visits and real enquiries together. A single map-position check varies by search and location, so it gives only part of the picture.",
          "Explore Local SEO or What is local SEO? for the wider approach.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Want help reviewing your local information?",
        paras: [
          "Share your website and profile. We’ll discuss the work that deserves attention first.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/guides/digital-marketing-for-tradies/": {
    name: "Digital Marketing for Tradies",
    status: "Draft for review",
    eyebrow: "Marketing guide for tradies",
    h1: "Digital marketing for tradies: choose the jobs before the channel.",
    intro: [
      "Before spending more on marketing, be clear about the work you want and the areas your team can cover. That makes it easier to decide what to promote and whether the enquiries are useful.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Work through these four steps",
        paras: [],
        items: [
          {
            h3: "1. Choose a service to focus on",
            paras: [
              "Write down the job type, coverage and capacity you want the marketing to support. A broad request for more leads is harder to plan than a clear service priority.",
            ],
          },
          {
            h3: "2. Check what the customer finds",
            paras: [],
          },
          {
            h3: "3. Give the channel a specific job",
            paras: [
              "Local SEO helps improve local information and useful pages. Google Ads can promote a selected service with a defined budget. Your choice should reflect the customer, offer and website readiness.",
            ],
          },
          {
            h3: "4. Decide who handles the enquiry",
            paras: [
              "Make sure calls and forms reach the right person. Agree on the details to collect and how the team records whether the enquiry became a quote or booked job.",
            ],
          },
        ],
        after: [
          "Read the website as someone who does not know your trade. Can they tell what you offer, where you work and how to contact you? Check business profile details, hours and genuine proof too.",
        ],
      },
      {
        h2: "Review suitability, not just the total.",
        paras: [
          "Ask which enquiries matched the service and area you wanted. Look at missed contacts, unsuitable jobs and customer questions as well as bookings. That feedback helps identify the next improvement.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Begin with one gap you can address.",
        paras: [
          "You may need to fix a service page or follow-up step before adding another campaign. A manageable first change is easier to assess and keep running.",
          "Explore marketing for tradies, Local SEO or Google Ads.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Want to work through your own starting point?",
        paras: [
          "Tell us about the work you want more of and how customers currently find you.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/guides/what-is-local-seo/": {
    name: "What Is Local SEO",
    status: "Draft for review",
    eyebrow: "Local SEO explained",
    h1: "What is local SEO?",
    intro: [
      "Local SEO is work that helps people find and understand a business when they search for a service or place nearby. It connects your website, business profile and local information with the area you actually serve.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Who is it useful for?",
        paras: [
          "It can matter to businesses customers visit and businesses that travel to customers. A local shop, clinic or trade business each needs accurate information, although their profile eligibility and setup may differ.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What does the work involve?",
        paras: [],
        items: [
          {
            h3: "Useful website pages",
            paras: [
              "Explain the services or products you provide, where you operate and how someone can contact you. Give each page enough information to help the customer decide.",
            ],
          },
          {
            h3: "Accurate business information",
            paras: [
              "Keep important details such as your name, contact information and hours consistent where the business appears. An eligible Google Business Profile helps present those details in local results.",
            ],
          },
          {
            h3: "Genuine customer feedback",
            paras: [
              "Make it straightforward to leave honest reviews and respond with care. Reviews should reflect real experiences, without rewards or filtering for positive feedback.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "Is it different from general SEO?",
        paras: [
          "It is part of SEO, with greater attention to location and local business information. Google says local results are mainly based on relevance, distance and prominence. The searcher’s position affects what they see.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What should you check first?",
        paras: [
          "Search for your business and visit the pages a customer reaches. Can they tell what you do, where you work and how to take the next step? Correct missing or outdated information before adding more pages.",
          "Read the Google Maps SEO guide for practical profile work or explore our Local SEO service.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Want help reviewing your local presence?",
        paras: ["Tell us about your business, website and service area."],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/guides/how-much-does-a-website-cost/": {
    name: "Website Cost",
    status: "Draft for review",
    eyebrow: "Website cost guide",
    h1: "How much does a website cost in Australia?",
    intro: [
      "The price depends on what needs to be planned, written, designed and built. A simple information site and an online store are different projects, even if both start with a similar-looking homepage.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "A published example shows why scope matters.",
        paras: [
          "In November 2026, Webwise Digital’s package page lists A$1,770 for a one-page WordPress website and A$4,997 for an option with up to ten pages. These are one provider’s examples, rather than a market average or SIKA prices. Check the full scope and GST treatment when comparing quotes.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What changes the cost?",
        paras: [],
        items: [
          {
            h3: "Content and page requirements",
            paras: [
              "The number of distinct pages, writing, photography and product information all affect the work. Confirm what you provide and what the agency creates.",
            ],
          },
          {
            h3: "Design and functionality",
            paras: [
              "An online store, booking flow or connection to another system adds requirements beyond presenting information. Each needs to be defined and tested.",
            ],
          },
          {
            h3: "Moving from an existing site",
            paras: [
              "Content transfers, old page addresses and system changes need planning. Ask what the migration includes and who handles each part.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "What about ongoing costs?",
        paras: [
          "Allow for the agreed hosting, domain, software licences, maintenance and support. Ask which charges recur, who pays them and what happens if you change providers.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Compare the whole proposal.",
        paras: [
          "Check deliverables, review rounds, ownership, exclusions, payment stages and handover. A lower upfront figure may cover a different amount of work, so compare the scope before comparing the total.",
          "Explore Web Design and Development or Ecommerce Websites.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Want a quote based on what you actually need?",
        paras: [
          "Share your current site or planned pages and features. We’ll work through the scope with you.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/guides/how-much-do-google-ads-cost/": {
    name: "Google Ads Cost",
    status: "Draft for review",
    eyebrow: "Google Ads cost guide",
    h1: "How much do Google Ads cost?",
    intro: [
      "There is no single price for running Google Ads. You choose a campaign budget, while the cost of the advertising depends on the market and campaign setup. Management and supporting website work are separate costs to check.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Separate the costs first",
        paras: [],
        items: [
          {
            h3: "Advertising spend",
            paras: [
              "This is the money paid to Google for the campaign. In click-based advertising, the amount charged per click varies; a budget does not guarantee a set number of clicks or customers.",
            ],
          },
          {
            h3: "Setup and management",
            paras: [
              "Ask what the agency fee includes, from account setup and campaign reviews to reporting. Check whether it is fixed, percentage-based or another agreed arrangement.",
            ],
          },
          {
            h3: "Supporting work",
            paras: [
              "Landing pages, creative, tracking and system connections may need their own scope. Confirm what is included before adding up the total.",
            ],
          },
        ],
        after: [],
      },
      {
        h2: "How does a daily budget relate to a month?",
        paras: [
          "Google’s budget guidance says that, for most campaigns, the monthly spending limit is 30.4 times the average daily budget.",
          "For example, an unchanged A$50 average daily budget over a full month gives a monthly spending limit of A$1,520 for most campaigns. Daily spend can vary. This is a budget illustration, not a recommendation or result forecast. Agency fees and any applicable taxes need separate treatment.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "What should your starting budget be?",
        paras: [
          "Discuss the offer, locations, relevant search demand and what a worthwhile enquiry or sale looks like. Review what the campaign can realistically test with the money available, then agree on the scope and review points.",
          "Explore Google Ads or PPC Management.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Want to plan the full commitment?",
        paras: [
          "Tell us what you want to advertise. We’ll discuss media spend and our work separately.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
  "/guides/how-to-get-more-leads/": {
    name: "Get More Leads",
    status: "Draft for review",
    eyebrow: "Lead generation guide",
    h1: "How to get more leads: find the first gap in the journey.",
    intro: [
      "If you need more enquiries, more advertising may be only part of the answer. First check how people find you, what they understand about the offer and what happens when they try to contact you.",
    ],
    cta: "Book a Discovery Call",
    sections: [
      {
        h2: "Start with a useful definition.",
        paras: [
          "Write down what makes an enquiry suitable: the service, location, need or project type. That gives you a better basis for reviewing the marketing than the total number of contacts alone.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Check the journey in order",
        paras: [],
        items: [
          {
            h3: "Can the right people find you?",
            paras: [
              "Look at the channels bringing visitors and whether the pages relate to what they need. If relevant people are not arriving, search, advertising or content may need attention.",
            ],
          },
          {
            h3: "Is the offer clear enough?",
            paras: [],
          },
          {
            h3: "Is contacting you straightforward?",
            paras: [
              "Try the journey on a phone. Check buttons, forms and contact details, then confirm that a test enquiry reaches the person responsible.",
            ],
          },
          {
            h3: "Does someone follow through?",
            paras: [
              "Agree on who handles new enquiries and how their progress is recorded. Useful marketing information includes whether the contact became a quote, booking or sale.",
            ],
          },
        ],
        after: [
          "Read the page as a new customer. Can you understand what is included, who it suits and why you would contact the business? Answer the questions that affect that decision.",
        ],
      },
      {
        h2: "Improve the first weak point.",
        paras: [
          "Choose a change you can assess. That might be a clearer service page, a focused campaign or a better handover between the website and your team. Review the evidence before expanding the work.",
          "Explore Lead Generation, Conversion Rate Optimisation or Google Ads.",
        ],
        items: [],
        after: [],
      },
      {
        h2: "Want to work through your enquiry journey?",
        paras: [
          "Tell us where enquiries come from today and which ones fit your business.",
        ],
        items: [],
        after: [],
        cta: "Book a Discovery Call",
      },
    ],
  },
};
