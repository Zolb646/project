interface SectionHeadingProps {
  children: React.ReactNode;
  color?: "orange" | "teal" | "yellow" | "violet";
  eyebrow?: string;
  description?: string;
}

const colors = {
  orange: "bg-accent-orange",
  teal: "bg-accent-teal",
  yellow: "bg-accent-yellow",
  violet: "bg-accent-violet",
};

export default function SectionHeading({ children, color = "orange", eyebrow, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 grid gap-5 sm:mb-12 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-12">
      <div>
        {eyebrow ? (
          <p className="mb-3 flex items-center gap-2.5 text-sm font-bold">
            <span className={`h-3 w-3 border-2 border-navy ${colors[color]}`} aria-hidden="true" />
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-[clamp(2.6rem,5vw,4.2rem)] font-extrabold leading-[1.05] tracking-[-0.045em] text-navy">
          {children}
        </h2>
      </div>
      {description ? <p className="max-w-[48ch] text-base leading-relaxed text-muted lg:pb-1">{description}</p> : null}
    </div>
  );
}
