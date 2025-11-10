import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { SidebarProvider } from "../../shared/contexts";
export function ProtectedLayout() {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden pt-16">
          <Sidebar />
          <main className="flex-1 p-6 overflow-y-auto transition-all duration-300">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
