interface SectionHeadingProps {
  children: React.ReactNode;
  color?: "orange" | "teal" | "yellow" | "violet";
  eyebrow?: string;
  description?: string;
}

export default function SectionHeading({ children, description }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <h2>{children}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
