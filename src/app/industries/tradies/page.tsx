import { metadataFor } from "@/lib/metadata";
import { IndustryTemplate } from "@/components/sections/IndustryTemplate";

/**
 * Server wrapper. See the note in web-design/page.tsx for why this is split.
 *
 * The body is one shared template driven by `config/industries`. The reason
 * these share a layout when the service pages do not is written at the top of
 * IndustryTemplate: nobody reads two of these back to back, and the defence
 * against four near-identical pages is different substance, not a different
 * frame.
 */
export const metadata = metadataFor("tradies");

export default function Page() {
  return <IndustryTemplate pageKey="tradies" />;
}
