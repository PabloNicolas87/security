import type { ReactNode } from "react";
interface TableProps {
  children: ReactNode;
  className?: string;
}
interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}
interface TableRowProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}
interface TableCellProps {
  children: ReactNode;
  className?: string;
  header?: boolean;
}
export function Table({ children, className = "" }: TableProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
      <table className={`min-w-full border-collapse ${className}`}>
        {children}
      </table>
    </div>
  );
}
export function TableHeader({ children, className = "" }: TableHeaderProps) {
  return (
    <thead className={`bg-gray-100 dark:bg-gray-700 ${className}`}>
      {children}
    </thead>
  );
}
export function TableRow({ 
  children, 
  className = "", 
  onClick,
  hover = false 
}: TableRowProps) {
  const baseClasses = "border-b border-gray-200 dark:border-gray-700";
  const hoverClasses = hover || onClick ? "hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition" : "";
  const clickClasses = onClick ? "cursor-pointer" : "";
  const focusClasses = onClick ? "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:focus:ring-blue-400" : "";
  const tabIndexValue = onClick ? 0 : undefined;
  return (
    <tr
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={tabIndexValue}
      className={`${baseClasses} ${hoverClasses} ${clickClasses} ${focusClasses} ${className}`}
    >
      {children}
    </tr>
  );
}
export function TableCell({ 
  children, 
  className = "", 
  header = false 
}: TableCellProps) {
  const baseClasses = header
    ? "p-3 text-left text-sm font-medium text-gray-800 dark:text-gray-100"
    : "p-3 text-sm text-gray-800 dark:text-gray-200";
  return <td className={`${baseClasses} ${className}`}>{children}</td>;
}
export function TableHead({ children, className = "" }: TableCellProps) {
  return (
    <th className={`p-3 text-left text-sm font-medium text-gray-800 dark:text-gray-100 ${className}`}>
      {children}
    </th>
  );
}
