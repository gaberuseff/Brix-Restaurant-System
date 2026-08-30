import {StoreRemove01Icon} from "@hugeicons/core-free-icons";
import EmpryState from "../../ui/EmpryState";
import ErrorState from "../../ui/ErrorState";
import BranchItem from "./BranchItem";
import BranchSkeleton from "./BranchSkeleton";
import useBranches from "./useBranches";

function BranchesList() {
  const {isLoading, error, branches, refetch} = useBranches();

  if (isLoading) return <BranchSkeleton count={6} />;

  if (error)
    return (
      <ErrorState
        message={error.message || "Failed to fetch branches."}
        onRetry={refetch}
      />
    );

  if (branches.length === 0)
    return (
      <EmpryState
        icon={StoreRemove01Icon}
        title="No Branches Found"
        description="Add your first branch to get started"
      />
    );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {branches.map((branch) => (
        <BranchItem key={branch.id} branch={branch} />
      ))}
    </div>
  );
}

export default BranchesList;
