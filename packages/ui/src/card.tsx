import { type JSX } from "react";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}

export function Card({ className, children, hover = true }: CardProps): JSX.Element {
  const baseClass = "rounded-xl border bg-card text-card-foreground shadow transition-all duration-200";
  const hoverClass = hover ? "hover:border-primary hover:shadow-lg" : "";
  
  return (
    <div className={`${baseClass} ${hoverClass} ${className || ""}`}>
      {children}
    </div>
  );
}
