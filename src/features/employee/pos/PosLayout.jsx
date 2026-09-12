import PosCart from "./PosCart";
import PosFilter from "./PosFilter";
import PosMenu from "./PosMenu";

function PosLayout() {
  return (
    <div className="flex gap-4 h-full min-h-0 overflow-hidden">
      {/* 1. Left Sidebar: Categories Filter */}
      <div className="w-38 shrink-0 h-full overflow-y-auto no-scrollbar">
        <PosFilter />
      </div>

      {/* 2. Middle Content: Menu Items */}
      <div className="flex-1 h-full overflow-y-auto no-scrollbar min-h-0 min-w-0">
        <PosMenu />
      </div>

      {/* 3. Right Sidebar: Cart */}
      <div className="w-[360px] shrink-0 flex flex-col h-full overflow-hidden">
        <PosCart />
      </div>
    </div>
  );
}

export default PosLayout;
