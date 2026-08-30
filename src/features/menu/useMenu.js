import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";
import {getMenuItems} from "../../services/apiMenu";

function useMenu() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "all";
  const availabilityFilter = searchParams.get("is_available") || "all";

  const {
    data: menu,
    isPending: isMenuLoading,
    isError: isMenuError,
  } = useQuery({
    queryKey: ["menu", categoryFilter, availabilityFilter],
    queryFn: () => getMenuItems(categoryFilter, availabilityFilter),
  });

  return {menu, isMenuLoading, isMenuError};
}

export default useMenu;
