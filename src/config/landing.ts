/**
 * PAID LANDING PAGE CONTENT (/lp/)
 *
 * Six short sections, each saying one new thing:
 *   hero (who and what) → clients (proof) → what we do (services) →
 *   why Sika (difference) → how we work (process) → book a call.
 *
 * Rules: no unverified numbers or guarantees, no agency jargon, and "leads"
 * is not repeated in every sentence. Every button says "Book a Discovery Call".
 */

export const cta = "Book a Discovery Call";

export const hero = {
  eyebrow: "Australian lead generation specialists",
  /* Typed on the approved hero: the first line, then the payoff stamped on
     the lime strip. */
  lines: ["More than traffic."],
  highlight: "Real enquiries.",
  description:
    "We help Australian service-based businesses turn searches and ad clicks into genuine enquiries, with Google Ads, SEO, paid social and websites built to convert.",
};

export const clients = {
  title: "Trusted by Australian businesses that want to grow.",
};

export const services = {
  eyebrow: "What we do",
  title: "From first search to first call.",
  intro:
    "We cover every step between a customer looking for what you do and picking up the phone, so the right people find you and find it easy to get in touch.",
  items: [
    {
      key: "ads",
      title: "Google Ads",
      copy: "Show up the moment someone searches for your service, only in the areas you actually work. Every call and form is tracked back to the ad that produced it.",
    },
    {
      key: "seo",
      title: "SEO & Local Search",
      copy: "Rank in Google Maps and local results, so customers find you without you paying for every click.",
    },
    {
      key: "social",
      title: "Meta Advertising",
      copy: "Facebook and Instagram ads that put your work in front of the right local audience before they start comparing options.",
    },
    {
      key: "web",
      title: "Websites & Conversion",
      copy: "Fast, mobile-first websites and landing pages that make calling, enquiring or booking the obvious next step.",
    },
  ],
  connected: {
    title: "All connected. Nothing missed.",
    copy: "Calls and forms are tracked, every enquiry gets an instant reply, and missed calls get a text back automatically. You see exactly where each enquiry came from.",
  },
};

export const why = {
  eyebrow: "Why Sika Digital",
  title: "Marketing that makes business sense.",
  intro:
    "You don't need another confusing report or a list of activities. You need the phone ringing with the right people, and an agency that knows what that's worth to your business.",
  items: [
    {
      title: "We know how service businesses run",
      copy: "We work with service businesses every day, so we understand how you win customers, what an enquiry is worth and which ones are worth chasing.",
    },
    {
      title: "Measured in enquiries, not clicks",
      copy: "We track which campaigns bring in calls, enquiries and bookings, and put your budget behind what's working.",
    },
    {
      title: "Straight answers",
      copy: "Plain-English updates on what we're doing, why it matters and what it's producing. No jargon, no hiding behind dashboards.",
    },
    {
      title: "Your accounts, your data",
      copy: "Ad accounts, Google Business Profile and tracking are set up in your name, so you can check every number yourself.",
    },
  ],
};

export const approach = {
  eyebrow: "How we work",
  title: "A clear plan from day one.",
  steps: [
    {
      n: "01",
      title: "Understand",
      copy: "We get to know your services, service areas, ideal customers and competitors, and look at what your current marketing is and isn't doing.",
    },
    {
      n: "02",
      title: "Launch",
      copy: "We build the campaigns, pages and tracking, connect them to your enquiry follow-up, and go live with a clear plan.",
    },
    {
      n: "03",
      title: "Improve",
      copy: "We watch what brings in enquiries, cut what doesn't and keep refining, with regular plain-English updates on the results.",
    },
  ],
};

export const closing = {
  eyebrow: "Next step",
  title: "Let's talk about growing your business.",
  copy: "Tell us what you do and where you want more work. We'll look at where your enquiries could come from and whether we're the right fit. No obligation, no hard sell.",
  comingSoon: "Our full website is coming soon.",
};

/**
 * BOOKING
 *
 * Set NEXT_PUBLIC_BOOKING_URL in Vercel to the GoHighLevel calendar link
 * (Calendars → Share → booking link). The CTA then opens the calendar in a
 * dialog. Until it is set, the CTA opens a short call-request form that posts
 * to /api/lead/ (GoHighLevel webhook).
 */
export const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "";

export const callRequest = {
  title: "Book a discovery call",
  intro:
    "Leave your details and we'll call you to find a time that suits. No obligation.",
  submit: "Request my call",
  success: {
    title: "Thanks, we've got it.",
    copy: "We'll be in touch shortly to lock in a time for your discovery call.",
  },
};
