import {Card} from "@heroui/react";
import usePosBranch from "../features/employee/pos/usePosBranch";

function RenderBranch() {
  const {branch} = usePosBranch();

  return (
    <Card className="py-1 px-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <p className="text-xs">branch:</p>
          <h2 className="text-xs font-semibold">{branch?.name}</h2>
        </div>
      </div>
    </Card>
  );
}

export default RenderBranch;
