import {
  Button,
  Drawer,
  Input,
  Label,
  ListBox,
  Select,
  Spinner,
  TextArea,
  TextField,
} from "@heroui/react";
import {Edit02Icon, PlusIcon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import useCreateCategory from "./useCreateCategory";
import useUpdateCategory from "./useUpdateCategory";

const defaultValues = {
  name: "",
  slug: "",
  description: "",
  is_active: true,
};

function CategoryDrawer({categoryToEdit = {}}) {
  const isEditSession = Boolean(categoryToEdit?.id);
  const editId = categoryToEdit?.id;

  const [isOpen, setIsOpen] = useState(false);
  const {createCategory, isCreating} = useCreateCategory();
  const {updateCategory, isUpdating} = useUpdateCategory();

  const isWorking = isCreating || isUpdating;

  const editValues = {
    name: categoryToEdit?.name || "",
    slug: categoryToEdit?.slug || "",
    description: categoryToEdit?.description || "",
    is_active:
      categoryToEdit?.is_active !== undefined ? categoryToEdit.is_active : true,
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
    setIsOpen(open);
    if (!open) {
      reset(isEditSession ? editValues : defaultValues);
    }
  };

  const onSubmit = (data) => {
    if (isEditSession) {
      updateCategory(
        {id: editId, ...data},
        {
          onSuccess: () => {
            handleOpenChange(false);
          },
        },
      );
    } else {
      createCategory(data, {
        onSuccess: () => {
          reset(defaultValues);
          handleOpenChange(false);
        },
      });
    }
  };

  const formId = `category-form-${isEditSession ? editId : "new"}`;

  return (
    <Drawer isOpen={isOpen} onOpenChange={handleOpenChange}>
      {isEditSession ? (
        <Button
          variant="secondary"
          className="w-full"
          isDisabled={isWorking}
          onClick={() => setIsOpen(true)}>
          <HugeiconsIcon icon={Edit02Icon} size={16} />
          Edit
        </Button>
      ) : (
        <Button
          variant="secondary"
          isDisabled={isWorking}
          onClick={() => setIsOpen(true)}>
          <HugeiconsIcon icon={PlusIcon} size={16} />
          Add Category
        </Button>
      )}

      <Drawer.Backdrop variant="blur">
        <Drawer.Content placement="right">
          <Drawer.Dialog>
            <Drawer.Header>
              <Drawer.Heading>
                {isEditSession ? "Edit Category" : "Add Category"}
              </Drawer.Heading>
            </Drawer.Header>

            <Drawer.Body>
              <form
                id={formId}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4">
                {/* 1. Category Name */}
                <Controller
                  name="name"
                  control={control}
                  rules={{required: true}}
                  render={({field}) => (
                    <TextField
                      className="w-full space-y-2"
                      name="name"
                      isRequired>
                      <Label>Category Name</Label>
                      <Input
                        placeholder="e.g. Burgers & Sandwiches"
                        variant="secondary"
                        autoComplete="off"
                        value={field.value || ""}
                        onChange={field.onChange}
                      />
                    </TextField>
                  )}
                />

                {/* 2. Category Slug */}
                <Controller
                  name="slug"
                  control={control}
                  rules={{required: true}}
                  render={({field}) => (
                    <TextField
                      className="w-full space-y-2"
                      name="slug"
                      isRequired>
                      <Label>Slug</Label>
                      <Input
                        placeholder="e.g. burgers-sandwiches"
                        variant="secondary"
                        autoComplete="off"
                        value={field.value || ""}
                        onChange={field.onChange}
                      />
                    </TextField>
                  )}
                />

                {/* 3. Description */}
                <Controller
                  name="description"
                  control={control}
                  rules={{required: true}}
                  render={({field}) => (
                    <TextField
                      className="w-full space-y-2"
                      name="description"
                      isRequired>
                      <Label>Description</Label>
                      <TextArea
                        placeholder="Enter a brief category description..."
                        variant="secondary"
                        rows={4}
                        value={field.value || ""}
                        onChange={field.onChange}
                      />
                    </TextField>
                  )}
                />

                {/* 4. Status (Active / Inactive) */}
                <Controller
                  name="is_active"
                  control={control}
                  render={({field}) => (
                    <Select
                      variant="secondary"
                      className="w-full space-y-2"
                      selectedKey={field.value ? "active" : "inactive"}
                      onSelectionChange={(key) =>
                        field.onChange(key === "active")
                      }>
                      <Label>Status</Label>
                      <Select.Trigger className="w-full">
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          <ListBox.Item id="active" textValue="Active">
                            Active
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                          <ListBox.Item id="inactive" textValue="Inactive">
                            Inactive
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  )}
                />
              </form>
            </Drawer.Body>

            <Drawer.Footer className="flex items-center justify-between gap-3">
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                isDisabled={isWorking}
                onClick={() => handleOpenChange(false)}>
                Cancel
              </Button>
              <Button
                form={formId}
                type="submit"
                className="w-full"
                isDisabled={isWorking}
                isLoading={isWorking}>
                {isEditSession ? "Update Category" : "Add Category"}
                {isWorking && <Spinner />}
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}

export default CategoryDrawer;
