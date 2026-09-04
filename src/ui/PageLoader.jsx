import {Spinner} from "@heroui/react";

function PageLoader() {
  return (
    <div className="flex items-center justify-center gap-2 h-screen">
      <Spinner />
      <p className="text-sm">Loading...</p>
    </div>
  );
}

export default PageLoader;
