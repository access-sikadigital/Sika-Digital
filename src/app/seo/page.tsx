import { metadataFor } from "@/lib/metadata";
import { SeoContent } from "./SeoContent";

/** Server wrapper. See the note in web-design/page.tsx for why this is split. */
export const metadata = metadataFor("seo");

export default function SeoPage() {
  return <SeoContent />;
}
