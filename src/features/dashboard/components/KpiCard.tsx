interface KpiCardProps {
    title: string;
    value: number | string;
    unit?: string;
  }
  
  export function KpiCard({ title, value, unit }: KpiCardProps) {
    return (
      <div className="bg-white rounded-xl shadow p-4 text-center">
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-2xl font-semibold mt-1">
          {value}
          {unit && <span className="text-sm ml-1">{unit}</span>}
        </p>
      </div>
    );
  }
  