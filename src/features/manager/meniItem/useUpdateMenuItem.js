import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateMenuItem as updateMenuItemAPI} from "../../../services/apiMenuItem";
import {toast} from "@heroui/react";

function useUpdateMenuItem() {
  const queryClient = useQueryClient();
  const {
    mutate: mutateUpdateMenuItem,
    isPending: isUpdateMenuItemPending,
  } = useMutation({
    mutationFn: ({menuItemId, updates}) =>
      updateMenuItemAPI(menuItemId, updates),

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({queryKey: ["menu"]});
      queryClient.invalidateQueries({queryKey: ["menuItem"]});
      toast.success("Menu item updated successfully");
    },

    onError: (err) => {
      toast.warning(err?.message || "Failed to update menu item");
    },
  });

  return {mutateUpdateMenuItem, isUpdateMenuItemPending};
}

export default useUpdateMenuItem;
