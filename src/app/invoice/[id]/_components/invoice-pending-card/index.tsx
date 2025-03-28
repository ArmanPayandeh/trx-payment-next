"use client";

import { AppLogo } from "@/components/app-logo";
import { CopyToClipboard } from "@/components/copy-to-clipboard";
import { QRCode } from "@/components/qr-code";
import { type InvoiceData } from "@/types";
import { CardBody, Divider, Tab, Tabs } from "@nextui-org/react";
import Image from "next/image";
import TronLogo from "~/tron-logo.png";
import { InvoiceDetailsSection } from "../details-section";
import { InvoiceTimer } from "./invoice-timer";
import { PartialPaidNotice } from "./partial-paid-notice";

type Props = {
  data: InvoiceData;
  setIsExpired: React.Dispatch<React.SetStateAction<boolean>>;
};

export const InvoicePendingCard = (props: Props) => {
  const { data, setIsExpired } = props;
  const { address, dueAmount, unconfirmedDueAmount, isPaidPartial, validTill } =
    data;
  const fullAddress = `tron:${address}?amount=${dueAmount}`;
  return (
    <div className="py-2">
      <div className="flex flex-col gap-4 py-2">
        <div className="flex justify-center">
          <AppLogo />
        </div>
        <InvoiceTimer validTill={validTill} setIsExpired={setIsExpired} />
      </div>
      <CardBody className="container flex w-full max-w-screen-md flex-col scrollbar-hide">
        <PartialPaidNotice
          dueAmount={unconfirmedDueAmount}
          isPaidPartial={isPaidPartial}
        />
        <Tabs
          variant="solid"
          className="justify-center"
          aria-label="Tabs variants"
        >
          <Tab key="photos" title="Address">
            <QRCode text={address} />
          </Tab>
          <Tab key="music" title="With Amount">
            <QRCode text={fullAddress} />
          </Tab>
        </Tabs>
        <div className="flex items-center justify-center gap-1">
          <Image
            src={TronLogo}
            alt="tron logo"
            className="shrink-0 rounded-full bg-white"
            width={30}
            height={30}
          />
          <p className="font-medium"> Tron (TRC20)</p>
        </div>
        <Divider className="my-4 h-0.5" />
        <div className="mb-4 flex flex-col gap-2">
          <div>
            <p className="text-sm text-gray-400">Amount: </p>
            <CopyToClipboard
              content={dueAmount.toString()}
              successText="Amount copied to clipboard"
            >
              <p className="text-sm font-medium">{dueAmount} TRX</p>
            </CopyToClipboard>
          </div>

          <div>
            <p className="text-sm text-gray-400">Deposit Address: </p>
            <CopyToClipboard
              content={address}
              successText="Address copied to clipboard"
            >
              <p className="text-sm font-medium">{address}</p>
            </CopyToClipboard>
          </div>
        </div>
        <InvoiceDetailsSection data={data} />
      </CardBody>
    </div>
  );
};
