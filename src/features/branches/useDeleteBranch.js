import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteBranch as deleteBranchApi} from "../../services/apiBranches";
import {toast} from "@heroui/react";

function useDeleteBranch() {
  const queryClient = useQueryClient();

  const {mutate: deleteBranch, isPending: isDeleting} = useMutation({
    mutationFn: (id) => deleteBranchApi(id),
    onSuccess: () => {
      toast.success("Branch deleted successfully", {
        description: "The branch has been removed.",
      });

      queryClient.invalidateQueries({queryKey: ["branches"]});
    },
    onError: (error) => {
      toast.danger(error?.message || "Failed to delete branch");
    },
  });

  return {deleteBranch, isDeleting};
}

export default useDeleteBranch;
