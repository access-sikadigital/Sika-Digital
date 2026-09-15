import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logomark } from "@/components/brand/Logo";

/**
 * 404.
 *
 * Deliberately useful rather than clever. Someone landing here has followed a
 * broken link or mistyped a URL — a joke costs them time, routes out do not.
 *
 * Not indexed: Next returns a real 404 status for this route automatically, so
 * no robots meta is needed.
 */
export default function NotFound() {
  return (
    <section className="flex min-h-dvh items-center py-(--spacing-section)">
      <Container>
        <Logomark className="size-12" decorative />
        <p className="eyebrow mt-8 text-accent">404</p>
        <h1 className="mt-5 max-w-[14ch] font-display text-h1 uppercase">
          That page has moved or never existed.
        </h1>
        <p className="mt-6 max-w-text text-lead text-muted">
          Try the services menu, or tell us what you were looking for and we
          will point you at it.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/services/" size="lg" arrow>
            View services
          </Button>
          <Button href="/contact/" variant="outline" size="lg">
            Contact us
          </Button>
        </div>
      </Container>
    </section>
  );
}
