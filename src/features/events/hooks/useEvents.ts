import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "../../../config/api";
import { withDevDelay } from "../../../shared/utils/devDelay";
import type { EventsResponse } from "../../../types";

export function useEvents(queryParams: string) {
  return useQuery({
    queryKey: ["events", queryParams],
    queryFn: async (): Promise<EventsResponse> => {
      const promise = axios.get(`${API_ENDPOINTS.EVENTS}${queryParams}`);
      const { data, headers } = await withDevDelay(promise, 2000);
      const totalCount = Number(headers["x-total-count"] || 0);
      return { data, totalCount };
    },
  });
}
