import {Outlet} from "react-router-dom";
import AppNav from "./AppNav";
import AppHeader from "./AppHeader";

function AppLayout() {
  return (
    <div className="h-screen flex bg-background">
      <div className="shrink-0 px-3 py-4 border-r flex flex-col items-center">
        <AppNav />
      </div>

      <div className="flex flex-col grow">
        <div className="px-4 md:px-12 py-4 shrink-0 flex items-center justify-between border-b">
          <AppHeader />
        </div>

        <div className="overflow-auto px-4 md:px-12 py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
