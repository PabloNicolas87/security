import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "../../../config/api";
import type { MetricsData } from "../../../types";
import { addDevDelay } from "../../../shared/utils";

export function useMetrics() {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: async (): Promise<MetricsData> => {
      const { data } = await axios.get(API_ENDPOINTS.METRICS);
      await addDevDelay(2000);
      return data;
    },
  });
}
