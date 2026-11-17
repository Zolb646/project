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
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-navy backdrop:bg-navy/50"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="absolute inset-y-0 right-0 w-[min(100%,18rem)] overflow-y-auto overscroll-contain border-l-3 border-navy bg-cream pb-[max(1rem,env(safe-area-inset-bottom))] animate-slide-in">
        <div className="sticky top-0 z-10 flex items-center justify-end bg-cream p-3">
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 text-navy"
            aria-label={ui.common.closeMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-5">
          {NAV_SECTIONS.map((link) => (
            <a
              key={link.href}
              href={isHomePage ? link.href : localizePath(`/${link.href}`)}
              onClick={onClose}
              className={`py-3 text-lg font-semibold border-b-2 border-navy/10 transition-colors duration-200 ${
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
