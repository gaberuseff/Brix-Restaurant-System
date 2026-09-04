import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@heroui/react";
import {connectModifierGroup as connectModifierGroupApi} from "../../../services/apiMenuItem";

function useConnectModifierGroup() {
  const queryClient = useQueryClient();

  const {mutate: connectModifierGroup, isPending: isConnecting} = useMutation({
    mutationFn: connectModifierGroupApi,
    onSuccess: () => {
      toast.success("Modifier group connected successfully");
      queryClient.invalidateQueries({queryKey: ["menuItem"]});
    },
    onError: (err) => {
      toast.warning(err.message);
    },
  });

  return {connectModifierGroup, isConnecting};
}

export default useConnectModifierGroup;
