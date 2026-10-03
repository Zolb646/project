interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}

export default function Container({ children, className = "", wide = false }: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-5 sm:px-8 lg:px-12 ${wide ? "max-w-[1536px]" : "max-w-[1280px]"} ${className}`}>
      {children}
    </div>
  );
}
