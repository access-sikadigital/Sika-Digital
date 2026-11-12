import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /guides/what-is-local-seo/ (config/copy-v1). */
export const metadata = metadataFor("guide-what-is-local-seo");

export default function Page() {
  return <CopyPage route="/guides/what-is-local-seo/" />;
}
