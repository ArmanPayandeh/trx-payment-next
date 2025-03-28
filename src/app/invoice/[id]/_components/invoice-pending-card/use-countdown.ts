import { useEffect, useState } from "react";

type Props = {
  duration: number; // in seconds
};

export const useCountdown = (props: Props) => {
  const { duration } = props;
  const [timeLeft, setTimeLeft] = useState(duration);
  const progress = Math.round(100 - (timeLeft / duration) * 100);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return { timeLeft, progress };
};
