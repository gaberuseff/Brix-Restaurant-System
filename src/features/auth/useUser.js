import {useQuery} from "@tanstack/react-query";
import {getCurrentUser} from "../../services/apiAuth";

function useUser() {
  const {data: user, isPending: isUserLoading} = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const userRole = user?.user_metadata?.role?.toLowerCase() || "undefined";

  return {
    user,
    isUserLoading,
    isAuthenticated: user?.role === "authenticated",
    role: userRole,
    isManager: userRole === "manager",
    isEmployee: userRole === "employee",
  };
}

export default useUser;
