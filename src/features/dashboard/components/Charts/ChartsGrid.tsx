import { LineChart } from "./LineChart";
import { BarChart } from "./BarChart";
import { DonutChart } from "./DonutChart";
import { RadarChart } from "./RadarChart";

export function ChartsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <LineChart />
      </div>
      <div className="bg-white p-4 rounded-xl shadow">
        <BarChart />
      </div>
      <div className="bg-white p-4 rounded-xl shadow">
        <DonutChart />
      </div>
      <div className="bg-white p-4 rounded-xl shadow">
        <RadarChart />
      </div>
    </div>
  );
}
