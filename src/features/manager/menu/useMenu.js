import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";
import {getMenuItems} from "../../../services/apiMenu";

function useMenu() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "all";
  const availabilityFilter = searchParams.get("is_available") || "all";
  const page = searchParams.get("page") || 1;

  const {
    data: {data: menu, count} = {},
    isPending: isMenuLoading,
    isError: isMenuError,
  } = useQuery({
    queryKey: ["menu", categoryFilter, availabilityFilter, page],
    queryFn: () => getMenuItems(categoryFilter, availabilityFilter, page),
  });

  return {menu, count, isMenuLoading, isMenuError};
}

export default useMenu;
