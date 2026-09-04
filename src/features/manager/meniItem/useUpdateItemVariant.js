import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateMenuItemVariant as updateMenuItemVariantAPI} from "../../../services/apiMenuItem";
import {toast} from "@heroui/react";

function useUpdateItemVariant() {
  const queryClient = useQueryClient();

  const {mutate: updateMenuItemVariant, isPending: isUpdating} = useMutation({
    mutationFn: updateMenuItemVariantAPI,

    onSuccess: () => {
      toast.success("Variant updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["product-variants"],
      });
    },

    onError: (error) => {
      toast.warning(error.message);
    },
  });

  return {updateMenuItemVariant, isUpdating};
}

export default useUpdateItemVariant;
