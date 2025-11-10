import { useTheme } from '../../shared/contexts';
import { Moon, Sun } from 'lucide-react';
export function AuthHeader() {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <header className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm h-16 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
          Painel de Segurança
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
          title={isDarkMode ? "Modo claro" : "Modo oscuro"}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}
