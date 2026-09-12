import {
  Button,
  Card,
  Input,
  Label,
  Separator,
  Spinner,
  TextField,
} from "@heroui/react";
import {Controller, useForm} from "react-hook-form";
import useSettings from "./useSettings";
import useUpdateSettings from "./useUpdateSettings";

function PricingDeliveryForm() {
  const {settings = {}, isSettingsLoading} = useSettings();
  const {updateSettings, isUpdating} = useUpdateSettings();

  const editValues = {
    delivery_fee: settings?.delivery_fee ?? "",
    dine_in_tax: settings?.dine_in_tax ?? "",
  };

  const {control, handleSubmit, reset} = useForm({
    values: editValues,
  });

  const onSubmit = (data) => {
    const payload = {
      ...(settings?.id ? {id: settings.id} : {}),
      delivery_fee: Number(data.delivery_fee),
      dine_in_tax: Number(data.dine_in_tax),
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
          Pricing & Delivery Settings
        </h2>
        <p className="text-sm text-default-500">
          Manage delivery fees, estimated delivery duration, and tax percentage.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Controller
            name="delivery_fee"
            control={control}
            rules={{
              required: "Delivery fee is required",
              min: {value: 0, message: "Delivery fee must be 0 or positive"},
            }}
            render={({field, fieldState: {error}}) => (
              <TextField
                className="w-full space-y-1"
                isRequired
                isInvalid={Boolean(error)}>
                <Label>Delivery Fee (EGP)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  variant="secondary"
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
            name="dine_in_tax"
            control={control}
            rules={{
              required: "Tax percentage is required",
              min: {value: 0, message: "Tax must be 0 or positive"},
            }}
            render={({field, fieldState: {error}}) => (
              <TextField
                className="w-full space-y-1"
                isRequired
                isInvalid={Boolean(error)}>
                <Label>Tax Rate (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 14"
                  variant="secondary"
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

export default PricingDeliveryForm;
