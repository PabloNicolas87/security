import { KpiCard } from "./KpiCard";
import { useKpis } from "../hooks/useKpis";
import { useTranslation } from "react-i18next";
import { SkeletonKpiGrid } from "../../../components/ui";
export function KpiGrid() {
  const { data, isLoading } = useKpis();
  const { t } = useTranslation();
  if (isLoading) return <SkeletonKpiGrid count={4} />;
  if (!data) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <KpiCard 
        title={t('dashboard.kpis.events24h')}
        value={data.events24h}
        icon="activity"
        color="blue"
      />
      <KpiCard 
        title={t('dashboard.kpis.critical24h')}
        value={data.critical24h}
        icon="alert"
        color="red"
      />
      <KpiCard 
        title={t('dashboard.kpis.agentsOnline')}
        value={data.agentsOnline}
        icon="server"
        color="green"
      />
      <KpiCard 
        title={t('dashboard.kpis.systemHealth')}
        value={data.systemHealth} 
        unit="%"
        icon="heart"
        color="purple"
      />
    </div>
  );
}
