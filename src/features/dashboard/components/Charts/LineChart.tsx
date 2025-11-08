import { Line } from "react-chartjs-2";
import { Chart, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

export function LineChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["series"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:4000/metrics");
      return data.series;
    },
  });

  if (isLoading) return <p>Carregando gráfico...</p>;

  const chartData = {
    labels: data.map((d: any) => d.hour),
    datasets: [
      {
        label: "Eventos por hora",
        data: data.map((d: any) => d.events),
        borderColor: "#2563eb",
        backgroundColor: "#2563eb33",
        tension: 0.4,
      },
    ],
  };

  return <Line data={chartData} />;
}
