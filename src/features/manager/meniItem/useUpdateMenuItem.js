import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateMenuItem as updateMenuItemAPI} from "../../../services/apiMenuItem";
import {toast} from "@heroui/react";

function useUpdateMenuItem() {
  const queryClient = useQueryClient();
  const {
    mutateAsync: mutateUpdateMenuItem,
    isPending: isUpdateMenuItemPending,
  } = useMutation({
    mutationFn: ({menuItemId, updates}) => updateMenuItem(menuItemId, updates),

    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["menu"]});
      toast.success("Menu item updated successfully");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {mutateUpdateMenuItem, isUpdateMenuItemPending};
}

export default useUpdateMenuItem;
