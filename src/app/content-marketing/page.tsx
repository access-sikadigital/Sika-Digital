import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /content-marketing/ (config/copy-v1). */
export const metadata = metadataFor("content-marketing");

export default function Page() {
  return <CopyPage route="/content-marketing/" />;
}
