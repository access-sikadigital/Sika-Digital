import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /web-design-perth/ (config/copy-v1). */
export const metadata = metadataFor("web-design-perth");

export default function Page() {
  return <CopyPage route="/web-design-perth/" />;
}
