import { useTranslation } from "react-i18next";
import { Table, TableHeader, TableRow, TableCell, TableHead, Card, SkeletonTable } from "../../../components/ui";
import type { SecurityEvent } from "../../../types";
interface Props {
  data: SecurityEvent[];
  isLoading: boolean;
  onSelect: (event: SecurityEvent) => void;
}
export function EventsTable({ data, isLoading, onSelect }: Props) {
  const { t } = useTranslation();
  if (isLoading) 
    return (
      <Card variant="gradient" className="border-l-4 border-l-green-500" hover={false}>
        <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            {t('events.title')}
          </h3>
        </div>
        <SkeletonTable rows={5} columns={4} />
      </Card>
    );
  if (!data || data.length === 0) 
    return (
      <Card variant="gradient" className="border-l-4 border-l-green-500" hover={false}>
        <p className="text-gray-700 dark:text-gray-300">{t('events.noResults')}</p>
      </Card>
    );
  return (
    <Card variant="gradient" className="border-l-4 border-l-green-500 overflow-hidden" hover={false}>
      <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          {t('events.title')}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('events.table.datetime')}</TableHead>
              <TableHead>{t('events.table.severity')}</TableHead>
              <TableHead>{t('events.table.source')}</TableHead>
              <TableHead>{t('events.table.description')}</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {data.map((event) => (
              <TableRow
                key={event.id}
                onClick={() => onSelect(event)}
                hover
              >
                <TableCell>{new Date(event.timestamp).toLocaleString("pt-BR")}</TableCell>
                <TableCell>{event.severity}</TableCell>
                <TableCell>{event.source}</TableCell>
                <TableCell>{event.description}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </div>
    </Card>
  );
}
