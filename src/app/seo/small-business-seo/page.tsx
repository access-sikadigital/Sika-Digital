import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /seo/small-business-seo/ (config/copy-v1). */
export const metadata = metadataFor("small-business-seo");

export default function Page() {
  return <CopyPage route="/seo/small-business-seo/" />;
}
