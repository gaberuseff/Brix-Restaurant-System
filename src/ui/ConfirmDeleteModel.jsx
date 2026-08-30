import {Button, Modal, Spinner} from "@heroui/react";
import {Delete} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";

function ConfirmDeleteModel({
  open,
  setOpen,
  handleDelete,
  isPending,
  id,
  name,
}) {
  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <Modal.Backdrop variant="blur">
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-danger/10 text-danger">
                <HugeiconsIcon icon={Delete} size={20} />
              </Modal.Icon>
              <Modal.Heading>Confirm Delete</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p className="text-sm text-default-500">
                Are you sure you want to delete <strong>{name}</strong>? This
                action cannot be undone.
              </p>
            </Modal.Body>

            <Modal.Footer className="flex gap-2">
              <Button
                className="w-full"
                variant="outline"
                isDisabled={isPending}
                onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                className="w-full"
                variant="danger"
                isDisabled={isPending}
                onClick={() => {
                  handleDelete(id);
                }}>
                {isPending ? <Spinner size="sm" /> : "Confirm Delete"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

export default ConfirmDeleteModel;
