import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { PERSONAL } from "@/lib/data";
import { SECTION_IDS } from "@/lib/constants";

export default function HeroSection() {
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
            <div className="relative">
              {/* Place your photo at public/profile.jpg */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 border-3 border-navy shadow-brutal-lg overflow-hidden bg-accent-yellow/20">
                {/* Placeholder initial — visible when no photo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl sm:text-7xl font-bold text-navy/30 select-none">
                    Z
                  </span>
                </div>
                {/* Photo sits on top, covering the placeholder */}
                <img
                  src="/1099776.jpg"
                  alt={PERSONAL.name}
                  className="relative w-full h-full object-cover z-10"
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
