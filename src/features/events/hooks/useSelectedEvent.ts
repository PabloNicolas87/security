import { useState } from "react";

export function useSelectedEvent() {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const openEvent = (event: any) => setSelectedEvent(event);
  const closeEvent = () => setSelectedEvent(null);

  return { selectedEvent, openEvent, closeEvent };
}
