import {Button} from "@heroui/react";
import {DatabaseSyncIcon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import useInitialSync from "../features/employee/pos/useInitialSync";

function SyncBtn() {
  const {syncData, isSyncing} = useInitialSync();

  return (
    <Button
      isIconOnly
      variant="secondary"
      aria-label="Sync Data"
      title="Sync Data"
      isDisabled={isSyncing}
      onClick={() => syncData()}>
      <HugeiconsIcon
        icon={DatabaseSyncIcon}
        size={20}
        className={isSyncing ? "animate-spin" : ""}
      />
    </Button>
  );
}

export default SyncBtn;
