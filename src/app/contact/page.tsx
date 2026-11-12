import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /contact/ (config/copy-v1). */
export const metadata = metadataFor("contact");

export default function Page() {
  return <CopyPage route="/contact/" />;
}
