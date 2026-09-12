import {Spinner} from "@heroui/react";

function LoadingState({message = "Loading..."}) {
  return (
    <div className="flex items-center justify-center gap-2 h-full">
      <Spinner />
      <span>{message}</span>
    </div>
  );
}

export default LoadingState;
