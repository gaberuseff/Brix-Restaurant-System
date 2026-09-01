import {toast} from "@heroui/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCategory as deleteCategoryApi} from "../../../services/apiCategories";

function useDeleteCategory() {
  const queryClient = useQueryClient();

  const {mutate: deleteCategory, isPending: isDeleting} = useMutation({
    mutationFn: (id) => deleteCategoryApi(id),
    onSuccess: () => {
      toast.success("Category deleted successfully", {
        description: "The category has been removed.",
      });

      queryClient.invalidateQueries({queryKey: ["categories"]});
    },
    onError: (error) => {
      toast.danger(error?.message || "Failed to delete category");
    },
  });

  return {deleteCategory, isDeleting};
}

export default useDeleteCategory;
