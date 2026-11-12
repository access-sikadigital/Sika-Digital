import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /web-design/wordpress/ (config/copy-v1). */
export const metadata = metadataFor("wordpress-web-design");

export default function Page() {
  return <CopyPage route="/web-design/wordpress/" />;
}
