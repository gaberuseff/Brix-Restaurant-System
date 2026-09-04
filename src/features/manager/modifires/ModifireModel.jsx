import {
  Button,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  Spinner,
  Surface,
  TextField,
} from "@heroui/react";
import {Plus} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import useCreateModifier from "./useCreateModifier";
import useModifireGroups from "./useModifireGroups";
import useUpdateModifier from "./useUpdateModifier";

const defaultValues = {
  name_en: "",
  name_ar: "",
  price: "",
  modifier_group_id: "",
};

function ModifireModel({
  modifierToEdit = {},
  isOpen: externalIsOpen,
  onOpenChange: externalOnOpenChange,
}) {
  const isEditSession = Boolean(modifierToEdit?.id);

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const {modifierGroups = []} = useModifireGroups();
  const {createMod, isCreating} = useCreateModifier();
  const {updateMod, isUpdating} = useUpdateModifier();
  const isWorking = isCreating || isUpdating;

  const editValues = {
    name_en: modifierToEdit?.name_en || "",
    name_ar: modifierToEdit?.name_ar || "",
    price: modifierToEdit?.price !== undefined ? String(modifierToEdit.price) : "",
    modifier_group_id: modifierToEdit?.modifier_group_id
      ? String(modifierToEdit.modifier_group_id)
      : "",
  };

  const {handleSubmit, control, reset} = useForm({
    defaultValues: isEditSession ? editValues : defaultValues,
  });

  useEffect(() => {
    if (isOpen) {
      reset(isEditSession ? editValues : defaultValues);
    }
  }, [isOpen, isEditSession]);

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
    const payload = {
      name_en: data.name_en?.trim(),
      name_ar: data.name_ar?.trim(),
      price: Number(data.price),
      modifier_group_id: data.modifier_group_id
        ? String(data.modifier_group_id)
        : null,
    };

    if (isEditSession) {
      updateMod(
        {id: modifierToEdit.id, ...payload},
        {
          onSuccess: () => {
            handleOpenChange(false);
          },
        },
      );
    } else {
      createMod(payload, {
        onSuccess: () => {
          reset(defaultValues);
          handleOpenChange(false);
        },
      });
    }
  }

  const formId = `modifier-form-${isEditSession ? modifierToEdit.id : "new"}`;

  return (
    <>
      {externalIsOpen === undefined && (
        <Button className="self-end" onClick={() => setInternalIsOpen(true)}>
          <HugeiconsIcon icon={Plus} />
          Add Modifier
        </Button>
      )}

      <Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
        <Modal.Backdrop variant="blur">
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>
                  {isEditSession ? "Edit Modifier" : "Add Modifier"}
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <Surface variant="default">
                  <form
                    id={formId}
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4">
                    {/* 1. Name EN */}
                    <Controller
                      name="name_en"
                      control={control}
                      rules={{required: "English name is required"}}
                      render={({field, fieldState: {error}}) => (
                        <TextField
                          className="w-full space-y-1"
                          name="name_en"
                          isRequired
                          isInvalid={Boolean(error)}>
                          <Label>Name (English)</Label>
                          <Input
                            placeholder="Enter modifier name (e.g. Extra Cheese)"
                            variant="secondary"
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                          {error && (
                            <p className="text-xs text-danger">
                              {error.message}
                            </p>
                          )}
                        </TextField>
                      )}
                    />

                    {/* 2. Name AR */}
                    <Controller
                      name="name_ar"
                      control={control}
                      rules={{required: "Arabic name is required"}}
                      render={({field, fieldState: {error}}) => (
                        <TextField
                          className="w-full space-y-1"
                          name="name_ar"
                          isRequired
                          isInvalid={Boolean(error)}>
                          <Label>Name (Arabic)</Label>
                          <Input
                            placeholder="أدخل اسم الإضافة (مثال: جبنة زيادة)"
                            variant="secondary"
                            dir="rtl"
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                          {error && (
                            <p className="text-xs text-danger">
                              {error.message}
                            </p>
                          )}
                        </TextField>
                      )}
                    />

                    {/* 3. Price */}
                    <Controller
                      name="price"
                      control={control}
                      rules={{
                        required: "Price is required",
                        min: {value: 0, message: "Price must be positive"},
                      }}
                      render={({field, fieldState: {error}}) => (
                        <TextField
                          className="w-full space-y-1"
                          name="price"
                          isRequired
                          isInvalid={Boolean(error)}>
                          <Label>Price</Label>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="Enter price (e.g. 15)"
                            variant="secondary"
                            value={field.value ?? ""}
                            onChange={field.onChange}
                          />
                          {error && (
                            <p className="text-xs text-danger">
                              {error.message}
                            </p>
                          )}
                        </TextField>
                      )}
                    />

                    {/* 4. Modifier Group */}
                    <Controller
                      name="modifier_group_id"
                      control={control}
                      rules={{required: "Modifier group is required"}}
                      render={({field, fieldState: {error}}) => (
                        <div className="space-y-1">
                          <Select
                            variant="secondary"
                            className="w-full"
                            isRequired
                            isInvalid={Boolean(error)}
                            selectedKey={field.value ? String(field.value) : null}
                            onSelectionChange={(key) => field.onChange(key)}>
                            <Label>Modifier Group</Label>
                            <Select.Trigger className="w-full">
                              <Select.Value placeholder="Select group" />
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
              <Modal.Footer>
                <Button
                  type="button"
                  variant="secondary"
                  isDisabled={isWorking}
                  onClick={() => handleOpenChange(false)}>
                  Cancel
                </Button>
                <Button form={formId} type="submit" isDisabled={isWorking}>
                  {isWorking
                    ? isEditSession
                      ? "Updating..."
                      : "Saving..."
                    : isEditSession
                      ? "Update Modifier"
                      : "Save Modifier"}
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

export default ModifireModel;

