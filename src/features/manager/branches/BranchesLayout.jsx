import Heading from "../../../ui/Heading";
import BranchDrawer from "./BranchDrawer";
import BranchesList from "./BranchesList";

function BranchesLayout() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Heading as="h1">Branches</Heading>
        <BranchDrawer />
      </div>

      <div>
        <BranchesList />
      </div>
    </div>
  );
}

export default BranchesLayout;
