import { Table, TableHeader, TableRow, TableCell, TableHead, Card } from "../../../components/ui";
import type { SecurityEvent } from "../../../types";

interface Props {
  data: SecurityEvent[];
  isLoading: boolean;
  onSelect: (event: SecurityEvent) => void;
}

export function EventsTable({ data, isLoading, onSelect }: Props) {
  if (isLoading) 
    return (
      <Card variant="gradient" className="border-l-4 border-l-green-500" hover={false}>
        <p className="text-gray-700 dark:text-gray-300">Carregando eventos...</p>
      </Card>
    );
  
  if (!data || data.length === 0) 
    return (
      <Card variant="gradient" className="border-l-4 border-l-green-500" hover={false}>
        <p className="text-gray-700 dark:text-gray-300">Nenhum evento encontrado.</p>
      </Card>
    );

  return (
    <Card variant="gradient" className="border-l-4 border-l-green-500 overflow-hidden" hover={false}>
      <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Eventos
        </h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data / Hora</TableHead>
              <TableHead>Severidade</TableHead>
              <TableHead>Fonte</TableHead>
              <TableHead>Descrição</TableHead>
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
