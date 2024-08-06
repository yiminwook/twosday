import { globalStyle, style } from "@vanilla-extract/css";

export const form = style({});

export const inputBox = style({
  border: "1px solid #cdcdcd",
  height: 42,
  display: "flex",
  marginBottom: 10,
  alignItems: "center",
  paddingInline: 4,
});

export const input = style({
  width: "100%",
  fontSize: 16,
  ":focus-visible": {
    outline: "none",
  },
});

export const tagsInput = style([inputBox, {}]);

globalStyle(`${tagsInput} > span`, {
  color: "#808080",
});
