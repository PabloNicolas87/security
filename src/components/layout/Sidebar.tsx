import { NavLink } from "react-router-dom";
import { LayoutDashboard, MessageSquare, Table, LogOut, ChevronLeft } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

export function Sidebar() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const baseClasses =
    "flex items-center gap-2 rounded-md text-sm font-medium transition-colors";
  const paddingClasses = sidebarOpen ? "px-4 py-2" : "p-2";
  const active =
    "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200";
  const inactive =
    "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800";

  return (
    <aside className={`${sidebarOpen ? 'w-56' : 'w-16'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm h-full p-4 flex flex-col overflow-y-auto transition-all duration-300`}>
      {/* Toggle Button */}
      <button
        onClick={handleToggleSidebar}
        className="flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 mb-4 transition-colors"
        title={sidebarOpen ? "Ocultar sidebar" : "Mostrar sidebar"}
      >
        <ChevronLeft size={20} className={`transform transition-transform duration-300 ${sidebarOpen ? 'rotate-0' : 'rotate-180'}`} />
      </button>

      <nav className="flex flex-col gap-2 flex-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${baseClasses} ${paddingClasses} ${isActive ? active : inactive} ${!sidebarOpen ? 'justify-center' : ''}`
          }
          title={!sidebarOpen ? "Dashboard" : ""}
        >
          <LayoutDashboard size={18} />
          {sidebarOpen && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `${baseClasses} ${paddingClasses} ${isActive ? active : inactive} ${!sidebarOpen ? 'justify-center' : ''}`
          }
          title={!sidebarOpen ? "Chat" : ""}
        >
          <MessageSquare size={18} />
          {sidebarOpen && <span>Chat</span>}
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            `${baseClasses} ${paddingClasses} ${isActive ? active : inactive} ${!sidebarOpen ? 'justify-center' : ''}`
          }
          title={!sidebarOpen ? "Eventos" : ""}
        >
          <Table size={18} />
          {sidebarOpen && <span>Eventos</span>}
        </NavLink>
      </nav>

      {/* Botón de logout en la parte inferior */}
      {user && (
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          {sidebarOpen && (
            <div className="px-4 py-2 mb-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Olá, <strong className="text-gray-700 dark:text-gray-300">{user.name}</strong>
              </span>
            </div>
          )}
          <button
            onClick={logout}
            className={`${baseClasses} ${paddingClasses} ${inactive} w-full ${!sidebarOpen ? 'justify-center' : ''} text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300`}
            title={!sidebarOpen ? "Sair" : ""}
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Sair</span>}
          </button>
        </div>
      )}
    </aside>
  );
}
