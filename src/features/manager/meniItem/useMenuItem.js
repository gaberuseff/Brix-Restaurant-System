import {useQuery} from "@tanstack/react-query";
import {getMenuItem} from "../../../services/apiMenuItem";

function useMenuItem(id) {
  const {
    data: menuItem = {},
    isPending: isMenuItemLoading,
    isError,
  } = useQuery({
    queryKey: ["menuItem", id],
    queryFn: () => getMenuItem(id),
    retry: false,
  });

  const variants = menuItem?.product_variants || [];
  const modifierGroups = menuItem?.product_modifier_groups || [];

  return {menuItem, variants, modifierGroups, isMenuItemLoading, isError};
}

export default useMenuItem;
