import {
  Button,
  Card,
  Checkbox,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextArea,
  TextField,
} from "@heroui/react";
import useUpdateMenuItem from "./useUpdateMenuItem";

function MenuItemData({item}) {
  const {name_en, name_ar, description_en, description_ar, is_available} = item;

  const {mutateUpdateMenuItem, isUpdateMenuItemPending} = useUpdateMenuItem();

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updates = Object.fromEntries(formData);

    updates.is_available =
      formData.has("is_available") && formData.get("is_available") !== "false";

    console.log(updates);
    mutateUpdateMenuItem({menuItemId: item.id, updates});
  }

  return (
    <Card>
      <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="flex items-stretch gap-6">
          <div className="flex-1 flex flex-col gap-4">
            <p className="text-xl font-semibold">English Data</p>

            <TextField
              isRequired
              name="name_en"
              defaultValue={name_en}
              type="text"
              variant="secondary">
              <Label>Name (EN)</Label>
              <Input />
              <FieldError />
            </TextField>
            <TextField
              isRequired
              minLength={8}
              name="description_en"
              defaultValue={description_en}
              type="text"
              variant="secondary">
              <Label>Description (EN)</Label>
              <TextArea />
              <FieldError />
            </TextField>
          </div>

          <Separator orientation="vertical" className="h-auto self-stretch" />

          <div className="flex-1 flex flex-col gap-4">
            <p className="text-xl font-semibold">Arabic Data</p>
            <div dir="rtl" className="flex flex-col gap-4">
              <TextField
                isRequired
                name="name_ar"
                defaultValue={name_ar}
                type="text"
                variant="secondary">
                <Label>Name (AR)</Label>
                <Input />
                <FieldError />
              </TextField>
              <TextField
                isRequired
                minLength={8}
                name="description_ar"
                defaultValue={description_ar}
                type="text"
                variant="secondary">
                <Label>Description (AR)</Label>
                <TextArea />
                <FieldError />
              </TextField>
            </div>
          </div>
        </div>

        <div className="flex items-end gap-6">
          <Checkbox
            name="is_available"
            variant="secondary"
            className="pb-2.5"
            defaultSelected={is_available}>
            <Checkbox.Content>
              <Checkbox.Control className="size-6">
                <Checkbox.Indicator />
              </Checkbox.Control>
              Is Available?
            </Checkbox.Content>
            <Description>
              This will make the menu item available or unavailable
            </Description>
          </Checkbox>
        </div>

        <Separator />

        <div className="flex w-full gap-2">
          <Button
            type="submit"
            className="w-32"
            variant="primary"
            isDisabled={isUpdateMenuItemPending}>
            {isUpdateMenuItemPending ? "Saving Changes..." : "Save Changes"}
          </Button>
          <Button type="reset" className="w-32" variant="secondary">
            Reset Changes
          </Button>
        </div>
      </Form>
    </Card>
  );
}

export default MenuItemData;
