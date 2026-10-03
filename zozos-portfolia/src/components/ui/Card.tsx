interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  padded?: boolean;
  className?: string;
}

export default function Card({ children, hover = true, padded = true, className = "" }: CardProps) {
  return (
    <div
      className={`relative overflow-hidden border-3 border-navy bg-white shadow-brutal ${padded ? "p-6 sm:p-7" : ""} ${
        hover
          ? "transition-[transform,box-shadow] duration-150 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-brutal-sm"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
