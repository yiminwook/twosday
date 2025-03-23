"use client";
import {
  createTheme,
  virtualColor,
  isMantineColorScheme,
  MantineColorScheme,
  MantineColorSchemeManager,
  LocalStorageColorSchemeManagerOptions,
} from "@mantine/core";

export const theme = createTheme({
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
    primary: virtualColor({
      name: "primary",
      dark: "deep-blue",
      light: "deep-orange",
    }),
    demo: virtualColor({
      name: "demo",
      dark: "deep-orange",
      light: "deep-blue",
    }),
    "deep-blue": [
      "#e5f3ff",
      "#cde2ff",
      "#9ac2ff",
      "#64a0ff",
      "#3884fe",
      "#1d72fe",
      "#0969ff",
      "#0058e4",
      "#004ecd",
      "#0043b5",
    ],
    "deep-orange": [
      "#fff4e2",
      "#fee8cf",
      "#f7cfa2",
      "#f2b571",
      "#ed9f48",
      "#ea912d",
      "#e98a1d",
      "#cf770f",
      "#b96907",
      "#a15900",
    ],
  },
});
