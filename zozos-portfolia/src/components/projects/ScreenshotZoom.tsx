"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { FiMaximize2, FiX } from "react-icons/fi";
import { useContent } from "@/lib/i18n/useContent";

export default function ScreenshotZoom({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
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
        className="m-auto w-[min(92vw,1200px)] max-w-none border-3 border-navy bg-cream p-3 text-navy shadow-brutal-lg backdrop:bg-navy/75 sm:p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm font-bold">{alt}</p>
          <form method="dialog">
            <button aria-label={ui.gallery.closeImage} className="grid size-11 cursor-pointer place-items-center border-2 border-navy bg-accent-yellow">
              <FiX aria-hidden="true" />
            </button>
          </form>
        </div>
        {isOpen ? (
          <div className="relative h-[min(72dvh,850px)] bg-white">
            <Image src={src} alt={alt} fill sizes="(min-width: 1300px) 1160px, 90vw" className="object-contain" />
          </div>
        ) : null}
      </dialog>
    </>
  );
}
