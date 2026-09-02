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
import {
  Delete02Icon,
  Edit02Icon,
  Image01Icon,
  PlusIcon,
} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {useEffect, useRef, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import useCategories from "../categories/useCategories";
import useCreateMenuItem from "./useCreateMenuItem";
import useUpdateMenuItem from "./useUpdateMenuItem";
import useCategoriesShortData from "../categories/useCategoriesShortData";

const defaultValues = {
  name_en: "",
  name_ar: "",
  category_id: "",
  price: "",
  description_en: "",
  description_ar: "",
  image: null,
  is_available: "available",
};

function MenuDrawer({itemToEdit = {}}) {
  const isEditSession = Boolean(itemToEdit?.id);
  const editId = itemToEdit?.id;

  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    itemToEdit?.image_url || null,
  );
  const fileInputRef = useRef(null);
  const {categoriesShort} = useCategoriesShortData();
  const {createMenuItem, isCreating} = useCreateMenuItem();
  const {updateMenuItem, isUpdating} = useUpdateMenuItem();

  const isWorking = isCreating || isUpdating;

  const editValues = {
    name_en: itemToEdit?.name_en || "",
    name_ar: itemToEdit?.name_ar || "",
    category_id: itemToEdit?.category_id ? String(itemToEdit.category_id) : "",
    price: itemToEdit?.price !== undefined ? String(itemToEdit.price) : "",
    description_en: itemToEdit?.description_en || "",
    description_ar: itemToEdit?.description_ar || "",
    image: null,
    is_available:
      itemToEdit?.is_available !== false ? "available" : "unavailable",
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: isEditSession ? editValues : defaultValues,
  });

  useEffect(() => {
    if (isOpen) {
      reset(isEditSession ? editValues : defaultValues);
      setImagePreview(itemToEdit?.image_url || null);
    }
  }, [isOpen, isEditSession]);

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) {
      reset(isEditSession ? editValues : defaultValues);
      setImagePreview(itemToEdit?.image_url || null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const onSubmit = (data) => {
    const payload = {
      name_en: data.name_en.trim(),
      name_ar: data.name_ar.trim(),
      category_id: Number(data.category_id),
      price: parseFloat(data.price),
      description_en: data.description_en?.trim() || "",
      description_ar: data.description_ar?.trim() || "",
      image: data.image,
      image_url: isEditSession ? itemToEdit?.image_url : undefined,
      is_available: data.is_available === "available",
    };

    if (isEditSession) {
      updateMenuItem(
        {id: editId, ...payload},
        {
          onSuccess: () => {
            handleOpenChange(false);
          },
        },
      );
    } else {
      createMenuItem(payload, {
        onSuccess: () => {
          handleOpenChange(false);
        },
      });
    }
  };

  const formId = `menu-item-form-${isEditSession ? editId : "new"}`;

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
        <Button variant="primary" size="lg" onClick={() => setIsOpen(true)}>
          <HugeiconsIcon icon={PlusIcon} size={16} />
          Add Menu Item
        </Button>
      )}

      <Drawer.Backdrop variant="blur">
        <Drawer.Content placement="right">
          <Drawer.Dialog className="w-full max-w-lg">
            <Drawer.Header>
              <Drawer.Heading>
                {isEditSession ? "Edit Menu Item" : "Add Menu Item"}
              </Drawer.Heading>
            </Drawer.Header>

            <Drawer.Body className="overflow-y-auto">
              <form
                id={formId}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4">
                {/* 1. Names (EN & AR) */}
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
                          placeholder="e.g. Double Beef Burger"
                          variant="secondary"
                          autoComplete="off"
                          value={field.value}
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
                          placeholder="مثال: دبل برجر لحم"
                          variant="secondary"
                          autoComplete="off"
                          dir="rtl"
                          value={field.value}
                          onChange={field.onChange}
                        />
                        {error && (
                          <p className="text-xs text-danger">{error.message}</p>
                        )}
                      </TextField>
                    )}
                  />
                </div>

                {/* 2. Category */}
                <Controller
                  name="category_id"
                  control={control}
                  rules={{required: "Category is required"}}
                  render={({field, fieldState: {error}}) => (
                    <div className="space-y-2">
                      <Select
                        variant="secondary"
                        className="w-full"
                        isRequired
                        isInvalid={Boolean(error)}
                        selectedKey={field.value ? String(field.value) : null}
                        onSelectionChange={(key) => field.onChange(key)}>
                        <Label>Category</Label>
                        <Select.Trigger className="w-full">
                          <Select.Value placeholder="Select category" />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            {categoriesShort?.map((category) => (
                              <ListBox.Item
                                key={category.id}
                                id={String(category.id)}
                                textValue={category.name_en}>
                                {category.name_en}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                      {error && (
                        <p className="text-xs text-danger">{error.message}</p>
                      )}
                    </div>
                  )}
                />

                {/* 3. Price */}
                <Controller
                  name="price"
                  control={control}
                  rules={{
                    required: "Price is required",
                    min: {
                      value: 0.01,
                      message: "Price must be greater than 0",
                    },
                  }}
                  render={({field, fieldState: {error}}) => (
                    <TextField
                      className="w-full space-y-2"
                      name="price"
                      isRequired
                      isInvalid={Boolean(error)}>
                      <Label>Price</Label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        variant="secondary"
                        autoComplete="off"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      {error && (
                        <p className="text-xs text-danger">{error.message}</p>
                      )}
                    </TextField>
                  )}
                />

                {/* 4. Descriptions (EN & AR) */}
                <Controller
                  name="description_en"
                  control={control}
                  rules={{required: "English description is required"}}
                  render={({field, fieldState: {error}}) => (
                    <TextField
                      className="w-full space-y-2"
                      name="description_en"
                      isRequired
                      isInvalid={Boolean(error)}>
                      <Label>Description (EN)</Label>
                      <TextArea
                        placeholder="Enter English description..."
                        variant="secondary"
                        rows={3}
                        value={field.value}
                        onChange={field.onChange}
                      />
                      {error && (
                        <p className="text-xs text-danger">{error.message}</p>
                      )}
                    </TextField>
                  )}
                />

                <Controller
                  name="description_ar"
                  control={control}
                  rules={{required: "Arabic description is required"}}
                  render={({field, fieldState: {error}}) => (
                    <TextField
                      className="w-full space-y-2"
                      name="description_ar"
                      isRequired
                      isInvalid={Boolean(error)}>
                      <Label>الوصف (AR)</Label>
                      <TextArea
                        placeholder="أدخل الوصف بالعربي..."
                        variant="secondary"
                        rows={3}
                        dir="rtl"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      {error && (
                        <p className="text-xs text-danger">{error.message}</p>
                      )}
                    </TextField>
                  )}
                />

                {/* 5. Image Upload */}
                <Controller
                  name="image"
                  control={control}
                  rules={{
                    required:
                      isEditSession && imagePreview
                        ? false
                        : "Image is required",
                  }}
                  render={({field, fieldState: {error}}) => (
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1">
                        Image{" "}
                        {(!isEditSession || !imagePreview) && (
                          <span className="text-danger">*</span>
                        )}
                      </Label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file);
                            setImagePreview(URL.createObjectURL(file));
                          }
                        }}
                      />
                      {imagePreview ? (
                        <div className="border border-border rounded-xl p-2 bg-surface flex items-center justify-between gap-4">
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-3 cursor-pointer grow">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-16 h-16 object-cover rounded-lg border border-border shrink-0"
                            />
                            <div>
                              <p className="text-sm font-medium">
                                Image selected
                              </p>
                              <p className="text-xs text-default-500">
                                Click to change image
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            variant="danger-soft"
                            color="danger"
                            isIconOnly
                            onClick={() => {
                              field.onChange(null);
                              setImagePreview(null);
                              if (fileInputRef.current) {
                                fileInputRef.current.value = "";
                              }
                            }}>
                            <HugeiconsIcon icon={Delete02Icon} size={16} />
                          </Button>
                        </div>
                      ) : (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-surface-secondary/40 ${
                            error
                              ? "border-danger bg-danger/5"
                              : "border-border hover:border-accent/50"
                          }`}>
                          <div
                            className={`p-3 rounded-full bg-surface border ${
                              error
                                ? "border-danger text-danger"
                                : "border-border text-default-500"
                            }`}>
                            <HugeiconsIcon icon={Image01Icon} size={24} />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">
                              Click to upload an image
                            </p>
                            <p className="text-xs text-default-500 mt-1">
                              PNG, JPG, WebP
                            </p>
                          </div>
                        </div>
                      )}
                      {error && (
                        <p className="text-xs text-danger">{error.message}</p>
                      )}
                    </div>
                  )}
                />

                {/* 6. Availability */}
                <Controller
                  name="is_available"
                  control={control}
                  rules={{required: "Availability is required"}}
                  render={({field, fieldState: {error}}) => (
                    <div className="space-y-2">
                      <Select
                        variant="secondary"
                        className="w-full"
                        isRequired
                        isInvalid={Boolean(error)}
                        selectedKey={field.value}
                        onSelectionChange={(key) => field.onChange(key)}>
                        <Label>Availability</Label>
                        <Select.Trigger className="w-full">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="available" textValue="Available">
                              Available
                            </ListBox.Item>
                            <ListBox.Item
                              id="unavailable"
                              textValue="Unavailable">
                              Unavailable
                            </ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                      {error && (
                        <p className="text-xs text-danger">{error.message}</p>
                      )}
                    </div>
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
                {isEditSession ? "Update Item" : "Add Item"}
                {isWorking && <Spinner />}
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}

export default MenuDrawer;
