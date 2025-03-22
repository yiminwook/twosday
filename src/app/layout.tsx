// css 순서변경 금지
// thrid-party css
import "@mantine/carousel/styles.css";
import "@mantine/code-highlight/styles.css";
import "@/styles/swiper/swiper.scss";
import "@/styles/swiper/pagination.scss";

// design system css
import "@/styles/mantine/core.scss";
import "@/styles/mantine/theme.scss";

// application css (to-be)
import "@/styles/global.scss";
import "@/styles/theme.scss";
import "@/styles/editor.scss";

// as-is css
import "@/styles/global.css";
import "@/styles/globalTheme.css";

import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { PropsWithChildren } from "react";
import Configs from "@/components/config";
import { ColorSchemeScript } from "@mantine/core";

import MswProvider from "@/mocks/MswProvider";
import "@/mocks/enableServer";

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
    <html lang="ko" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={font.className}>
        <MswProvider>
          <Configs>{children}</Configs>
        </MswProvider>
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";
