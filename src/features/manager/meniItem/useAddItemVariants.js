import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createMenuItemVariant as createMenuItemVariantAPI} from "../../../services/apiMenuItem";
import {toast} from "@heroui/react";

function useAddItemVariants() {
  const queryClient = useQueryClient();

  const {mutate: createMenuItemVariant, isPending: isCreating} = useMutation({
    mutationFn: createMenuItemVariantAPI,

    onSuccess: () => {
      toast.success("Variant added successfully");
      queryClient.invalidateQueries({
        queryKey: ["product-variants"],
      });
    },

    onError: (error) => {
      toast.danger(error.message);
    },
  });

  return {createMenuItemVariant, isCreating};
}

export default useAddItemVariants;
