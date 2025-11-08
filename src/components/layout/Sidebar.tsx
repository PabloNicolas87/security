import { NavLink } from "react-router-dom";
import { LayoutDashboard, MessageSquare, Table } from "lucide-react";

export function Sidebar() {
  const baseClasses =
    "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const active =
    "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200";
  const inactive =
    "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800";

  return (
    <aside className="w-56 bg-white border-r border-gray-200 shadow-sm min-h-screen p-4">
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? active : inactive}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? active : inactive}`
          }
        >
          <MessageSquare size={18} />
          Chat
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? active : inactive}`
          }
        >
          <Table size={18} />
          Eventos
        </NavLink>
      </nav>
    </aside>
  );
}
