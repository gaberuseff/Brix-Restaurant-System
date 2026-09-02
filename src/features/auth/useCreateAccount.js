import {toast} from "@heroui/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {createAccount as createAccountApi} from "../../services/apiAuth";

function useCreateAccount() {
  const navigate = useNavigate();
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
