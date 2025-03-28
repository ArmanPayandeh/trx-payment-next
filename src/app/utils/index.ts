export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export const formatTrx = (price: number) => {
  return `${price} TRX`;
};

export const formatId = (str: string) => {
  const start = str.slice(0, 8); // First 6 characters
  const end = str.slice(-8); // Last 6 characters
  return `${start}...${end}`;
};
