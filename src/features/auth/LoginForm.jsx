import {Button, Card, Input, Label, TextField} from "@heroui/react";
import {Controller, useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import useLogin from "./useLogin";

const defaultValues = {
  email: "",
  password: "",
};

function LoginForm() {
  const {handleSubmit, control, reset} = useForm({
    defaultValues: {
      email: "dev.gaber@gmail.com",
      password: "12345678A",
    },
  });

  const {login, isLoggingIn} = useLogin();

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <Card className="w-full max-w-md p-8 border border-default-200/50 backdrop-blur-md shadow-none">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
        <p className="text-sm text-default-500">
          Enter your credentials to access your account dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
              className="w-full space-y-1.5"
              name="email"
              isRequired
              isInvalid={Boolean(error)}>
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="name@example.com"
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
          name="password"
          control={control}
          rules={{required: "Password is required"}}
          render={({field, fieldState: {error}}) => (
            <TextField
              className="w-full space-y-1.5"
              name="password"
              isRequired
              isInvalid={Boolean(error)}>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                variant="secondary"
                autoComplete="current-password"
                value={field.value || ""}
                onChange={field.onChange}
              />
              {error && <p className="text-xs text-danger">{error.message}</p>}
            </TextField>
          )}
        />

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            className="w-full font-medium"
            isDisabled={isLoggingIn}
            isLoading={isLoggingIn}>
            {isLoggingIn ? "Signing in..." : "Sign In"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full font-medium"
            onClick={() => reset(defaultValues)}>
            Reset
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default LoginForm;
