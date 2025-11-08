import { KpiCard } from "./KpiCard";
import { useKpis } from "../hooks/useKpis";

export function KpiGrid() {
  const { data, isLoading } = useKpis();

  if (isLoading) return <p>Carregando KPIs...</p>;
  if (!data) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <KpiCard title="Eventos 24h" value={data.events24h} />
      <KpiCard title="Incidentes críticos" value={data.critical24h} />
      <KpiCard title="Agentes online" value={data.agentsOnline} />
      <KpiCard title="Saúde do sistema" value={data.systemHealth} unit="%" />
    </div>
  );
}
