import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /guides/digital-marketing-for-tradies/ (config/copy-v1). */
export const metadata = metadataFor("guide-tradies");

export default function Page() {
  return <CopyPage route="/guides/digital-marketing-for-tradies/" />;
}
