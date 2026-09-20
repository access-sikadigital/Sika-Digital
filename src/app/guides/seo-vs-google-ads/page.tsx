import { metadataFor } from "@/lib/metadata";
import { GuideTemplate } from "@/components/sections/GuideTemplate";

/**
 * Server wrapper. See the note in web-design/page.tsx for why this is split.
 * Body is the shared guide template, driven by `config/guides`.
 */
export const metadata = metadataFor("guide-seo-vs-ads");

export default function Page() {
  return <GuideTemplate pageKey="guide-seo-vs-ads" />;
}
