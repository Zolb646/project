"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NAV_SECTIONS } from "@/lib/constants";
import { useContent } from "@/lib/i18n/useContent";
import Container from "@/components/ui/Container";
import LanguageToggle from "@/components/ui/LanguageToggle";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const { ui } = useContent();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const displayedActiveSection = isHomePage ? activeSection : "";
  const useSolidNav = !isHomePage || scrolled;

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = NAV_SECTIONS.map((link) =>
        document.querySelector(link.href),
      );

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(NAV_SECTIONS[i].href);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          useSolidNav
            ? "bg-cream/95 backdrop-blur-sm border-b-3 border-navy"
            : "bg-transparent"
        }`}>
        <Container>
          <div className="flex items-center justify-between h-16">
            <a
              href={isHomePage ? "#hero" : "/#hero"}
              className="text-xl font-bold text-navy">
              Zozo<span className="text-accent-orange-ink">.</span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {NAV_SECTIONS.map((link) => (
                <a
                  key={link.href}
                  href={isHomePage ? link.href : `/${link.href}`}
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    displayedActiveSection === link.href
                      ? "text-accent-orange-ink"
                      : "text-navy hover:text-accent-orange-ink"
                  }`}>
                  {ui.nav[link.key]}
                </a>
              ))}
              <LanguageToggle />
            </div>

            <div className="flex items-center gap-3 md:hidden">
              <LanguageToggle />
              <button
                className="p-2.5 text-navy"
                onClick={() => setIsMenuOpen(true)}
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
        onClose={() => setIsMenuOpen(false)}
        activeSection={displayedActiveSection}
        isHomePage={isHomePage}
      />
    </>
  );
}
