import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /seo/local-seo/ (config/copy-v1). */
export const metadata = metadataFor("local-seo");

export default function Page() {
  return <CopyPage route="/seo/local-seo/" />;
}
