import {useQuery} from "@tanstack/react-query";
import {getMenuItemVariants} from "../../../services/apiMenuItem";

function useItemVariants(productId) {
  const {
    data: variants,
    isPending: isVariantsLoading,
    isError: isVariantsError,
  } = useQuery({
    queryKey: ["product-variants", productId],
    queryFn: () => getMenuItemVariants(productId),
  });
  return {variants, isVariantsLoading, isVariantsError};
}

export default useItemVariants;
