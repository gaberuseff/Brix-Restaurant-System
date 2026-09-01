import MenuDrawer from "./MenuDrawer";
import MenuList from "./MenuList";
import MenuOperations from "./MenuOperations";

function MenuLayout() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl">Menu</h1>
        <MenuDrawer />
      </div>

      <div className="space-y-4">
        <MenuOperations />
        <MenuList />
      </div>
    </div>
  );
}

export default MenuLayout;
