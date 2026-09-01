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
  name_en: "",
  name_ar: "",
  slug: "",
  description_en: "",
  description_ar: "",
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
    name_en: categoryToEdit?.name_en || "",
    name_ar: categoryToEdit?.name_ar || "",
    slug: categoryToEdit?.slug || "",
    description_en: categoryToEdit?.description_en || "",
    description_ar: categoryToEdit?.description_ar || "",
    is_active:
      categoryToEdit?.is_active !== undefined ? categoryToEdit.is_active : true,
  };

  const {
    handleSubmit,
    reset,
    control,
    formState: {errors},
  } = useForm({
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
    const payload = {
      name_en: data.name_en?.trim(),
      name_ar: data.name_ar?.trim(),
      slug: data.slug?.trim(),
      description_en: data.description_en?.trim() || "",
      description_ar: data.description_ar?.trim() || "",
      is_active: Boolean(data.is_active),
    };

    if (isEditSession) {
      updateCategory(
        {id: editId, ...payload},
        {
          onSuccess: () => {
            handleOpenChange(false);
          },
        },
      );
    } else {
      createCategory(payload, {
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
          <Drawer.Dialog className="w-full max-w-lg">
            <Drawer.Header>
              <Drawer.Heading>
                {isEditSession ? "Edit Category" : "Add Category"}
              </Drawer.Heading>
            </Drawer.Header>

            <Drawer.Body className="overflow-y-auto">
              <form
                id={formId}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4">
                {/* 1. Category Names (EN & AR) */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Controller
                    name="name_en"
                    control={control}
                    rules={{required: "English name is required"}}
                    render={({field, fieldState: {error}}) => (
                      <TextField
                        className="w-full space-y-2"
                        name="name_en"
                        isRequired
                        isInvalid={Boolean(error)}>
                        <Label>Name (EN)</Label>
                        <Input
                          placeholder="e.g. Burgers & Sandwiches"
                          variant="secondary"
                          autoComplete="off"
                          value={field.value || ""}
                          onChange={field.onChange}
                        />
                        {error && (
                          <p className="text-xs text-danger">{error.message}</p>
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
                        className="w-full space-y-2"
                        name="name_ar"
                        isRequired
                        isInvalid={Boolean(error)}>
                        <Label>الاسم (AR)</Label>
                        <Input
                          placeholder="مثال: البرجر والساندوتشات"
                          variant="secondary"
                          autoComplete="off"
                          dir="rtl"
                          value={field.value || ""}
                          onChange={field.onChange}
                        />
                        {error && (
                          <p className="text-xs text-danger">{error.message}</p>
                        )}
                      </TextField>
                    )}
                  />
                </div>

                {/* 2. Category Slug */}
                <Controller
                  name="slug"
                  control={control}
                  rules={{required: "Slug is required"}}
                  render={({field, fieldState: {error}}) => (
                    <TextField
                      className="w-full space-y-2"
                      name="slug"
                      isRequired
                      isInvalid={Boolean(error)}>
                      <Label>Slug</Label>
                      <Input
                        placeholder="e.g. burgers-sandwiches"
                        variant="secondary"
                        autoComplete="off"
                        value={field.value || ""}
                        onChange={field.onChange}
                      />
                      {error && (
                        <p className="text-xs text-danger">{error.message}</p>
                      )}
                    </TextField>
                  )}
                />

                {/* 3. Descriptions (EN & AR) */}
                <Controller
                  name="description_en"
                  control={control}
                  render={({field}) => (
                    <TextField
                      className="w-full space-y-2"
                      name="description_en">
                      <Label>Description (EN)</Label>
                      <TextArea
                        placeholder="Enter English description..."
                        variant="secondary"
                        rows={3}
                        value={field.value || ""}
                        onChange={field.onChange}
                      />
                    </TextField>
                  )}
                />

                <Controller
                  name="description_ar"
                  control={control}
                  render={({field}) => (
                    <TextField
                      className="w-full space-y-2"
                      name="description_ar">
                      <Label>الوصف (AR)</Label>
                      <TextArea
                        placeholder="أدخل الوصف بالعربي..."
                        variant="secondary"
                        rows={3}
                        dir="rtl"
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
