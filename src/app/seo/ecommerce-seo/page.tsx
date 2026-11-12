import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /seo/ecommerce-seo/ (config/copy-v1). */
export const metadata = metadataFor("ecommerce-seo");

export default function Page() {
  return <CopyPage route="/seo/ecommerce-seo/" />;
}
