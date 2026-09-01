import {useQuery} from "@tanstack/react-query";
import {getMenuItem} from "../../../services/apiMenuItem";

function useMenuItem(id) {
  const {
    data: menuItem,
    isPending: isMenuItemLoading,
    isError,
  } = useQuery({
    queryKey: ["menuItem", id],
    queryFn: () => getMenuItem(id),
    retry: false,
  });

  return {menuItem, isMenuItemLoading, isError};
}

export default useMenuItem;
