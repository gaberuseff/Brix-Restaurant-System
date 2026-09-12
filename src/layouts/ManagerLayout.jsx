import {Outlet} from "react-router-dom";
import ManagerHeader from "../ui/ManagerHeader";
import ManagerNav from "../ui/ManagerNav";

function ManagerLayout() {
  return (
    <div className="h-screen flex bg-background">
      <div className="shrink-0 px-3 py-4 border-r flex flex-col items-center">
        <ManagerNav />
      </div>

      <div className="flex flex-col grow">
        <div className="px-4 md:px-12 py-4 shrink-0 flex items-center justify-between">
          <ManagerHeader />
        </div>

        <div className="overflow-auto px-4 md:px-12 py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ManagerLayout;
