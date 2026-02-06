import { Dialog, Text, Button, Portal } from "@chakra-ui/react";

interface DeleteConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

export const DeleteConfirm: React.FC<DeleteConfirmProps> = ({
  isOpen,
  onClose,
  onConfirm,
  userName,
}) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(details) => {
        if (!details.open) {
          onClose();
        }
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Confirmar Eliminación</Dialog.Title>
              <Dialog.CloseTrigger />
            </Dialog.Header>
            <Dialog.Body>
              <Text>
                ¿Estás seguro de que deseas eliminar al usuario{" "}
                <strong>{userName}</strong>? Esta acción no se puede deshacer.
              </Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button colorPalette="red" onClick={onConfirm}>
                Eliminar
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
