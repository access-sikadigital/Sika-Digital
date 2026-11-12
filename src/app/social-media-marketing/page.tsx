import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /social-media-marketing/ (config/copy-v1). */
export const metadata = metadataFor("social-media-marketing");

export default function Page() {
  return <CopyPage route="/social-media-marketing/" />;
}
