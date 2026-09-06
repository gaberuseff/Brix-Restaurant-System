import LoginForm from "../features/auth/LoginForm";
import Heading from "../ui/Heading";

function Login() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <div
        className="flex w-full  flex-col items-center 
        justify-center p-6 md:p-12 relative z-10">
        <div className="mb-4 flex flex-col items-center gap-2">
          <Heading as="h1">Login to your account</Heading>
          <span className="text-muted-foreground">
            Please enter your credentials to access your account
          </span>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
