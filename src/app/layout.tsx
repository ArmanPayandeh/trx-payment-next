import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { AppProvider } from "./provider";

export const metadata: Metadata = {
  title: "Tesleum PAY (TRX)",
  description: "TRON Payment method (TRX) powered by Tesleum",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${GeistSans.variable}`}>
      <body className="flex min-h-dvh flex-col justify-center bg-black/90">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
