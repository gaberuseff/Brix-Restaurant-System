import {Outlet} from "react-router-dom";
import EmployeeHeader from "../ui/EmployeeHeader";

function EmployeeLayout() {
  return (
    <div className="h-screen flex bg-background overflow-hidden text-sm">
      <div className="flex flex-col grow min-h-0">
        <div className="px-4 md:px-12 py-3 shrink-0 flex items-center justify-between">
          <EmployeeHeader />
        </div>

        <div className="flex-1 min-h-0 px-4 py-4 overflow-hidden flex flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default EmployeeLayout;
