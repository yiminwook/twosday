import "@/styles/global.scss";
import "@/styles/theme.scss";
import "@/styles/editor.css";

import "@/styles/global.css";
import "@/styles/globalTheme.css";
import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { PropsWithChildren } from "react";
import Configs from "@/components/config";
import { ColorSchemeScript } from "@mantine/core";

const font = Noto_Sans_KR({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Twosday",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    // https://github.com/mantinedev/mantine/issues/7008
    <html lang="ko" suppressContentEditableWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body className={font.className}>
        <Configs defaultColorScheme={"light"}>{children}</Configs>
      </body>
    </html>
  );
}
