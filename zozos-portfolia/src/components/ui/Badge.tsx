interface BadgeProps {
  children: React.ReactNode;
  color?: "yellow" | "teal" | "orange" | "violet";
}

const colors = {
  yellow: "bg-accent-yellow text-navy",
  teal: "bg-accent-teal text-navy",
  orange: "bg-accent-orange text-navy",
  violet: "bg-accent-violet-ink text-white",
};

export default function Badge({ children, color = "yellow" }: BadgeProps) {
  return (
    <span
      className={`inline-block border-2 border-navy px-2.5 py-1 text-xs font-bold ${colors[color]}`}
    >
      {children}
    </span>
  );
}
