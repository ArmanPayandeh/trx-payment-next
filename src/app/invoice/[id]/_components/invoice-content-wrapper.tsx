"use client";

import { FetchError } from "@/components/fetch-error";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import { InvoiceExpired } from "./invoice-expired";
import { InvoicePaidCard } from "./invoice-paid";
import { InvoicePendingCard } from "./invoice-pending-card";
import { InvoiceUnconfirmedPaidCard } from "./invoice-unconfirmed-paid";
import { InvoiceLoadingSkeleton } from "./loading-skeleton";

type Props = {
  id: string;
};

export const InvoiceCardWrapper = (props: Props) => {
  const { id } = props;
  const [isProcessed, setIsProcessed] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const { data, error, isPending } = api.invoice.getInvoice.useQuery(
    {
      id,
    },
    {
      refetchInterval: 3 * 1000,
      refetchOnWindowFocus: false,
      enabled: !isExpired && !isProcessed,
    },
  );

  useEffect(() => {
    if (data?.isExpired === false && data.isFullPaid === true) {
      setIsProcessed(true);
    }
  }, [data]);

  if (isPending) return <InvoiceLoadingSkeleton />;
  if (error) return <FetchError error={error} />;

  // Invoice expired
  if (data.isExpired || isExpired) return <InvoiceExpired />;

  //
  const { isFullPaid, isFullUnconfirmedPaid } = data;
  if (isFullPaid) return <InvoicePaidCard data={data} />;
  if (isFullUnconfirmedPaid) return <InvoiceUnconfirmedPaidCard data={data} />;
  return <InvoicePendingCard setIsExpired={setIsExpired} data={data} />;
};
