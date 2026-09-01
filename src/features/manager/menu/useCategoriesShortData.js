import {useQuery} from "@tanstack/react-query";
import {getCategoriesShort} from "../../../services/apiCategories";

function useCategoriesShortData() {
  const {data: categoriesShort, isPending: isLoadingShort} = useQuery({
    queryKey: ["categories-short"],
    queryFn: getCategoriesShort,
  });

  return {categoriesShort, isLoadingShort};
}

export default useCategoriesShortData;
