import {
  Button,
  Description,
  Drawer,
  Input,
  Label,
  ListBox,
  Select,
  TextField,
} from "@heroui/react";
import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {validatePassword} from "../../../utils/helpers";
import useCreateAccount from "../../auth/useCreateAccount";
import useBranches from "../branches/useBranches";

const defaultValues = {
  full_name: "",
  phone: "",
  email: "",
  role: "employee",
  branch_id: "",
  password: "",
  confirmPassword: "",
};

function StaffDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const {branches, isLoading: isLoadingBranches} = useBranches();
  const {createAccount, isCreating} = useCreateAccount();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: {errors, isSubmitting},
  } = useForm({
    defaultValues,
    mode: "onTouched",
  });

  const selectedRole = watch("role");

  const onSubmit = (data) => {
    const payload = {
      full_name: data.full_name,
      name: data.full_name,
      phone: data.phone,
      email: data.email,
      role: data.role,
      ...(data.role === "employee" && {branch_id: data.branch_id}),
      password: data.password,
    };

    createAccount(payload, {
      onSuccess: () => {
        reset(defaultValues);
        setIsOpen(false);
      },
    });
  };

  return (
    <Drawer isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        color="primary"
        onPress={() => setIsOpen(true)}
        className="self-end">
        Create Staff Account
      </Button>
      <Drawer.Backdrop isDismissable={false}>
        <Drawer.Content
          placement="top"
          className="max-w-2xl mx-auto rounded-t-xl">
          <Drawer.Dialog>
            <Drawer.Header>
              <Drawer.Heading>Create Staff Account</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <form
                id="staff-form"
                className="flex w-full flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 1. Full Name Field */}
                  <Controller
                    name="full_name"
                    control={control}
                    rules={{required: "Full name is required"}}
                    render={({field, fieldState: {error}}) => (
                      <TextField
                        className="w-full space-y-1"
                        isRequired
                        isInvalid={Boolean(error)}>
                        <Label>Full Name</Label>
                        <Input
                          type="text"
                          placeholder="e.g. John Doe"
                          variant="secondary"
                          value={field.value}
                          onChange={field.onChange}
                        />
                        {error && (
                          <p className="text-xs text-danger">{error.message}</p>
                        )}
                      </TextField>
                    )}
                  />

                  {/* 2. Phone Field */}
                  <Controller
                    name="phone"
                    control={control}
                    rules={{required: "Phone number is required"}}
                    render={({field, fieldState: {error}}) => (
                      <TextField
                        className="w-full space-y-1"
                        isRequired
                        isInvalid={Boolean(error)}>
                        <Label>Phone Number</Label>
                        <Input
                          type="tel"
                          placeholder="e.g. 01012345678"
                          variant="secondary"
                          value={field.value}
                          onChange={field.onChange}
                        />
                        {error && (
                          <p className="text-xs text-danger">{error.message}</p>
                        )}
                      </TextField>
                    )}
                  />

                  {/* 3. Email Field */}
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
                        isRequired
                        isInvalid={Boolean(error)}>
                        <Label>Email Address</Label>
                        <Input
                          type="email"
                          placeholder="gaber@example.com"
                          variant="secondary"
                          value={field.value}
                          onChange={field.onChange}
                        />
                        {error && (
                          <p className="text-xs text-danger">{error.message}</p>
                        )}
                      </TextField>
                    )}
                  />

                  {/* 4. Role Select Field */}
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
                          <Select.Value placeholder="Select Role" />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="employee" textValue="Employee">
                              Employee
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="manager" textValue="Manager">
                              Manager
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

                  {/* 5. Branch Select Field (Only if Employee) */}
                  {selectedRole === "employee" && (
                    <Controller
                      name="branch_id"
                      control={control}
                      rules={{
                        required:
                          selectedRole === "employee"
                            ? "Branch is required"
                            : false,
                      }}
                      render={({field, fieldState: {error}}) => (
                        <Select
                          variant="secondary"
                          className="w-full space-y-1 sm:col-span-2"
                          selectedKey={field.value}
                          onSelectionChange={(key) => field.onChange(key)}
                          isDisabled={isLoadingBranches}>
                          <Label>Assigned Branch</Label>
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
                            <p className="text-xs text-danger">
                              {error.message}
                            </p>
                          )}
                        </Select>
                      )}
                    />
                  )}

                  {/* 6. Password Field */}
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "Password is required",
                      validate: (value) => {
                        const error = validatePassword(value);
                        return error || true;
                      },
                    }}
                    render={({field, fieldState: {error}}) => (
                      <TextField
                        className="w-full space-y-1"
                        isRequired
                        isInvalid={Boolean(error)}>
                        <Label>Password</Label>
                        <Input
                          type="password"
                          placeholder="Enter password"
                          variant="secondary"
                          value={field.value}
                          onChange={field.onChange}
                        />
                        <Description className="text-xs text-default-400">
                          Min 8 chars, 1 uppercase, 1 number
                        </Description>
                        {error && (
                          <p className="text-xs text-danger">{error.message}</p>
                        )}
                      </TextField>
                    )}
                  />

                  {/* 7. Confirm Password Field */}
                  <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                    }}
                    render={({field, fieldState: {error}}) => (
                      <TextField
                        className="w-full space-y-1"
                        isRequired
                        isInvalid={Boolean(error)}>
                        <Label>Confirm Password</Label>
                        <Input
                          type="password"
                          placeholder="Re-enter password"
                          variant="secondary"
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

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onPress={() => reset(defaultValues)}>
                    Reset
                  </Button>
                </div>
              </form>
            </Drawer.Body>
            <Drawer.Footer className="p-2">
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button
                type="submit"
                form="staff-form"
                color="primary"
                isDisabled={isCreating || isSubmitting}>
                {isCreating ? "Creating..." : "Create Staff Account"}
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}

export default StaffDrawer;
