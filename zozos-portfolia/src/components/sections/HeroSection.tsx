import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { PERSONAL } from "@/lib/data";
import { SECTION_IDS } from "@/lib/constants";

const quickFacts = [
  PERSONAL.location,
  "Frontend + backend capable",
  "Product-focused workflow",
];

export default function HeroSection() {
  return (
    <section
      id={SECTION_IDS.hero}
      className="flex min-h-screen items-center pb-20 pt-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl">
            <p className="font-mono text-accent-orange font-semibold uppercase tracking-[0.2em]">
              Hi, my name is
            </p>
            <h1 className="mt-4 text-5xl font-extrabold leading-[0.95] tracking-tight text-navy sm:text-6xl lg:text-7xl">
              Zozo.
            </h1>
            <h2 className="mt-3 font-bold text-muted sm:text-3xl">
              {PERSONAL.role}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              I&apos;m a driven {PERSONAL.role} from Mongolia who loves turning
              complex problems into simple, beautiful solutions. With a strong
              foundation in modern web technologies, I create performant and
              user-friendly applications that make a difference.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {quickFacts.map((fact) => (
                <span
                  key={fact}
                  className="inline-flex border-3 border-navy bg-white/70 px-3 py-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-navy shadow-brutal-sm">
                  {fact}
                </span>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href={`#${SECTION_IDS.projects}`} variant="primary">
                View Projects
              </Button>
              <Button
                href={PERSONAL.resumeUrl}
                variant="secondary"
                download
                target="_blank"
                rel="noreferrer">
                Download Resume
              </Button>
              <Button href={`#${SECTION_IDS.contact}`} variant="outline">
                Email Me
              </Button>
              <a
                href={PERSONAL.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-accent-orange sm:text-base">
                View GitHub
                <span aria-hidden="true">-&gt;</span>
              </a>
            </div>
          </div>

          <div className="group relative mx-auto w-full max-w-[520px] pb-10">
            <div className="absolute -top-5 right-4 z-0 h-24 w-24 border-3 border-navy bg-accent-yellow shadow-brutal-sm transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:rotate-3" />
            <div className="absolute -bottom-2 left-4 z-0 h-24 w-24 border-3 border-navy bg-accent-teal shadow-brutal-sm transition-transform duration-300 ease-out group-hover:translate-y-2 group-hover:-rotate-3" />

            <div className="relative z-10 ml-auto aspect-4/5 w-full max-w-[420px] overflow-hidden border-3 border-navy bg-cream shadow-brutal-lg transition-[transform,box-shadow] duration-300 ease-out group-hover:z-30 group-hover:-translate-y-2 group-hover:rotate-[1.25deg] group-hover:shadow-[12px_12px_0_0_#1a1a2e]">
              <Image
                src="/profile.jpg"
                alt={`${PERSONAL.name} portrait`}
                fill
                priority
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06] group-hover:-translate-y-1"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-navy/80 via-navy/30 to-transparent p-6 text-cream transition-transform duration-300 ease-out group-hover:translate-y-1">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-yellow">
                  Current focus
                </p>
                <p className="mt-2 text-lg font-semibold">{PERSONAL.focus}</p>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-2 z-20 hidden w-40 sm:block md:w-44 group-hover:z-10">
              <div className="relative aspect-4/5 rotate-[-7deg] overflow-hidden border-3 border-navy bg-cream shadow-brutal transition-transform duration-300 ease-out group-hover:-translate-x-1 group-hover:translate-y-1 group-hover:rotate-[-10deg]">
                <Image
                  src="/profile2.jpg"
                  alt={`${PERSONAL.name} secondary portrait`}
                  fill
                  sizes="176px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
                />
              </div>
            </div>

            <div className="absolute left-0 bottom-3 hidden sm:block z-20 rotate-[7deg] max-w-[220px] border-3 border-navy bg-cream px-4 py-3 shadow-brutal-sm transition-transform duration-300 ease-out group-hover:z-10 group-hover:translate-x-1 group-hover:translate-y-2 sm:-right-6 sm:left-auto sm:bottom-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                Status
              </p>
              <p className="mt-1 font-semibold text-navy">
                {PERSONAL.availability}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
