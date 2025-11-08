import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_CONFIG } from "../../../config/constants";
import type { KPI } from "../../../types";

export function useKpis() {
  return useQuery({
    queryKey: ["kpis"],
    queryFn: async (): Promise<KPI> => {
      const { data } = await axios.get(`${API_CONFIG.BASE_URL}/metrics`);
      return data.kpis;
    },
  });
}
