import {lazy, Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import LoadingState from "./ui/LoadingState";

const Branches = lazy(() => import("./pages/Branches"));
const Categories = lazy(() => import("./pages/Categories"));
const Menu = lazy(() => import("./pages/Menu"));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center">
            <LoadingState message="Loading page..." />
          </div>
        }>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/orders" element={<h1>Orders</h1>} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/staff" element={<h1>Staff</h1>} />
            <Route path="/users" element={<h1>Users</h1>} />
            <Route path="/pos" element={<h1>POS</h1>} />
            <Route path="/settings" element={<h1>Settings</h1>} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
