"use client";

import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/lib/constants";
import Container from "@/components/ui/Container";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = NAV_LINKS.map((link) =>
        document.querySelector(link.href),
      );

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(NAV_LINKS[i].href);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-sm border-b-3 border-navy"
            : "bg-transparent"
        }`}>
        <Container>
          <div className="flex items-center justify-between h-16">
            <a href="#hero" className="text-xl font-bold text-navy">
              Zozo<span className="text-accent-orange">.</span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    activeSection === link.href
                      ? "text-accent-orange"
                      : "text-navy hover:text-accent-orange"
                  }`}>
                  {link.label}
                </a>
              ))}
            </div>

            <button
              className="md:hidden p-2 text-navy"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu">
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
        </Container>
      </nav>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
