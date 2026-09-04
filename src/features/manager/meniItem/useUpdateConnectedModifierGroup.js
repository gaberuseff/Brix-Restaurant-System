import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@heroui/react";
import {updateConnectedModifierGroup as updateConnectedModifierGroupApi} from "../../../services/apiMenuItem";

function useUpdateConnectedModifierGroup() {
  const queryClient = useQueryClient();

  const {mutate: updateConnectedModifierGroup, isPending: isUpdating} = useMutation({
    mutationFn: updateConnectedModifierGroupApi,
    onSuccess: () => {
      toast.success("Modifier group updated successfully");
      queryClient.invalidateQueries({queryKey: ["menuItem"]});
    },
    onError: (err) => {
      toast.warning(err.message);
    },
  });

  return {updateConnectedModifierGroup, isUpdating};
}

export default useUpdateConnectedModifierGroup;
