import { INVOICE_VALID_DURATION } from "@/server/config";
import { CardBody } from "@nextui-org/react";
import { CircleAlert } from "lucide-react";
import Image from "next/image";
import ExpiredImg from "~/expired.webp";

export const InvoiceExpired = () => {
  return (
    <CardBody className="flex flex-col items-center gap-4 py-12">
      <h1 className="text-2xl font-semibold">Invoice Expired</h1>
      <Image src={ExpiredImg} alt="expired" className="size-28" />
      <p>An invoice is only valid for {INVOICE_VALID_DURATION} minutes.</p>
      <div className="mt-4 flex gap-2 rounded-md bg-content2 px-2 py-4 text-sm font-normal text-gray-400">
        <CircleAlert className="shrink-0" size={18} />
        <p className="text-foreground-400">
          No payment was detected within the given time. To pay for your order,
          please restart the payment process.
        </p>
      </div>
    </CardBody>
  );
};
