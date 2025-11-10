import { useTranslation } from "react-i18next";
import { LineChart } from "./LineChart";
import { BarChart } from "./BarChart";
import { DonutChart } from "./DonutChart";
import { RadarChart } from "./RadarChart";
import { Card, SkeletonChartsGrid } from "../../../../components/ui";
import { useChartsData } from "../../hooks/useChartsData";

export function ChartsGrid() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useChartsData();

  if (isLoading) return <SkeletonChartsGrid />;
  if (error || !data) return <div className="text-red-500">Error cargando datos</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card 
          className="h-80 shadow-lg border-l-4 border-l-blue-500 dark:border-l-blue-400 overflow-hidden" 
          variant="gradient"
          padding="md"
        >
          <div className="flex flex-col h-full">
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              {t('dashboard.charts.trend')}
            </h2>
            <div className="flex-1 min-h-0">
              <LineChart series={data.series} />
            </div>
          </div>
        </Card>
        <Card 
          className="h-80 shadow-lg border-l-4 border-l-green-500 dark:border-l-green-400 overflow-hidden" 
          variant="gradient"
          padding="md"
        >
          <div className="flex flex-col h-full">
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              {t('dashboard.charts.distribution')}
            </h2>
            <div className="flex-1 min-h-0">
              <BarChart topCategories={data.topCategories} />
            </div>
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card 
          className="h-80 shadow-lg border-l-4 border-l-purple-500 dark:border-l-purple-400 overflow-hidden" 
          variant="gradient"
          padding="md"
        >
          <div className="flex flex-col h-full">
            <div className="mb-2 flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">{t('dashboard.charts.incidentStatus')}</h2>
            </div>
            <div className="flex-1 min-h-0">
              <DonutChart incidentStatus={data.incidentStatus} />
            </div>
          </div>
        </Card>
        <Card 
          className="h-80 shadow-lg border-l-4 border-l-orange-500 dark:border-l-orange-400 overflow-hidden" 
          variant="gradient"
          padding="md"
        >
          <div className="flex flex-col h-full">
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              {t('dashboard.charts.comparative')}
            </h2>
            <div className="flex-1 min-h-0">
              <RadarChart killChain={data.killChain} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
