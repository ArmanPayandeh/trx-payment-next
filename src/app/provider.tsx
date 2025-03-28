"use client";

import { PoweredBy } from "@/components/powered-by";
import { TRPCReactProvider } from "@/trpc/react";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
};

export const AppProvider = (props: Props) => {
  const { children } = props;
  return (
    <TRPCReactProvider>
      <Toaster position="bottom-center" />
      <NextUIProvider className="flex flex-col gap-4 p-2 md:gap-8">
        {children}
        <PoweredBy />
      </NextUIProvider>
    </TRPCReactProvider>
  );
};
