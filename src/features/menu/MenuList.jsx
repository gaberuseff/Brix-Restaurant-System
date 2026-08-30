import {Menu01Icon} from "@hugeicons/core-free-icons";
import EmpryState from "../../ui/EmpryState";
import ErrorState from "../../ui/ErrorState";
import MenuItem from "./MenuItem";
import MenuSkeleton from "./MenuSkeleton";
import useMenu from "./useMenu";

function MenuList() {
  const {menu, isMenuLoading, isMenuError} = useMenu();

  if (isMenuLoading) {
    return <MenuSkeleton count={8} />;
  }

  if (isMenuError) return <ErrorState />;

  if (menu?.length === 0) {
    return (
      <EmpryState
        icon={Menu01Icon}
        title="No menu items found"
        description="Get started by adding your first menu item."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {menu.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default MenuList;
