import {
    Chart,
    ArcElement,
    Tooltip,
    Legend,
    type ChartOptions,
  } from "chart.js";
  import { Doughnut } from "react-chartjs-2";
  import { useMetrics } from "../../hooks/useMetrics";
  import { useTheme } from "../../../../contexts/ThemeContext";
  
  Chart.register(ArcElement, Tooltip, Legend);
  
  export function DonutChart() {
    const { isDarkMode } = useTheme();
    const { data, isLoading } = useMetrics();
    if (isLoading || !data) return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  
    const textColor = isDarkMode ? "#e5e7eb" : "#374151";
  
    const chartData = {
      labels: data.incidentStatus.map((s: any) => s.status),
      datasets: [
        {
          data: data.incidentStatus.map((s: any) => s.value),
          backgroundColor: ["#3b82f6", "#10b981", "#facc15"],
          borderWidth: 2,
          borderColor: isDarkMode ? "#1f2937" : "#ffffff",
          hoverBorderWidth: 3,
        },
      ],
    };
    const options: ChartOptions<"doughnut"> = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: textColor,
            font: {
              size: 13,
              weight: 500,
            },
            padding: 15,
            usePointStyle: true,
            pointStyle: "circle",
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
          displayColors: true,
          callbacks: {
            label: function(context: any) {
              const label = context.label || '';
              const value = context.parsed || 0;
              const total = (context.dataset.data as number[]).reduce((a: number, b: number) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        },
      },
    };

    const total = data.incidentStatus.reduce((sum: number, item: any) => sum + item.value, 0);
    const stats = data.incidentStatus.map((item: any) => ({
      status: item.status,
      value: item.value,
      percentage: ((item.value / total) * 100).toFixed(1),
      color: item.status === "Ativo" ? "#3b82f6" : item.status === "Resolvido" ? "#10b981" : "#facc15"
    }));
  
    return (
      <div className="flex flex-col h-full w-full overflow-hidden">
        <div className="grid grid-cols-3 gap-1 mb-2 pb-2 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          {stats.map((stat: any, index: number) => (
            <div key={index} className="text-center p-1 bg-gray-50 dark:bg-gray-800 rounded text-xs">
              <div className="flex items-center justify-center mb-1">
                <div 
                  className="w-2 h-2 rounded-full mr-1"
                  style={{ backgroundColor: stat.color }}
                />
                <span className="font-medium text-gray-600 dark:text-gray-400 truncate text-xs">
                  {stat.status}
                </span>
              </div>
              <p className="font-bold text-gray-800 dark:text-gray-100 text-xs">
                {stat.value}
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-xs">
                {stat.percentage}%
              </p>
            </div>
          ))}
        </div>

        <div className="flex-1 min-h-0 flex items-center justify-center w-full overflow-hidden">
          <div className="w-32 h-32">
            <Doughnut data={chartData} options={options} />
          </div>
        </div>
      </div>
    );
  }
  