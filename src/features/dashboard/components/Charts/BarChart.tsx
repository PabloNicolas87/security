import {
    Chart,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Bar } from "react-chartjs-2";
  import { useTheme } from "../../../../shared/contexts";
  import type { CategoryData } from "../../../../types";

  Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

  interface BarChartProps {
    topCategories: CategoryData[];
  }

  export function BarChart({ topCategories }: BarChartProps) {
    const { isDarkMode } = useTheme();
    const textColor = isDarkMode ? "#e5e7eb" : "#374151";
    const gridColor = isDarkMode ? "#374151" : "#e5e7eb";
    const colors = ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
    const chartData = {
      labels: topCategories.map((c: any) => c.category),
      datasets: [
        {
          label: "Cantidad",
          data: topCategories.map((c: any) => c.count),
          backgroundColor: colors.slice(0, topCategories.length),
          borderRadius: 6,
          borderSkipped: false,
          hoverBackgroundColor: colors.slice(0, topCategories.length).map(c => c + "dd"),
        },
      ],
    };
    const options: any = {
      responsive: true,
      maintainAspectRatio: true,
      indexAxis: "x",
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
              const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
              const percentage = ((context.parsed.y / total) * 100).toFixed(1);
              return `${percentage}% del total`;
            }
          }
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
    const total = topCategories.reduce((sum: number, c: any) => sum + c.count, 0);
    const maxCount = Math.max(...topCategories.map((c: any) => c.count));
    return (
      <div className="flex flex-col h-full w-full overflow-hidden items-center justify-center">
        {}
        <div className="grid grid-cols-2 gap-1 mb-2 pb-2 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 w-full">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Total</p>
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400">{total}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Máx</p>
            <p className="text-xs font-bold text-green-600 dark:text-green-400">{maxCount}</p>
          </div>
        </div>
        {}
        <div className="flex-1 min-h-0 w-full flex items-center justify-center">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    );
  }
