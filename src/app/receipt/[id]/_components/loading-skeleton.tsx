import { Skeleton } from "@nextui-org/react";

export const ReceiptLoadingSkeleton = () => {
  return (
    <div className="grid gap-2 md:gap-4 lg:gap-8">
      <Skeleton className="h-64 w-full rounded-3xl" />
      <Skeleton className="h-52 w-full rounded-3xl" />
    </div>
  );
};
