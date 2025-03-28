import { APP_ROUTES } from "@/app/config/routes";
import { type InvoiceData } from "@/types";
import { Button, CardBody } from "@nextui-org/react";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { ConfettiSuccess } from "./confetti-success";
import { InvoiceDetailsSection } from "./details-section";

type Props = {
  data: InvoiceData;
};
export const InvoicePaidCard = (props: Props) => {
  const { data } = props;
  const { id } = data;
  return (
    <CardBody className="flex flex-col gap-4 px-2 py-8">
      <div className="flex flex-col items-center gap-4">
        <CircleCheck className="size-14 text-success" strokeWidth={1} />
        <h1 className="text-2xl">Invoice Paid</h1>
      </div>
      <InvoiceDetailsSection data={data} hideDetails={false} />
      <Button
        variant="solid"
        className="text-white"
        radius="full"
        color="success"
        fullWidth
        as={Link}
        href={APP_ROUTES.receipt(id)}
      >
        View Receipt
      </Button>
      <ConfettiSuccess />
    </CardBody>
  );
};
