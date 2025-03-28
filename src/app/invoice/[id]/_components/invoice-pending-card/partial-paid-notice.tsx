import { formatTrx } from "@/app/utils";
import { CircleAlert } from "lucide-react";

type Props = {
  dueAmount: number;
  isPaidPartial: boolean;
};

export const PartialPaidNotice = (props: Props) => {
  const { dueAmount, isPaidPartial } = props;
  if (!isPaidPartial) return null;
  return (
    <div className="mb-4 flex gap-2 rounded-md bg-content2 px-2 py-4 text-sm font-normal text-gray-400">
      <CircleAlert />
      <div>
        <p>The invoice hasn't been paid in full.</p>
        <p>Please send {formatTrx(dueAmount)} more to the address below.</p>
      </div>
    </div>
  );
};
