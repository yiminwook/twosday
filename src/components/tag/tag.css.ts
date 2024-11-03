import { style } from "@vanilla-extract/css";

export const wrap = style({
  cursor: "pointer",
  ":hover": {
    textDecoration: "underline",
  },
});
