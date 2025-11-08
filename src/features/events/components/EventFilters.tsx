import { Input, Select, Card } from "../../../components/ui";

interface Props {
    query: string;
    setQuery: (v: string) => void;
    severity: string;
    setSeverity: (v: string) => void;
  }
  
  export function EventFilters({ query, setQuery, severity, setSeverity }: Props) {
    return (
      <Card 
        className="shadow-lg border-l-4 border-l-blue-500 dark:border-l-blue-400" 
        variant="gradient"
        padding="lg"
        hover={false}
      >
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          Filtros
        </h2>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="w-64">
            <Input
              label="Busca"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar descrição, fonte..."
            />
          </div>
    
          <div className="w-48">
            <Select
              label="Severidade"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              options={[
                { value: "", label: "Todas" },
                { value: "Alta", label: "Alta" },
                { value: "Média", label: "Média" },
                { value: "Baixa", label: "Baixa" },
              ]}
            />
          </div>
        </div>
      </Card>
    );
  }
  