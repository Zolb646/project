"use client";

import { useEffect, useRef } from "react";
import { NAV_SECTIONS } from "@/lib/constants";
import { useContent } from "@/lib/i18n/useContent";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  isHomePage: boolean;
}

export default function MobileMenu({
  isOpen,
  onClose,
  activeSection,
  isHomePage,
}: MobileMenuProps) {
  const { ui, localizePath } = useContent();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";

    const desktop = window.matchMedia("(min-width: 64rem)");
    const closeOnDesktop = () => { if (desktop.matches) onClose(); };
    desktop.addEventListener("change", closeOnDesktop);
    closeOnDesktop();

    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [isOpen, onClose]);

  return (
    <dialog
      ref={dialogRef}
      id="mobile-menu"
      aria-label={ui.common.openMenu}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-navy backdrop:bg-navy/50"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="fixed right-0 top-0 bottom-0 w-72 bg-cream border-l border-line animate-slide-in">
        <div className="flex items-center justify-end p-4">
          <button
            onClick={onClose}
            className="p-2.5 text-navy"
            aria-label={ui.common.closeMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-2 px-6">
          {NAV_SECTIONS.map((link) => (
            <a
              key={link.href}
              href={isHomePage ? link.href : localizePath(`/${link.href}`)}
              onClick={onClose}
              className={`py-3 text-lg font-semibold border-b-2 border-line transition-colors duration-200 ${
                activeSection === link.href
                  ? "text-accent-orange-ink"
                  : "text-navy hover:text-accent-orange-ink"
              }`}
            >
              {ui.nav[link.key]}
            </a>
          ))}
        </nav>
      </div>
    </dialog>
  );
}
