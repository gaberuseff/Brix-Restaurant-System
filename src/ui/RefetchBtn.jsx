import {Button} from "@heroui/react";
import {ReloadIcon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";

function RefetchBtn({refetch, isLoading = false}) {
  return (
    <Button
      isIconOnly
      variant="secondary"
      aria-label="Refresh data"
      isDisabled={isLoading}
      onClick={() => refetch?.()}>
      <HugeiconsIcon
        icon={ReloadIcon}
        size={18}
        className={isLoading ? "animate-spin" : ""}
      />
    </Button>
  );
}

export default RefetchBtn;
