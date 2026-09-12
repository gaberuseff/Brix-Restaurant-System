import {useQuery} from "@tanstack/react-query";
import {categoryRepository} from "../../../repositories/category.repository";

function usePosCategories() {
  const {
    data: categories = [],
    isPending: isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryRepository.getAll,
    staleTime: 1000 * 60 * 5,
  });

  return {categories, isLoading, error, refetch};
}

export default usePosCategories;
