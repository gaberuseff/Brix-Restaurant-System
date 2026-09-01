import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateMenuItem as updateMenuItemAPI} from "../../../services/apiMenuItem";
import {toast} from "@heroui/react";

function useUpdateMenuItem() {
  const queryClient = useQueryClient();
  const {
    mutateAsync: mutateUpdateMenuItem,
    isPending: isUpdateMenuItemPending,
  } = useMutation({
    mutationFn: ({menuItemId, updates}) =>
      updateMenuItemAPI(menuItemId, updates),

    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["menu"]});
      toast.success("Menu item updated successfully");
    },

    onError: (err) => {
      toast.danger(err?.message || "Failed to update menu item");
    },
  });

  return {mutateUpdateMenuItem, isUpdateMenuItemPending};
}

export default useUpdateMenuItem;
