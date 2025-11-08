import type { ReactNode } from "react";
import { Header } from "./Header";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6 pt-24">
        {children}
      </main>
    </div>
  );
}

