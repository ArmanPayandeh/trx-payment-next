import { formatId, formatTrx } from "@/app/utils";
import { CopyToClipboard } from "@/components/copy-to-clipboard";
import { type InvoiceData } from "@/types";
import { Tooltip } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { DetailConfirmations } from "./detail-confirmations";

type Props = {
  data: InvoiceData;
  hideDetails?: boolean;
};

export const InvoiceDetailsSection = (props: Props) => {
  const { data, hideDetails = true } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { dueAmount, paidAmount, totalAmount, transactionsCount, id, transactions } =
    data;
  const handleToggle = () => setIsOpen(!isOpen);

  const listItems: {
    label: React.ReactNode;
    value: React.ReactNode;
  }[] = [
    {
      label: "Invoice Id",
      value: (
        <CopyToClipboard
          successText="Invoice Id copied to clipboard"
          content={id}
        >
          <Tooltip delay={400} content={id}>
            <span>{formatId(id)}</span>
          </Tooltip>
        </CopyToClipboard>
      ),
    },
    {
      label: "Total Amount",
      value: (
        <CopyToClipboard
          successText="Total Amount copied to clipboard"
          content={totalAmount.toString()}
        >
          {formatTrx(totalAmount)}
        </CopyToClipboard>
      ),
    },
    {
      label: "Paid Amount",
      value: (
        <CopyToClipboard
          content={paidAmount.toString()}
          successText="Paid Amount copied to clipboard"
        >
          {formatTrx(paidAmount)}
        </CopyToClipboard>
      ),
    },
    {
      label: "Due Amount",
      value: (
        <CopyToClipboard
          content={dueAmount.toString()}
          successText="Due Amount copied to clipboard"
        >
          {formatTrx(dueAmount)}
        </CopyToClipboard>
      ),
    },
    {
      label: (
        <div className="flex items-center gap-1">
          Confirmations
          <DetailConfirmations transactions={transactions} />
        </div>
      ),
      value: transactions[0]?.confirmations ?? 0,
    },
    {
      label: "Txn Count",
      value: transactionsCount,
    },
  ];

  return (
    <div className="flex flex-col text-sm">
      {hideDetails && (
        <div className="flex justify-center">
          <button
            type="button"
            className="flex items-center gap-1 text-center font-medium text-primary"
            onClick={handleToggle}
          >
            <p>{isOpen ? "Hide" : "Show"} Details</p>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <ChevronDown size={16} strokeWidth={3} />
            </motion.div>
          </button>
        </div>
      )}

      <AnimatePresence initial={false}>
        {(isOpen || hideDetails === false) && (
          <motion.div
            initial={{ opacity: 0, height: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
            exit={{ opacity: 0, height: 0, filter: "blur(4px)" }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <div className="mt-4 flex flex-col gap-4 text-sm">
              {listItems.map((item, idx) => {
                return (
                  <div key={idx} className="flex justify-between">
                    <div className="text-gray-400">{item.label}</div>
                    <div className="font-medium">{item.value}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
