import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /guides/google-maps-seo/ (config/copy-v1). */
export const metadata = metadataFor("guide-maps-seo");

export default function Page() {
  return <CopyPage route="/guides/google-maps-seo/" />;
}
