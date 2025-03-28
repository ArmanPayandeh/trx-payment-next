"use client";

import QRCodeStyling from "qr-code-styling";
import { useEffect, useMemo, useRef } from "react";
import TronLogo from "~/tron-logo.png";
import { CopyToClipboard } from "../copy-to-clipboard";

export type QRCodeProps = {
  text: string;
};

export const QRCodeBase = (props: QRCodeProps) => {
  const { text } = props;
  const ref = useRef<HTMLDivElement>(null);
  const width = 250;
  const height = 250;

  const qrCode = useMemo(
    () =>
      new QRCodeStyling({
        width,
        height,
        type: "svg",
        image: TronLogo.src,
        data: text,
        margin: 3,
        dotsOptions: {
          type: "extra-rounded",
          color: "#000",
        },
        cornersSquareOptions: {
          type: "extra-rounded",
          color: "#000",
        },
        cornersDotOptions: {
          // type: "",
          // type: "dot",
        },
        backgroundOptions: {
          color: "#fff",
        },
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: 0.4,
          margin: 2,
        },
        qrOptions: {
          errorCorrectionLevel: "H",
        },
      }),
    [text],
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = "";
      qrCode.append(ref.current);
    }
  }, [qrCode]);

  return (
    <CopyToClipboard content={text} successText="Address copied to clipboard">
      <div
        className="m-auto overflow-hidden rounded-3xl"
        style={{
          width,
          height,
        }}
        ref={ref}
      />
    </CopyToClipboard>
  );
};
