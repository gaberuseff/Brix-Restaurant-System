import Heading from "../../../ui/Heading";
import MenuDrawer from "./MenuDrawer";
import MenuList from "./MenuList";
import MenuOperations from "./MenuOperations";

function MenuLayout() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Heading as="h1">Menu</Heading>
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
