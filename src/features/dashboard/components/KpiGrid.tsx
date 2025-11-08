import { KpiCard } from "./KpiCard";
import { useKpis } from "../hooks/useKpis";

export function KpiGrid() {
  const { data, isLoading } = useKpis();

  if (isLoading) return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <KpiCard 
        title="Eventos 24h" 
        value={data.events24h}
        icon="activity"
        color="blue"
      />
      <KpiCard 
        title="Incidentes críticos" 
        value={data.critical24h}
        icon="alert"
        color="red"
      />
      <KpiCard 
        title="Agentes online" 
        value={data.agentsOnline}
        icon="server"
        color="green"
      />
      <KpiCard 
        title="Saúde del sistema" 
        value={data.systemHealth} 
        unit="%"
        icon="heart"
        color="purple"
      />
    </div>
  );
}
