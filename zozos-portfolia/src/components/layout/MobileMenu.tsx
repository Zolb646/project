"use client";

import { NAV_LINKS } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

export default function MobileMenu({ isOpen, onClose, activeSection }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-navy/50" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-72 bg-cream border-l-3 border-navy animate-slide-in">
        <div className="flex items-center justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 text-navy"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-2 px-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`py-3 text-lg font-semibold border-b-2 border-navy/10 transition-colors duration-200 ${
                activeSection === link.href
                  ? "text-accent-orange"
                  : "text-navy hover:text-accent-orange"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
