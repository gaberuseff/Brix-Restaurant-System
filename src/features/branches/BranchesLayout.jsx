import BranchDrawer from "./BranchDrawer";
import BranchesList from "./BranchesList";

function BranchesLayout() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Branches</h1>
        <BranchDrawer />
      </div>

      <div>
        <BranchesList />
      </div>
    </div>
  );
}

export default BranchesLayout;
