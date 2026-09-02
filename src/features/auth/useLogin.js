import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {toast} from "@heroui/react";
import {login as loginApi} from "../../services/apiAuth";
import {PATHS} from "../../routes/paths";

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {mutate: login, isPending: isLoggingIn} = useMutation({
    mutationFn: ({email, password}) => loginApi({email, password}),

    onSuccess: (data) => {
      const userName = data.user?.user_metadata?.full_name || "User";

      toast.success(`Welcome, ${userName}!`);
      queryClient.setQueryData(["user"], data.user);

      // Navigate to entry route; ProtectedRoutes handles role-based dashboard redirection automatically
      navigate("/", {replace: true});
    },

    onError: (err) => {
      toast.warning(err.message || "Failed to log in");
    },
  });

  return {login, isLoggingIn};
}

export default useLogin;
