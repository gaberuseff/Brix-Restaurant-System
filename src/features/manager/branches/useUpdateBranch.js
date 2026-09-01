import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateBranch as updateBranchApi} from "../../../services/apiBranches";
import {toast} from "@heroui/react";

function useUpdateBranch() {
  const queryClient = useQueryClient();

  const {mutate: updateBranch, isPending: isUpdating} = useMutation({
    mutationFn: ({id, ...updatedData}) => updateBranchApi({id, ...updatedData}),
    onSuccess: () => {
      toast.success("Branch updated successfully", {
        description: "The branch details have been updated.",
      });

      queryClient.invalidateQueries({queryKey: ["branches"]});
    },
    onError: (error) => {
      toast.danger(error?.message || "Failed to update branch");
    },
  });

  return {updateBranch, isUpdating};
}

export default useUpdateBranch;
