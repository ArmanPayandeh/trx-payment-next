import { NUMBER_OF_CONFIRMATIONS_TO_SUCCESS } from "@/server/config";
import { BlockTransaction } from "@/types";
import { formatNumber } from "@/utils";
import { type TronWeb } from "tronweb";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export type TransactionResponse = {
  data: {
    blockNumber: number;
    txID: number;
    ret: { contractRet: "SUCCESS" | "FAILED"; fee: number }[];
    raw_data: {
      contract: {
        parameter: {
          value: {
            owner_address: string;
            to_address: string;
            amount: number;
          };
        };
      }[];
      timestamp: number;
    };
  }[];
};

const getCurrentBlock = async (tronWeb: TronWeb) => {
  const data = await tronWeb.trx.getCurrentBlock();
  return data.block_header.raw_data.number;
};

const getNumberOfConfirmations = (
  currentBlock: number,
  blockNumber: number,
) => {
  return Math.max(0, currentBlock - blockNumber);
};

export const getTransactionInfo = async (
  address: string,
  tronWeb: TronWeb,
  txnData: TransactionResponse["data"],
) => {
  let confirmedPaidTrx = 0;
  let confirmedPaidSun = 0;
  let unconfirmedPaidTrx = 0;
  let unconfirmedPaidSun = 0;
  let transactionsCount = 0;

  const currentBlock = await getCurrentBlock(tronWeb);
  const hexAddress = tronWeb.address.toHex(address);

  // filtered to_address is txns received
  const toTxnData = txnData
    .filter((item) =>
      item.raw_data.contract.some(
        (item) => item.parameter.value.to_address === hexAddress,
      ),
    )
    .map((item) => {
      const {
        blockNumber,
        txID,
        raw_data: { timestamp },
      } = item;
      const contract = item.raw_data.contract[0]?.parameter.value;
      if (!contract) throw new Error("Unable to get contract");
      return {
        blockNumber,
        contract,
        timestamp,
        txID,
      };
    });

  toTxnData.forEach((item) => {
    const { blockNumber, contract } = item;
    const amountInSun = contract.amount;
    const amountInTrx = Number(tronWeb.fromSun(amountInSun));

    const isConfirmed =
      getNumberOfConfirmations(currentBlock, blockNumber) >=
      NUMBER_OF_CONFIRMATIONS_TO_SUCCESS;

    unconfirmedPaidTrx = formatNumber(unconfirmedPaidTrx + amountInTrx);
    unconfirmedPaidSun = formatNumber(unconfirmedPaidSun + amountInSun);
    if (isConfirmed) {
      confirmedPaidTrx = formatNumber(confirmedPaidTrx + amountInTrx);
      confirmedPaidSun = formatNumber(confirmedPaidSun + amountInSun);
    }
    transactionsCount += 1;
  });

  // get transactions
  const transactions: BlockTransaction[] = toTxnData.map((item) => {
    const { blockNumber, contract, timestamp, txID } = item;
    const {
      owner_address: fromAddress,
      to_address: toAddress,
      amount: amountInSun,
    } = contract;
    const amountInTrx = Number(tronWeb.fromSun(amountInSun));
    const confirmations = getNumberOfConfirmations(currentBlock, blockNumber);
    const isConfirmed = confirmations >= NUMBER_OF_CONFIRMATIONS_TO_SUCCESS;

    const fromAddressBase58 = tronWeb.address.fromHex(fromAddress);
    const toAddressBase58 = tronWeb.address.fromHex(toAddress);

    return {
      blockNumber,
      confirmations,
      amount: amountInTrx,
      isConfirmed,
      fromAddress: fromAddressBase58,
      toAddress: toAddressBase58,
      timestamp,
      txID,
    };
  });

  return {
    confirmedPaidTrx,
    unconfirmedPaidTrx,
    transactionsCount,
    transactions,
    confirmedPaidSun,
    unconfirmedPaidSun,
  };
};

export const getTransactionsByAddress = async (address: string) => {
  const url = `https://api.shasta.trongrid.io/v1/accounts/${address}/transactions`;
  try {
    const response = await fetch(url);
    const data: TransactionResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error)
      console.error("Error fetching transactions:", error.message);
    return {
      data: [],
    } as TransactionResponse;
  }
};
