"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { NAV_SECTIONS } from "@/lib/constants";
import { useContent } from "@/lib/i18n/useContent";
import Container from "@/components/ui/Container";
import LanguageToggle from "@/components/ui/LanguageToggle";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const { ui, localizePath } = useContent();
  const pathname = usePathname();
  const isHomePage = pathname === localizePath("/");
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const displayedActiveSection = isHomePage ? activeSection : "";

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const handleScroll = () => {
      const activationLine = (navRef.current?.offsetHeight ?? 80) + 16;
      const sections = NAV_SECTIONS.map((link) =>
        document.querySelector(link.href),
      );

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= activationLine) {
            setActiveSection(NAV_SECTIONS[i].href);
            return;
          }
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <>
      <nav ref={navRef} className="fixed inset-x-0 top-0 z-50 border-b-3 border-navy bg-cream">
        <Container wide>
          <div className="flex h-[var(--site-nav-height)] items-center justify-between gap-3">
            <a
              href={isHomePage ? "#hero" : localizePath("/#hero")}
              className="font-display text-3xl font-extrabold tracking-tight text-navy">
              Zozo<span className="text-accent-orange-ink">.</span>
            </a>

            <div className="hidden items-center gap-6 lg:flex">
              {NAV_SECTIONS.map((link) => (
                <a
                  key={link.href}
                  href={isHomePage ? link.href : localizePath(`/${link.href}`)}
                  className={`text-sm font-bold transition-colors duration-150 ${link.key === "contact" ? "border-2 border-navy bg-accent-yellow px-4 py-2 shadow-brutal-sm" : ""} ${
                    displayedActiveSection === link.href
                      ? "text-navy underline decoration-2 underline-offset-4"
                      : "text-navy hover:underline hover:decoration-2 hover:underline-offset-4"
                  }`}>
                  {ui.nav[link.key]}
                </a>
              ))}
              <LanguageToggle />
            </div>

            <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
              <LanguageToggle />
              <button
                type="button"
                className="grid size-11 shrink-0 place-items-center border-2 border-navy bg-accent-yellow text-navy shadow-brutal-sm"
                onClick={() => setIsMenuOpen(true)}
                aria-haspopup="dialog"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
                aria-label={ui.common.openMenu}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </nav>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        activeSection={displayedActiveSection}
        isHomePage={isHomePage}
      />
    </>
  );
}
