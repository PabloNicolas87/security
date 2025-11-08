import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_CONFIG } from "../../../config/constants";
import type { MetricsData } from "../../../types";

export function useMetrics() {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: async (): Promise<MetricsData> => {
      const { data } = await axios.get(`${API_CONFIG.BASE_URL}/metrics`);
      return data;
    },
  });
}
