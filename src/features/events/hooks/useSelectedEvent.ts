import { useState } from "react";
import type { SecurityEvent } from "../../../types";

export function useSelectedEvent() {
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(null);

  const openEvent = (event: SecurityEvent) => setSelectedEvent(event);
  const closeEvent = () => setSelectedEvent(null);

  return { selectedEvent, openEvent, closeEvent };
}
