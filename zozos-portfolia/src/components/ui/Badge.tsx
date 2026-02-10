interface BadgeProps {
  children: React.ReactNode;
  color?: "yellow" | "teal" | "orange" | "violet";
}

const colors = {
  yellow: "bg-accent-yellow text-navy",
  teal: "bg-accent-teal text-navy",
  orange: "bg-accent-orange text-white",
  violet: "bg-accent-violet text-white",
};

export default function Badge({ children, color = "yellow" }: BadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-mono uppercase font-semibold border-2 border-navy ${colors[color]}`}
    >
      {children}
    </span>
  );
}
