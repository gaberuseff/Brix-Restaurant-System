import LoadingState from "./LoadingState";

function PageLoader({message = "Loading page..."}) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoadingState message={message} />
    </div>
  );
}

export default PageLoader;
