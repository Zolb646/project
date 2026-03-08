interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  href?: string;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
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
  disabled = false,
}: ButtonProps) {
  const classes = `inline-flex min-h-12 items-center justify-center px-5 py-3 text-sm font-semibold whitespace-nowrap transition-all duration-150 sm:text-base ${variants[variant]} ${
    disabled
      ? "cursor-not-allowed opacity-60 hover:translate-x-0 hover:translate-y-0 hover:shadow-brutal"
      : ""
  } ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} aria-disabled={disabled}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
