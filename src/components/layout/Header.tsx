import { useTheme, useSidebar } from '../../shared/contexts';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Menu, Globe } from 'lucide-react';
import { useState } from 'react';
export function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  let toggleSidebar: (() => void) | null = null;
  try {
    const sidebar = useSidebar();
    toggleSidebar = sidebar.toggle;
  } catch {
  }
  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    setShowLanguageMenu(false);
  };
  return (
    <header className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm h-16 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-3">
        {toggleSidebar && (
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            title={t('header.openMenu')}
          >
            <Menu size={20} />
          </button>
        )}
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
          {t('header.title')}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            title={t('common.language')}
          >
            <Globe size={20} />
            <span className="text-xs font-semibold">{i18n.language.toUpperCase().slice(0, 2)}</span>
          </button>
          {showLanguageMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-50">
              <button
                onClick={() => changeLanguage('pt-BR')}
                className={`w-full text-left px-4 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-inset ${
                  i18n.language === 'pt-BR'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                Português (BR)
              </button>
              <button
                onClick={() => changeLanguage('en-US')}
                className={`w-full text-left px-4 py-2 text-sm transition-colors rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-inset ${
                  i18n.language === 'en-US'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                English (US)
              </button>
            </div>
          )}
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          title={isDarkMode ? t('header.lightMode') : t('header.darkMode')}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}
