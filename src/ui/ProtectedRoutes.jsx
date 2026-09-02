import {Navigate, Outlet} from "react-router-dom";
import useUser from "../features/auth/useUser";
import PageLoader from "./PageLoader";
import {PATHS} from "../routes/paths";

function ProtectedRoutes({allowedRole}) {
  const {isAuthenticated, isUserLoading, role, isManager, isEmployee} =
    useUser();

  if (isUserLoading) {
    return <PageLoader message="Checking authentication..." />;
  }

  // 1. Not logged in -> Redirect to login page
  if (!isAuthenticated) {
    return <Navigate to={PATHS.AUTH.LOGIN} replace />;
  }

  // 2. Logged in entry point (no specific allowedRole passed) -> Redirect to user's dashboard based on role
  if (!allowedRole) {
    if (isEmployee) {
      return <Navigate to={PATHS.EMPLOYEE.POS} replace />;
    }
    return <Navigate to={PATHS.MANAGER.ROOT} replace />;
  }

  // 3. Logged in but role does not match allowedRole for this layout section
  if (allowedRole && role !== allowedRole) {
    if (isEmployee) {
      return <Navigate to={PATHS.EMPLOYEE.POS} replace />;
    }
    if (isManager) {
      return <Navigate to={PATHS.MANAGER.ROOT} replace />;
    }
  }

  return <Outlet />;
}

export default ProtectedRoutes;
