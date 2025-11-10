import { useTranslation } from "react-i18next";
import { KpiGrid } from "../components/KpiGrid";
import { ChartsGrid } from "../components/Charts/ChartsGrid";
export function DashboardPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 lg:px-8 space-y-8">
        {}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {t('dashboard.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('dashboard.subtitle')}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 text-sm text-gray-500 dark:text-gray-400">
            {t('dashboard.updated')}
          </div>
        </div>
        {}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <KpiGrid />
        </div>
        {}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t('dashboard.analysis')}
          </h2>
          <ChartsGrid />
        </div>
      </div>
    </div>
  );
}
