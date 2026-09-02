import {Button} from "@heroui/react";
import {ArrowLeft02Icon, Home01Icon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {useNavigate} from "react-router-dom";
import {PATHS} from "../routes/paths";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background px-6 py-12 text-center">
      <div className="flex flex-col items-center max-w-md space-y-6">
        <div className="flex items-center justify-center">
          <span className="text-8xl font-black">404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Page Not Found
          </h1>
          <p className="text-sm md:text-base text-default-500 leading-relaxed">
            Sorry, the page you are looking for doesn't exist, has been removed,
            or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
          <Button
            variant="secondary"
            className="w-full sm:w-auto flex-1 font-medium"
            onClick={() => navigate(-1)}>
            <HugeiconsIcon icon={ArrowLeft02Icon} size={18} />
            Go Back
          </Button>
          <Button
            color="primary"
            className="w-full sm:w-auto flex-1 font-medium"
            onClick={() => navigate(PATHS.MANAGER.ROOT)}>
            <HugeiconsIcon icon={Home01Icon} size={18} />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
