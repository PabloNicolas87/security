import { X } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../../../components/ui";
import type { SecurityEvent } from "../../../types";

interface Props {
  event: SecurityEvent | null;
  onClose: () => void;
}

export function EventDetailsDrawer({ event, onClose }: Props) {
  if (!event) return null;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="h-full bg-white dark:bg-gray-900 flex flex-col overflow-hidden animate-drawer-enter">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-shrink-0">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Detalhes do Evento
        </h2>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Fechar"
        >
          <X size={24} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-6">
          <div className="pb-4 border-b border-gray-100 dark:border-gray-800">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Data/Hora
            </label>
            <p className="text-sm text-gray-900 dark:text-gray-100 mt-2 font-medium">
              {new Date(event.timestamp).toLocaleString("pt-BR")}
            </p>
          </div>

          <div className="pb-4 border-b border-gray-100 dark:border-gray-800">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Severidade
            </label>
            <p className="text-sm text-gray-900 dark:text-gray-100 mt-2 font-medium">{event.severity}</p>
          </div>

          <div className="pb-4 border-b border-gray-100 dark:border-gray-800">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Fonte
            </label>
            <p className="text-sm text-gray-900 dark:text-gray-100 mt-2 font-medium">{event.source}</p>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Descrição
            </label>
            <p className="text-sm text-gray-900 dark:text-gray-100 mt-2 leading-relaxed">{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
