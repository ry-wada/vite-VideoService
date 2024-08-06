"use client";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { RecoilRoot } from "recoil";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RecoilRoot>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
