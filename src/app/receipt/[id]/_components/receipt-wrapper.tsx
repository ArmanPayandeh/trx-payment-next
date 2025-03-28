"use client";

import { FetchError } from "@/components/fetch-error";
import { api, type RouterOutputs } from "@/trpc/react";
import React from "react";
import { InvoiceSummary } from "./invoice-summary";
import { ReceiptLoadingSkeleton } from "./loading-skeleton";
import { PaymentTransactions } from "./payment-transactions";

type Props = {
  id: string;
};

export type ReceiptOutput = RouterOutputs["invoice"]["getReceipt"];

export const ReceiptWrapper = (props: Props) => {
  const { id } = props;
  const { data, isPending, error } = api.invoice.getReceipt.useQuery({
    id,
  });
  if (isPending) return <ReceiptLoadingSkeleton />;
  if (error) return <FetchError error={error} />;
  return (
    <>
      <InvoiceSummary data={data} />
      <PaymentTransactions data={data} />
    </>
  );
};
