import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_CONFIG } from "../../../config/constants";
import type { EventsResponse } from "../../../types";

export function useEvents(queryParams: string) {
  return useQuery({
    queryKey: ["events", queryParams],
    queryFn: async (): Promise<EventsResponse> => {
      const { data, headers } = await axios.get(`${API_CONFIG.BASE_URL}/events${queryParams}`);
      const totalCount = Number(headers["x-total-count"] || 0);
      return { data, totalCount };
    },
  });
}
