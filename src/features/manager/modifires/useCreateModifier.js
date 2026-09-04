import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@heroui/react";
import {createModifier} from "../../../services/apiModifires";

function useCreateModifier() {
  const queryClient = useQueryClient();

  const {mutate: createMod, isPending: isCreating} = useMutation({
    mutationFn: (data) => createModifier(data),
    onSuccess: () => {
      toast.success("Modifier created successfully");
      queryClient.invalidateQueries({queryKey: ["modifiers"]});
      queryClient.invalidateQueries({queryKey: ["menuItem"]});
    },
    onError: (error) => {
      toast.warning(error.message);
    },
  });

  return {createMod, isCreating};
}

export default useCreateModifier;
