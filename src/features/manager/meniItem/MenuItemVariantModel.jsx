import {
  Button,
  Checkbox,
  Description,
  Input,
  Label,
  Modal,
  Spinner,
  Surface,
  TextField,
} from "@heroui/react";
import {Edit02Icon, PlusIcon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import useAddItemVariants from "./useAddItemVariants";
import useUpdateItemVariant from "./useUpdateItemVariant";

const defaultValues = {
  name_en: "",
  name_ar: "",
  price: "",
  sort_order: 0,
  is_available: true,
};

function MenuItemVariantModel({
  variantToEdit = {},
  isOpen: externalIsOpen,
  onOpenChange: externalOnOpenChange,
}) {
  const {id} = useParams();
  const isEditSession = Boolean(variantToEdit?.id);

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const {createMenuItemVariant, isCreating} = useAddItemVariants();
  const {updateMenuItemVariant, isUpdating} = useUpdateItemVariant();
  const isWorking = isCreating || isUpdating;

  const editValues = {
    name_en: variantToEdit?.name_en || "",
    name_ar: variantToEdit?.name_ar || "",
    price: variantToEdit?.price ?? "",
    sort_order: variantToEdit?.sort_order ?? 0,
    is_available: variantToEdit?.is_available ?? true,
  };

  const {handleSubmit, reset, control} = useForm({
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

  const onSubmit = (data) => {
    const payload = {
      name_en: data.name_en?.trim(),
      name_ar: data.name_ar?.trim(),
      price: Number(data.price),
      sort_order: Number(data.sort_order || 0),
      is_available: Boolean(data.is_available),
    };

    if (isEditSession) {
      updateMenuItemVariant(
        {id: variantToEdit.id, ...payload},
        {
          onSuccess: () => {
            handleOpenChange(false);
          },
        },
      );
    } else {
      createMenuItemVariant(
        {product_id: id, ...payload},
        {
          onSuccess: () => {
            reset(defaultValues);
            handleOpenChange(false);
          },
        },
      );
    }
  };

  const formId = `variant-form-${isEditSession ? variantToEdit.id : "new"}`;

  return (
    <>
      {externalIsOpen === undefined && (
        <Button variant="secondary" onClick={() => setInternalIsOpen(true)}>
          <HugeiconsIcon icon={PlusIcon} size={16} />
          Add Variant
        </Button>
      )}

      <Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
        <Modal.Backdrop variant="blur">
          <Modal.Container placement="auto">
            <Modal.Dialog className="p-4">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>
                  {isEditSession ? "Edit Variant" : "Add New Variant"}
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body className="p-6">
                <Surface variant="default">
                  <form
                    id={formId}
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4">
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
                          <Label>Name (En)</Label>
                          <Input
                            placeholder="Enter variant name (e.g. Small)"
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
                          <Label>Name (Ar)</Label>
                          <Input
                            placeholder="أدخل اسم المتغير (مثال: صغير)"
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
                            placeholder="Enter variant price"
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

                    <Controller
                      name="sort_order"
                      control={control}
                      render={({field, fieldState: {error}}) => (
                        <TextField
                          className="w-full space-y-1"
                          name="sort_order"
                          isInvalid={Boolean(error)}>
                          <Label>Sort Order</Label>
                          <Input
                            type="number"
                            placeholder="Enter variant sort order"
                            variant="secondary"
                            value={field.value ?? 0}
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

                    <Controller
                      name="is_available"
                      control={control}
                      render={({field}) => (
                        <Checkbox
                          name="is_available"
                          variant="secondary"
                          className="pb-2.5"
                          isSelected={Boolean(field.value)}
                          onChange={field.onChange}>
                          <Checkbox.Content>
                            <Checkbox.Control className="size-6">
                              <Checkbox.Indicator />
                            </Checkbox.Control>
                            Is Available?
                          </Checkbox.Content>
                          <Description>
                            This will make the variant available or unavailable
                          </Description>
                        </Checkbox>
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
                  isDisabled={isWorking}
                  isLoading={isWorking}>
                  {isWorking
                    ? isEditSession
                      ? "Updating..."
                      : "Adding..."
                    : isEditSession
                      ? "Update Variant"
                      : "Add Variant"}
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

export default MenuItemVariantModel;
