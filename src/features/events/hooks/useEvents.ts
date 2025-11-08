import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:4000";

export function useEvents(queryParams: string) {
  return useQuery({
    queryKey: ["events", queryParams],
    queryFn: async () => {
      const { data, headers } = await axios.get(`${API_URL}/events${queryParams}`);
      const totalCount = Number(headers["x-total-count"] || 0);
      return { data, totalCount };
    },
  });
}
