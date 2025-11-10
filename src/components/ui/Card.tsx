import type { ReactNode } from "react";
interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  variant?: "default" | "gradient" | "glass";
}
interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}
interface CardBodyProps {
  children: ReactNode;
  className?: string;
}
interface CardFooterProps {
  children: ReactNode;
  className?: string;
}
export function Card({ 
  children, 
  className = "", 
  hover = true,
  padding = "md",
  variant = "default"
}: CardProps) {
  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };
  const variantClasses = {
    default: "bg-white dark:bg-gray-800",
    gradient: "bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900",
    glass: "bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700",
  };
  return (
    <div
      className={`${variantClasses[variant]} rounded-lg shadow-md ${
        hover ? "transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-default" : ""
      } ${paddingClasses[padding]} border border-gray-100 dark:border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
}
export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={`border-b border-gray-200 dark:border-gray-700 pb-3 mb-4 ${className}`}>
      {children}
    </div>
  );
}
export function CardBody({ children, className = "" }: CardBodyProps) {
  return <div className={className}>{children}</div>;
}
export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div className={`border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 ${className}`}>
      {children}
    </div>
  );
}
