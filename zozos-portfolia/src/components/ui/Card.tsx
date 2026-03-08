interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}

export default function Card({ children, hover = true, className = "" }: CardProps) {
  return (
    <div
      className={`relative overflow-hidden border-3 border-navy bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.32))] p-6 shadow-brutal backdrop-blur-[1px] sm:p-7 ${
        hover
          ? "transition-all duration-200 hover:-translate-y-1 hover:shadow-brutal-lg"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
