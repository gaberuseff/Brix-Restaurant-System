import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@heroui/react";
import {updateModifier} from "../../../services/apiModifires";

function useUpdateModifier() {
  const queryClient = useQueryClient();

  const {mutate: updateMod, isPending: isUpdating} = useMutation({
    mutationFn: updateModifier,
    onSuccess: () => {
      toast.success("Modifier updated successfully");
      queryClient.invalidateQueries({queryKey: ["modifiers"]});
      queryClient.invalidateQueries({queryKey: ["menuItem"]});
    },
    onError: (error) => {
      toast.warning(error.message);
    },
  });

  return {updateMod, isUpdating};
}

export default useUpdateModifier;
