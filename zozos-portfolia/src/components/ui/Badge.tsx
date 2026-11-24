interface BadgeProps {
  children: React.ReactNode;
  color?: "yellow" | "teal" | "orange" | "violet";
}

const colors = {
  yellow: "bg-accent-yellow text-on-accent",
  teal: "bg-accent-teal text-on-accent",
  orange: "bg-accent-orange text-on-accent",
  violet: "bg-[#7e22ce] text-white",
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
