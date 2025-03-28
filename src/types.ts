import { type RouterOutputs } from "./trpc/react";

export type InvoiceData = Extract<
  RouterOutputs["invoice"]["getInvoice"],
  { isExpired: false }
>;

export type BlockTransaction = {
  blockNumber: number;
  confirmations: number;
  amount: number;
  isConfirmed: boolean;
  fromAddress: string;
  toAddress: string;
  timestamp: number;
  txID: number;
};
