import { formatTime } from "@/app/utils";
import { CircularProgress } from "@nextui-org/react";
import { differenceInSeconds } from "date-fns";
import { useEffect, useRef } from "react";
import { useCountdown } from "./use-countdown";

type Props = {
  validTill: Date;
  setIsExpired: React.Dispatch<React.SetStateAction<boolean>>;
};

export const InvoiceTimer = (props: Props) => {
  const { validTill, setIsExpired } = props;
  const secondsLeft = useRef(differenceInSeconds(validTill, new Date()));
  const { progress, timeLeft } = useCountdown({
    duration: secondsLeft.current,
  });

  useEffect(() => {
    if (progress >= 100) setIsExpired(true);
  }, [progress, setIsExpired]);

  return (
    <div className="relative bg-blue-600">
      <div
        className="absolute inset-0 bg-blue-800 transition-width"
        style={{ width: `${progress}%` }}
      />
      <div className="z-10 flex items-center justify-between gap-1 px-1">
        <div className="flex items-center gap-1">
          <div className="scale-75">
            <CircularProgress
              classNames={{
                track: "stroke-transparent",
                indicator: "stroke-white",
              }}
              size="sm"
              value={70}
              className="animate-spin"
            />
          </div>
          <p className="z-[1] text-sm font-semibold">Awaiting Payment...</p>
        </div>
        <p className="z-10 pr-1 font-semibold">{formatTime(timeLeft)}</p>
      </div>
    </div>
  );
};
