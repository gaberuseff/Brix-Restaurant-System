import {toast} from "@heroui/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteMenuItem as deleteMenuItemApi} from "../../../services/apiMenu";

function useDeleteMenuItem() {
  const queryClient = useQueryClient();

  const {mutate: deleteMenuItem, isPending: isDeleting} = useMutation({
    mutationFn: (id) => deleteMenuItemApi(id),
    onSuccess: () => {
      toast.success("Menu item deleted successfully", {
        description: "The item has been removed from the menu.",
      });

      queryClient.invalidateQueries({queryKey: ["menu"]});
    },
    onError: (error) => {
      toast.danger(error?.message || "Failed to delete menu item");
    },
  });

  return {deleteMenuItem, isDeleting};
}

export default useDeleteMenuItem;
