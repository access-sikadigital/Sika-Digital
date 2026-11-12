import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /ai-automation/ (config/copy-v1). */
export const metadata = metadataFor("ai-automation");

export default function Page() {
  return <CopyPage route="/ai-automation/" />;
}
