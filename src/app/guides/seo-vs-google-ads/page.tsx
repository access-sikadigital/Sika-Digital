import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /guides/seo-vs-google-ads/ (config/copy-v1). */
export const metadata = metadataFor("guide-seo-vs-ads");

export default function Page() {
  return <CopyPage route="/guides/seo-vs-google-ads/" />;
}
