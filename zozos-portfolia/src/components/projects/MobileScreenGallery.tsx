"use client";

import Image from "next/image";
import { Fragment, useId, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import ScreenshotZoom from "@/components/projects/ScreenshotZoom";
import { useContent } from "@/lib/i18n/useContent";

const arrowClass = "grid size-11 shrink-0 cursor-pointer place-items-center border-2 border-navy bg-white text-xl hover:bg-accent-yellow";

export default function MobileScreenGallery({
  images,
  imageTitles,
  imageGroupTitles,
  title,
}: {
  images: string[];
  imageTitles?: string[];
  imageGroupTitles?: string[];
  title: string;
}) {
  const { ui } = useContent();
  const headingId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const screenTitle = (index: number) =>
    imageTitles?.[index] ?? ui.projectDetail.appScreenAlt(title, index + 1);

  function move(direction: -1 | 1) {
    setActiveIndex((index) => (index + direction + images.length) % images.length);
  }

  return (
    <section
      id="app-screens"
      aria-labelledby={headingId}
      className="space-y-5 sm:space-y-6"
      onKeyDown={(event) => {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}>
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          {ui.projectDetail.appScreens}
        </p>
        <h2 id={headingId} className="mt-2 font-display text-[clamp(1.6rem,4vw,2.25rem)] font-black tracking-tight">
          {ui.projectDetail.insideTheFlow}
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-7 text-muted sm:text-base">
          {ui.projectDetail.appScreensDesc}
        </p>
      </div>

      <div className="grid min-w-0 border-3 border-navy bg-white shadow-brutal sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="portrait-stage grid min-w-0 place-items-center border-b-3 border-navy bg-accent-teal p-[clamp(0.75rem,3dvh,2rem)] sm:border-r-3 sm:border-b-0 [@media(max-height:500px)]:items-start">
          <div className="w-[min(62vw,30dvh,16rem)] max-w-full rounded-[1.8rem] border-3 border-navy bg-white p-1.5 shadow-brutal">
            <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.25rem] bg-navy">
              <ScreenshotZoom src={images[activeIndex]} alt={screenTitle(activeIndex)} portrait>
                <Image
                  src={images[activeIndex]}
                  alt=""
                  fill
                  sizes="min(62vw, 30dvh, 256px)"
                  className="object-cover object-top"
                />
              </ScreenshotZoom>
            </div>
          </div>
        </div>

        <div className="min-w-0 p-3 sm:p-5 lg:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-navy pb-3">
            <div role="status" aria-atomic="true">
              <p className="font-mono text-xs text-muted">{ui.gallery.screenOf(activeIndex + 1, images.length)}</p>
              <p className="mt-1 font-display text-xl font-extrabold leading-tight sm:text-2xl">
                {screenTitle(activeIndex)}
              </p>
            </div>
            <div className="flex gap-2">
              <button type="button" className={arrowClass} aria-label={ui.gallery.showPrevious(title)} onClick={() => move(-1)}>
                <FiArrowLeft aria-hidden="true" />
              </button>
              <button type="button" className={arrowClass} aria-label={ui.gallery.showNext(title)} onClick={() => move(1)}>
                <FiArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>

          <div role="group" aria-label={ui.projectDetail.chooseScreen} className="mt-3 grid grid-cols-1 gap-2 min-[310px]:grid-cols-2">
            {images.map((src, index) => {
              const group = imageGroupTitles?.[index];
              return (
                <Fragment key={src}>
                  {group && group !== imageGroupTitles?.[index - 1] ? (
                    <h3 className="col-span-full pt-2 font-mono text-xs font-semibold text-muted">
                      {group}
                    </h3>
                  ) : null}
                  <button
                    type="button"
                    aria-pressed={activeIndex === index}
                    onClick={() => setActiveIndex(index)}
                    className="flex min-h-11 min-w-0 cursor-pointer items-center gap-2 border-2 border-navy/20 bg-cream px-2 py-1 text-left text-xs font-semibold hover:border-navy aria-pressed:border-navy aria-pressed:bg-accent-yellow sm:text-sm">
                    <span className="relative h-8 w-4 shrink-0 overflow-hidden rounded-sm bg-navy">
                      <Image src={src} alt="" fill sizes="16px" className="object-cover object-top" />
                    </span>
                    <span className="min-w-0 wrap-anywhere">{screenTitle(index)}</span>
                  </button>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
