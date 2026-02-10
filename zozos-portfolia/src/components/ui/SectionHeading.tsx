interface SectionHeadingProps {
  children: React.ReactNode;
  color?: "orange" | "teal" | "yellow" | "violet";
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
}: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-navy">{children}</h2>
      <div className={`mt-3 h-2 w-20 ${underlineColors[color]}`} />
    </div>
  );
}
