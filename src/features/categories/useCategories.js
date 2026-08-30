import {useQuery} from "@tanstack/react-query";
import {getCategories} from "../../services/apiCategories";

function useCategories() {
  const {
    data: categories,
    isPending: isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return {categories, isLoading, error, refetch};
}

export default useCategories;
