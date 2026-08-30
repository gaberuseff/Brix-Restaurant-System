import {Button} from "@heroui/react";
import {Moon02Icon, Sun02Icon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {useDarkMode} from "../context/DarkModeContext";

function ModeToggle() {
  const {isDarkMode, toggleDarkMode} = useDarkMode();

  return (
    <Button
      isIconOnly
      aria-label={isDarkMode ? "Switch to Light mode" : "Switch to Dark mode"}
      variant="tertiary"
      onClick={toggleDarkMode}>
      <HugeiconsIcon icon={isDarkMode ? Sun02Icon : Moon02Icon} size={20} />
    </Button>
  );
}

export default ModeToggle;
