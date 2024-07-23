import { style } from "@vanilla-extract/css";

export const wrap = style({
  border: "1px solid yellow",
});

export const inputBox = style({
  border: "1px solid black",
  display: "flex",
  padding: "0.2em",
});

export const input = style({
  padding: "0.2em",
  selectors: {
    "&:focus": {
      outline: "none",
    },
  },
});
