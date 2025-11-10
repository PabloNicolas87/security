import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  isDangerous?: boolean;
  className?: string;
}
export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  isDangerous = false,
  className = "",
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = "modal-title";
  const descriptionId = description ? "modal-description" : undefined;
  useEffect(() => {
    if (!isOpen) return;
    const previousFocusedElement = document.activeElement as HTMLElement;
    setTimeout(() => {
      const closeButton = dialogRef.current?.querySelector(
        'button[aria-label="Fechar diálogo"]'
      ) as HTMLButtonElement;
      closeButton?.focus();
    }, 0);
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusableElements = dialogRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements || focusableElements.length === 0) return;
      const focusableArray = Array.from(focusableElements) as HTMLElement[];
      const firstElement = focusableArray[0];
      const lastElement = focusableArray[focusableArray.length - 1];
      const activeElement = document.activeElement;
      if (e.shiftKey && activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      else if (!e.shiftKey && activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };
    document.addEventListener("keydown", handleEscape);
    dialogRef.current?.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      dialogRef.current?.removeEventListener("keydown", handleKeyDown);
      previousFocusedElement?.focus();
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${className}`}
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex-1 pr-4">
              <h2
                id={titleId}
                className={`text-xl font-bold ${
                  isDangerous
                    ? "text-red-900 dark:text-red-100"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                {title}
              </h2>
              {description && (
                <p id={descriptionId} className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1 flex-shrink-0 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Fechar diálogo"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
          {isDangerous && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-red-50 dark:bg-red-900/20 flex-shrink-0">
              <p className="text-sm text-red-800 dark:text-red-200">
                ⚠️ Esta ação não pode ser desfeita
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
Modal.displayName = "Modal";
