import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@heroui/react";
import {deleteModifier as deleteModifierApi} from "../../../services/apiModifires";

function useDeleteModifier() {
  const queryClient = useQueryClient();

  const {mutate: deleteModifier, isPending: isDeleting} = useMutation({
    mutationFn: (id) => deleteModifierApi(id),
    onSuccess: () => {
      toast.success("Modifier deleted successfully");
      queryClient.invalidateQueries({queryKey: ["modifiers"]});
    },
    onError: (error) => {
      toast.warning(error.message);
    },
  });

  return {deleteModifier, isDeleting};
}

export default useDeleteModifier;
