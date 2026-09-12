import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";
import {menuRepository} from "../../../repositories/menu.repository";

function usePosMenu() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "all";

  const {
    data: menu = [],
    isPending: isPosMenuLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["pos-menu", categoryFilter],
    queryFn: () => menuRepository.getAll(categoryFilter),
    staleTime: 1000 * 60 * 5,
  });

  return {menu, isPosMenuLoading, error, refetch};
}

export default usePosMenu;
