import { KpiGrid } from "../components/KpiGrid";
import { ChartsGrid } from "../components/Charts/ChartsGrid";

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Painel de Segurança</h1>
      <KpiGrid />
      <ChartsGrid />
    </div>
  );
}


