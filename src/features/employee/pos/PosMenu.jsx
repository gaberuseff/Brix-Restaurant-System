import {Menu06Icon} from "@hugeicons/core-free-icons";
import EmpryState from "../../../ui/EmpryState";
import ErrorState from "../../../ui/ErrorState";
import LoadingState from "../../../ui/LoadingState";
import PosMenuItem from "./PosMenuItem";
import usePosMenu from "./usePosMenu";

function PosMenu() {
  const {menu, isPosMenuLoading, error, refetch} = usePosMenu();

  if (isPosMenuLoading) {
    return <LoadingState message="جاري مزامنة البيانات..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="حدث خطأ أثناء مزامنة البيانات"
        action={refetch}
        actionText="إعادة المحاولة"
      />
    );
  }

  if (menu.length === 0) {
    return (
      <EmpryState
        title="No Menu Found"
        icon={Menu06Icon}
        description="No menu items found in the database."
      />
    );
  }

  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
      {menu.map((item) => (
        <PosMenuItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default PosMenu;
