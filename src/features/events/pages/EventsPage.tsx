import { useTranslation } from "react-i18next";
import { EventFilters } from "../components/EventFilters";
import { EventsTable } from "../components/EventsTable";
import { PaginationControls } from "../components/PaginationControls";
import { EventDetailsDrawer } from "../components/EventDetailsDrawer";
import { useEvents } from "../hooks/useEvents";
import { useEventFilters } from "../hooks/useEventFilters";
import { useSelectedEvent } from "../hooks/useSelectedEvent";
export function EventsPage() {
  const { t } = useTranslation();
  const filters = useEventFilters();
  const queryParams = filters.buildQueryParams();
  const { data, isLoading } = useEvents(queryParams);
  const { selectedEvent, openEvent, closeEvent } = useSelectedEvent();
  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {t('events.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t('events.subtitle')}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 text-sm text-gray-500 dark:text-gray-400">
              {t('events.total')}: <span className="font-bold text-gray-900 dark:text-white">{data?.totalCount || 0}</span>
            </div>
          </div>
          <div>
            <EventFilters
              query={filters.query}
              setQuery={filters.setQuery}
              severity={filters.severity}
              setSeverity={filters.setSeverity}
            />
          </div>
          <div>
            <EventsTable
              data={data?.data || []}
              isLoading={isLoading}
              onSelect={openEvent}
            />
          </div>
          <div>
            <PaginationControls
              page={filters.page}
              setPage={filters.setPage}
              totalCount={data?.totalCount || 0}
              pageSize={filters.pageSize}
            />
          </div>
        </div>
      </div>
      {selectedEvent && <EventDetailsDrawer event={selectedEvent} onClose={closeEvent} />}
    </div>
  );
}
