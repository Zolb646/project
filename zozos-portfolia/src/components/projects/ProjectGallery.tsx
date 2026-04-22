"use client";

import * as React from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface ProjectGalleryProps {
  images: string[];
  layout?: "desktop" | "mobile";
  title: string;
}

export default function ProjectGallery({
  images,
  layout = "desktop",
  title,
}: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const isMobileLayout = layout === "mobile";
  const activeImage = images[activeIndex];

  React.useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  if (!activeImage) {
    return (
      <div className="flex min-h-[320px] items-center justify-center border-3 border-navy bg-[linear-gradient(135deg,rgba(255,107,53,0.18),rgba(78,205,196,0.18))] p-8 shadow-brutal">
        <span className="text-center text-2xl font-black uppercase tracking-[0.2em] text-navy/60">
          {title}
        </span>
      </div>
    );
  }

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Visual walkthrough
          </p>
          <h2 className="mt-2 text-3xl font-black leading-[0.96] text-navy sm:text-4xl">
            Screens, flow, and feel.
          </h2>
        </div>
        {images.length > 1 ? (
          <div className="inline-flex border-3 border-navy bg-accent-yellow px-3 py-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-navy shadow-brutal-sm">
            Shot {activeIndex + 1} / {images.length}
          </div>
        ) : null}
      </div>

      {isMobileLayout ? (
        <div className="mx-auto w-full max-w-[22rem] space-y-4 sm:max-w-[24rem] lg:max-w-[26rem]">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
              Mobile walkthrough
            </p>
            {images.length > 1 ? (
              <div className="inline-flex border-2 border-navy bg-cream px-2.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted shadow-brutal-sm">
                Screen {String(activeIndex + 1).padStart(2, "0")} / {images.length}
              </div>
            ) : null}
          </div>

          <div className="relative mx-auto w-full">
            <div className="absolute -top-3 right-4 z-0 h-16 w-16 border-3 border-navy bg-accent-yellow shadow-brutal-sm sm:h-20 sm:w-20" />

            <div className="relative z-10 mx-auto w-full max-w-[19rem] rounded-[1.8rem] border-3 border-navy bg-white p-2 shadow-brutal-lg sm:max-w-[20rem] lg:max-w-[21rem]">
              <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.15rem] border-2 border-navy bg-white">
                <Image
                  src={activeImage}
                  alt={`${title} screenshot ${activeIndex + 1}`}
                  fill
                  sizes="(min-width: 1024px) 336px, (min-width: 640px) 320px, 78vw"
                  className="object-cover object-top"
                  priority
                />
              </div>

              {images.length > 1 ? (
                <div className="mt-3 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={showPrevious}
                    className="inline-flex h-10 w-10 items-center justify-center border-2 border-navy bg-cream text-lg text-navy shadow-brutal-sm transition-transform duration-150 hover:translate-y-[2px] hover:shadow-none"
                    aria-label={`Show previous ${title} screenshot`}>
                    <FiChevronLeft />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    className="inline-flex h-10 w-10 items-center justify-center border-2 border-navy bg-cream text-lg text-navy shadow-brutal-sm transition-transform duration-150 hover:translate-y-[2px] hover:shadow-none"
                    aria-label={`Show next ${title} screenshot`}>
                    <FiChevronRight />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden border-3 border-navy bg-white shadow-brutal">
          <div className="flex items-center justify-between gap-3 border-b-3 border-navy/20 bg-cream px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border border-navy/20 bg-accent-orange/80" />
              <span className="h-3 w-3 rounded-full border border-navy/20 bg-accent-yellow/80" />
              <span className="h-3 w-3 rounded-full border border-navy/20 bg-accent-teal/80" />
            </div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
              Desktop layout
            </p>
          </div>

          <div className="p-3 sm:p-5">
            <div className="relative mx-auto aspect-video w-full overflow-hidden border-3 border-navy bg-white shadow-brutal-sm">
              <Image
                src={activeImage}
                alt={`${title} screenshot ${activeIndex + 1}`}
                fill
                sizes="(min-width: 1280px) 1100px, 92vw"
                className="object-contain object-center"
                priority
              />

              {images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={showPrevious}
                    className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border-2 border-navy bg-cream/95 text-xl text-navy shadow-brutal-sm transition-transform duration-150 hover:translate-y-[calc(-50%+2px)] sm:left-4"
                    aria-label={`Show previous ${title} screenshot`}>
                    <FiChevronLeft />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border-2 border-navy bg-cream/95 text-xl text-navy shadow-brutal-sm transition-transform duration-150 hover:translate-y-[calc(-50%+2px)] sm:right-4"
                    aria-label={`Show next ${title} screenshot`}>
                    <FiChevronRight />
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {images.length > 1 ? (
        <div
          className={`overflow-x-auto pb-2 ${
            isMobileLayout ? "mx-auto max-w-[22rem] sm:max-w-[24rem] lg:max-w-[26rem]" : ""
          }`}>
          <div
            className={`flex gap-3 pr-2 ${
              isMobileLayout
                ? "w-max snap-x snap-mandatory gap-2.5 px-0.5"
                : "w-max"
            }`}>
            {images.map((image, index) => (
              <button
                key={`${title}-thumb-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative overflow-hidden border-3 bg-white transition-all duration-150 ${
                  index === activeIndex
                    ? "border-navy shadow-brutal-sm -translate-y-1"
                    : "border-navy/20 opacity-80 hover:border-navy/60 hover:opacity-100"
                }`}
                aria-label={`Show screenshot ${index + 1} for ${title}`}>
                <div
                  className={`relative bg-white ${
                    isMobileLayout
                      ? "h-24 w-[3.85rem] snap-start sm:h-28 sm:w-[4.35rem]"
                      : "h-24 w-40 sm:h-28 sm:w-44"
                  }`}>
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes={
                      isMobileLayout
                        ? "(min-width: 768px) 76px, 68px"
                        : "(min-width: 768px) 176px, 160px"
                    }
                    className="object-cover object-top"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
