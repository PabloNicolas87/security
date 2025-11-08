import {
    Chart,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Radar } from "react-chartjs-2";
  import { useMetrics } from "../../hooks/useMetrics";
  
  Chart.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );
  
  export function RadarChart() {
    const { data, isLoading } = useMetrics();
    if (isLoading) return <p>Carregando gráfico...</p>;
  
    const chartData = {
      labels: data.killChain.map((f: any) => f.fase),
      datasets: [
        {
          label: "Kill Chain",
          data: data.killChain.map((f: any) => f.valor),
          backgroundColor: "rgba(37, 99, 235, 0.2)",
          borderColor: "#2563eb",
          pointBackgroundColor: "#2563eb",
        },
      ],
    };
  
    return <Radar data={chartData} />;
  }
  