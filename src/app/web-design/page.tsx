import { metadataFor } from "@/lib/metadata";
import { WebDesignContent } from "./WebDesignContent";

/**
 * The route file is a server component and does nothing but export metadata
 * and render the page.
 *
 * This split is not optional. `export const metadata` is only read from server
 * components, and the page body needs `useGSAP` and refs, which make it a
 * client component. Put both in one file and Next throws at build; put the
 * metadata nowhere and the page ships with no title, no description and no
 * canonical, which on a site selling SEO is the worst possible bug to have.
 */
export const metadata = metadataFor("web-design");

export default function WebDesignPage() {
  return <WebDesignContent />;
}
