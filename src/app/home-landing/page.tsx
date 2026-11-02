import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";
import LandingPage from "../lp/page";

/**
 * THE LANDING PAGE AS THE LIVE HOMEPAGE (sikadigital.com/)
 *
 * next.config rewrites "/" to this route for the sikadigital.com host only,
 * so the domain shows the landing page while the full site is finished. Every
 * other host (sika-digital-nine.vercel.app, previews) keeps the full site at
 * "/".
 *
 * Same page as /lp/, different metadata: this one is the domain's homepage,
 * so it is indexable with a canonical of the root. /lp/ stays noindex for ads.
 */

const title = "Sika Digital | Australian Lead Generation Specialists";
const description =
  "Google Ads, SEO, paid social and websites for Australian service-based businesses. Turn searches and ad clicks into genuine enquiries.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/") },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    title,
    description,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
};

export default LandingPage;
