import {
  Button,
  Label,
  ListBox,
  Modal,
  Select,
  Spinner,
  Surface,
  toast,
} from "@heroui/react";
import {Plus} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import useModifireGroups from "../modifires/useModifireGroups";
import useConnectModifierGroup from "./useConnectModifierGroup";
import useMenuItem from "./useMenuItem";
import useUpdateConnectedModifierGroup from "./useUpdateConnectedModifierGroup";

function MenuItemModifireGroupsModel({
  connectionToEdit = {},
  isOpen: externalIsOpen,
  onOpenChange: externalOnOpenChange,
}) {
  const {id} = useParams();
  const isEditSession = Boolean(
    connectionToEdit?.connectionId || connectionToEdit?.id,
  );
  const connectionId = connectionToEdit?.connectionId || connectionToEdit?.id;
  const currentGroupId = connectionToEdit?.modifier_group_id;

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const {modifierGroups: connectedGroups = []} = useMenuItem(id);
  const {modifierGroups = [], isModifierGroupsPending} = useModifireGroups();
  const {connectModifierGroup, isConnecting} = useConnectModifierGroup();
  const {updateConnectedModifierGroup, isUpdating} =
    useUpdateConnectedModifierGroup();

  const isWorking = isConnecting || isUpdating;

  const editValues = {
    modifier_group_id: currentGroupId ? String(currentGroupId) : "",
  };

  const defaultValues = {
    modifier_group_id: "",
  };

  const {handleSubmit, control, reset, setError} = useForm({
    defaultValues: isEditSession ? editValues : defaultValues,
  });

  useEffect(() => {
    if (isOpen) {
      reset(isEditSession ? editValues : defaultValues);
    }
  }, [isOpen, isEditSession, currentGroupId]);

  const handleOpenChange = (open) => {
    if (externalOnOpenChange) {
      externalOnOpenChange(open);
    } else {
      setInternalIsOpen(open);
    }
    if (!open) {
      reset(isEditSession ? editValues : defaultValues);
    }
  };

  function onSubmit(data) {
    if (!data.modifier_group_id) return;

    const selectedGroupId = String(data.modifier_group_id);

    const isAlreadyConnected = connectedGroups.some((item) => {
      const itemGroupId = String(
        item.modifier_group_id || item.modifier_groups?.id,
      );
      const itemConnectionId = item.id;

      if (isEditSession && String(itemConnectionId) === String(connectionId)) {
        return false;
      }
      return itemGroupId === selectedGroupId;
    });

    if (isAlreadyConnected) {
      setError("modifier_group_id", {
        type: "manual",
        message: "This modifier group is already connected to this menu item",
      });
      toast.warning(
        "This modifier group is already connected to this menu item",
      );
      return;
    }

    if (isEditSession) {
      updateConnectedModifierGroup(
        {
          connectionId,
          product_id: id,
          old_modifier_group_id: currentGroupId,
          new_modifier_group_id: data.modifier_group_id,
        },
        {
          onSuccess: () => {
            handleOpenChange(false);
          },
        },
      );
    } else {
      connectModifierGroup(
        {
          product_id: id,
          modifier_group_id: data.modifier_group_id,
        },
        {
          onSuccess: () => {
            handleOpenChange(false);
          },
        },
      );
    }
  }

  const formId = `connect-modifier-group-form-${isEditSession ? connectionId : "new"}`;

  return (
    <>
      {externalIsOpen === undefined && (
        <Button onClick={() => setInternalIsOpen(true)}>
          <HugeiconsIcon icon={Plus} />
          Connect a Modifier Group
        </Button>
      )}

      <Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
        <Modal.Backdrop variant="blur">
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>
                  {isEditSession
                    ? "Edit Connected Modifier Group"
                    : "Connect a Modifier Group"}
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <Surface variant="default">
                  <form
                    id={formId}
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4">
                    <Controller
                      name="modifier_group_id"
                      control={control}
                      rules={{required: "Please select a modifier group"}}
                      render={({field, fieldState: {error}}) => (
                        <div className="space-y-1">
                          <Select
                            variant="secondary"
                            className="w-full"
                            isRequired
                            isDisabled={isModifierGroupsPending || isWorking}
                            isInvalid={Boolean(error)}
                            selectedKey={
                              field.value ? String(field.value) : null
                            }
                            onSelectionChange={(key) => field.onChange(key)}>
                            <Label>Modifier Group</Label>
                            <Select.Trigger className="w-full">
                              <Select.Value placeholder="Select group to connect" />
                              <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                              <ListBox>
                                {modifierGroups?.map((group) => (
                                  <ListBox.Item
                                    key={group.id}
                                    id={String(group.id)}
                                    textValue={group.name_en}>
                                    {group.name_en} ({group.name_ar})
                                    <ListBox.ItemIndicator />
                                  </ListBox.Item>
                                ))}
                              </ListBox>
                            </Select.Popover>
                          </Select>
                          {error && (
                            <p className="text-xs text-danger">
                              {error.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </form>
                </Surface>
              </Modal.Body>
              <Modal.Footer className="flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  isDisabled={isWorking}
                  onClick={() => handleOpenChange(false)}>
                  Cancel
                </Button>
                <Button
                  form={formId}
                  type="submit"
                  isDisabled={isWorking || isModifierGroupsPending}
                  isLoading={isWorking}>
                  {isWorking
                    ? isEditSession
                      ? "Updating..."
                      : "Connecting..."
                    : isEditSession
                      ? "Update Group"
                      : "Connect Group"}
                  {isWorking && <Spinner size="sm" />}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}

export default MenuItemModifireGroupsModel;
