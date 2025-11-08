import { KpiGrid } from "../components/KpiGrid";
import { ChartsGrid } from "../components/Charts/ChartsGrid";

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Painel de Segurança
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Monitoreo en tiempo real de incidentes y métricas de seguridad
            </p>
          </div>
          <div className="mt-4 sm:mt-0 text-sm text-gray-500 dark:text-gray-400">
            Actualizado hace poco
          </div>
        </div>

        {/* KPI Grid */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <KpiGrid />
        </div>

        {/* Charts Grid */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Análisis Detallado
          </h2>
          <ChartsGrid />
        </div>
      </div>
    </div>
  );
}


