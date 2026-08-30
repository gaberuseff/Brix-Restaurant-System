import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createBranch as createBranchApi} from "../../services/apiBranches";
import {toast} from "@heroui/react";

function useCreateBranch() {
  const queryClient = useQueryClient();

  const {mutate: createBranch, isPending: isCreating} = useMutation({
    mutationFn: (newBranch) => createBranchApi(newBranch),
    onSuccess: () => {
      toast.success("Branch created successfully", {
        description: "The branch has been added.",
      });

      queryClient.invalidateQueries({queryKey: ["branches"]});
    },
    onError: (error) => {
      toast.danger(error?.message || "Failed to create branch");
    },
  });

  return {createBranch, isCreating};
}

export default useCreateBranch;
