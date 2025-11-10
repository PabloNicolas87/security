import { NavLink } from "react-router-dom";
import { LayoutDashboard, MessageSquare, Table, LogOut, ChevronLeft, X } from "lucide-react";
import { useAuth, useSidebar } from "../../shared/contexts";
import { useTranslation } from "react-i18next";
import { useToast } from "../../shared/hooks/useToast";
import { useState, useEffect, useCallback } from "react";
export function Sidebar() {
  const { user, logout } = useAuth();
  const { isOpen: sidebarOpen, close: closeSidebar } = useSidebar();
  const { t } = useTranslation();
  const toast = useToast();
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const handleDesktopToggle = useCallback(() => {
    setDesktopOpen(!desktopOpen);
  }, [desktopOpen]);
  
  const handleNavClick = useCallback(() => {
    if (isMobile) {
      closeSidebar();
    }
  }, [isMobile, closeSidebar]);
  
  const handleLogout = useCallback(() => {
    logout();
    toast.warning(t('sidebar.logoutMessage'));
  }, [logout, toast, t]);
  const baseClasses =
    "flex items-center gap-2 rounded-md text-sm font-medium transition-colors";
  const paddingClasses = desktopOpen ? "px-4 py-2" : "p-2";
  const active =
    "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200";
  const inactive =
    "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800";
  if (isMobile) {
    return (
      <>
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={closeSidebar}
          />
        )}
        <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-56 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg z-40 transform transition-transform duration-300 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
          <button
            onClick={closeSidebar}
            className="absolute top-4 right-4 p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            title={t('common.close')}
          >
            <X size={20} />
          </button>
          <nav className="flex flex-col gap-2 p-4 pt-12 flex-1">
            <NavLink
              to="/dashboard"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `${baseClasses} ${paddingClasses} ${isActive ? active : inactive} focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-md`
              }
            >
              <LayoutDashboard size={18} />
              <span>{t('sidebar.dashboard')}</span>
            </NavLink>
            <NavLink
              to="/chat"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `${baseClasses} ${paddingClasses} ${isActive ? active : inactive} focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-md`
              }
            >
              <MessageSquare size={18} />
              <span>{t('sidebar.chat')}</span>
            </NavLink>
            <NavLink
              to="/events"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `${baseClasses} ${paddingClasses} ${isActive ? active : inactive} focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-md`
              }
            >
              <Table size={18} />
              <span>{t('sidebar.events')}</span>
            </NavLink>
          </nav>
          {user && (
            <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 px-4 pb-4">
              <div className="px-2 py-2 mb-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {t('sidebar.hello')}, <strong className="text-gray-700 dark:text-gray-300">{user.name}</strong>
                </span>
              </div>
              <button
                onClick={handleLogout}
                className={`${baseClasses} ${paddingClasses} ${inactive} w-full text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-md`}
              >
                <LogOut size={18} />
                <span>{t('sidebar.logout')}</span>
              </button>
            </div>
          )}
        </aside>
      </>
    );
  }
  return (
    <aside className={`${desktopOpen ? 'w-56' : 'w-16'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm h-full p-4 flex flex-col overflow-y-auto transition-all duration-300 hidden md:flex`}>
      <button
        onClick={handleDesktopToggle}
        className="flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        title={desktopOpen ? "Ocultar sidebar" : "Mostrar sidebar"}
      >
        <ChevronLeft size={20} className={`transform transition-transform duration-300 ${desktopOpen ? 'rotate-0' : 'rotate-180'}`} />
      </button>
      <nav className="flex flex-col gap-2 flex-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${baseClasses} ${paddingClasses} ${isActive ? active : inactive} ${!desktopOpen ? 'justify-center' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-md`
          }
          title={!desktopOpen ? t('sidebar.dashboard') : ""}
        >
          <LayoutDashboard size={18} />
          {desktopOpen && <span>{t('sidebar.dashboard')}</span>}
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `${baseClasses} ${paddingClasses} ${isActive ? active : inactive} ${!desktopOpen ? 'justify-center' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-md`
          }
          title={!desktopOpen ? t('sidebar.chat') : ""}
        >
          <MessageSquare size={18} />
          {desktopOpen && <span>{t('sidebar.chat')}</span>}
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            `${baseClasses} ${paddingClasses} ${isActive ? active : inactive} ${!desktopOpen ? 'justify-center' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-md`
          }
          title={!desktopOpen ? t('sidebar.events') : ""}
        >
          <Table size={18} />
          {desktopOpen && <span>{t('sidebar.events')}</span>}
        </NavLink>
      </nav>
      {user && (
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          {desktopOpen && (
            <div className="px-4 py-2 mb-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {t('sidebar.hello')}, <strong className="text-gray-700 dark:text-gray-300">{user.name}</strong>
              </span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`${baseClasses} ${paddingClasses} ${inactive} w-full ${!desktopOpen ? 'justify-center' : ''} text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-md`}
            title={!desktopOpen ? t('sidebar.logout') : ""}
          >
            <LogOut size={18} />
            {desktopOpen && <span>{t('sidebar.logout')}</span>}
          </button>
        </div>
      )}
    </aside>
  );
}
