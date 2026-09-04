import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@heroui/react";
import {disconnectModifierGroup as disconnectModifierGroupApi} from "../../../services/apiMenuItem";

function useDisconnectModifierGroup() {
  const queryClient = useQueryClient();

  const {mutate: disconnectModifierGroup, isPending: isDisconnecting} = useMutation({
    mutationFn: disconnectModifierGroupApi,
    onSuccess: () => {
      toast.success("Modifier group removed successfully");
      queryClient.invalidateQueries({queryKey: ["menuItem"]});
    },
    onError: (err) => {
      toast.warning(err.message);
    },
  });

  return {disconnectModifierGroup, isDisconnecting};
}

export default useDisconnectModifierGroup;
