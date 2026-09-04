import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@heroui/react";
import {deleteModifierGroup} from "../../../services/apiModifires";

function useDeleteModifireGroup() {
  const queryClient = useQueryClient();

  const {mutate: deleteGroup, isPending: isDeleting} = useMutation({
    mutationFn: (id) => deleteModifierGroup(id),
    onSuccess: () => {
      toast.success("Group deleted successfully");
      queryClient.invalidateQueries({queryKey: ["modifier_groups"]});
    },
    onError: (error) => {
      toast.warning(error.message);
    },
  });

  return {deleteGroup, isDeleting};
}

export default useDeleteModifireGroup;
