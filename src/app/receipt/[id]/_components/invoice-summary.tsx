"use client";

import { APP_ROUTES } from "@/app/config/routes";
import { formatTrx } from "@/app/utils";
import { CopyToClipboard } from "@/components/copy-to-clipboard";
import { QRCode } from "@/components/qr-code";
import { Card, CardBody } from "@nextui-org/react";
import { type ReceiptOutput } from "./receipt-wrapper";

type Props = {
  data: ReceiptOutput;
};

export const InvoiceSummary = (props: Props) => {
  const { data } = props;
  const { amount, updatedAt, address, paidAmount, id } = data;
  const url = APP_ROUTES.receipt(id);

  const listItems = [
    {
      label: "Address",
      value: (
        <CopyToClipboard
          content={address}
          successText="Address copied to clipboard"
        >
          {address}
        </CopyToClipboard>
      ),
    },
    {
      label: "Amount",
      value: formatTrx(amount),
    },
    {
      label: "Paid Amount",
      value: formatTrx(paidAmount),
    },
    {
      label: "Date",
      value: new Date(updatedAt).toLocaleString(),
    },
  ];

  return (
    <Card>
      <CardBody className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex justify-center">
          <QRCode text={url} />
        </div>
        <div className="flex flex-col justify-center gap-4">
          {listItems.map((item) => (
            <div className="flex flex-col gap-0.5" key={item.label}>
              <div className="text-sm font-medium text-foreground-400">
                {item.label}
              </div>
              <div className="font-semibold">{item.value}</div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
