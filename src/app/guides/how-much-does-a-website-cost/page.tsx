import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /guides/how-much-does-a-website-cost/ (config/copy-v1). */
export const metadata = metadataFor("guide-website-cost");

export default function Page() {
  return <CopyPage route="/guides/how-much-does-a-website-cost/" />;
}
