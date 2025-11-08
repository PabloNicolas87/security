import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:4000";

export function useMetrics() {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/metrics`);
      return data;
    },
  });
}
