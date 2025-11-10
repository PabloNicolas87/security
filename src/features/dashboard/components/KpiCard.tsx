import { memo } from "react";
import { Card } from "../../../components/ui";
import { Activity, AlertTriangle, Server, Heart } from "lucide-react";
import type { KpiCardProps } from "../../../types";
const iconMap = {
  activity: Activity,
  alert: AlertTriangle,
  server: Server,
  heart: Heart,
};
const colorMap = {
  blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-l-blue-500",
  red: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-l-red-500",
  green: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-l-green-500",
  purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-l-purple-500",
};
export const KpiCard = memo(function KpiCard({ title, value, unit, icon, color = "blue" }: KpiCardProps) {
  const Icon = icon && iconMap[icon];
  return (
    <Card 
      className={`border-l-4 ${colorMap[color]} min-h-32 flex flex-col justify-between`}
      variant="gradient"
      padding="lg"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            {title}
          </h3>
        </div>
        {Icon && (
          <div className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
            <Icon size={20} />
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-gray-900 dark:text-white flex items-baseline gap-1">
          {value}
          {unit && <span className="text-lg font-normal text-gray-500 dark:text-gray-400">{unit}</span>}
        </p>
      </div>
    </Card>
  );
});
