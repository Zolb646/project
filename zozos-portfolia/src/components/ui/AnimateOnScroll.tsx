interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimateOnScroll({
  children,
  className = "",
}: AnimateOnScrollProps) {
  return <div className={className}>{children}</div>;
}
