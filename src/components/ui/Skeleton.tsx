interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  circle?: boolean;
}
export function Skeleton({ 
  className = '', 
  width = '100%', 
  height = '1rem',
  circle = false 
}: SkeletonProps) {
  return (
    <div
      className={`
        animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 
        dark:from-gray-700 dark:via-gray-600 dark:to-gray-700
        rounded ${circle ? 'rounded-full' : ''}
        ${className}
      `}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  );
}
interface SkeletonCardProps {
  className?: string;
  withImage?: boolean;
  lines?: number;
}
export function SkeletonCard({ className = '', withImage = false, lines = 3 }: SkeletonCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-4 space-y-4 ${className}`}>
      {withImage && <Skeleton height={200} className="rounded mb-4" />}
      <div className="space-y-2">
        <Skeleton height={24} className="w-3/4" />
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            height={16}
            className={i === lines - 1 ? 'w-1/2' : 'w-full'}
          />
        ))}
      </div>
    </div>
  );
}
interface SkeletonKpiCardProps {
  className?: string;
}
export function SkeletonKpiCard({ className = '' }: SkeletonKpiCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border-l-4 border-l-gray-300 dark:border-l-gray-600 p-6 space-y-4 min-h-32 ${className}`}>
      <div className="flex items-start justify-between">
        <Skeleton height={20} className="w-1/2" />
        <Skeleton width={40} height={40} circle />
      </div>
      <div className="space-y-2">
        <Skeleton height={32} className="w-1/3" />
        <Skeleton height={16} className="w-1/4" />
      </div>
    </div>
  );
}
interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  className?: string;
}
export function SkeletonTable({ rows = 5, columns = 4, className = '' }: SkeletonTableProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden ${className}`}>
      <div className="grid gap-4 p-4 border-b border-gray-200 dark:border-gray-700" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={`header-${i}`} height={20} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div
          key={`row-${rowIdx}`}
          className="grid gap-4 p-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, colIdx) => (
            <Skeleton key={`cell-${rowIdx}-${colIdx}`} height={16} />
          ))}
        </div>
      ))}
    </div>
  );
}
interface SkeletonListProps {
  items?: number;
  className?: string;
}
export function SkeletonList({ items = 5, className = '' }: SkeletonListProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg">
          <Skeleton width={40} height={40} circle />
          <div className="flex-1 space-y-2">
            <Skeleton height={16} className="w-1/2" />
            <Skeleton height={12} className="w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
interface SkeletonGridProps {
  items?: number;
  columns?: number;
  className?: string;
}
export function SkeletonGrid({ items = 6, columns = 3, className = '' }: SkeletonGridProps) {
  return (
    <div
      className={`gap-4 ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${100 / columns}%, 1fr))`,
      }}
    >
      {Array.from({ length: items }).map((_, i) => (
        <SkeletonCard key={i} lines={2} />
      ))}
    </div>
  );
}
interface SkeletonKpiGridProps {
  count?: number;
  className?: string;
}
export function SkeletonKpiGrid({ count = 4, className = '' }: SkeletonKpiGridProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonKpiCard key={i} />
      ))}
    </div>
  );
}
interface SkeletonChartCardProps {
  className?: string;
}
export function SkeletonChartCard({ className = '' }: SkeletonChartCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border-l-4 border-l-gray-300 dark:border-l-gray-600 p-4 h-80 space-y-4 ${className}`}>
      <Skeleton height={24} className="w-1/3" />
      <div className="flex-1 space-y-3">
        <Skeleton height={12} />
        <Skeleton height={12} />
        <Skeleton height={12} />
        <Skeleton height={200} className="mt-4" />
      </div>
    </div>
  );
}
interface SkeletonChartsGridProps {
  className?: string;
}
export function SkeletonChartsGrid({ className = '' }: SkeletonChartsGridProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkeletonChartCard />
        <SkeletonChartCard />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkeletonChartCard />
        <SkeletonChartCard />
      </div>
    </div>
  );
}
