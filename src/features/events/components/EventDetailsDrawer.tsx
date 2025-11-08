import { X } from "lucide-react";
import { useEffect } from "react";

interface Props {
  event: any;
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
      <div className="bg-white w-96 h-full shadow-xl p-6 animate-slide-in relative">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Detalhes do Evento
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-2 text-sm">
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
      </div>
    </div>
  );
}
