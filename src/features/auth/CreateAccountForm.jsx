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
import useBranches from "../manager/branches/useBranches";

const defaultValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  role: "manager",
  branch_id: "",
};

function CreateAccountForm() {
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    watch,
    formState: {isSubmitting},
  } = useForm({
    defaultValues,
  });

  const {createAccount, isCreating} = useCreateAccount();
  const {branches, isLoading: isLoadingBranches} = useBranches();

  const selectedRole = watch("role");

  const onSubmit = async (data) => {
    const requestBody = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      role: data.role,
      ...(data.role === "employee" && {branch_id: data.branch_id}),
    };
    createAccount(requestBody, {
      onSuccess: () => {
        reset(defaultValues);
      },
    });
  };

  return (
    <Card className="w-full max-w-2xl p-6 md:p-8 shadow-md">
      <form
        className="flex w-full flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight">Create Account</h2>
          <p className="text-sm text-default-500">
            Fill in the user details below to register a new account.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                {error && (
                  <p className="text-xs text-danger">{error.message}</p>
                )}
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
                {error && (
                  <p className="text-xs text-danger">{error.message}</p>
                )}
              </TextField>
            )}
          />

          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Phone number is required",
            }}
            render={({field, fieldState: {error}}) => (
              <TextField
                className="w-full space-y-1"
                name="phone"
                isRequired
                isInvalid={Boolean(error)}>
                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  placeholder="e.g. 01012345678"
                  variant="secondary"
                  autoComplete="tel"
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
                {error && (
                  <p className="text-xs text-danger">{error.message}</p>
                )}
              </Select>
            )}
          />

          {selectedRole === "employee" && (
            <Controller
              name="branch_id"
              control={control}
              rules={{
                required:
                  selectedRole === "employee" ? "Branch is required" : false,
              }}
              render={({field, fieldState: {error}}) => (
                <Select
                  variant="secondary"
                  className="w-full space-y-1"
                  selectedKey={field.value}
                  onSelectionChange={(key) => field.onChange(key)}
                  isDisabled={isLoadingBranches}>
                  <Label>Branch</Label>
                  <Select.Trigger className="w-full">
                    <Select.Value placeholder="Select Branch" />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {branches?.map((branch) => (
                        <ListBox.Item
                          key={branch.id}
                          id={branch.id}
                          textValue={branch.name}>
                          {branch.name}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                  {error && (
                    <p className="text-xs text-danger">{error.message}</p>
                  )}
                </Select>
              )}
            />
          )}

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
                  placeholder="Enter password"
                  variant="secondary"
                  autoComplete="new-password"
                  value={field.value || ""}
                  onChange={field.onChange}
                />
                <Description>
                  Must be at least 8 chars with 1 uppercase & 1 number
                </Description>
                {error && (
                  <p className="text-xs text-danger">{error.message}</p>
                )}
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
                  placeholder="Confirm password"
                  variant="secondary"
                  autoComplete="new-password"
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

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            className="w-full sm:w-auto px-6"
            onClick={() => reset(defaultValues)}>
            Reset
          </Button>
          <Button
            type="submit"
            color="primary"
            className="w-full sm:w-auto px-8"
            isDisabled={isSubmitting || isCreating}>
            {isCreating ? "Creating..." : "Create Account"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default CreateAccountForm;
