interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}

export default function Container({ children, className = "", wide = false }: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-6 sm:px-10 lg:px-14 ${wide ? "max-w-[1280px]" : "max-w-[1200px]"} ${className}`}>
      {children}
    </div>
  );
}
