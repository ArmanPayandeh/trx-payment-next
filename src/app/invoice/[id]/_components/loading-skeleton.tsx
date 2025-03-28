import { CardBody, Skeleton } from "@nextui-org/react";

export const InvoiceLoadingSkeleton = () => {
  return (
    <CardBody className="flex w-full max-w-sm flex-col gap-4">
      {new Array(7).fill(null).map((item, index) => {
        return <Skeleton className="h-12 w-full rounded-lg" key={index} />;
      })}
    </CardBody>
  );
};
