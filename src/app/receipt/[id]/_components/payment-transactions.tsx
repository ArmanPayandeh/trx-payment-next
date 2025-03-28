"use client";

import { formatTrx } from "@/app/utils";
import { type BlockTransaction, type InvoiceData } from "@/types";
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useCallback } from "react";
import { type ReceiptOutput } from "./receipt-wrapper";

type Key = Extract<
  keyof BlockTransaction,
  "timestamp" | "fromAddress" | "toAddress" | "amount"
>;

const columns: {
  key: Key;
  label: string;
}[] = [
  {
    key: "timestamp",
    label: "Date",
  },
  {
    key: "fromAddress",
    label: "From Address",
  },
  {
    key: "toAddress",
    label: "To Address",
  },
  {
    key: "amount",
    label: "Token",
  },
];

type Record = InvoiceData["transactions"][number];

type Props = {
  data: ReceiptOutput;
};
export const PaymentTransactions = (props: Props) => {
  const { data } = props;
  const { transactions } = data;
  const renderCell = useCallback((record: Record, columnKey: React.Key) => {
    const cellValue = record[columnKey as keyof Record];
    const { amount, fromAddress, toAddress, timestamp } = record;
    switch (columnKey as Key) {
      case "amount":
        return formatTrx(amount);
      case "fromAddress":
        return fromAddress;
      case "toAddress":
        return toAddress;
      case "timestamp":
        return new Date(timestamp).toLocaleString();
      default:
        return cellValue;
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl">Transactions</h3>
      </CardHeader>
      <CardBody className="pt-0">
        <Table removeWrapper aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn className="uppercase" key={column.key}>
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={transactions}>
            {(item) => (
              <TableRow key={item.txID}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};
