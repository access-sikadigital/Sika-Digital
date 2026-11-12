import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /email-marketing/ (config/copy-v1). */
export const metadata = metadataFor("email-marketing");

export default function Page() {
  return <CopyPage route="/email-marketing/" />;
}
