import {
  ADMIN_COMMISSION,
  TRX_ADMIN_ADDRESS,
  TRX_MERCHANT_ADDRESS,
} from "@/server/config";
import { db } from "@/server/db";
import { type Transaction } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { TronWeb } from "tronweb";

type Args = {
  privateKey: string;
  amountInSun: number;
  fromAddress: string;
  toAddress: string;
};

export const sendTrx = async (args: Args) => {
  try {
    const { privateKey, amountInSun, fromAddress, toAddress } = args;
    const tronWeb = new TronWeb({
      fullHost: "https://api.shasta.trongrid.io",
      privateKey,
    });

    // Create the transaction object
    const transaction = await tronWeb.transactionBuilder.sendTrx(
      toAddress,
      amountInSun,
      fromAddress,
    );

    // Sign the transaction
    const signedTransaction = await tronWeb.trx.sign(transaction);

    // Broadcast the transaction to the network
    const result = await tronWeb.trx.sendRawTransaction(signedTransaction);

    // console.log("Transaction result:", result);
    return result;
  } catch (error) {
    console.error("Error while transferring TRX:", error);
    throw error;
  }
};

export const verifyPayment = async (
  record: Transaction,
  confirmedPaidSun: number,
) => {
  try {
    const { privateKey, isProcessed, address } = record;
    if (isProcessed) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "This request has been processed already",
      });
    }

    const sunAmountForAdmin = (confirmedPaidSun * ADMIN_COMMISSION) / 100;
    const sunAmountForMerchant = confirmedPaidSun - sunAmountForAdmin;

    // send trx to commission destination
    await sendTrx({
      toAddress: TRX_MERCHANT_ADDRESS,
      amountInSun: sunAmountForAdmin,
      fromAddress: record.address,
      privateKey,
    });

    // send trx to final destination
    await sendTrx({
      toAddress: TRX_ADMIN_ADDRESS,
      amountInSun: sunAmountForMerchant,
      fromAddress: record.address,
      privateKey,
    });

    // update txn
    await db.transaction.update({
      data: {
        isProcessed: true,
      },
      where: {
        address,
      },
    });
  } catch (error) {
    if (error instanceof Error) console.log("error:->", error.message);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error instanceof Error ? error.message : "",
    });
  }
};
