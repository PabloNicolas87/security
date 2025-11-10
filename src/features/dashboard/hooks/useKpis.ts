import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "../../../config/api";
import { withDevDelay } from "../../../shared/utils/devDelay";
import type { KPI } from "../../../types";

export function useKpis() {
  return useQuery({
    queryKey: ["kpis"],
    queryFn: async (): Promise<KPI> => {
      const promise = axios.get(API_ENDPOINTS.KPIS);
      const { data } = await withDevDelay(promise, 2000);
      return data.kpis;
    },
  });
}
