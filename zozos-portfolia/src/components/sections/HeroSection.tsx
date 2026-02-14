"use client";

import { useState, useRef, useCallback } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { PERSONAL } from "@/lib/data";
import { SECTION_IDS } from "@/lib/constants";

const PROFILE_IMAGES = ["/profile1.jpg", "/profile2.jpg"];
const HOVER_DELAY = 2000;

export default function HeroSection() {
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    timerRef.current = setTimeout(() => {
      setImageIndex((prev) => (prev + 1) % PROFILE_IMAGES.length);
      setIsHovering(false);
    }, HOVER_DELAY);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return (
    <section
      id={SECTION_IDS.hero}
      className="min-h-screen flex items-center pt-5">
      <Container>
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text side */}
          <div>
            <p className="font-mono text-accent-orange font-semibold mb-4 text-sm sm:text-base">
              Hi, my name is
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-navy leading-tight">
              {PERSONAL.name}
              <span className="text-accent-orange">.</span>
            </h1>
            <p className="font-mono text-muted text-lg sm:text-xl mt-2 mb-6">
              {PERSONAL.role}
            </p>
            <p className="text-muted text-lg leading-relaxed mb-10">
              {PERSONAL.about}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href={`#${SECTION_IDS.projects}`} variant="primary">
                View My Work
              </Button>
              <Button href={`#${SECTION_IDS.contact}`} variant="outline">
                Get In Touch
              </Button>
            </div>
          </div>

          {/* Photo side */}
          <div className="flex justify-center md:justify-end order-first md:order-last">
            <div className="relative ">
              {/* Border that draws around the image in 2s on hover */}
              <svg
                className="absolute inset-0 w-full h-full z-20 pointer-events-none"
                viewBox="0 0 200 200"
                preserveAspectRatio="none"
                style={{ opacity: isHovering ? 1 : 0, transition: "opacity 0.15s" }}>
                <defs>
                  <filter id="border-glow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <rect
                  x="1"
                  y="1"
                  width="198"
                  height="198"
                  fill="none"
                  stroke="#ff6b35"
                  strokeWidth="3"
                  strokeDasharray="792"
                  strokeDashoffset="792"
                  filter="url(#border-glow)"
                  style={{
                    animation: isHovering ? "border-draw 2s linear forwards" : "none",
                  }}
                />
              </svg>

              <div
                className="relative w-64 h-64 sm:w-80 sm:h-80 border-3 border-navy shadow-brutal-lg overflow-hidden bg-accent-yellow/20 cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                {/* Placeholder initial — visible when no photo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl sm:text-7xl font-bold text-navy/30 select-none">
                    Z
                  </span>
                </div>
                {/* Photo sits on top, covering the placeholder */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PROFILE_IMAGES[imageIndex]}
                  alt={PERSONAL.name}
                  className="relative w-full h-full object-cover z-10 transition-opacity duration-500"
                />
              </div>
              {/* Decorative offset block */}
              <div className="absolute -bottom-3 -right-3 w-full h-full border-3 border-navy bg-accent-teal/20 -z-10" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
