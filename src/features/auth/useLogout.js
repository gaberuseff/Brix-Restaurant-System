import {useNavigate} from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {logout as logoutApi} from "../../services/apiAuth";
import {PATHS} from "../../routes/paths";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {mutate: logout, isPending: isLoggingOut} = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate(PATHS.AUTH.LOGIN);
    },
  });

  return {logout, isLoggingOut};
}

export default useLogout;
