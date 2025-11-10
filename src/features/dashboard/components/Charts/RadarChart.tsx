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
  import { useTheme } from "../../../../shared/contexts";
  import type { KillChain } from "../../../../types";

  Chart.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

  interface RadarChartProps {
    killChain: KillChain[];
  }

  export function RadarChart({ killChain }: RadarChartProps) {
    const { isDarkMode } = useTheme();
    const textColor = isDarkMode ? "#e5e7eb" : "#374151";
    const gridColor = isDarkMode ? "#374151" : "#e5e7eb";
    const chartData = {
      labels: killChain.map((f: any) => f.fase),
      datasets: [
        {
          label: "Kill Chain",
          data: killChain.map((f: any) => f.valor),
          backgroundColor: "rgba(37, 99, 235, 0.15)",
          borderColor: "#2563eb",
          pointBackgroundColor: "#2563eb",
          pointBorderColor: isDarkMode ? "#1f2937" : "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          fill: true,
          tension: 0.4,
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
              const value = context.parsed.r || 0;
              return `Valor: ${value}`;
            }
          }
        },
      },
      scales: {
        r: {
          min: 0,
          ticks: {
            color: textColor,
            font: {
              size: 11,
            },
            backdropColor: "transparent",
          },
          grid: {
            color: gridColor,
          },
          pointLabels: {
            color: textColor,
            font: {
              size: 12,
              weight: "bold",
            },
          },
        },
      },
    };
    const avgValue = (killChain.reduce((sum: number, f: any) => sum + f.valor, 0) / killChain.length).toFixed(1);
    const maxValue = Math.max(...killChain.map((f: any) => f.valor));
    return (
      <div className="flex flex-col h-full w-full overflow-hidden items-center justify-center">
        {}
        <div className="grid grid-cols-2 gap-1 mb-2 pb-2 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 w-full">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Prom</p>
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400">{avgValue}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Máx</p>
            <p className="text-xs font-bold text-green-600 dark:text-green-400">{maxValue}</p>
          </div>
        </div>
        {}
        <div className="flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden">
          <Radar data={chartData} options={options} />
        </div>
      </div>
    );
  }
