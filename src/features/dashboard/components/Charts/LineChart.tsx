import { Line } from "react-chartjs-2";
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler } from "chart.js";
import { useTheme } from "../../../../shared/contexts";
import { useTranslation } from "react-i18next";
import type { SeriesData } from "../../../../types";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

interface LineChartProps {
  series: SeriesData[];
}

export function LineChart({ series }: LineChartProps) {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();

  const textColor = isDarkMode ? "#e5e7eb" : "#374151";
  const gridColor = isDarkMode ? "#374151" : "#e5e7eb";
  const chartData = {
    labels: series.map((d: any) => d.hour),
    datasets: [
      {
        label: t('dashboard.charts.trend'),
        data: series.map((d: any) => d.events),
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
            return `${t('dashboard.charts.change')}: ${change}%`;
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
  const maxEvents = Math.max(...series.map((d: any) => d.events));
  const minEvents = Math.min(...series.map((d: any) => d.events));
  const avgEvents = (series.reduce((sum: number, d: any) => sum + d.events, 0) / series.length).toFixed(0);
  return (
    <div className="flex flex-col h-full w-full overflow-hidden items-center justify-center">
      <div className="grid grid-cols-3 gap-1 mb-2 pb-2 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 w-full">
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{t('dashboard.charts.max')}</p>
          <p className="text-xs font-bold text-blue-600 dark:text-blue-400">{maxEvents}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{t('dashboard.charts.avg')}</p>
          <p className="text-xs font-bold text-green-600 dark:text-green-400">{avgEvents}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{t('dashboard.charts.min')}</p>
          <p className="text-xs font-bold text-orange-600 dark:text-orange-400">{minEvents}</p>
        </div>
      </div>
      <div className="flex-1 min-h-0 w-full flex items-center justify-center">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
