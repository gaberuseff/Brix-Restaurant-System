import Heading from "../../../ui/Heading";
import RefetchBtn from "../../../ui/RefetchBtn";
import MenuDrawer from "./MenuDrawer";
import MenuList from "./MenuList";
import MenuOperations from "./MenuOperations";
import useMenu from "./useMenu";

function MenuLayout() {
  const {refetchMenu, isMenuFetching} = useMenu();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Heading as="h1">Menu</Heading>
        <MenuDrawer />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <MenuOperations />
          <RefetchBtn refetch={refetchMenu} isLoading={isMenuFetching} />
        </div>
        <MenuList />
      </div>
    </div>
  );
}

export default MenuLayout;
