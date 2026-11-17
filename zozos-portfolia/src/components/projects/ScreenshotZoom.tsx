"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { FiMaximize2, FiX } from "react-icons/fi";
import { useContent } from "@/lib/i18n/useContent";

export default function ScreenshotZoom({
  src,
  alt,
  children,
  portrait = false,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
  portrait?: boolean;
}) {
  const { ui } = useContent();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={ui.gallery.viewFullSize(alt)}
        title={ui.gallery.viewFullSize(alt)}
        className="absolute inset-0 block size-full cursor-zoom-in focus-visible:-outline-offset-4"
        onClick={() => {
          dialogRef.current?.showModal();
          setIsOpen(true);
        }}>
        {children}
        <span aria-hidden="true" className="absolute bottom-2 right-2 grid size-9 place-items-center border-2 border-navy bg-accent-yellow text-navy">
          <FiMaximize2 />
        </span>
      </button>
      <dialog
        ref={dialogRef}
        aria-label={alt}
        onClose={() => setIsOpen(false)}
        className={`m-auto h-[min(calc(100dvh-1rem),56rem)] max-h-none max-w-[calc(100%-1rem)] grid-rows-[auto_minmax(0,1fr)] gap-2 border-3 border-navy bg-cream p-2 text-navy shadow-brutal-lg open:grid backdrop:bg-navy/75 sm:gap-3 sm:p-3 ${portrait ? "w-[clamp(12rem,55dvh,26rem)]" : "w-[1200px]"}`}>
        <div className="flex items-center justify-between gap-3">
          <p className="min-w-0 text-sm font-bold wrap-anywhere">{alt}</p>
          <form method="dialog" className="shrink-0">
            <button aria-label={ui.gallery.closeImage} className="grid size-11 cursor-pointer place-items-center border-2 border-navy bg-accent-yellow">
              <FiX aria-hidden="true" />
            </button>
          </form>
        </div>
        {isOpen ? (
          <div className="relative min-h-0 bg-white">
            <Image src={src} alt={alt} fill sizes={portrait ? "min(90vw, 30dvh, 384px)" : "min(95vw, 1200px)"} className="object-contain" />
          </div>
        ) : null}
      </dialog>
    </>
  );
}
