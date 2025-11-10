import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "../../../components/ui";
import type { SecurityEvent } from "../../../types";
interface Props {
  event: SecurityEvent | null;
  onClose: () => void;
}
export function EventDetailsDrawer({ event, onClose }: Props) {
  const { t } = useTranslation();
  const drawerRef = useRef<HTMLDivElement>(null);
  if (!event) return null;
  const titleId = `drawer-title-${event.id}`;
  const descriptionId = `drawer-description-${event.id}`;
  useEffect(() => {
    const previousFocusedElement = document.activeElement as HTMLElement;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      previousFocusedElement?.focus();
    };
  }, [onClose]);
  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col overflow-hidden animate-slide-in-right"
      >
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-shrink-0">
          <h2 id={titleId} className="text-xl font-bold text-gray-900 dark:text-white">
            {t('events.details.title')}
          </h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={t('common.close')}
          >
            <X size={24} />
          </Button>
        </div>
        <p id={descriptionId} className="sr-only">
          Detalhes completos do evento de segurança #{event.id}
        </p>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-6">
            <div className="pb-4 border-b border-gray-100 dark:border-gray-800">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                {t('events.details.datetime')}
              </label>
              <p className="text-sm text-gray-900 dark:text-gray-100 mt-2 font-medium">
                {new Date(event.timestamp).toLocaleString("pt-BR")}
              </p>
            </div>
            <div className="pb-4 border-b border-gray-100 dark:border-gray-800">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                {t('events.details.severity')}
              </label>
              <p className="text-sm text-gray-900 dark:text-gray-100 mt-2 font-medium">{event.severity}</p>
            </div>
            <div className="pb-4 border-b border-gray-100 dark:border-gray-800">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                {t('events.details.source')}
              </label>
              <p className="text-sm text-gray-900 dark:text-gray-100 mt-2 font-medium">{event.source}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                {t('events.details.description')}
              </label>
              <p className="text-sm text-gray-900 dark:text-gray-100 mt-2 leading-relaxed">{event.description}</p>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex-shrink-0">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            ID do Evento: <code className="font-mono">{event.id}</code>
          </p>
        </div>
      </div>
    </>
  );
}
