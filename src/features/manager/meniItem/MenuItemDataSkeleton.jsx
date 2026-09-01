import {Card, Separator, Skeleton} from "@heroui/react";

function MenuItemDataSkeleton() {
  return (
    <div className="space-y-6">
      {/* Image Skeleton */}
      <Card className="relative aspect-square w-1/4 p-0 overflow-hidden">
        <Skeleton className="h-full w-full rounded-lg" />
      </Card>

      {/* Form Data Skeleton */}
      <Card className="p-6 space-y-6">
        <div className="flex items-stretch gap-6">
          {/* English Data Skeleton */}
          <div className="flex-1 flex flex-col gap-4">
            <Skeleton className="h-6 w-32 rounded-md" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          </div>

          <Separator orientation="vertical" className="h-auto self-stretch" />

          {/* Arabic Data Skeleton */}
          <div className="flex-1 flex flex-col gap-4">
            <Skeleton className="h-6 w-32 rounded-md" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          </div>
        </div>

        {/* Checkbox Skeleton */}
        <div className="flex items-center gap-3">
          <Skeleton className="size-6 rounded-md" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-3 w-64 rounded-md" />
          </div>
        </div>

        <Separator />

        {/* Buttons Skeleton */}
        <div className="flex w-full gap-2">
          <Skeleton className="h-10 w-32 rounded-lg" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </Card>
    </div>
  );
}

export default MenuItemDataSkeleton;
