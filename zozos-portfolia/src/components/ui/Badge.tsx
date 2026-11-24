interface BadgeProps {
  children: React.ReactNode;
  color?: "yellow" | "teal" | "orange" | "violet";
}

const colors = {
  yellow: "bg-accent-yellow text-on-accent dark:bg-accent-yellow/14 dark:text-accent-yellow-ink",
  teal: "bg-accent-teal text-on-accent dark:bg-accent-teal/14 dark:text-accent-teal-ink",
  orange: "bg-accent-orange text-on-accent dark:bg-accent-orange/14 dark:text-accent-orange-ink",
  violet: "bg-[#7e22ce] text-white dark:bg-accent-violet/14 dark:text-accent-violet-ink",
};

export default function Badge({ children, color = "yellow" }: BadgeProps) {
  return (
    <span
      className={`inline-block border-2 border-line px-2.5 py-1 text-xs font-bold ${colors[color]}`}
    >
      {children}
    </span>
  );
}
