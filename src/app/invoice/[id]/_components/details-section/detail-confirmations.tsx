import { formatTrx } from "@/app/utils";
import { type InvoiceData } from "@/types";
import {
  CircularProgress,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { CircleCheck, InfoIcon } from "lucide-react";
import { useState } from "react";

type Props = {
  transactions: InvoiceData["transactions"];
};

export const DetailConfirmations = (props: Props) => {
  const { transactions } = props;
  const [isOpen, setIsOpen] = useState(false);
  const onOpenChange = (open: boolean) => setIsOpen(open);
  const handleMouseEnter = () => setIsOpen(true);
  if (transactions.length < 2) return null;
  return (
    <Popover
      className="w-full min-w-[200px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top"
    >
      <div onMouseEnter={handleMouseEnter}>
        <PopoverTrigger>
          <InfoIcon size={16} />
        </PopoverTrigger>
      </div>
      <PopoverContent>
        <div className="flex w-full flex-col gap-2 divide-y-1 divide-divider p-2">
          {[...transactions].reverse().map((item, idx) => {
            const { amount, confirmations, isConfirmed } = item;
            const index = idx + 1;
            return (
              <div key={idx} className="flex justify-between pt-2 text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-gray-400">#{index}</span>
                  <span>{formatTrx(amount)}</span>
                </div>
                {isConfirmed ? (
                  <CircleCheck size={16} className="text-success" />
                ) : (
                  <div className="flex items-center gap-1 font-medium">
                    <span>{confirmations}</span>
                    <CircularProgress
                      classNames={{
                        svg: "w-4 h-4",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};
