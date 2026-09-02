import {
  Button,
  Card,
  Description,
  Input,
  Label,
  ListBox,
  Select,
  TextField,
} from "@heroui/react";
import {Controller, useForm} from "react-hook-form";
import {validatePassword} from "../../utils/helpers";
import useCreateAccount from "./useCreateAccount";

const defaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "manager",
};

function CreateAccountForm() {
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: {isSubmitting},
  } = useForm({
    defaultValues,
  });

  const {createAccount, isCreating} = useCreateAccount();

  const onSubmit = async (data) => {
    const requestBody = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    };
    createAccount(requestBody);
  };

  return (
    <Card className="p-6">
      <form
        className="flex w-96 flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl font-bold text-center">Create Account</h2>

        <Controller
          name="name"
          control={control}
          rules={{
            required: "Full name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
          }}
          render={({field, fieldState: {error}}) => (
            <TextField
              className="w-full space-y-1"
              name="name"
              isRequired
              isInvalid={Boolean(error)}>
              <Label>Full Name</Label>
              <Input
                placeholder="John Doe"
                variant="secondary"
                autoComplete="name"
                value={field.value || ""}
                onChange={field.onChange}
              />
              {error && <p className="text-xs text-danger">{error.message}</p>}
            </TextField>
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email address",
            },
          }}
          render={({field, fieldState: {error}}) => (
            <TextField
              className="w-full space-y-1"
              name="email"
              isRequired
              isInvalid={Boolean(error)}>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="john@example.com"
                variant="secondary"
                autoComplete="email"
                value={field.value || ""}
                onChange={field.onChange}
              />
              {error && <p className="text-xs text-danger">{error.message}</p>}
            </TextField>
          )}
        />

        <Controller
          name="role"
          control={control}
          rules={{required: "Role is required"}}
          render={({field, fieldState: {error}}) => (
            <Select
              variant="secondary"
              className="w-full space-y-1"
              selectedKey={field.value}
              onSelectionChange={(key) => field.onChange(key)}>
              <Label>Role</Label>
              <Select.Trigger className="w-full">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="manager" textValue="Manager">
                    Manager
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="employee" textValue="Employee">
                    Employee
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
              {error && <p className="text-xs text-danger">{error.message}</p>}
            </Select>
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            validate: (value) => validatePassword(value) || true,
          }}
          render={({field, fieldState: {error}}) => (
            <TextField
              className="w-full space-y-1"
              name="password"
              isRequired
              isInvalid={Boolean(error)}>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                variant="secondary"
                autoComplete="new-password"
                value={field.value || ""}
                onChange={field.onChange}
              />
              <Description>
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              {error && <p className="text-xs text-danger">{error.message}</p>}
            </TextField>
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: "Please confirm your password",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          }}
          render={({field, fieldState: {error}}) => (
            <TextField
              className="w-full space-y-1"
              name="confirmPassword"
              isRequired
              isInvalid={Boolean(error)}>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                placeholder="Confirm your password"
                variant="secondary"
                autoComplete="new-password"
                value={field.value || ""}
                onChange={field.onChange}
              />
              {error && <p className="text-xs text-danger">{error.message}</p>}
            </TextField>
          )}
        />

        <div className="flex gap-2 pt-2">
          <Button
            type="submit"
            className="w-full"
            isDisabled={isSubmitting || isCreating}>
            {isCreating ? "Creating..." : "Submit"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => reset(defaultValues)}>
            Reset
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default CreateAccountForm;
