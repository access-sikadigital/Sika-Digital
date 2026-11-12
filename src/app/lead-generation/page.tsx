import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /lead-generation/ (config/copy-v1). */
export const metadata = metadataFor("lead-generation");

export default function Page() {
  return <CopyPage route="/lead-generation/" />;
}
