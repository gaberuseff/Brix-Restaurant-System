import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@heroui/react";
import {updateModifierGroup} from "../../../services/apiModifires";

function useUpdateModifireGroup() {
  const queryClient = useQueryClient();

  const {mutate: updateGroup, isPending: isUpdating} = useMutation({
    mutationFn: updateModifierGroup,
    onSuccess: () => {
      toast.success("Group updated successfully");
      queryClient.invalidateQueries({queryKey: ["modifier_groups"]});
    },
    onError: (error) => {
      toast.warning(error.message);
    },
  });

  return {updateGroup, isUpdating};
}

export default useUpdateModifireGroup;
