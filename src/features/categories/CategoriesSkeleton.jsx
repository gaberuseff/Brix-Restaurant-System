import {Card, Skeleton} from "@heroui/react";

function CategoriesSkeleton({count}) {
  return (
    <ul className="grid grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({length: count}).map((_, index) => (
        <Card key={index} className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-1/2 rounded-md" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
          <Skeleton className="h-4 w-4/5 rounded-md" />
          <Skeleton className="h-4 w-3/5 rounded-md" />
          <div className="flex gap-2 pt-1">
            <Skeleton className="h-9 w-full rounded-lg" />
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
        </Card>
      ))}
    </ul>
  );
}

export default CategoriesSkeleton;
