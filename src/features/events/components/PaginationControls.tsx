interface Props {
    page: number;
    setPage: (v: number) => void;
    totalCount: number;
    pageSize: number;
  }
  
  export function PaginationControls({ page, setPage, totalCount, pageSize }: Props) {
    const totalPages = Math.ceil(totalCount / pageSize);
  
    return (
      <div className="flex justify-between items-center text-sm mt-4">
        <span className="text-gray-500">
          Página {page} de {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>
    );
  }
  