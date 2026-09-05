import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@heroui/react";
import {updateMenuItem as updateMenuItemApi} from "../../../services/apiMenuItem";

function useUpdateMenuItem() {
  const queryClient = useQueryClient();

  const {mutate: updateMenuItem, isPending: isUpdating} = useMutation({
    mutationFn: ({id, ...updatedData}) =>
      updateMenuItemApi({id, ...updatedData}),
    onSuccess: () => {
      toast.success("Menu item updated successfully", {
        description: "The item details have been updated.",
      });

      queryClient.invalidateQueries({queryKey: ["menu"]});
    },
    onError: (error) => {
      toast.danger(error?.message || "Failed to update menu item");
    },
  });

  return {updateMenuItem, isUpdating};
}

export default useUpdateMenuItem;
