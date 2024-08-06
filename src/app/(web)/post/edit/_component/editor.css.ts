import { globalStyle, style } from "@vanilla-extract/css";

export const loading = style({});

globalStyle(`${loading} .ql-container`, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: 665,
});
