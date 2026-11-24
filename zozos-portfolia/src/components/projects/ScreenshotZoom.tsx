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
        <span aria-hidden="true" className="absolute bottom-2 right-2 grid size-9 place-items-center border-2 border-line bg-accent-yellow text-on-accent">
          <FiMaximize2 />
        </span>
      </button>
      <dialog
        ref={dialogRef}
        aria-label={alt}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className={`m-auto h-[min(calc(100dvh-1.5rem),60rem)] max-h-none max-w-[calc(100%-1.5rem)] grid-rows-[auto_minmax(0,1fr)] gap-2 overflow-auto bg-transparent p-0 text-white open:grid backdrop:bg-[#101015]/95 sm:gap-3 ${portrait ? "w-[clamp(13rem,44dvh,26rem)]" : "w-[68rem]"}`}>
        <div className="flex items-center justify-between gap-3">
          <p className="min-w-0 text-sm font-semibold wrap-anywhere">{alt}</p>
          <form method="dialog" className="shrink-0">
            <button type="submit" aria-label={ui.gallery.closeImage} className="grid size-11 cursor-pointer place-items-center rounded-full border border-white/25 bg-white/10 text-lg hover:bg-white/20 focus-visible:outline-offset-[-3px] focus-visible:outline-white">
              <FiX aria-hidden="true" />
            </button>
          </form>
        </div>
        {isOpen ? (
          <div className="relative min-h-0">
            <Image src={src} alt={alt} fill sizes={portrait ? "min(90vw, 44dvh, 416px)" : "min(95vw, 1088px)"} className="object-contain" />
          </div>
        ) : null}
      </dialog>
    </>
  );
}
