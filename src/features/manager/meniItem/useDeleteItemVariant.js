import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteMenuItemVariant as deleteMenuItemVariantAPI} from "../../../services/apiMenuItem";
import {toast} from "@heroui/react";

function useDeleteItemVariant() {
  const queryClient = useQueryClient();

  const {mutate: deleteMenuItemVariant, isPending: isDeleting} = useMutation({
    mutationFn: deleteMenuItemVariantAPI,

    onSuccess: () => {
      toast.success("Variant deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["product-variants"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {deleteMenuItemVariant, isDeleting};
}

export default useDeleteItemVariant;
