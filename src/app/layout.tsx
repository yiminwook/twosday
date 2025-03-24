// css 순서변경 금지
// thrid-party css
import "@mantine/carousel/styles.css";
import "@mantine/code-highlight/styles.css";
import "@/styles/swiper/swiper.scss";
import "@/styles/swiper/pagination.scss";

// design system css
import "@/styles/mantine/core.scss";
import "@/styles/mantine/theme.scss";
import "@/styles/mantine/tiptap.scss";

// application css (to-be)
import "@/styles/global.scss";
import "@/styles/theme.scss";
import "@/styles/editor.scss";

// as-is css
import "@/styles/global.css";
import "@/styles/globalTheme.css";

import type { Metadata, Viewport } from "next";
import { PropsWithChildren } from "react";
import Configs from "@/components/config";
import { ColorSchemeScript } from "@mantine/core";

import MswProvider from "@/mocks/MswProvider";
import "@/mocks/enableServer";

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
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <ColorSchemeScript />
      </head>
      <body>
        <MswProvider>
          <Configs>{children}</Configs>
        </MswProvider>
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";
