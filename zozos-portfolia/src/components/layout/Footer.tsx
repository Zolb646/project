"use client";

import Container from "@/components/ui/Container";
import IconLink from "@/components/ui/IconLink";
import { useContent } from "@/lib/i18n/useContent";

export default function Footer() {
  const { socialLinks: SOCIAL_LINKS, ui } = useContent();

  return (
    <footer className="border-t-3 border-navy bg-cream py-8">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-4 text-center sm:justify-between sm:text-left">
          <p className="w-full text-sm text-muted sm:w-auto">
            {ui.footer.rights(new Date().getFullYear())}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
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
