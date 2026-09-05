import {lazy, Suspense} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import BranchesList from "./features/manager/branches/BranchesList";
import Modifires from "./pages/Modifires";
import {PATHS} from "./routes/paths";
import PageLoader from "./ui/PageLoader";
import ProtectedRoutes from "./ui/ProtectedRoutes";

// Lazy-loaded Layouts
const ManagerLayout = lazy(() => import("./layouts/ManagerLayout"));
const EmployeeLayout = lazy(() => import("./layouts/EmployeeLayout"));

// Lazy-loaded Pages
const Login = lazy(() => import("./pages/Login"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const Menu = lazy(() => import("./pages/Menu"));
const MenuItem = lazy(() => import("./pages/MenuItem"));
const Categories = lazy(() => import("./pages/Categories"));
const Branches = lazy(() => import("./pages/Branches"));
const NotFound = lazy(() => import("./pages/NotFound"));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Root Entry Route (Automatic Role Dashboard Redirection) */}
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/"
              element={<PageLoader message="Redirecting to dashboard..." />}
            />
          </Route>

          {/* Manager Routes (/manager) */}
          <Route element={<ProtectedRoutes allowedRole="manager" />}>
            <Route path={PATHS.MANAGER.ROOT} element={<ManagerLayout />}>
              <Route index element={<h1>Manager Dashboard</h1>} />
              <Route path={PATHS.MANAGER.MENU} element={<Menu />} />
              <Route path={PATHS.MANAGER.MENU_ITEM} element={<MenuItem />} />
              <Route path={PATHS.MANAGER.MODIFIERS} element={<Modifires />} />
              <Route path={PATHS.MANAGER.CATEGORIES} element={<Categories />} />
              <Route path={PATHS.MANAGER.BRANCHES} element={<Branches />} />
              <Route path={PATHS.MANAGER.STAFF} element={<h1>Staff</h1>} />
              <Route
                path={PATHS.MANAGER.SETTINGS}
                element={<h1>Settings</h1>}
              />
              <Route path={PATHS.MANAGER.TRASH} element={<h1>Trash</h1>} />
            </Route>
          </Route>

          {/* Employee Routes (/employee) */}
          <Route element={<ProtectedRoutes allowedRole="employee" />}>
            <Route path={PATHS.EMPLOYEE.ROOT} element={<EmployeeLayout />}>
              <Route
                index
                element={<Navigate to={PATHS.EMPLOYEE.POS} replace />}
              />
              <Route path="pos" element={<BranchesList />} />
              <Route path="orders" element={<h1>Employee Orders</h1>} />
            </Route>
          </Route>

          {/* Public Auth Routes */}
          <Route path={PATHS.AUTH.CREATE_ACCOUNT} element={<CreateAccount />} />
          <Route path={PATHS.AUTH.LOGIN} element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
