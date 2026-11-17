interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  padded?: boolean;
  className?: string;
}

export default function Card({ children, hover = true, padded = true, className = "" }: CardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-line bg-white ${padded ? "p-6 sm:p-7" : ""} ${
        hover
          ? "transition-colors duration-150 hover:border-muted/40"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
