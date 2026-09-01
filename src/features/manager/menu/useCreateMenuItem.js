import {toast} from "@heroui/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createMenuItem as createMenuItemApi} from "../../../services/apiMenu";

function useCreateMenuItem() {
  const queryClient = useQueryClient();

  const {mutate: createMenuItem, isPending: isCreating} = useMutation({
    mutationFn: (newItem) => createMenuItemApi(newItem),
    onSuccess: () => {
      toast.success("Menu item created successfully", {
        description: "The new item has been added to the menu.",
      });

      queryClient.invalidateQueries({queryKey: ["menu"]});
    },
    onError: (error) => {
      toast.danger(error?.message || "Failed to create menu item");
    },
  });

  return {createMenuItem, isCreating};
}

export default useCreateMenuItem;
