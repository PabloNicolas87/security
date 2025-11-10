import type { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
interface MainLayoutProps {
  children: ReactNode;
}
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {}
      <Header />
      {}
      <div className="flex flex-1 overflow-hidden pt-16">
        {}
        <Sidebar />
        {}
        <main className="flex-1 overflow-auto transition-all duration-300">
          <div className="w-full h-full p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
