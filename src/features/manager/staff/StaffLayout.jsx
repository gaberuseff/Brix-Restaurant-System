import Heading from "../../../ui/Heading.jsx";
import StaffDrawer from "./StaffDrawer.jsx";
import StaffTable from "./StaffTable.jsx";

function StaffLayout() {
  return (
    <div className="space-y-6">
      <Heading as="h1">Staff</Heading>

      <div className="flex flex-col gap-4">
        <StaffDrawer />
        <StaffTable />
      </div>
    </div>
  );
}

export default StaffLayout;
