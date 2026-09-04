import {Card, Separator, Skeleton} from "@heroui/react";

function MenuSkeletonCard() {
  return (
    <Card className="p-0 overflow-hidden flex flex-col h-full">
      {/* 1. Image Skeleton */}
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Skeleton className="h-full w-full rounded-none" />
        {/* Category Chip Badge Skeleton */}
        <div className="absolute top-3 left-3">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>

      {/* 2. Content Skeleton */}
      <div className="flex flex-col justify-between grow p-4 gap-3">
        <div className="space-y-1.5">
          {/* Title & Availability Badge */}
          <div className="flex items-start justify-between gap-2">
            <Skeleton className="h-6 w-2/3 rounded-md" />
            <Skeleton className="h-6 w-20 shrink-0 rounded-full" />
          </div>

          {/* Description */}
          <div className="space-y-1 pt-1">
            <Skeleton className="h-3.5 w-full rounded-md" />
            <Skeleton className="h-3.5 w-4/5 rounded-md" />
          </div>
        </div>

        <Separator orientation="horizontal" className="my-2" />

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {/* Delete Icon Button */}
          <Skeleton className="h-10 w-10 shrink-0 rounded-medium" />
          {/* View Item Button */}
          <Skeleton className="h-10 flex-1 rounded-medium" />
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
