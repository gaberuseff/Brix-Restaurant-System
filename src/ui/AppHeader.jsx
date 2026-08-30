import {Button} from "@heroui/react";
import {Logout01Icon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import ModeToggle from "./ModeToggle";

function AppHeader() {
  return (
    <header className="flex justify-between items-center w-full">
      <h1 className="text-xl font-bold tracking-wider text-foreground">BRIX</h1>

      <div className="flex items-center gap-4">
        <ModeToggle />

        <Button
          color="danger"
          isIconOnly
          aria-label="Logout"
          variant="danger-soft">
          <HugeiconsIcon icon={Logout01Icon} size={20} />
        </Button>
      </div>
    </header>
  );
}

export default AppHeader;
