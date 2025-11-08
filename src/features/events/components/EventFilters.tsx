interface Props {
    query: string;
    setQuery: (v: string) => void;
    severity: string;
    setSeverity: (v: string) => void;
  }
  
  export function EventFilters({ query, setQuery, severity, setSeverity }: Props) {
    return (
      <div className="flex flex-wrap gap-4 items-end bg-white p-4 rounded-xl shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Busca</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar descrição, fonte..."
            className="border p-2 rounded w-64"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Severidade</label>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Todas</option>
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>
        </div>
      </div>
    );
  }
  