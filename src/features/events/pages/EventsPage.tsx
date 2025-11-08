import { EventFilters } from "../components/EventFilters";
import { EventsTable } from "../components/EventsTable";
import { PaginationControls } from "../components/PaginationControls";
import { EventDetailsDrawer } from "../components/EventDetailsDrawer";
import { useEvents } from "../hooks/useEvents";
import { useEventFilters } from "../hooks/useEventFilters";
import { useSelectedEvent } from "../hooks/useSelectedEvent";

export function EventsPage() {
  const filters = useEventFilters();
  const queryParams = filters.buildQueryParams();
  const { data, isLoading } = useEvents(queryParams);
  const { selectedEvent, openEvent, closeEvent } = useSelectedEvent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Eventos
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Monitoreo y gestión de eventos de seguridad
            </p>
          </div>
          <div className="mt-4 sm:mt-0 text-sm text-gray-500 dark:text-gray-400">
            Total: <span className="font-bold text-gray-900 dark:text-white">{data?.totalCount || 0}</span>
          </div>
        </div>

        {/* Filters Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <EventFilters
            query={filters.query}
            setQuery={filters.setQuery}
            severity={filters.severity}
            setSeverity={filters.setSeverity}
          />
        </div>

        {/* Table Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <EventsTable
            data={data?.data || []}
            isLoading={isLoading}
            onSelect={openEvent}
          />
        </div>

        {/* Pagination Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <PaginationControls
            page={filters.page}
            setPage={filters.setPage}
            totalCount={data?.totalCount || 0}
            pageSize={filters.pageSize}
          />
        </div>

        {/* 🔹 Drawer lateral */}
        <EventDetailsDrawer event={selectedEvent} onClose={closeEvent} />
      </div>
    </div>
  );
}
