import {
  Button,
  Card,
  Checkbox,
  Description,
  Label,
  Separator,
  Spinner,
  TextArea,
  TextField,
} from "@heroui/react";
import {Controller, useForm} from "react-hook-form";
import useSettings from "./useSettings";
import useUpdateSettings from "./useUpdateSettings";

function MaintenanceForm() {
  const {settings = {}, isSettingsLoading} = useSettings();
  const {updateSettings, isUpdating} = useUpdateSettings();

  const editValues = {
    is_website_work: settings?.is_website_work ?? true,
    maintenance_message_en: settings?.maintenance_message_en ?? "",
    maintenance_message_ar: settings?.maintenance_message_ar ?? "",
  };

  const {control, handleSubmit, reset} = useForm({
    values: editValues,
  });

  const onSubmit = (data) => {
    const payload = {
      ...(settings?.id ? {id: settings.id} : {}),
      is_website_work: Boolean(data.is_website_work),
      maintenance_message_en: data.maintenance_message_en?.trim() || "",
      maintenance_message_ar: data.maintenance_message_ar?.trim() || "",
    };

    updateSettings(payload);
  };

  if (isSettingsLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center p-8">
          <Spinner size="lg" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Website Maintenance Settings
        </h2>
        <p className="text-sm text-default-500">
          Control website availability and maintenance mode announcement
          messages.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 1. Maintenance Status Toggle */}
        <Controller
          name="is_website_work"
          control={control}
          render={({field}) => (
            <Checkbox
              isSelected={Boolean(field.value)}
              onChange={(selected) => field.onChange(selected)}
              variant="secondary">
              <Checkbox.Content>
                <Checkbox.Control className="size-6">
                  <Checkbox.Indicator />
                </Checkbox.Control>
                Is Website Working?
              </Checkbox.Content>
              <Description>
                Turn off to enable maintenance mode and hide ordering
                functionality.
              </Description>
            </Checkbox>
          )}
        />

        {/* 2. Messages (EN & AR) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            name="maintenance_message_en"
            control={control}
            rules={{required: "English maintenance message is required"}}
            render={({field, fieldState: {error}}) => (
              <TextField
                className="w-full space-y-1"
                isRequired
                isInvalid={Boolean(error)}>
                <Label>Maintenance Message (EN)</Label>
                <TextArea
                  placeholder="We are currently undergoing scheduled maintenance..."
                  variant="secondary"
                  rows={3}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
                {error && (
                  <p className="text-xs text-danger">{error.message}</p>
                )}
              </TextField>
            )}
          />

          <Controller
            name="maintenance_message_ar"
            control={control}
            rules={{required: "Arabic maintenance message is required"}}
            render={({field, fieldState: {error}}) => (
              <TextField
                className="w-full space-y-1"
                isRequired
                isInvalid={Boolean(error)}>
                <Label>رسالة الصيانة (AR)</Label>
                <TextArea
                  placeholder="الموقع حالياً تحت الصيانة الدورية وسيتم العودة قريباً..."
                  variant="secondary"
                  rows={3}
                  dir="rtl"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
                {error && (
                  <p className="text-xs text-danger">{error.message}</p>
                )}
              </TextField>
            )}
          />
        </div>

        <Separator />

        <div className="flex items-center justify-start gap-3">
          <Button
            type="submit"
            variant="primary"
            className="w-36"
            isDisabled={isUpdating}
            isLoading={isUpdating}>
            {isUpdating ? "Saving..." : "Save Changes"}
            {isUpdating && <Spinner size="sm" />}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-32"
            isDisabled={isUpdating}
            onClick={() => reset(editValues)}>
            Reset
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default MaintenanceForm;
