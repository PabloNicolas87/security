import { X } from "lucide-react";
import { useEffect } from "react";
import { Card, Button } from "../../../components/ui";
import type { SecurityEvent } from "../../../types";

interface Props {
  event: SecurityEvent | null;
  onClose: () => void;
}

export function EventDetailsDrawer({ event, onClose }: Props) {
  if (!event) return null;

  // 🔹 Cerrar con tecla Esc (opcional)
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Evita cerrar si el usuario clickeó dentro del panel
    if ((e.target as HTMLElement).id === "drawer-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="drawer-overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 flex justify-end bg-black/40 z-40"
    >
      <Card className="w-96 h-full shadow-xl animate-slide-in relative rounded-none" padding="lg">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Detalhes do Evento
          </h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="p-1"
            aria-label="Fechar"
          >
            <X size={20} />
          </Button>
        </div>

        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Data/Hora:</strong>{" "}
            {new Date(event.timestamp).toLocaleString("pt-BR")}
          </p>
          <p>
            <strong>Severidade:</strong> {event.severity}
          </p>
          <p>
            <strong>Fonte:</strong> {event.source}
          </p>
          <p>
            <strong>Descrição:</strong> {event.description}
          </p>
        </div>
      </Card>
    </div>
  );
}
