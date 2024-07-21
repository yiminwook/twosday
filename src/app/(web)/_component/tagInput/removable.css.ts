import { style } from "@vanilla-extract/css";

export const wrap = style({
  marginRight: "0.5em",
  padding: "0.2em",
  fontWeight: 500,
  borderRadius: 5,
  border: "1px solid #ccc",
  backgroundColor: "#ffffff",
  verticalAlign: "middle",
  selectors: {
    "&.click": {
      cursor: "pointer",
    },
  },
});

export const btn = style({
  marginLeft: "0.2em",
});
