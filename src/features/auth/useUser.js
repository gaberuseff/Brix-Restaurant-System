import {useQuery} from "@tanstack/react-query";
import {getCurrentUser} from "../../services/apiAuth";

function useUser() {
  const {data: user, isPending: isUserLoading} = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    networkMode: "always",
    staleTime: 1000 * 60 * 30,
    retry: false,
  });

  const userRole = user?.user_metadata?.role?.toLowerCase() || "undefined";
  const userFirstName = user?.user_metadata?.full_name?.split(" ")?.[0] || "";

  return {
    user,
    isUserLoading,
    isAuthenticated: Boolean(
      user &&
      (user?.role === "authenticated" ||
        user?.aud === "authenticated" ||
        user?.id),
    ),
    role: userRole,
    isManager: userRole === "manager",
    isEmployee: userRole === "employee",
    firstName: userFirstName,
  };
}

export default useUser;
