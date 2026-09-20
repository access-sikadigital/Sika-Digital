import { metadataFor } from "@/lib/metadata";
import { SeoAuditContent } from "./SeoAuditContent";

/** Server wrapper. See the note in web-design/page.tsx for why this is split. */
export const metadata = metadataFor("seo-audit");

export default function SeoAuditPage() {
  return <SeoAuditContent />;
}
