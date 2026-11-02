/**
 * PAID LANDING PAGE CONTENT (/lp/)
 *
 * A single-screen page with one job: book a discovery call. Kept to the
 * essentials on purpose: who Sika is, what it does, the full site is coming,
 * and one action.
 */

export const landing = {
  eyebrow: "Lead generation specialists · Australia",
  /* Set across three lines on the approved hero: two typed lines and the
     last word stamped on the lime strip. Reads as one sentence. */
  lines: ["Turn more clicks", "into qualified"],
  highlight: "leads.",
  description:
    "We help Australian businesses attract the right customers with Google Ads, SEO and performance marketing.",
  cta: "Book a Discovery Call",
  comingSoon: "Our full website is coming soon.",
} as const;

/**
 * BOOKING
 *
 * Set NEXT_PUBLIC_BOOKING_URL in Vercel to the GoHighLevel calendar link
 * (Calendars → Share → the booking link, e.g.
 * https://api.leadconnectorhq.com/widget/booking/XXXX). The CTA then opens
 * the calendar in a dialog on the page.
 *
 * Until it is set, the CTA opens a short call-request form instead, which
 * posts to /api/lead/ (GoHighLevel webhook) so the enquiry is still captured.
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
