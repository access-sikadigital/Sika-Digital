import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/config/site";
import { organisationSchema } from "@/lib/metadata";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

/**
 * ROOT LAYOUT
 *
 * `metadataBase` is set here so every page's relative OG image and canonical
 * resolve against the right origin automatically. Without it Next warns on
 * every build and social previews silently point at localhost.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Digital Marketing Agency Melbourne`,
    /* Page titles come from the IA config and already read well on their own,
       so the template appends the brand rather than leading with it — the
       keyword belongs at the front of a SERP title. */
    template: `%s`,
  },
  description: siteConfig.tagline,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  formatDetection: {
    /* Stops iOS Safari turning every number that looks like a date or phone
       number into a blue link, which wrecks typography in stat blocks. */
    telephone: false,
    date: false,
    address: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  /* Matches --color-ink, so the mobile browser chrome blends into the page
     rather than framing it in white. */
  themeColor: "#0B0B0B",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={fontVariables} suppressHydrationWarning>
      <body className="min-h-dvh antialiased">
        {/*
          Organisation schema, sitewide. Injected as a raw script tag rather
          than via a component so it is in the server-rendered HTML — Google
          does execute JS, but structured data in the initial response is
          parsed sooner and more reliably.

          The JSON is generated from config, so it cannot contradict the
          contact details rendered in the footer.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organisationSchema()),
          }}
        />

        {/*
          Skip link. First focusable element on the page, visually hidden until
          focused. Without it a keyboard user tabs through the entire nav on
          every single page before reaching the content.
        */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-button focus:bg-accent focus:px-5 focus:py-3 focus:text-on-accent"
        >
          Skip to content
        </a>

        <SmoothScroll>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
