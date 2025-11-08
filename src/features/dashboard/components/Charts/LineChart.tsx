import { Line } from "react-chartjs-2";
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTheme } from "../../../../contexts/ThemeContext";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

export function LineChart() {
  const { isDarkMode } = useTheme();
  const { data, isLoading } = useQuery({
    queryKey: ["series"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:4000/metrics");
      return data.series;
    },
  });

  if (isLoading) return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  const textColor = isDarkMode ? "#e5e7eb" : "#374151";
  const gridColor = isDarkMode ? "#374151" : "#e5e7eb";

  const chartData = {
    labels: data.map((d: any) => d.hour),
    datasets: [
      {
        label: "Eventos por hora",
        data: data.map((d: any) => d.events),
        borderColor: "#2563eb",
        backgroundColor: "#2563eb33",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#2563eb",
        pointBorderColor: isDarkMode ? "#1f2937" : "#ffffff",
        pointBorderWidth: 2,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: textColor,
          font: {
            size: 12,
            weight: "bold",
          },
          padding: 15,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: isDarkMode ? "#374151" : "#ffffff",
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: isDarkMode ? "#4b5563" : "#e5e7eb",
        borderWidth: 1,
        padding: 12,
        titleFont: { weight: "bold", size: 14 },
        bodyFont: { size: 12 },
        callbacks: {
          afterLabel: function(context: any) {
            const prev = context.dataIndex > 0 ? context.dataset.data[context.dataIndex - 1] : context.parsed.y;
            const current = context.parsed.y;
            const change = ((current - prev) / prev * 100).toFixed(1);
            return `Cambio: ${change}%`;
          }
        }
      },
      filler: {
        propagate: true,
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColor,
          font: {
            size: 11,
          },
        },
        grid: {
          color: gridColor,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: textColor,
          font: {
            size: 11,
          },
        },
        grid: {
          color: gridColor,
          drawBorder: false,
        },
        beginAtZero: true,
      },
    },
  };

  const maxEvents = Math.max(...data.map((d: any) => d.events));
  const minEvents = Math.min(...data.map((d: any) => d.events));
  const avgEvents = (data.reduce((sum: number, d: any) => sum + d.events, 0) / data.length).toFixed(0);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden items-center justify-center">
      {/* Stats row - comprimido */}
      <div className="grid grid-cols-3 gap-1 mb-2 pb-2 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 w-full">
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Máx</p>
          <p className="text-xs font-bold text-blue-600 dark:text-blue-400">{maxEvents}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Prom</p>
          <p className="text-xs font-bold text-green-600 dark:text-green-400">{avgEvents}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Mín</p>
          <p className="text-xs font-bold text-orange-600 dark:text-orange-400">{minEvents}</p>
        </div>
      </div>

      {/* Chart - contenedor estricto centrado */}
      <div className="flex-1 min-h-0 w-full flex items-center justify-center">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
