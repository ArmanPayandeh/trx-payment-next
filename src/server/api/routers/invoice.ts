import { INVOICE_VALID_DURATION } from "@/server/config";
import { formatNumber } from "@/utils";
import { TRPCError } from "@trpc/server";
import { addMinutes, isAfter } from "date-fns";
import { TronWeb } from "tronweb";
import { number, object, string } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { verifyPayment } from "./helper";
import { getTransactionInfo, getTransactionsByAddress } from "./helper2";

const createInvoiceSchema = object({
  amount: number().positive("Amount must be greater than 0"),
});

const idSchema = object({
  id: string().min(1, "Id is required"),
});

const tronWeb = new TronWeb({
  fullHost: "https://api.shasta.trongrid.io", // Testnet
  solidityNode: "https://api.shasta.trongrid.io",
  eventServer: "https://api.shasta.trongrid.io",
});

export const invoiceRouter = createTRPCRouter({
  getReceipt: publicProcedure.input(idSchema).query(async ({ ctx, input }) => {
    const { id } = input;
    // get record
    const record = await ctx.db.transaction.findUnique({
      where: {
        id,
      },
    });
    if (!record) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No record found",
      });
    }

    const { isProcessed, address } = record;
    if (!isProcessed) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "This request is not processed yet",
      });
    }

    const { data: txnData } = await getTransactionsByAddress(address);
    const { confirmedPaidTrx, transactions } = await getTransactionInfo(
      address,
      tronWeb,
      txnData,
    );

    return {
      id,
      amount: record.amount.toNumber(),
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      address: record.address,
      transactions,
      paidAmount: confirmedPaidTrx,
    };
  }),
  getInvoice: publicProcedure.input(idSchema).query(async ({ ctx, input }) => {
    const { id } = input;
    // get record
    const record = await ctx.db.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!record) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No record found",
      });
    }

    const { address, amount, isProcessed, validTill } = record;
    const payableAmount = amount.toNumber();
    const isExpired = isProcessed === false && isAfter(new Date(), validTill);

    if (isExpired) {
      return {
        isExpired: true as const,
      };
    }

    const { data: txnData } = await getTransactionsByAddress(address);
    const {
      confirmedPaidTrx,
      transactionsCount,
      unconfirmedPaidTrx,
      transactions,
      confirmedPaidSun,
    } = await getTransactionInfo(address, tronWeb, txnData);

    const isFullUnconfirmedPaid = unconfirmedPaidTrx >= payableAmount;
    const amountPaidInTrx = confirmedPaidTrx;

    const dueInTrx = Math.max(0, formatNumber(payableAmount - amountPaidInTrx));
    const unconfirmedDueInTrx = Math.max(
      0,
      formatNumber(payableAmount - unconfirmedPaidTrx),
    );

    const isPaidPartial =
      unconfirmedPaidTrx > 0 && unconfirmedPaidTrx < payableAmount;

    const isFullPaid = amountPaidInTrx >= payableAmount;
    if (!isProcessed && isFullPaid) {
      await verifyPayment(record, confirmedPaidSun);
    }

    const result = {
      id,
      address,
      paidAmount: amountPaidInTrx,
      dueAmount: dueInTrx,
      unconfirmedDueAmount: unconfirmedDueInTrx,
      isPaidPartial,
      totalAmount: payableAmount,
      isFullUnconfirmedPaid,
      isFullPaid,
      transactionsCount,
      isExpired: false as const,
      validTill,
      transactions,
      isProcessed,
    };
    return result;
  }),
  createInvoice: publicProcedure
    .input(createInvoiceSchema)
    .mutation(async ({ ctx, input }) => {
      // create txn
      const { amount } = input;
      const account = await tronWeb.createAccount();
      const {
        address: { base58: address },
        privateKey,
        // publicKey,
      } = account;

      const validTill = addMinutes(new Date(), INVOICE_VALID_DURATION);
      // create transaction
      const { id } = await ctx.db.transaction.create({
        data: {
          address,
          amount,
          privateKey,
          validTill,
        },
      });

      return {
        amount,
        id,
      };
    }),
});
