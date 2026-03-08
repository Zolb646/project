interface SectionHeadingProps {
  children: React.ReactNode;
  color?: "orange" | "teal" | "yellow" | "violet";
  eyebrow?: string;
  description?: string;
}

const underlineColors = {
  orange: "bg-accent-orange",
  teal: "bg-accent-teal",
  yellow: "bg-accent-yellow",
  violet: "bg-accent-violet",
};

export default function SectionHeading({
  children,
  color = "orange",
  eyebrow,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-12 max-w-3xl">
      {eyebrow ? (
        <span className="inline-flex border-3 border-navy bg-cream px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted shadow-brutal-sm">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-4 text-3xl font-black tracking-tight text-navy sm:text-4xl">
        {children}
      </h2>
      <div className={`mt-3 h-2 w-20 ${underlineColors[color]}`} />
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
