import {toast} from "@heroui/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateCategory as updateCategoryApi} from "../../../services/apiCategories";

function useUpdateCategory() {
  const queryClient = useQueryClient();

  const {mutate: updateCategory, isPending: isUpdating} = useMutation({
    mutationFn: ({id, ...updatedData}) =>
      updateCategoryApi({id, ...updatedData}),
    onSuccess: () => {
      toast.success("Category updated successfully", {
        description: "The category details have been updated.",
      });

      queryClient.invalidateQueries({queryKey: ["categories"]});
    },
    onError: (error) => {
      toast.danger(error?.message || "Failed to update category");
    },
  });

  return {updateCategory, isUpdating};
}

export default useUpdateCategory;
