"use client";
import {
  createTheme,
  virtualColor,
  isMantineColorScheme,
  MantineColorScheme,
  MantineColorSchemeManager,
  LocalStorageColorSchemeManagerOptions,
  Tooltip,
  Pagination,
} from "@mantine/core";

export const theme = createTheme({
  primaryColor: "primary",
  /* Put your mantine theme override here */
  fontFamily:
    "Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, Helvetica Neue, Segoe UI, Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, sans-serif",
  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },
  colors: {
    primary: [
      "#ffede5",
      "#ffdace",
      "#ffb29c",
      "#fe8865",
      "#fe6538",
      "#fe4e1b",
      "#fe420b",
      "#e33400",
      "#cb2c00",
      "#b12100",
    ],
  },
  components: {
    Pagination: {
      defaultProps: {
        siblings: 2,
        withEdges: true, // Show first/last controls
      },
    },
  },
});
