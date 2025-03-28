import { NUMBER_OF_CONFIRMATIONS_TO_SUCCESS } from "@/server/config";
import { type InvoiceData } from "@/types";
import { CardBody, CircularProgress } from "@nextui-org/react";
import { ConfettiSuccess } from "./confetti-success";
import { InvoiceDetailsSection } from "./details-section";

type Props = {
  data: InvoiceData;
};
export const InvoiceUnconfirmedPaidCard = (props: Props) => {
  const { data } = props;
  return (
    <CardBody className="py-8">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl">Payment Detected</h1>
        <CircularProgress
          className="animate-spin"
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-primary",
            track: "stroke-white/10",
            value: "hidden",
          }}
          value={70}
          strokeWidth={4}
          showValueLabel
        />
      </div>
      <div className="my-8 flex flex-col gap-4 text-foreground-500">
        <p>Your payment has been detected and is now being processed.</p>
        <p>
          The invoice will be considered settled once the payment transaction
          has received {NUMBER_OF_CONFIRMATIONS_TO_SUCCESS} blockchain
          confirmations.
        </p>
      </div>
      <InvoiceDetailsSection data={data} />
      <ConfettiSuccess />
    </CardBody>
  );
};
