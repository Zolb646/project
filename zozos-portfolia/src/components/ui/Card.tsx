interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}

export default function Card({ children, hover = true, className = "" }: CardProps) {
  return (
    <div
      className={`bg-cream border-3 border-navy shadow-brutal p-6 ${
        hover
          ? "transition-all duration-200 hover:-translate-y-1 hover:shadow-brutal-lg"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
