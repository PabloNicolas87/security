import {
    Chart,
    ArcElement,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Doughnut } from "react-chartjs-2";
  import { useMetrics } from "../../hooks/useMetrics";
  
  Chart.register(ArcElement, Tooltip, Legend);
  
  export function DonutChart() {
    const { data, isLoading } = useMetrics();
    if (isLoading) return <p>Carregando gráfico...</p>;
  
    const chartData = {
      labels: data.incidentStatus.map((s: any) => s.status),
      datasets: [
        {
          data: data.incidentStatus.map((s: any) => s.value),
          backgroundColor: ["#3b82f6", "#10b981", "#facc15"],
          borderWidth: 0,
        },
      ],
    };
  
    return (
      <div className="max-w-xs mx-auto">
        <Doughnut data={chartData} />
      </div>
    );
  }
  