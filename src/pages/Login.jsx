import LoginForm from "../features/auth/LoginForm";

function Login() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-6 md:p-12 relative z-10">
        <LoginForm />
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative h-full">
        <img
          src="/login-bg.jpg"
          alt="Restaurant Interior"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

        <div className="relative z-10 flex flex-col justify-end p-12 text-white mt-auto">
          <h2 className="text-4xl font-bold tracking-tight">Welcome to BRIX</h2>
          <p className="mt-3 text-sm text-gray-300 max-w-md leading-relaxed">
            Manage your menu, categories, staff, and POS operations with
            ultimate control and modern aesthetics.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
