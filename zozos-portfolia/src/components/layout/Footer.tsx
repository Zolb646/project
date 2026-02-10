import Container from "@/components/ui/Container";
import IconLink from "@/components/ui/IconLink";
import { SOCIAL_LINKS } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t-3 border-navy bg-cream py-8">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Zozo. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((link) => (
              <IconLink
                key={link.label}
                href={link.href}
                label={link.label}
                icon={link.icon}
              />
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
