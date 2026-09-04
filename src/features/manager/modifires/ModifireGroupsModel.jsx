import {Button, Input, Label, Modal, Surface, TextField} from "@heroui/react";
import {Plus} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import useCreateModifireGroup from "./useCreateModifireGroup";
import useUpdateModifireGroup from "./useUpdateModifireGroup";

const defaultValues = {
  name_en: "",
  name_ar: "",
  min_selections: 0,
  max_selections: 1,
};

function ModifireGroupsModel({
  groupToEdit = {},
  isOpen: externalIsOpen,
  onOpenChange: externalOnOpenChange,
}) {
  const isEditSession = Boolean(groupToEdit?.id);

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const {createGroup, isCreating} = useCreateModifireGroup();
  const {updateGroup, isUpdating} = useUpdateModifireGroup();
  const isWorking = isCreating || isUpdating;

  const editValues = {
    name_en: groupToEdit?.name_en || "",
    name_ar: groupToEdit?.name_ar || "",
    min_selections: groupToEdit?.min_selections ?? 0,
    max_selections: groupToEdit?.max_selections ?? 1,
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
      min_selections: Number(data.min_selections || 0),
      max_selections: Number(data.max_selections || 1),
    };

    if (isEditSession) {
      updateGroup(
        {id: groupToEdit.id, ...payload},
        {
          onSuccess: () => {
            handleOpenChange(false);
          },
        },
      );
    } else {
      createGroup(payload, {
        onSuccess: () => {
          reset(defaultValues);
          handleOpenChange(false);
        },
      });
    }
  }

  const formId = `modifier-group-form-${isEditSession ? groupToEdit.id : "new"}`;

  return (
    <>
      {externalIsOpen === undefined && (
        <Button className="self-end" onClick={() => setInternalIsOpen(true)}>
          <HugeiconsIcon icon={Plus} />
          Add Groups
        </Button>
      )}

      <Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
        <Modal.Backdrop variant="blur">
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>
                  {isEditSession ? "Edit Group" : "Add Group"}
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body>
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
                          <Label>Name (English)</Label>
                          <Input
                            placeholder="Enter group name (e.g. Burger Extras)"
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
                          <Label>Name (Arabic)</Label>
                          <Input
                            placeholder="أدخل اسم المجموعة (مثال: إضافات برجر)"
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

                    <div className="grid grid-cols-2 gap-3">
                      <Controller
                        name="min_selections"
                        control={control}
                        rules={{
                          required: "Min selections required",
                          min: {value: 0, message: "Must be 0 or more"},
                        }}
                        render={({field, fieldState: {error}}) => (
                          <TextField
                            className="w-full space-y-1"
                            name="min_selections"
                            isRequired
                            isInvalid={Boolean(error)}>
                            <Label>Min Selections</Label>
                            <Input
                              type="number"
                              min={0}
                              variant="secondary"
                              placeholder="0"
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
                        name="max_selections"
                        control={control}
                        rules={{
                          required: "Max selections required",
                          min: {value: 1, message: "Must be at least 1"},
                        }}
                        render={({field, fieldState: {error}}) => (
                          <TextField
                            className="w-full space-y-1"
                            name="max_selections"
                            isRequired
                            isInvalid={Boolean(error)}>
                            <Label>Max Selections</Label>
                            <Input
                              type="number"
                              min={1}
                              variant="secondary"
                              placeholder="1"
                              value={field.value ?? 1}
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
                    </div>
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
                      ? "Update Group"
                      : "Save Group"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}

export default ModifireGroupsModel;
