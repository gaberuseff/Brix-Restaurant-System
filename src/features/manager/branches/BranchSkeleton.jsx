import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@heroui/react";

function BranchSkeletonCard() {
  return (
    <Card>
      <CardHeader className="space-y-2">
        {/* Branch Title Skeleton */}
        <Skeleton className="h-5 w-3/5 rounded-md" />
        {/* Branch Address Skeleton */}
        <Skeleton className="h-4 w-4/5 rounded-md" />
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Phone Row */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-3.5 w-3.5 rounded-full" />
          <Skeleton className="h-3.5 w-1/3 rounded-md" />
        </div>

        {/* Status Chip & Time Row */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-16 rounded-full" />
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-3.5 w-3.5 rounded-full" />
            <Skeleton className="h-3.5 w-24 rounded-md" />
          </div>
        </div>

        {/* Location Row */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-3.5 w-12 rounded-md" />
          <Skeleton className="h-3.5 w-16 rounded-md" />
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        {/* Edit Button Skeleton */}
        <Skeleton className="h-9 w-full rounded-lg" />
        {/* Delete Button Skeleton */}
        <Skeleton className="h-9 w-full rounded-lg" />
      </CardFooter>
    </Card>
  );
}

function BranchSkeleton({count = 6}) {
  if (count > 1) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({length: count}).map((_, index) => (
          <BranchSkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return <BranchSkeletonCard />;
}

export default BranchSkeleton;
