interface Props {
  data: any[];
  isLoading: boolean;
  onSelect: (event: any) => void;
}

export function EventsTable({ data, isLoading, onSelect }: Props) {
  if (isLoading) return <p>Carregando eventos...</p>;
  if (!data || data.length === 0) return <p>Nenhum evento encontrado.</p>;

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm font-medium text-gray-700">
            <th className="p-3">Data / Hora</th>
            <th className="p-3">Severidade</th>
            <th className="p-3">Fonte</th>
            <th className="p-3">Descrição</th>
          </tr>
        </thead>
        <tbody>
          {data.map((event) => (
            <tr
              key={event.id}
              onClick={() => onSelect(event)}
              className="hover:bg-gray-50 border-b text-sm cursor-pointer transition"
            >
              <td className="p-3">
                {new Date(event.timestamp).toLocaleString("pt-BR")}
              </td>
              <td className="p-3">{event.severity}</td>
              <td className="p-3">{event.source}</td>
              <td className="p-3">{event.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
