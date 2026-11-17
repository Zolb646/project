"use client";

import { useState, useEffect, useCallback } from "react";
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
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const displayedActiveSection = isHomePage ? activeSection : "";

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const handleScroll = () => {
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
      <nav className="site-nav">
        <Container wide>
          <div className="nav-inner">
            <a
              href={isHomePage ? "#hero" : localizePath("/#hero")}
              className="nav-brand">
              zolbayar.
            </a>

            <div className="nav-links">
              {NAV_SECTIONS.map((link) => (
                <a
                  key={link.href}
                  href={isHomePage ? link.href : localizePath(`/${link.href}`)}
                  aria-current={displayedActiveSection === link.href ? "location" : undefined}
                  className={`nav-link ${link.key === "contact" ? "nav-contact" : ""}`}>
                  {ui.nav[link.key]}
                </a>
              ))}
              <LanguageToggle />
            </div>

            <div className="flex items-center gap-3 lg:hidden">
              <LanguageToggle />
              <button
                className="mobile-menu-button"
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
