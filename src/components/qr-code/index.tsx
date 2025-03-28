import dynamic from "next/dynamic";
import { type QRCodeProps } from "./base";

const QRCodeBase = dynamic(
  async () => import("./base").then((m) => m.QRCodeBase),
  { ssr: false },
);

export const QRCode = (props: QRCodeProps) => {
  return <QRCodeBase {...props} />;
};
