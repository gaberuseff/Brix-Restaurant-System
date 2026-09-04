import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createModifierGroup} from "../../../services/apiModifires";
import {toast} from "@heroui/react";

function useCreateModifireGroup() {
  const queryClient = useQueryClient();

  const {mutate: createGroup, isPending: isCreating} = useMutation({
    mutationFn: (data) => createModifierGroup(data),

    onSuccess: () => {
      toast.success("Group created successfully");
      queryClient.invalidateQueries({queryKey: ["modifier_groups"]});
    },
    onError: (error) => {
      toast.warning(error.message);
    },
  });

  return {createGroup, isCreating};
}

export default useCreateModifireGroup;
