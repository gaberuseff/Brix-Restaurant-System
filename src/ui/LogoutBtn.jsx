import {Button, Spinner} from "@heroui/react";
import {Logout01Icon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import useLogout from "../features/auth/useLogout";

function LogoutBtn() {
  const {logout, isLoggingOut} = useLogout();

  return (
    <Button
      color="danger"
      isIconOnly
      aria-label="Logout"
      variant="danger-soft"
      disabled={isLoggingOut}
      onClick={logout}>
      {isLoggingOut ? (
        <Spinner size={20} />
      ) : (
        <HugeiconsIcon icon={Logout01Icon} size={18} />
      )}
    </Button>
  );
}

export default LogoutBtn;
