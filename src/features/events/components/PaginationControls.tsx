import { Button, Card } from "../../../components/ui";

interface Props {
    page: number;
    setPage: (v: number) => void;
    totalCount: number;
    pageSize: number;
  }
  
  export function PaginationControls({ page, setPage, totalCount, pageSize }: Props) {
    const totalPages = Math.ceil(totalCount / pageSize);
  
    return (
      <Card variant="gradient" className="border-l-4 border-l-purple-500" hover={false}>
        <div className="mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            Navegação
          </h3>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Página <span className="font-semibold">{page}</span> de <span className="font-semibold">{totalPages}</span>
          </span>
          <div className="flex gap-2">
            <Button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              variant="secondary"
              size="sm"
            >
              ← Anterior
            </Button>
            <Button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              variant="secondary"
              size="sm"
            >
              Próxima →
            </Button>
          </div>
        </div>
      </Card>
    );
  }
  