import { useState, useCallback } from "react";
export function useEventFilters() {
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5); 
  const buildQueryParams = useCallback(() => {
    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (severity) params.append("severity", severity);
    params.append("_page", String(page));
    params.append("_limit", String(pageSize));
    return `?${params.toString()}`;
  }, [query, severity, page, pageSize]);
  return {
    query,
    setQuery,
    severity,
    setSeverity,
    page,
    setPage,
    pageSize,
    buildQueryParams,
  };
}
