import type { Metadata } from "next";
import { getPage } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";

/**
 * Builds a page's <head> from the IA config, so title, description and
 * canonical can never drift from the keyword map. Page files call this with
 * their key and nothing else.
 *
 * ── Why the canonical is always set ─────────────────────────────────────────
 * Location pages are the reason. `/seo-agency-sydney/` and `/seo-agency-brisbane/`
 * share most of their structure, and without an explicit self-canonical Google
 * is free to decide one is a duplicate of the other and drop it. On a site
 * whose whole location strategy depends on those pages ranking separately,
 * that is the difference between the strategy working and not.
 */
export function metadataFor(key: string): Metadata {
  const page = getPage(key);
  const url = absoluteUrl(page.url);

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: page.title,
      description: page.description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
    robots: page.noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

/**
 * Organisation schema for the site root.
 *
 * ⚠️  `aggregateRating` is deliberately NOT emitted, and should not be added
 *     later without reading this first. Google treats a business marking up its
 *     own star rating as self-serving structured data, and it is a manual-action
 *     risk. Review markup belongs on third-party review platforms, not on your
 *     own homepage. Given Sika sells SEO, getting penalised for spammy schema on
 *     its own site would be an unusually bad look.
 */
export function organisationSchema() {
  const { name, legalName, url, email, phone, address, founder } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${url}/#organisation`,
    name,
    legalName: legalName || undefined,
    url,
    email: email || undefined,
    telephone: phone || undefined,
    description: siteConfig.tagline,
    areaServed: siteConfig.cities.map((c) => ({ "@type": "City", name: c })),
    address: address.street
      ? {
          "@type": "PostalAddress",
          streetAddress: address.street,
          addressLocality: address.suburb,
          addressRegion: address.state,
          postalCode: address.postcode,
          addressCountry: address.country,
        }
      : undefined,
    founder: {
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.role,
    },
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

/** FAQ schema. Feed it the same questions rendered on the page — never more. */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
