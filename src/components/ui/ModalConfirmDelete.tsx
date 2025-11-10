import { useTranslation } from "react-i18next";
import { Modal } from "./Modal";
import { Button } from "./Button";
interface ModalConfirmDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  itemName?: string;
  isLoading?: boolean;
}
export function ModalConfirmDelete({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  itemName,
  isLoading = false,
}: ModalConfirmDeleteProps) {
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      isDangerous={true}
    >
      <div className="space-y-4">
        <p className="text-gray-700 dark:text-gray-300">
          {description}
        </p>
        {itemName && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
            <p className="text-sm text-red-800 dark:text-red-200">
              <strong>Item:</strong> {itemName}
            </p>
          </div>
        )}
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
          <p className="text-sm text-yellow-800 dark:text-yellow-200 flex items-start gap-2">
            <span className="text-lg">⚠️</span>
            <span>Essa ação não pode ser desfeita. Por favor, confirme.</span>
          </p>
        </div>
        <div className="flex gap-3 justify-end pt-4">
          <Button
            onClick={onClose}
            variant="secondary"
            disabled={isLoading}
            aria-label="Cancelar exclusão e fechar diálogo"
          >
            {t('common.cancel')}
          </Button>
          <Button
            onClick={onConfirm}
            variant="danger"
            isLoading={isLoading}
            disabled={isLoading}
            aria-label={`Confirmar exclusão permanente${itemName ? ` de ${itemName}` : ''}`}
          >
            {t('common.delete')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
ModalConfirmDelete.displayName = "ModalConfirmDelete";
