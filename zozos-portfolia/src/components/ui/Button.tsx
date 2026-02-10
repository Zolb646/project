interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  href?: string;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

const variants = {
  primary:
    "bg-accent-orange text-white border-3 border-navy shadow-brutal hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none",
  secondary:
    "bg-accent-teal text-navy border-3 border-navy shadow-brutal hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none",
  outline:
    "bg-cream text-navy border-3 border-navy shadow-brutal hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none",
};

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center px-6 py-3 font-semibold transition-all duration-150 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
