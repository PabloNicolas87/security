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
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Eventos</h1>
      <EventFilters
        query={filters.query}
        setQuery={filters.setQuery}
        severity={filters.severity}
        setSeverity={filters.setSeverity}
      />
      <EventsTable
        data={data?.data || []}
        isLoading={isLoading}
        onSelect={openEvent}
      />
      <PaginationControls
        page={filters.page}
        setPage={filters.setPage}
        totalCount={data?.totalCount || 0}
        pageSize={filters.pageSize}
      />

      {/* 🔹 Drawer lateral */}
      <EventDetailsDrawer event={selectedEvent} onClose={closeEvent} />
    </div>
  );
}
