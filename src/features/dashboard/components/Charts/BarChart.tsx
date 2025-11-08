import {
    Chart,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Bar } from "react-chartjs-2";
  import { useMetrics } from "../../hooks/useMetrics";
  
  Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  
  export function BarChart() {
    const { data, isLoading } = useMetrics();
    if (isLoading) return <p>Carregando gráfico...</p>;
  
    const chartData = {
      labels: data.topCategories.map((c: any) => c.category),
      datasets: [
        {
          label: "Top Categorias",
          data: data.topCategories.map((c: any) => c.count),
          backgroundColor: ["#2563eb", "#10b981", "#f59e0b", "#ef4444"],
        },
      ],
    };
  
    return <Bar data={chartData} />;
  }
  