import {toast} from "@heroui/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createCategory as createCategoryApi} from "../../../services/apiCategories";

function useCreateCategory() {
  const queryClient = useQueryClient();

  const {mutate: createCategory, isPending: isCreating} = useMutation({
    mutationFn: (newCategory) => createCategoryApi(newCategory),
    onSuccess: () => {
      toast.success("Category created successfully", {
        description: "The category has been added.",
      });

      queryClient.invalidateQueries({queryKey: ["categories"]});
    },
    onError: (error) => {
      toast.danger(error?.message || "Failed to create category");
    },
  });

  return {createCategory, isCreating};
}

export default useCreateCategory;
