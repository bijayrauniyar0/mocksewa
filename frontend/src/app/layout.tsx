import { Lato } from "next/font/google";

const lato = Lato({
  variable: "--font-lato",
  weight: ["400", "700"],
  subsets: ["latin"],
});

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { Suspense } from "react";

import AuthProvider from "@/components/common/AuthProvider";
import Spinner from "@/components/common/Spinner";
import ModalWrapper from "@/components/common/Wrappers/ModalWrapper";
import ReactQueryProvider from "@/lib/react-query/queryClientProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className={lato.className} suppressHydrationWarning>
        <Suspense fallback={<Spinner />}>
          <ReactQueryProvider>
            <AuthProvider />
            <ModalWrapper />
            {children}
          </ReactQueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
