import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createAccount as createAccountApi} from "../../services/apiAuth";
import {toast} from "@heroui/react";

function useCreateAccount() {
  const queryClient = useQueryClient();

  const {mutate: createAccount, isPending: isCreating} = useMutation({
    mutationFn: (data) => createAccountApi(data),

    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({queryKey: ["account"]});
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {createAccount, isCreating};
}

export default useCreateAccount;
