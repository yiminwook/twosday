import { globalStyle, style } from "@vanilla-extract/css";

export const imgBox = style({});

globalStyle(`${imgBox} img`, {
  maxWidth: "100%",
  display: "block",
});
