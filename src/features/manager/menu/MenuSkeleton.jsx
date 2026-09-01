import {Card, Skeleton} from "@heroui/react";

function MenuSkeletonCard() {
  return (
    <Card className="p-0 overflow-hidden flex flex-col h-full">
      {/* 1. Image Skeleton */}
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      {/* 2. Content Skeleton */}
      <div className="p-4 flex flex-col gap-3 grow">
        <div className="space-y-2">
          {/* Title (EN & AR) */}
          <Skeleton className="h-5 w-3/4 rounded-md" />
          <Skeleton className="h-4 w-1/2 rounded-md" />

          {/* Description */}
          <Skeleton className="h-3.5 w-full rounded-md mt-1" />
          <Skeleton className="h-3.5 w-4/5 rounded-md" />
        </div>

        {/* 3. Price & Action Buttons */}
        <div className="mt-auto pt-3 border-t border-separator/60 space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-12 rounded-md" />
            <Skeleton className="h-6 w-20 rounded-md" />
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-9 w-full rounded-lg" />
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </Card>
  );
}

function MenuSkeleton({count = 8}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({length: count}).map((_, index) => (
        <MenuSkeletonCard key={index} />
      ))}
    </div>
  );
}

export default MenuSkeleton;
