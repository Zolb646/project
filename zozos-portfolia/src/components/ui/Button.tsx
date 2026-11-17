interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  href?: string;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  download?: boolean | string;
  target?: "_self" | "_blank" | "_parent" | "_top";
  rel?: string;
}

const variants = {
  primary: "border border-navy bg-navy text-white hover:bg-navy/85",
  secondary: "border border-line bg-surface text-navy hover:bg-line",
  outline: "border border-line bg-white text-navy hover:bg-surface",
};

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
  type = "button",
  onClick,
  disabled = false,
  download,
  target,
  rel,
}: ButtonProps) {
  const classes = `inline-flex min-h-12 items-center justify-center gap-4 rounded-full px-6 py-3 text-xs font-semibold transition-colors duration-150 sm:text-sm ${variants[variant]} ${
    disabled
      ? "cursor-not-allowed opacity-60"
      : ""
  } ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        download={download}
        target={target}
        rel={rel}
        aria-disabled={disabled}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}>
      {children}
    </button>
  );
}
