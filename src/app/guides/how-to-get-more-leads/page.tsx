import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /guides/how-to-get-more-leads/ (config/copy-v1). */
export const metadata = metadataFor("guide-more-leads");

export default function Page() {
  return <CopyPage route="/guides/how-to-get-more-leads/" />;
}
